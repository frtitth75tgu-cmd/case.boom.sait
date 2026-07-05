export const dynamic = "force-dynamic";

import { requireAdmin } from "@/lib/authGuards";
import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  await requireAdmin();
  const payments = await prisma.paymentIntent.findMany({ orderBy: { createdAt: "desc" }, take: 100 });

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-4xl font-black">Платежи</h1>
      <div className="mt-6 space-y-3">
        {payments.map((p) => (
          <div key={p.id} className="card grid gap-3 p-4 md:grid-cols-5">
            <strong>{p.amount} ₽</strong><span>{p.provider}</span><span>{p.status}</span><span>{p.externalId}</span><span>{p.createdAt.toLocaleString("ru-RU")}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
