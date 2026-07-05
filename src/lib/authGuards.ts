import { redirect } from "next/navigation";
import { getSession } from "./session";
import { prisma } from "./prisma";

export async function requireUser() {
  const session = getSession();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user || user.isBlocked) redirect("/login");

  return { session, user };
}

export async function requireAdmin() {
  const { session, user } = await requireUser();
  if (user.role !== "ADMIN") redirect("/");
  return { session, user };
}
