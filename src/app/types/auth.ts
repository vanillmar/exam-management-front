// src/types/auth.ts
export interface ResponseDTO {
  timestamp: string;
  status: number;
  message: string;
}

export interface AuthResponseDTO extends ResponseDTO {
  token: string;
  username: string;
}
