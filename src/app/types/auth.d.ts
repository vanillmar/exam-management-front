// src/types/auth.ts
import { Response } from "@/types/response";

export interface Auth {
  token: string;
  refreshToken: string;
  expiresAt: string;
}
export type AuthResponseDTO = Response<Auth>;
