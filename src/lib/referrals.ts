import { prisma } from "./prisma";

export function makeReferralCode(steamId: string) {
  return `CB${steamId.slice(-6)}`.toUpperCase();
}

export async function ensureReferralProfile(userId: string, steamId: string) {
  const existing = await prisma.referralProfile.findUnique({ where: { userId } });
  if (existing) return existing;

  let code = makeReferralCode(steamId);
  let suffix = 1;

  while (await prisma.referralProfile.findUnique({ where: { code } })) {
    code = `${makeReferralCode(steamId)}${suffix++}`;
  }

  return prisma.referralProfile.create({ data: { userId, code } });
}
