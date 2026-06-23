import { identity } from "../../src/core/identity";

// `identity` is most useful as a default "no transform" callback, so a
// caller doesn't need a separate branch for the untransformed case.
function resolveValue<T>(raw: T, normalize: (value: T) => T = identity): T {
	return normalize(raw);
}

console.log(resolveValue("  umsizi  ", (value) => value.trim()));
console.log(resolveValue(42));
