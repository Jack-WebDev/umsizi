import { normalizePathname } from "../../src/next/normalize-pathname";

// Comparing pathnames coming from different sources (router params, raw
// `window.location.pathname`, hard-coded config) is unreliable unless they're
// normalized first — otherwise "/dashboard" and "dashboard//" compare unequal.
const routes = ["dashboard", "/dashboard/", "//dashboard//settings"];

const activeRoute = "/dashboard";

for (const route of routes) {
	const normalized = normalizePathname(route);
	const isActive = normalized === normalizePathname(activeRoute);

	console.log(
		`${route.padEnd(24)} -> ${normalized.padEnd(20)} active=${isActive}`,
	);
}
