import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { AdminTable, Th, Td } from "@/components/AdminTable";

export default async function AdminBonusRulesPage() {
  const rules = await prisma.bonusRule.findMany({ orderBy: { createdAt: "desc" } }).catch(() => []);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <h1 style={{ fontSize: 44, margin: 0, fontWeight: 1000 }}>Бонусные правила</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Daily, weekly, депозитные и уровневые бонусы.</p>
      </section>

      <section className="panel" style={{ padding: 18, marginTop: 18 }}>
        <form action="/api/admin/bonus-rules/create" method="post" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          <input className="input" name="key" placeholder="daily_bonus" required />
          <input className="input" name="title" placeholder="Daily Bonus" required />
          <input className="input" name="amount" type="number" placeholder="Сумма BC" required />
          <input className="input" name="cooldownHours" type="number" placeholder="Кулдаун часы" defaultValue="24" />
          <button className="btn">Создать</button>
        </form>
      </section>

      <section style={{ marginTop: 18 }}>
        <AdminTable>
          <thead><tr><Th>Ключ</Th><Th>Название</Th><Th>Сумма</Th><Th>Кулдаун</Th><Th>Статус</Th></tr></thead>
          <tbody>
            {rules.map((r) => (
              <tr key={r.id}><Td>{r.key}</Td><Td>{r.title}</Td><Td>{r.amount} {config.boomCoinShort}</Td><Td>{r.cooldownHours} ч.</Td><Td>{r.isActive ? "Активен" : "Выключен"}</Td></tr>
            ))}
          </tbody>
        </AdminTable>
      </section>
    </main>
  );
}
