import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { AdminTable, Th, Td } from "@/components/AdminTable";

export default async function AdminCaseDropsPage({ params }: { params: { id: string } }) {
  const caseItem = await prisma.caseDraft.findUnique({ where: { id: params.id } }).catch(() => null);
  const drops = await prisma.caseDropDraft.findMany({ where: { caseDraftId: params.id }, orderBy: { createdAt: "desc" } }).catch(() => []);
  const totalChance = drops.reduce((s, d) => s + d.chance, 0);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 42, margin: 0, fontWeight: 1000 }}>{caseItem?.title || "Кейс"}</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Предметы и шансы. Сумма шансов: {totalChance.toFixed(2)}%</p>
      </section>

      <section className="panel" style={{ padding: 18, marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Добавить предмет</h2>
        <form action="/api/admin/cases/drops/add" method="post" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          <input type="hidden" name="caseDraftId" value={params.id} />
          <input className="input" name="itemName" placeholder="Название предмета" required />
          <input className="input" name="rarity" placeholder="Редкость" defaultValue="Mil-Spec" />
          <input className="input" name="price" type="number" placeholder="Цена BC" required />
          <input className="input" name="chance" type="number" step="0.01" placeholder="Шанс %" required />
          <input className="input" name="image" placeholder="Картинка URL" />
          <button className="btn">Добавить</button>
        </form>
      </section>

      <section style={{ marginTop: 18 }}>
        <AdminTable>
          <thead><tr><Th>Предмет</Th><Th>Редкость</Th><Th>Цена</Th><Th>Шанс</Th></tr></thead>
          <tbody>
            {drops.map((d) => (
              <tr key={d.id}>
                <Td>{d.itemName}</Td>
                <Td>{d.rarity}</Td>
                <Td>{d.price} {config.boomCoinShort}</Td>
                <Td>{d.chance}%</Td>
              </tr>
            ))}
          </tbody>
        </AdminTable>
      </section>
    </main>
  );
}
