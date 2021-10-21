// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".handle.svelte-x5qldl{user-select:none;cursor:move;background:black;opacity:0;transition:opacity 200ms;border-radius:100px;position:absolute;z-index:10}.handle.svelte-x5qldl:hover{opacity:0.1}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}