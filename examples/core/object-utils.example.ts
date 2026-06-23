import {
	compactObject,
	filterValues,
	mapValues,
	omit,
	pick,
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
console.log("pick", pick(record, ["id", "role"] as const));
console.log("omit", omit(record, "lastSeenAt"));
console.log(
	"mapValues",
	mapValues(record, (value) => String(value)),
);
console.log(
	"filterValues",
	filterValues(record, (value) => typeof value === "string"),
);
console.log("compactObject", compactObject(record));
