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

export type ObjectDiff<T extends object, U extends object> = {
	added: Partial<Pick<U, Exclude<StringKeyOf<U>, StringKeyOf<T>>>>;
	removed: Partial<Pick<T, Exclude<StringKeyOf<T>, StringKeyOf<U>>>>;
	changed: Partial<Pick<U, Extract<StringKeyOf<U>, StringKeyOf<T>>>>;
};

export type InvertedObject<T extends Record<string, PropertyKey>> = {
	[K in StringKeyOf<T> as T[K]]: K;
};

export type Validator<T> = (value: unknown) => value is T;

export type ObjectSchema = Record<string, Validator<unknown>>;

export type SchemaValue<T> = T extends Validator<infer U> ? U : never;

export type InferSchema<T extends ObjectSchema> = {
	[K in keyof T]: SchemaValue<T[K]>;
};

export type GroupedByKey<T extends object, K extends keyof T> = Partial<
	Record<Extract<T[K], PropertyKey>, Array<T>>
>;

export type IndexedByKey<T extends object, K extends keyof T> = Partial<
	Record<Extract<T[K], PropertyKey>, T>
>;

export type KeyMatch<K extends PropertyKey, L, R> = {
	key: K;
	left: L;
	right: R;
};

type Simplify<T> = { [K in keyof T]: T[K] } & {};

type WithDefault<T, D> = undefined extends T ? Exclude<T, undefined> | D : T;

type MergeDefaultValue<T, D> = T extends readonly unknown[]
	? WithDefault<T, D>
	: T extends object
		? D extends object
			? MergeDefaulted<T, D>
			: WithDefault<T, D>
		: WithDefault<T, D>;

export type Defaulted<T extends object, D extends object> = Simplify<{
	[K in keyof T | keyof D]: K extends keyof T
		? K extends keyof D
			? WithDefault<T[K], D[K]>
			: T[K]
		: K extends keyof D
			? D[K]
			: never;
}>;

export type MergeDefaulted<T extends object, D extends object> = Simplify<{
	[K in keyof T | keyof D]: K extends keyof T
		? K extends keyof D
			? MergeDefaultValue<T[K], D[K]>
			: T[K]
		: K extends keyof D
			? D[K]
			: never;
}>;

type DeepMergeValue<T, S> = S extends readonly unknown[]
	? S
	: S extends object
		? T extends object
			? DeepMerged<T, S>
			: S
		: S;

export type DeepMerged<T extends object, S extends object> = Simplify<{
	[K in keyof T | keyof S]: K extends keyof S
		? K extends keyof T
			? DeepMergeValue<T[K], S[K]>
			: S[K]
		: K extends keyof T
			? T[K]
			: never;
}>;

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
