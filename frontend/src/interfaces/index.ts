export interface AuthData {
  roles: string[];
  accessToken?: string;
  refreshToken?: string;
  user?: any;
  // some other data...
}

export interface Product {
  name: string;
  unitPrice: number;
  quantity: number;
}

export type UserRoleType = "admin" | "editor" | "user";
