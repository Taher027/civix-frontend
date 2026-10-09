export const getRolePath = (role?: string | null) =>
  (role ?? "citizen").toLowerCase();
