import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { fetchSteamProfile, verifySteamCallback } from "@/lib/steam";
import { setSession } from "@/lib/session";
import { ensureReferralProfile } from "@/lib/referrals";

export async function GET(req: NextRequest) {
  const steamId = await verifySteamCallback(req.url);
  if (!steamId) return NextResponse.redirect(new URL("/", req.url));

  const pending = cookies().get("caseboom_pending_consent")?.value;
  if (!pending) return NextResponse.redirect(new URL("/", req.url));

  const consent = JSON.parse(pending);
  const profile = await fetchSteamProfile(steamId);

  const role = config.adminSteamId && config.adminSteamId === steamId ? "ADMIN" : "USER";

  const user = await prisma.user.upsert({
    where: { steamId },
    update: {
      username: profile.username,
      avatar: profile.avatar,
      role: role as any
    },
    create: {
      steamId,
      username: profile.username,
      avatar: profile.avatar,
      balance: 500,
      role: role as any
    }
  });

  await ensureReferralProfile(user.id, user.steamId);

  const refCode = req.cookies.get("caseboom_ref")?.value;
  if (refCode) {
    const inviter = await prisma.referralProfile.findUnique({ where: { code: refCode } });
    if (inviter && inviter.userId !== user.id) {
      const existingInvite = await prisma.referralInvite.findUnique({ where: { invitedId: user.id } }).catch(() => null);
      if (!existingInvite) {
        await prisma.$transaction([
          prisma.referralInvite.create({
            data: { inviterId: inviter.userId, invitedId: user.id, code: refCode, reward: 100 }
          }),
          prisma.user.update({ where: { id: inviter.userId }, data: { balance: { increment: 100 } } }),
          prisma.referralProfile.update({ where: { userId: inviter.userId }, data: { totalEarned: { increment: 100 } } }),
          prisma.notification.create({
            data: {
              userId: inviter.userId,
              title: "Реферальный бонус",
              message: "По вашей ссылке зарегистрировался пользователь. Начислено 100 ₽.",
              type: "REFERRAL"
            }
          })
        ]);
      }
    }
  }

  await prisma.userConsent.create({
    data: {
      userId: user.id,
      steamId,
      isAdult: Boolean(consent.isAdult),
      acceptedTerms: Boolean(consent.acceptedTerms),
      acceptedPrivacy: Boolean(consent.acceptedPrivacy),
      acceptedPersonalData: Boolean(consent.acceptedPersonalData),
      acceptedPayments: Boolean(consent.acceptedPayments),
      docsVersion: consent.docsVersion || config.docsVersion,
      ip: req.headers.get("x-forwarded-for") || "",
      userAgent: req.headers.get("user-agent") || ""
    }
  });

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: "LOGIN_STEAM",
      metadata: { steamId }
    }
  });

  cookies().delete("caseboom_pending_consent");
  setSession({ userId: user.id, steamId: user.steamId, role: user.role });

  return NextResponse.redirect(new URL("/", req.url));
}
