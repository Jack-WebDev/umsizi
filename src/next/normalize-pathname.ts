/**
 * Normalizes a path-like string for routing/comparison purposes.
 *
 * - Ensures a leading slash.
 * - Collapses consecutive slashes into one.
 * - Strips a trailing slash (except for the root path).
 * - An empty string normalizes to `"/"`.
 *
 * Query strings and fragments are treated as opaque path characters and are
 * not parsed or stripped — pass only the pathname segment of a URL.
 *
 * @example
 * ```ts
 * normalizePathname("dashboard"); // "/dashboard"
 * normalizePathname("//dashboard///settings/"); // "/dashboard/settings"
 * normalizePathname(""); // "/"
 * ```
 */
export function normalizePathname(pathname: string): string {
	if (pathname === "") {
		return "/";
	}

	const normalized = pathname.replace(/\/{2,}/g, "/").replace(/\/$/, "");

	if (normalized === "") {
		return "/";
	}

	return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
