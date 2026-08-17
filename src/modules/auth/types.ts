export type Profile = {
  readonly id: import("@/shared/types").UserId;
  readonly displayName: string;
  readonly createdAt: string;
};

export type AuthSession = {
  readonly userId: import("@/shared/types").UserId;
  readonly email: string;
};
