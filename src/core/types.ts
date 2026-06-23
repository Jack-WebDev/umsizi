export type StringKeyOf<T extends object> = Extract<keyof T, string>;

export type PathSegment = string | number;

export type ObjectPath = readonly PathSegment[];

export type PathInput = string | ObjectPath;

export type ObjectEntry<T extends object> = {
	[K in StringKeyOf<T>]: readonly [K, T[K]];
}[StringKeyOf<T>];

export type ObjectEntries<T extends object> = Array<ObjectEntry<T>>;

export type EntryTuple = readonly [PropertyKey, unknown];

export type EntryTuples = ReadonlyArray<EntryTuple>;

export type ObjectFromEntries<T extends EntryTuples> = {
	[K in T[number] as K[0]]: K[1];
};

export type ValueMapper<T extends object, R> = (
	value: T[StringKeyOf<T>],
	key: StringKeyOf<T>,
	object: T,
) => R;

export type KeyMapper<T extends object, R extends string> = (
	key: StringKeyOf<T>,
	value: T[StringKeyOf<T>],
	object: T,
) => R;

export type KeyPredicate<T extends object> = (
	key: StringKeyOf<T>,
	value: T[StringKeyOf<T>],
	object: T,
) => boolean;

export type KeyGuard<T extends object, S extends StringKeyOf<T>> = (
	key: StringKeyOf<T>,
	value: T[StringKeyOf<T>],
	object: T,
) => key is S;

export type ValuePredicate<T extends object> = (
	value: T[StringKeyOf<T>],
	key: StringKeyOf<T>,
	object: T,
) => boolean;

export type ValueGuard<T extends object, S extends T[StringKeyOf<T>]> = (
	value: T[StringKeyOf<T>],
	key: StringKeyOf<T>,
	object: T,
) => value is S;

export type MappedValues<T extends object, R> = {
	[K in StringKeyOf<T>]: R;
};

export type MappedKeys<T extends object, R extends string> = Record<
	R,
	T[StringKeyOf<T>]
>;

export type RenamedKeys<
	T extends object,
	M extends Partial<Record<StringKeyOf<T>, string>>,
> = {
	[K in StringKeyOf<T> as K extends keyof M
		? M[K] extends string
			? M[K]
			: K
		: K]: T[K];
};

export type FilteredValues<
	T extends object,
	S extends T[StringKeyOf<T>],
> = Partial<{
	[K in StringKeyOf<T>]: Extract<T[K], S>;
}>;

export type FilteredKeys<T extends object, S extends StringKeyOf<T>> = Partial<
	Pick<T, S>
>;

export type PartitionedValues<
	T extends object,
	S extends T[StringKeyOf<T>],
> = readonly [
	FilteredValues<T, S>,
	Partial<{
		[K in StringKeyOf<T>]: Exclude<T[K], S>;
	}>,
];

export type PartitionedObject<T extends object> = readonly [
	Partial<{
		[K in StringKeyOf<T>]: T[K];
	}>,
	Partial<{
		[K in StringKeyOf<T>]: T[K];
	}>,
];

export type CompactedObject<T extends object> = Partial<{
	[K in StringKeyOf<T>]: Exclude<T[K], null | undefined>;
}>;

export type InvertedObject<T extends Record<string, PropertyKey>> = {
	[K in StringKeyOf<T> as T[K]]: K;
};

type PathValueAtSegment<T, K extends PathSegment> = K extends keyof T
	? T[K]
	: K extends number
		? T extends readonly (infer U)[]
			? U
			: T extends (infer U)[]
				? U
				: never
		: never;

export type PathValue<T, P extends ObjectPath> = P extends readonly []
	? T
	: P extends readonly [
				infer Head extends PathSegment,
				...infer Tail extends ObjectPath,
			]
		? PathValueAtSegment<T, Head> extends never
			? never
			: PathValue<PathValueAtSegment<T, Head>, Tail>
		: never;
