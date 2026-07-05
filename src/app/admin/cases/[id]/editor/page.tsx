import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { config } from "@/lib/config";
import { AdminTable, Th, Td } from "@/components/AdminTable";

export default async function AdminCaseEditorPage({ params }: { params: { id: string } }) {
  const caseItem = await prisma.caseDraft.findUnique({ where: { id: params.id } }).catch(() => null);
  const drops = await prisma.caseDropDraft.findMany({ where: { caseDraftId: params.id }, orderBy: { createdAt: "desc" } }).catch(() => []);
  const meta = await prisma.caseAdminMeta.findUnique({ where: { caseDraftId: params.id } }).catch(() => null);
  const totalChance = drops.reduce((s, d) => s + d.chance, 0);
  const chanceOk = Math.abs(totalChance - 100) < 0.01;

  if (!caseItem) {
    return <main className="page"><div className="panel" style={{ padding: 28 }}>Кейс не найден</div></main>;
  }

  return (
    <main className="page">
      <section className="panel" style={{ padding: 28 }}>
        <p style={{ color: "#ffd45a", fontWeight: 900 }}>Case Editor</p>
        <h1 style={{ fontSize: 44, margin: "6px 0 0", fontWeight: 1000 }}>{caseItem.title}</h1>
        <p style={{ color: "rgba(255,255,255,.58)" }}>Редактирование кейса, оформления, предметов и шансов.</p>
      </section>

      <section className="editor-grid" style={{ marginTop: 18 }}>
        <div className="editor-card">
          <h2 style={{ marginTop: 0 }}>Основные настройки</h2>
          <form action="/api/admin/cases/update" method="post" className="form-grid">
            <input type="hidden" name="caseDraftId" value={caseItem.id} />
            <input className="input" name="title" defaultValue={caseItem.title} placeholder="Название" />
            <input className="input" name="slug" defaultValue={caseItem.slug} placeholder="slug" />
            <select className="input" name="category" defaultValue={caseItem.category}>
              <option value="standard">Обычный</option>
              <option value="free">Бесплатный</option>
              <option value="deposit">За депозит</option>
              <option value="weapon">Оружейный</option>
              <option value="knife">Ножи</option>
              <option value="gloves">Перчатки</option>
              <option value="vip">VIP</option>
            </select>
            <input className="input" name="price" type="number" defaultValue={caseItem.price} />
            <input className="input" name="description" defaultValue={caseItem.description || ""} placeholder="Описание" />
            <input className="input" name="image" defaultValue={caseItem.image || ""} placeholder="URL картинки" />
            <button className="btn">Сохранить</button>
          </form>

          <div className="drop-zone" style={{ marginTop: 16 }}>
            <div>
              <strong>Загрузка картинки кейса</strong>
              <div style={{ marginTop: 6, fontSize: 13 }}>Пока вставляй URL картинки в поле выше. В следующей версии добавим drag-and-drop загрузку файла.</div>
            </div>
          </div>
        </div>

        <aside className="editor-card">
          <h2 style={{ marginTop: 0 }}>Проверка шансов</h2>
          <div className="chance-bar"><span style={{ width: `${Math.min(totalChance, 100)}%` }} /></div>
          <div style={{ marginTop: 12, fontSize: 28, fontWeight: 1000, color: chanceOk ? "#62ff9b" : "#ff4d6d" }}>
            {totalChance.toFixed(2)}%
          </div>
          <p style={{ color: "rgba(255,255,255,.55)" }}>
            {chanceOk ? "Сумма шансов правильная." : "Сумма должна быть ровно 100%."}
          </p>

          <form action="/api/admin/cases/meta" method="post" className="switch-list">
            <input type="hidden" name="caseDraftId" value={caseItem.id} />
            {[
              ["isTop", "TOP кейс", meta?.isTop],
              ["isNew", "NEW кейс", meta?.isNew],
              ["isVip", "VIP кейс", meta?.isVip],
              ["isFree", "Бесплатный", meta?.isFree],
              ["isDeposit", "За депозит", meta?.isDeposit],
            ].map(([key, label, value]) => (
              <label className="switch-row" key={String(key)}>
                <span>{label}</span>
                <input type="checkbox" name={String(key)} defaultChecked={Boolean(value)} />
              </label>
            ))}
            <input className="input" name="accentA" defaultValue={meta?.accentA || "#ffd45a"} placeholder="Цвет 1" />
            <input className="input" name="accentB" defaultValue={meta?.accentB || "#ff8a2a"} placeholder="Цвет 2" />
            <button className="btn">Сохранить оформление</button>
          </form>
        </aside>
      </section>

      <section className="editor-card" style={{ marginTop: 18 }}>
        <h2 style={{ marginTop: 0 }}>Добавить предмет в кейс</h2>
        <form action="/api/admin/cases/drops/add" method="post" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
          <input type="hidden" name="caseDraftId" value={caseItem.id} />
          <input className="input" name="itemName" placeholder="Название предмета" required />
          <select className="input" name="rarity" defaultValue="Mil-Spec">
            <option>Consumer</option>
            <option>Industrial</option>
            <option>Mil-Spec</option>
            <option>Restricted</option>
            <option>Classified</option>
            <option>Covert</option>
            <option>Exotic</option>
          </select>
          <input className="input" name="price" type="number" placeholder="Цена BC" required />
          <input className="input" name="chance" type="number" step="0.01" placeholder="Шанс %" required />
          <input className="input" name="image" placeholder="URL картинки" />
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

      <div style={{ marginTop: 18 }}>
        <Link href="/admin/cases" className="btn secondary">← Назад к кейсам</Link>
      </div>
    </main>
  );
}
