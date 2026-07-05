import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { AdminTable, Th, Td } from "@/components/AdminTable";

export default async function AdminPromocodesPage() {
  const codes = await prisma.promoCode.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 44, margin: 0, fontWeight: 1000 }}>Промокоды</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Создание кодов на Boom Coins, бонусы и акции.</p>
      </section>

      <section className="panel" style={{ padding: 18, marginTop: 18 }}>
        <form action="/api/admin/promocodes/create" method="post" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          <input className="input" name="code" placeholder="CASEBOOM2026" required />
          <select className="input" name="type"><option value="COINS">COINS</option><option value="CASE">CASE</option></select>
          <input className="input" name="amount" type="number" placeholder="Сумма" required />
          <input className="input" name="maxUses" type="number" placeholder="Кол-во активаций" defaultValue="1" />
          <button className="btn">Создать</button>
        </form>
      </section>

      <section style={{ marginTop: 18 }}>
        <AdminTable>
          <thead><tr><Th>Код</Th><Th>Тип</Th><Th>Сумма</Th><Th>Использовано</Th><Th>Статус</Th></tr></thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.id}><Td>{c.code}</Td><Td>{c.type}</Td><Td>{c.amount} {config.boomCoinShort}</Td><Td>{c.usedCount}/{c.maxUses}</Td><Td>{c.isActive ? "Активен" : "Выключен"}</Td></tr>
            ))}
          </tbody>
        </AdminTable>
      </section>
    </main>
  );
}
