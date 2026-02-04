export const userRoleValues = ["ADMIN", "STYLIST", "CLIENT"] as const;
export type UserRoleType = typeof userRoleValues[number];

export const authProviderValues = ["EMAIL", "GOOGLE"] as const;
export type AuthProviderType = typeof authProviderValues[number];