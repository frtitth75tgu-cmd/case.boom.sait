export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { ItemCard } from "@/components/ItemCard";
import { notFound } from "next/navigation";
import OpenCaseButton from "./OpenCaseButton";

export default async function CasePage({ params }: { params: { slug: string } }) {
  const item = await prisma.case.findUnique({
    where: { slug: params.slug },
    include: { items: { orderBy: { price: "asc" } } }
  });

  if (!item) return notFound();

  const session = getSession();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <section className="card glow p-8 text-center">
        <p className="text-sm uppercase tracking-widest text-accent">Case</p>
        <h1 className="mt-3 text-5xl font-black">{item.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60">{item.description}</p>
        <div className="mt-6 text-3xl font-black text-accent">{item.price} ₽</div>
        <OpenCaseButton caseSlug={item.slug} isLoggedIn={Boolean(session)} items={item.items.map(i => ({ name: i.name, image: i.image, price: i.price }))} />
      </section>

      <section className="mt-10">
        <h2 className="text-3xl font-black">Содержимое</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {item.items.map((i) => (
            <div key={i.id}>
              <ItemCard name={i.name} rarity={i.rarity} price={i.price} image={i.image} />
              <p className="mt-2 text-sm text-white/45">Шанс: {(i.chanceBps / 100).toFixed(2)}%</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
