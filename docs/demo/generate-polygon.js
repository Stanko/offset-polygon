export default function generatePolygon(
  maxPolygonPoints = 5,
  r = 50,
  center = { x: 50, y: 50 }
) {
  const startAngle = Math.random() * Math.PI * 2;

  let angleLeft = Math.PI * 2;
  let totalAngle = startAngle;

  const angles = [startAngle];

  for (let i = maxPolygonPoints; i > 1; i--) {
    const averageAngle = angleLeft / i;
    const angle = averageAngle * 0.4 + 1.1 * Math.random() * averageAngle;

    angleLeft -= angle;
    totalAngle += angle;

    angles.push(totalAngle);
  }

  return angles.map((angle, index) => {
    // Create a single vertex closer to the center
    const radius = index === Math.floor(maxPolygonPoints * 0.5) ? r * 0.2 : r;

    return {
      x: Math.cos(angle) * radius + center.x,
      y: Math.sin(angle) * radius + center.y,
    };
  });
}
