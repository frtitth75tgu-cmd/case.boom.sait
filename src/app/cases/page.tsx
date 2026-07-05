export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { CaseCard } from "@/components/CaseCard";

export default async function CasesPage() {
  const cases = await prisma.case.findMany({ where: { isActive: true }, orderBy: { price: "asc" } });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Кейсы</h1>
      <p className="mt-2 text-white/60">Выбери кейс, посмотри шансы и открой предмет.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {cases.map((c) => <CaseCard key={c.id} item={c} />)}
      </div>
    </main>
  );
}
