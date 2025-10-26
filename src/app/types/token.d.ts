export interface DecodedToken {
  id: string;
  email: string;
  sub: string;
  roles: string[];
  exp: number;
  iat: number;
}
