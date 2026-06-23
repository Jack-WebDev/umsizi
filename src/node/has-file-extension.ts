export function hasFileExtension(filePath: string, extension: string): boolean {
	const normalizedExtension = extension.startsWith(".")
		? extension
		: `.${extension}`;

	return filePath.endsWith(normalizedExtension);
}
