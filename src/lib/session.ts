import { cookies } from "next/headers";

export function getSession() {
  const id = cookies().get("cb_session")?.value;
  return id ? { userId: id, steamId: id, role: id === "admin" ? "ADMIN" : "USER" } : null;
}

export function setSession(id: string) {
  cookies().set("cb_session", id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearSession() {
  cookies().delete("cb_session");
}
