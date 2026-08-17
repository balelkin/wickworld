/**
 * Nominal (branded) identifiers so domain IDs cannot be mixed at compile time.
 */
declare const brand: unique symbol;

export type Brand<TValue, TBrand extends string> = TValue & {
  readonly [brand]: TBrand;
};

export type UserId = Brand<string, "UserId">;
export type ProjectId = Brand<string, "ProjectId">;

export function asUserId(value: string): UserId {
  return value as UserId;
}

export function asProjectId(value: string): ProjectId {
  return value as ProjectId;
}
