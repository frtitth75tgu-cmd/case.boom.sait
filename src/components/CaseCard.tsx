import Link from "next/link";
import { Case } from "@prisma/client";
import { config } from "@/lib/config";

export function CaseCard({ item }: { item: Case }) {
  return (
    <Link href={`/cases/${item.slug}`} className="card group block overflow-hidden p-4 transition hover:-translate-y-1 hover:border-accent/40">
      <div className="flex h-36 items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-soft to-bg">
        {item.image ? <img src={item.image} alt={item.title} className="h-full w-full object-cover transition group-hover:scale-105" /> : <span className="text-5xl">📦</span>}
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-black">{item.title}</h3>
        <p className="mt-2 line-clamp-2 min-h-10 text-sm text-white/55">{item.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-white/45">Цена</span>
          <strong className="text-xl text-accent">{item.price} {config.boomCoinShort}</strong>
        </div>
      </div>
    </Link>
  );
}
