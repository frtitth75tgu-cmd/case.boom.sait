import { NextRequest, NextResponse } from "next/server";

function getBaseUrl(req: NextRequest) {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (envUrl) return envUrl.replace(/\/$/, "");
  return req.nextUrl.origin;
}

export async function GET(req: NextRequest) {
  const baseUrl = getBaseUrl(req);
  const returnTo = `${baseUrl}/api/auth/steam/callback`;
  const realm = `${baseUrl}/`;

  const steamUrl = new URL("https://steamcommunity.com/openid/login");
  steamUrl.searchParams.set("openid.ns", "http://specs.openid.net/auth/2.0");
  steamUrl.searchParams.set("openid.mode", "checkid_setup");
  steamUrl.searchParams.set("openid.return_to", returnTo);
  steamUrl.searchParams.set("openid.realm", realm);
  steamUrl.searchParams.set("openid.identity", "http://specs.openid.net/auth/2.0/identifier_select");
  steamUrl.searchParams.set("openid.claimed_id", "http://specs.openid.net/auth/2.0/identifier_select");

  return NextResponse.redirect(steamUrl);
}
