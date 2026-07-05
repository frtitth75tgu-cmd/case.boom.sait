import crypto from "crypto";

export function createServerSeed() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashSeed(seed: string) {
  return crypto.createHash("sha256").update(seed).digest("hex");
}

export function rollBps(serverSeed: string, clientSeed: string, nonce: number) {
  const hmac = crypto
    .createHmac("sha256", serverSeed)
    .update(`${clientSeed}:${nonce}`)
    .digest("hex");

  const number = parseInt(hmac.slice(0, 8), 16);
  return (number % 10000) + 1;
}

export function pickByBps<T extends { chanceBps: number }>(items: T[], roll: number): T {
  let current = 0;
  for (const item of items) {
    current += item.chanceBps;
    if (roll <= current) return item;
  }
  return items[0];
}
