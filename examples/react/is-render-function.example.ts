import { isRenderFunction } from "../../src/react/is-render-function";

// A component prop that accepts either a static node or a render-prop
// function. `isRenderFunction` lets the consumer branch safely at runtime.
type Content = string | ((context: { user: string }) => string);

function render(content: Content, context: { user: string }): string {
	if (typeof content === "string") {
		return content;
	}

	// `isRenderFunction` confirms "this is callable" before invoking it —
	// here `content` is already narrowed to the specific render-prop shape.
	if (isRenderFunction(content)) {
		return content(context);
	}

	return "";
}

console.log(render("Static banner", { user: "jack" }));
console.log(render((ctx) => `Welcome back, ${ctx.user}!`, { user: "jack" }));
