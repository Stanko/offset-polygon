<script>
  export let left;
  export let top;
  export let onChange;
  let moving = false;
  let previousTouch;

  function start(e) {
    previousTouch = e.touches && e.touches[0];
    moving = true;
  }

  function stop() {
    moving = false;
  }

  function touchmove(e) {
    if (moving) {
      e.preventDefault();

      const touch = e.touches[0];

      const movementX = touch.pageX - previousTouch.pageX;
      const movementY = touch.pageY - previousTouch.pageY;
      console.log(movementX, movementY);

      onChange({
        movementX,
        movementY,
      });

      previousTouch = touch;
    }
  }

  function move(e) {
    if (moving) {
      onChange(e);
    }
  }
</script>

<svelte:window
  on:mousemove={move}
  on:mouseup={stop}
  on:touchmove|nonpassive={touchmove}
  on:touchend={stop}
/>

<circle
  on:mousedown={start}
  on:touchstart={start}
  cx={left}
  cy={top}
  class="handle"
  r="15"
/>

<style>
  .handle {
    user-select: none;
    cursor: move;
    background: black;
    opacity: 0;
    transition: opacity 200ms;
    border-radius: 100px;
    position: absolute;
    z-index: 10;
  }

  .handle:hover {
    opacity: 0.1;
  }
</style>
