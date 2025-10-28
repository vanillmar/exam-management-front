export interface DecodedToken {
  id: string;
  email: string;
  sub: string;
  avatar: string;
  roles: string[];
  exp: number;
  iat: number;
}
