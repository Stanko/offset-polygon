// src/offset-polygon.ts
var TWO_PI = Math.PI * 2;
function inwardEdgeNormal(vertex1, vertex2) {
  const dx = vertex2.x - vertex1.x;
  const dy = vertex2.y - vertex1.y;
  const edgeLength = Math.sqrt(dx * dx + dy * dy);
  return {
    x: -dy / edgeLength,
    y: dx / edgeLength
  };
}
function outwardEdgeNormal(vertex1, vertex2) {
  var n = inwardEdgeNormal(vertex1, vertex2);
  return {
    x: -n.x,
    y: -n.y
  };
}
function leftSide(vertex1, vertex2, p) {
  return (p.x - vertex1.x) * (vertex2.y - vertex1.y) - (vertex2.x - vertex1.x) * (p.y - vertex1.y);
}
function isReflexVertex(vertices, vertexIndex) {
  var thisVertex = vertices[vertexIndex];
  var nextVertex = vertices[(vertexIndex + 1) % vertices.length];
  var prevVertex = vertices[(vertexIndex + vertices.length - 1) % vertices.length];
  if (leftSide(prevVertex, nextVertex, thisVertex) < 0) {
    return true;
  }
  return false;
}
function createPolygon(vertices) {
  const edges = [];
  let minX = vertices.length > 0 ? vertices[0].x : void 0;
  let minY = vertices.length > 0 ? vertices[0].y : void 0;
  let maxX = minX;
  let maxY = minY;
  for (let i = 0; i < vertices.length; i++) {
    vertices[i].isReflex = isReflexVertex(vertices, i);
    const vertex1 = vertices[i];
    const vertex2 = vertices[(i + 1) % vertices.length];
    const outwardNormal = outwardEdgeNormal(vertex1, vertex2);
    const inwardNormal = inwardEdgeNormal(vertex1, vertex2);
    const edge = {
      vertex1,
      vertex2,
      index: i,
      outwardNormal,
      inwardNormal
    };
    edges.push(edge);
    const x = vertices[i].x;
    const y = vertices[i].y;
    minX = Math.min(x, minX);
    minY = Math.min(y, minY);
    maxX = Math.max(x, maxX);
    maxY = Math.max(y, maxY);
  }
  const polygon = {
    vertices,
    edges,
    minX,
    minY,
    maxX,
    maxY
  };
  return polygon;
}
function edgesIntersection(edgeA, edgeB) {
  const den = (edgeB.vertex2.y - edgeB.vertex1.y) * (edgeA.vertex2.x - edgeA.vertex1.x) - (edgeB.vertex2.x - edgeB.vertex1.x) * (edgeA.vertex2.y - edgeA.vertex1.y);
  if (den == 0) {
    return null;
  }
  const ua = ((edgeB.vertex2.x - edgeB.vertex1.x) * (edgeA.vertex1.y - edgeB.vertex1.y) - (edgeB.vertex2.y - edgeB.vertex1.y) * (edgeA.vertex1.x - edgeB.vertex1.x)) / den;
  const ub = ((edgeA.vertex2.x - edgeA.vertex1.x) * (edgeA.vertex1.y - edgeB.vertex1.y) - (edgeA.vertex2.y - edgeA.vertex1.y) * (edgeA.vertex1.x - edgeB.vertex1.x)) / den;
  const isIntersectionOutside = ua < 0 || ub < 0 || ua > 1 || ub > 1;
  return {
    x: edgeA.vertex1.x + ua * (edgeA.vertex2.x - edgeA.vertex1.x),
    y: edgeA.vertex1.y + ua * (edgeA.vertex2.y - edgeA.vertex1.y),
    isIntersectionOutside
  };
}
function appendArc(arcSegments, vertices, center, radius, startVertex, endVertex, isPaddingBoundary) {
  var startAngle = Math.atan2(startVertex.y - center.y, startVertex.x - center.x);
  var endAngle = Math.atan2(endVertex.y - center.y, endVertex.x - center.x);
  if (startAngle < 0) {
    startAngle += TWO_PI;
  }
  if (endAngle < 0) {
    endAngle += TWO_PI;
  }
  const angle = startAngle > endAngle ? startAngle - endAngle : startAngle + TWO_PI - endAngle;
  const angleStep = (isPaddingBoundary ? -angle : TWO_PI - angle) / arcSegments;
  vertices.push(startVertex);
  for (let i = 1; i < arcSegments; ++i) {
    const angle2 = startAngle + angleStep * i;
    const vertex = {
      x: center.x + Math.cos(angle2) * radius,
      y: center.y + Math.sin(angle2) * radius
    };
    vertices.push(vertex);
  }
  vertices.push(endVertex);
}
function createOffsetEdge(edge, dx, dy) {
  return {
    vertex1: {
      x: edge.vertex1.x + dx,
      y: edge.vertex1.y + dy
    },
    vertex2: {
      x: edge.vertex2.x + dx,
      y: edge.vertex2.y + dy
    }
  };
}
function createMarginPolygon(polygon, offset, arcSegments) {
  const offsetEdges = [];
  for (let i = 0; i < polygon.edges.length; i++) {
    const edge = polygon.edges[i];
    const dx = edge.outwardNormal.x * offset;
    const dy = edge.outwardNormal.y * offset;
    offsetEdges.push(createOffsetEdge(edge, dx, dy));
  }
  const vertices = [];
  for (let i = 0; i < offsetEdges.length; i++) {
    const thisEdge = offsetEdges[i];
    const prevEdge = offsetEdges[(i + offsetEdges.length - 1) % offsetEdges.length];
    const vertex = edgesIntersection(prevEdge, thisEdge);
    if (vertex && (!vertex.isIntersectionOutside || arcSegments < 1)) {
      vertices.push(vertex);
    } else {
      const arcCenter = polygon.edges[i].vertex1;
      appendArc(arcSegments, vertices, arcCenter, offset, prevEdge.vertex2, thisEdge.vertex1, false);
    }
  }
  const marginPolygon = createPolygon(vertices);
  marginPolygon.offsetEdges = offsetEdges;
  return marginPolygon;
}
function createPaddingPolygon(polygon, offset, arcSegments) {
  const offsetEdges = [];
  for (let i = 0; i < polygon.edges.length; i++) {
    const edge = polygon.edges[i];
    const dx = edge.inwardNormal.x * offset;
    const dy = edge.inwardNormal.y * offset;
    offsetEdges.push(createOffsetEdge(edge, dx, dy));
  }
  const vertices = [];
  for (let i = 0; i < offsetEdges.length; i++) {
    const thisEdge = offsetEdges[i];
    const prevEdge = offsetEdges[(i + offsetEdges.length - 1) % offsetEdges.length];
    const vertex = edgesIntersection(prevEdge, thisEdge);
    if (vertex && (!vertex.isIntersectionOutside || arcSegments < 1)) {
      vertices.push(vertex);
    } else {
      const arcCenter = polygon.edges[i].vertex1;
      appendArc(arcSegments, vertices, arcCenter, offset, prevEdge.vertex2, thisEdge.vertex1, true);
    }
  }
  const paddingPolygon = createPolygon(vertices);
  paddingPolygon.offsetEdges = offsetEdges;
  return paddingPolygon;
}
function offsetPolygon(vertices, offset, arcSegments = 0) {
  const polygon = createPolygon(vertices);
  if (offset > 0) {
    return createMarginPolygon(polygon, offset, arcSegments).vertices;
  } else {
    return createPaddingPolygon(polygon, -offset, arcSegments).vertices;
  }
}
export {
  offsetPolygon as default
};
//# sourceMappingURL=offset-polygon.js.map
