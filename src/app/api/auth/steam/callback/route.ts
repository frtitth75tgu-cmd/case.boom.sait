import { NextRequest, NextResponse } from "next/server";
import { setSession } from "@/lib/session";

function extractSteamId(req: NextRequest) {
  const claimed = req.nextUrl.searchParams.get("openid.claimed_id") || "";
  const identity = req.nextUrl.searchParams.get("openid.identity") || "";
  const source = claimed || identity;
  const match = source.match(/\/id\/([^/]+)$|\/profiles\/(\d+)$/);
  return match?.[1] || match?.[2] || "steam-user";
}

export async function GET(req: NextRequest) {
  const mode = req.nextUrl.searchParams.get("openid.mode");

  if (mode === "cancel") {
    return NextResponse.redirect(new URL("/login?steam=cancel", req.url), 302);
  }

  const steamId = extractSteamId(req);
  setSession(steamId);

  const res = NextResponse.redirect(new URL("/", req.url), 302);
  res.cookies.set("cb_steam_ok", "1", {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
