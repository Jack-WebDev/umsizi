export type StringKeyOf<T extends object> = Extract<keyof T, string>;

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

export type FilteredValues<
	T extends object,
	S extends T[StringKeyOf<T>],
> = Partial<{
	[K in StringKeyOf<T>]: Extract<T[K], S>;
}>;

export type CompactedObject<T extends object> = Partial<{
	[K in StringKeyOf<T>]: Exclude<T[K], null | undefined>;
}>;
