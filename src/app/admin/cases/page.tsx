import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";

export default async function AdminCasesPage() {
  const cases = await prisma.caseDraft.findMany({ orderBy: { createdAt: "desc" }, take: 100 }).catch(() => []);

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Case Manager</p>
        <h1 style={{ fontSize: 44, margin: "6px 0 0", fontWeight: 1000 }}>Редактор кейсов</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Создавай кейсы, открывай редактор, добавляй предметы и проверяй шансы.</p>
      </section>

      <section className="editor-card" style={{ marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Быстро создать кейс</h2>
        <form action="/api/admin/cases/create" method="post" className="form-grid">
          <input className="input" name="title" placeholder="Название: Diamond Vault" required />
          <input className="input" name="slug" placeholder="slug: diamond-vault" required />
          <select className="input" name="category" defaultValue="standard">
            <option value="standard">Обычный</option>
            <option value="free">Бесплатный</option>
            <option value="deposit">За депозит</option>
            <option value="weapon">Оружейный</option>
            <option value="knife">Ножи</option>
            <option value="gloves">Перчатки</option>
            <option value="vip">VIP</option>
          </select>
          <input className="input" name="price" type="number" placeholder="Цена BC" required />
          <button className="btn">Создать кейс</button>
        </form>
      </section>

      <section className="case-section">
        <div className="section-head"><h2>Список кейсов</h2></div>
        <div className="case-row-grid">
          {cases.length ? cases.map((c) => (
            <Link key={c.id} href={`/admin/cases/${c.id}/editor`} className="case-card case-wide">
              <div>
                <span className="status-pill">{c.category}</span>
                <h3 style={{ fontSize: 24 }}>{c.title}</h3>
                <p style={{ color: "rgba(255,255,255,.55)" }}>Цена: {c.price} {config.boomCoinShort}</p>
                <p style={{ color: c.isActive ? "#62ff9b" : "#ff4d6d", fontWeight: 900 }}>{c.isActive ? "Активен" : "Выключен"}</p>
              </div>
              <div className="case-wide-art"><div className="case-box" /></div>
            </Link>
          )) : (
            <div className="panel" style={{ padding: 22, color: "rgba(255,255,255,.55)" }}>Кейсов пока нет. Создай первый кейс выше.</div>
          )}
        </div>
      </section>
    </main>
  );
}
