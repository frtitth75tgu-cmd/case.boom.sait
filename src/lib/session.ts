import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { config } from "./config";

const COOKIE_NAME = "caseboom_session";

export type SessionPayload = {
  userId: string;
  steamId: string;
  role: "USER" | "ADMIN";
};

export function signSession(payload: SessionPayload) {
  return jwt.sign(payload, config.sessionSecret, { expiresIn: "14d" });
}

export function setSession(payload: SessionPayload) {
  const token = signSession(payload);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14
  });
}

export function clearSession() {
  cookies().delete(COOKIE_NAME);
}

export function getSession(): SessionPayload | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    return jwt.verify(token, config.sessionSecret) as SessionPayload;
  } catch {
    return null;
  }
}
