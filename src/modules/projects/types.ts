import type { ProjectId, UserId } from "@/shared/types";

export type ProjectVisibility = "private" | "public";

export type Project = {
  readonly id: ProjectId;
  readonly userId: UserId;
  readonly title: string;
  readonly storagePath: string;
  readonly visibility: ProjectVisibility;
  readonly remixOf: ProjectId | null;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export function storagePathFor(userId: UserId, projectId: ProjectId): string {
  return `${userId}/${projectId}.wick`;
}
