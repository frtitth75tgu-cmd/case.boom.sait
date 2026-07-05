import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { config } from "@/lib/config";
import { getSteamOpenIdUrl } from "@/lib/steam";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const required = ["adult", "terms", "privacy", "personalData", "payments"];

  if (!required.every((key) => form.get(key) === "on")) {
    return NextResponse.redirect(new URL("/login?error=consent", req.url), 303);
  }

  cookies().set(
    "caseboom_pending_consent",
    JSON.stringify({
      isAdult: true,
      acceptedTerms: true,
      acceptedPrivacy: true,
      acceptedPersonalData: true,
      acceptedPayments: true,
      docsVersion: config.docsVersion,
      createdAt: new Date().toISOString()
    }),
    {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10
    }
  );

  const returnTo = `${config.siteUrl}/api/auth/steam/callback`;
  return NextResponse.redirect(getSteamOpenIdUrl(returnTo), 303);
}
