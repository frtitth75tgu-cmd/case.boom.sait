import { NextRequest, NextResponse } from "next/server";
import { config } from "./config";

const memory = new Map<string, { count: number; resetAt: number }>();

export function getIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function simpleRateLimit(req: NextRequest, key: string, limit = 20, windowMs = 60_000) {
  if (!config.rateLimitEnabled) return null;

  const ip = getIp(req);
  const id = `${key}:${ip}`;
  const now = Date.now();
  const current = memory.get(id);

  if (!current || current.resetAt < now) {
    memory.set(id, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count > limit) {
    return NextResponse.json({ error: "Слишком много запросов. Попробуйте позже." }, { status: 429 });
  }

  return null;
}
