/**
 * Normalizes a path-like string for routing/comparison purposes.
 *
 * - Ensures a leading slash.
 * - Collapses consecutive slashes into one.
 * - Strips a trailing slash (except for the root path).
 * - An empty string normalizes to `"/"`.
 *
 * A query string or fragment, if present, is left untouched — only the
 * pathname segment preceding the first `?` or `#` is normalized.
 *
 * @example
 * ```ts
 * normalizePathname("dashboard"); // "/dashboard"
 * normalizePathname("//dashboard///settings/"); // "/dashboard/settings"
 * normalizePathname(""); // "/"
 * normalizePathname("dashboard?redirect=//evil.com"); // "/dashboard?redirect=//evil.com"
 * ```
 */
export function normalizePathname(pathname: string): string {
	const suffixIndex = pathname.search(/[?#]/);
	const path = suffixIndex === -1 ? pathname : pathname.slice(0, suffixIndex);
	const suffix = suffixIndex === -1 ? "" : pathname.slice(suffixIndex);

	if (path === "") {
		return `/${suffix}`;
	}

	const normalized = path.replace(/\/{2,}/g, "/").replace(/\/$/, "");

	if (normalized === "") {
		return `/${suffix}`;
	}

	return (normalized.startsWith("/") ? normalized : `/${normalized}`) + suffix;
}
