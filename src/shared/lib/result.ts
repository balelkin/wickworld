export type Result<TValue, TError extends Error = Error> =
  | { readonly ok: true; readonly value: TValue }
  | { readonly ok: false; readonly error: TError };

export function ok<TValue>(value: TValue): Result<TValue, never> {
  return { ok: true, value };
}

export function err<TError extends Error>(error: TError): Result<never, TError> {
  return { ok: false, error };
}

export function isOk<TValue, TError extends Error>(
  result: Result<TValue, TError>,
): result is { readonly ok: true; readonly value: TValue } {
  return result.ok;
}
