import {
	assertKeys,
	compactObject,
	filterValues,
	get,
	hasKeys,
	hasPath,
	isPlainObject,
	isRecord,
	mapValues,
	omit,
	path,
	pick,
	requireKeys,
	set,
	typedEntries,
	typedFromEntries,
	typedKeys,
} from "../../src";

const record = {
	id: "usr_1",
	name: "Umsizi",
	role: "admin",
	loginCount: 0,
	lastSeenAt: null,
	createdAt: new Date(),
	active: true,
} as const;

console.log("keys", typedKeys(record));
console.log("entries", typedEntries(record));
console.log(
	"fromEntries",
	typedFromEntries([
		["id", "usr_1"],
		["active", true],
	] as const),
);
console.log("pick", pick(record, "id", "role"));
console.log("omit", omit(record, "lastSeenAt"));
console.log("omit (tuple)", omit(record, ["createdAt"] as const));
console.log(
	"mapValues",
	mapValues(record, (value) => String(value)),
);
console.log(
	"filterValues",
	filterValues(record, (value) => typeof value === "string"),
);
console.log("compactObject", compactObject(record));
console.log("path", path("metadata.preferences.theme"));
console.log(
	"get",
	get(
		{ metadata: { preferences: { theme: "sunrise" } } },
		"metadata.preferences.theme",
	),
);
console.log(
	"set",
	set(
		{ metadata: { preferences: {} } },
		"metadata.preferences.theme",
		"sunrise",
	),
);
console.log(
	"hasPath",
	hasPath({ metadata: { preferences: { theme: undefined } } }, [
		"metadata",
		"preferences",
		"theme",
	]),
);

const payload: unknown = { id: "usr_1", role: "admin" };

console.log("isPlainObject", isPlainObject(payload));
console.log("isRecord", isRecord(payload));

if (isPlainObject(payload) && hasKeys(payload, "id", "role")) {
	console.log("hasKeys", payload.id, payload.role);
}

const ensured = requireKeys(record, "id", "role");
assertKeys(ensured, ["id", "role"] as const);
console.log("required keys", ensured.id, ensured.role);
