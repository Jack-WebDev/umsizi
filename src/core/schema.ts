/**
 * Defines an object schema from field validators while preserving the inferred
 * output shape.
 *
 * This is a semantic alias for `identity()` used for schema declarations.
 *
 * @example
 * ```ts
 * const userSchema = schema({
 *   id: (value): value is string => typeof value === "string",
 *   active: (value): value is boolean => typeof value === "boolean",
 * });
 * ```
 */
export { identity as schema } from "./identity";
