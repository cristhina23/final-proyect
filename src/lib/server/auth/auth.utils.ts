import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "$env/static/private";

import type { UserRole } from "$lib/types/role";

interface TokenPayload {
  id: string;
  email: string;
  role: UserRole;
}

export function generateToken(user: TokenPayload) {
    return jwt.sign({ ...user }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION as any
    });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
}

export function decodeToken(token: string) {
    return jwt.decode(token) as TokenPayload | null;
}
