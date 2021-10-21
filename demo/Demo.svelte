<script>
  import { onMount } from 'svelte';
  import Draggable from './Draggable.svelte';
  import Control from './Control.svelte';
  import generatePolygon from './generate-polygon';
  import isMobileDevice from './is-mobile-device';

  import offsetPolygon from '../src/offset-polygon.ts';

  let size = 0;
  let r;
  let center;
  let svgElement;
  let p;
  let p1;
  let p2;

  let padding = 15;
  let paddingArcSegments = 5;
  let margin = 15;
  let marginArcSegments = 5;

  const init = () => {
    size = svgElement.clientWidth;
    r = size * 0.35;
    center = {
      x: size / 2,
      y: size / 2,
    };

    p = generatePolygon(6, r, center);

    p1 = offsetPolygon(p, -padding, paddingArcSegments);
    p2 = offsetPolygon(p, margin, marginArcSegments);
  };

  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;

  onMount(() => {
    init();

    let resizeTimeout;

    function onResize() {
      if (
        !isMobileDevice ||
        (windowHeight !== window.innerHeight &&
          windowWidth !== window.innerWidth)
      ) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(init, 250);
      }

      windowHeight = window.innerHeight;
      windowWidth = window.innerWidth;
    }

    window.addEventListener('resize', onResize);
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', onResize);
    };
  });

  let onDrag = (e, index) => {
    p[index].x += e.movementX;
    p[index].y += e.movementY;

    p1 = offsetPolygon(p, -padding, paddingArcSegments);
    p2 = offsetPolygon(p, margin, marginArcSegments);
  };

  const onPaddingChange = (e) => {
    padding = e.target.value;
    p1 = offsetPolygon(p, -padding, paddingArcSegments);
  };
  const onPaddingArcSegmentsChange = (e) => {
    paddingArcSegments = e.target.value;
    p1 = offsetPolygon(p, -padding, paddingArcSegments);
  };

  const onMarginChange = (e) => {
    margin = e.target.value;
    p2 = offsetPolygon(p, margin, marginArcSegments);
  };
  const onMarginArcSegmentsChange = (e) => {
    marginArcSegments = e.target.value;
    p2 = offsetPolygon(p, margin, marginArcSegments);
  };
</script>

<div class="content">
  <h2>Interactive demo</h2>
  <Control
    max="100"
    label="Padding"
    value={padding}
    name="padding"
    onChange={onPaddingChange}
  />
  <Control
    label="Padding arc segments"
    value={paddingArcSegments}
    name="padding-arc-segments"
    onChange={onPaddingArcSegmentsChange}
  />
  <Control
    max="100"
    label="Margin"
    value={margin}
    name="margin"
    onChange={onMarginChange}
  />
  <Control
    label="Margin arc segments"
    value={marginArcSegments}
    name="margin-arc-segments"
    onChange={onMarginArcSegmentsChange}
  />
</div>
<svg viewBox="0 0 {size} {size}" bind:this={svgElement}>
  {#if size}
    <path
      fill="none"
      d="M {p.map((p) => `${p.x} ${p.y}`).join(' L ')} Z"
      stroke="silver"
    />

    {#if padding > 0}
      <path
        fill="none"
        d="M {p1.map((p) => `${p.x} ${p.y}`).join(' L ')} Z"
        stroke="#e74c3c"
      />
    {/if}

    {#if margin > 0}
      <path
        fill="none"
        d="M {p2.map((p) => `${p.x} ${p.y}`).join(' L ')} Z"
        stroke="#3498db"
      />
    {/if}

    {#each p as point}
      <circle fill="silver" r="3" cx={point.x} cy={point.y} />
    {/each}

    {#each p as point, index}
      <Draggable
        left={point.x}
        top={point.y}
        onChange={(e) => onDrag(e, index)}
      />
    {/each}
  {/if}
</svg>

<p class="note">Try dragging the vertices.</p>

<style>
  .note {
    color: #777;
    text-align: center;
    font-size: 14px;
  }
</style>
