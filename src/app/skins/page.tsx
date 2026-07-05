export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { ItemCard } from "@/components/ItemCard";

export default async function SkinsPage() {
  const skins = await prisma.skinCatalogItem.findMany({
    where: { isActive: true },
    orderBy: { price: "asc" }
  });

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-4xl font-black">Каталог CS2-скинов</h1>
      <p className="mt-3 text-white/60">Реальные названия популярных скинов. Картинки сейчас локальные, их можно заменить на Steam CDN или market API.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-4">
        {skins.map((s) => (
          <ItemCard key={s.id} name={s.marketHashName} rarity={s.rarity} price={s.price} image={s.image} />
        ))}
      </div>
    </main>
  );
}
