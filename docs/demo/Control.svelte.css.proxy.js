// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".control.svelte-q28g67{font-size:14px;display:flex;flex-wrap:wrap;margin-bottom:5px}.control-label.svelte-q28g67{min-width:180px;margin-right:10px}.control-input.svelte-q28g67{margin-right:10px}.control-right.svelte-q28g67{white-space:nowrap;display:flex}.control-value.svelte-q28g67{min-width:30px}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}