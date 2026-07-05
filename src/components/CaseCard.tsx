import Link from "next/link";
import { Case } from "@prisma/client";
import { PackageOpen } from "lucide-react";

export function CaseCard({ item }: { item: Case }) {
  return (
    <Link href={`/cases/${item.slug}`} className="card glow group block overflow-hidden p-6">
      <div className="flex h-36 items-center justify-center rounded-3xl bg-gradient-to-br from-soft to-bg">
        <PackageOpen className="h-20 w-20 text-accent transition group-hover:scale-110" />
      </div>
      <div className="mt-5">
        <h3 className="text-xl font-black">{item.title}</h3>
        <p className="mt-2 min-h-12 text-sm text-white/60">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-white/50">Цена</span>
          <strong className="text-2xl text-accent">{item.price} ₽</strong>
        </div>
      </div>
    </Link>
  );
}
