import crypto from "crypto";
import { config } from "./config";

export function createDemoPaymentUrl(paymentId: string) {
  return `/balance?demoPayment=${paymentId}`;
}

export function verifyPaymentWebhookSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", config.paymentWebhookSecret)
    .update(rawBody)
    .digest("hex");

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}
