import { config } from "./config";

export type SteamProfile = {
  steamId: string;
  username: string;
  avatar: string | null;
};

export function getSteamOpenIdUrl(returnTo: string) {
  const params = new URLSearchParams({
    "openid.ns": "http://specs.openid.net/auth/2.0",
    "openid.mode": "checkid_setup",
    "openid.return_to": returnTo,
    "openid.realm": config.siteUrl,
    "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
    "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select"
  });

  return `https://steamcommunity.com/openid/login?${params.toString()}`;
}

export async function verifySteamCallback(url: string) {
  const parsed = new URL(url);
  const params = new URLSearchParams(parsed.search);
  params.set("openid.mode", "check_authentication");

  const response = await fetch("https://steamcommunity.com/openid/login", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: params.toString()
  });

  const text = await response.text();
  if (!text.includes("is_valid:true")) return null;

  const claimed = parsed.searchParams.get("openid.claimed_id") || "";
  const match = claimed.match(/\/id\/(\d+)$/);
  return match?.[1] || null;
}

export async function fetchSteamProfile(steamId: string): Promise<SteamProfile> {
  if (!config.steamApiKey || config.steamApiKey.includes("put_")) {
    return {
      steamId,
      username: `Steam User ${steamId.slice(-5)}`,
      avatar: null
    };
  }

  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${config.steamApiKey}&steamids=${steamId}`;
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  const player = data?.response?.players?.[0];

  return {
    steamId,
    username: player?.personaname || `Steam User ${steamId.slice(-5)}`,
    avatar: player?.avatarfull || null
  };
}
