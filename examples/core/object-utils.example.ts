import {
	assertKeys,
	compactObject,
	deepClone,
	deepEqual,
	deepMerge,
	diffObject,
	filterValues,
	flattenObject,
	get,
	groupByKey,
	hasKeys,
	hasPath,
	indexByKey,
	isPlainObject,
	mapValues,
	matchByKey,
	omit,
	parseObject,
	path,
	pick,
	requireKeys,
	set,
	typedEntries,
	typedFromEntries,
	typedKeys,
	unflattenObject,
	validateObject,
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
const userSchema = {
	id: (value: unknown): value is string => typeof value === "string",
	active: (value: unknown): value is boolean => typeof value === "boolean",
};

console.log("isPlainObject", isPlainObject(payload));
console.log(
	"groupByKey",
	groupByKey(
		[
			{ id: "usr_1", role: "admin" },
			{ id: "usr_2", role: "member" },
			{ id: "usr_3", role: "admin" },
		],
		"role",
	),
);
console.log(
	"indexByKey",
	indexByKey(
		[
			{ id: "usr_1", name: "Umsizi" },
			{ id: "usr_2", name: "Ada" },
		],
		"id",
	),
);
console.log(
	"matchByKey",
	matchByKey(
		[{ id: "usr_1", name: "Umsizi" }],
		[{ userId: "usr_1", team: "core" }],
		"id",
		"userId",
	),
);
console.log(
	"validateObject",
	validateObject({ id: "usr_1", active: true }, userSchema),
);
console.log(
	"parseObject",
	parseObject({ id: "usr_1", active: true }, userSchema),
);

if (isPlainObject(payload) && hasKeys(payload, "id", "role")) {
	console.log("hasKeys", payload.id, payload.role);
}

const ensured = requireKeys(record, "id", "role");
assertKeys(ensured, ["id", "role"] as const);
console.log("required keys", ensured.id, ensured.role);

const original = { profile: { name: "Ada", tags: ["admin"] } };
const clone = deepClone(original);
clone.profile.tags.push("member");
console.log(
	"deepClone (independent)",
	original.profile.tags,
	clone.profile.tags,
);

console.log("deepEqual", deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] }));

console.log(
	"deepMerge",
	deepMerge(
		{ profile: { name: "Ada", theme: "dark" } },
		{ profile: { theme: "light" } },
	),
);

console.log(
	"diffObject",
	diffObject(
		{ id: "usr_1", name: "Ada", role: "admin" },
		{ id: "usr_1", name: "Ada Lovelace" },
	),
);

const flat = flattenObject({
	metadata: { preferences: { theme: "sunrise" } },
});
console.log("flattenObject", flat);
console.log("unflattenObject", unflattenObject(flat));
