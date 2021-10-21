import './Control.svelte.css.proxy.js';
/* demo/Control.svelte generated by Svelte v3.44.0 */
import {
	SvelteComponent,
	append,
	attr,
	detach,
	element,
	init,
	insert,
	is_function,
	listen,
	noop,
	safe_not_equal,
	set_data,
	space,
	text
} from "../_snowpack/pkg/svelte/internal.js";

function create_fragment(ctx) {
	let div2;
	let label_1;
	let t0;
	let t1;
	let t2;
	let div1;
	let input;
	let t3;
	let div0;
	let t4;
	let mounted;
	let dispose;

	return {
		c() {
			div2 = element("div");
			label_1 = element("label");
			t0 = text(/*label*/ ctx[3]);
			t1 = text(":");
			t2 = space();
			div1 = element("div");
			input = element("input");
			t3 = space();
			div0 = element("div");
			t4 = text(/*value*/ ctx[0]);
			attr(label_1, "class", "control-label svelte-q28g67");
			attr(label_1, "for", /*name*/ ctx[1]);
			attr(input, "class", "control-input svelte-q28g67");
			attr(input, "name", /*name*/ ctx[1]);
			attr(input, "type", "range");
			input.value = /*value*/ ctx[0];
			attr(input, "step", /*step*/ ctx[6]);
			attr(input, "min", /*min*/ ctx[4]);
			attr(input, "max", /*max*/ ctx[5]);
			attr(div0, "class", "control-value svelte-q28g67");
			attr(div1, "class", "control-right svelte-q28g67");
			attr(div2, "class", "control svelte-q28g67");
		},
		m(target, anchor) {
			insert(target, div2, anchor);
			append(div2, label_1);
			append(label_1, t0);
			append(label_1, t1);
			append(div2, t2);
			append(div2, div1);
			append(div1, input);
			append(div1, t3);
			append(div1, div0);
			append(div0, t4);

			if (!mounted) {
				dispose = listen(input, "change", function () {
					if (is_function(/*onChange*/ ctx[2])) /*onChange*/ ctx[2].apply(this, arguments);
				});

				mounted = true;
			}
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			if (dirty & /*label*/ 8) set_data(t0, /*label*/ ctx[3]);

			if (dirty & /*name*/ 2) {
				attr(label_1, "for", /*name*/ ctx[1]);
			}

			if (dirty & /*name*/ 2) {
				attr(input, "name", /*name*/ ctx[1]);
			}

			if (dirty & /*value*/ 1) {
				input.value = /*value*/ ctx[0];
			}

			if (dirty & /*step*/ 64) {
				attr(input, "step", /*step*/ ctx[6]);
			}

			if (dirty & /*min*/ 16) {
				attr(input, "min", /*min*/ ctx[4]);
			}

			if (dirty & /*max*/ 32) {
				attr(input, "max", /*max*/ ctx[5]);
			}

			if (dirty & /*value*/ 1) set_data(t4, /*value*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div2);
			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { value } = $$props;
	let { name } = $$props;
	let { onChange } = $$props;
	let { label } = $$props;
	let { min = 0 } = $$props;
	let { max = 10 } = $$props;
	let { step = 1 } = $$props;

	$$self.$$set = $$props => {
		if ('value' in $$props) $$invalidate(0, value = $$props.value);
		if ('name' in $$props) $$invalidate(1, name = $$props.name);
		if ('onChange' in $$props) $$invalidate(2, onChange = $$props.onChange);
		if ('label' in $$props) $$invalidate(3, label = $$props.label);
		if ('min' in $$props) $$invalidate(4, min = $$props.min);
		if ('max' in $$props) $$invalidate(5, max = $$props.max);
		if ('step' in $$props) $$invalidate(6, step = $$props.step);
	};

	return [value, name, onChange, label, min, max, step];
}

class Control extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			value: 0,
			name: 1,
			onChange: 2,
			label: 3,
			min: 4,
			max: 5,
			step: 6
		});
	}
}

export default Control;