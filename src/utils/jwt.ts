import jwt, { type SignOptions } from "jsonwebtoken";
import env from "../config/env.js";
import type { JwtPayload } from "../types/auth.js";

export const signAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"],
  });
};

export const verifyToken = (token: string, secret?: string): JwtPayload => {
  try {
    return jwt.verify(token, secret || env.jwtSecret) as JwtPayload;
  } catch (err) {
    throw new Error("Invalid token");
  }
};
