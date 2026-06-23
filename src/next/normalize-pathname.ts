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
