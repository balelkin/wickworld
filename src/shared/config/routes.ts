/** Pathnames without locale prefix. Use `@/i18n/navigation` Link to add locale. */
export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  projects: "/projects",
  projectEdit: (projectId: string) => `/projects/${projectId}/edit` as const,
} as const;

export const PRODUCT_LIMITS = {
  maxProjectFileBytes: 25 * 1024 * 1024,
  maxProjectsPerUser: 20,
} as const;
