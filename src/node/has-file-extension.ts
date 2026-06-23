/**
 * Checks whether a file path ends with the given extension.
 *
 * The leading dot on `extension` is optional — both `"ts"` and `".ts"` are
 * accepted. The comparison is case-sensitive and is a plain `endsWith`
 * check, so it does not validate that `filePath` is a well-formed path.
 *
 * @example
 * ```ts
 * hasFileExtension("src/index.ts", ".ts"); // true
 * hasFileExtension("package.json", "json"); // true
 * hasFileExtension("README.md", "ts"); // false
 * ```
 */
export function hasFileExtension(filePath: string, extension: string): boolean {
	const normalizedExtension = extension.startsWith(".")
		? extension
		: `.${extension}`;

	return filePath.endsWith(normalizedExtension);
}
