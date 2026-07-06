import { NextRequest, NextResponse } from "next/server";

function getBaseUrl(req: NextRequest) {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto") || req.nextUrl.protocol.replace(":", "") || "https";
  return `${proto}://${host}`.replace(/\/$/, "");
}

export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrl(req);
  const callbackUrl = `${baseUrl}/api/auth/steam/callback`;

  const steam = new URL("https://steamcommunity.com/openid/login");
  steam.searchParams.set("openid.ns", "http://specs.openid.net/auth/2.0");
  steam.searchParams.set("openid.mode", "checkid_setup");
  steam.searchParams.set("openid.return_to", callbackUrl);
  steam.searchParams.set("openid.realm", `${baseUrl}/`);
  steam.searchParams.set("openid.identity", "http://specs.openid.net/auth/2.0/identifier_select");
  steam.searchParams.set("openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select");

  return NextResponse.redirect(steam.toString(), 302);
}
