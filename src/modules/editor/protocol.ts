/**
 * Typed postMessage contract between the portal host and the Wick iframe.
 * Implementation of the bridge lives in the Wick fork, not in Next.js.
 */
export const WICKWORLD_PROTOCOL_VERSION = 1 as const;

export type WickworldRequestId = string;

type Envelope<TType extends string, TPayload = Record<string, never>> = {
  readonly protocolVersion: typeof WICKWORLD_PROTOCOL_VERSION;
  readonly type: TType;
  readonly requestId: WickworldRequestId;
} & TPayload;

export type WickworldLoadMessage = Envelope<
  "wickworld:load",
  { readonly wickBytes: ArrayBuffer }
>;

export type WickworldLoadEmptyMessage = Envelope<"wickworld:load-empty">;

export type WickworldReadyMessage = Envelope<"wickworld:ready">;

export type WickworldSaveMessage = Envelope<
  "wickworld:save",
  {
    readonly file: ArrayBuffer;
    readonly name: string;
    readonly extension: string;
  }
>;

export type WickworldSaveAckMessage = Envelope<
  "wickworld:save-ack",
  { readonly ok: boolean; readonly error?: string }
>;

export type HostToEditorMessage = WickworldLoadMessage | WickworldLoadEmptyMessage | WickworldSaveAckMessage;

export type EditorToHostMessage = WickworldReadyMessage | WickworldSaveMessage;

export function isWickworldMessage(
  value: unknown,
): value is HostToEditorMessage | EditorToHostMessage {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  if (!("type" in value) || typeof value.type !== "string") {
    return false;
  }

  return value.type.startsWith("wickworld:");
}
