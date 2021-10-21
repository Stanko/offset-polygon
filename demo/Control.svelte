<script>
  export let value;
  export let name;
  export let onChange;
  export let label;
  export let min = 0;
  export let max = 10;
  export let step = 1;
</script>

<div class="control">
  <label class="control-label" for={name}>
    {label}:
  </label>
  <div class="control-right">
    <input
      class="control-input"
      {name}
      type="range"
      {value}
      {step}
      {min}
      {max}
      on:change={onChange}
    />
    <div class="control-value">{value}</div>
  </div>
</div>

<style>
  .control {
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5px;
  }

  .control-label {
    min-width: 180px;
    margin-right: 10px;
  }

  .control-input {
    margin-right: 10px;
  }

  .control-right {
    white-space: nowrap;
    display: flex;
  }

  .control-value {
    min-width: 30px;
  }
</style>
