/**
 * React-oriented helpers for render props and callable child values.
 *
 * @example
 * ```ts
 * import { isRenderFunction } from "@umsizi/umsizi/react";
 *
 * isRenderFunction(() => "ready"); // true
 * ```
 *
 * @module
 */

/** Type guard for values that are callable in render-oriented code paths. */
export { isRenderFunction } from "./is-render-function";
