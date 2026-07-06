import { boom, cases, skins } from "@/data/catalog";

export function CandyStats() {
  const totalCaseValue = cases.reduce((s, c) => s + c.price, 0);
  const topSkin = [...skins].sort((a, b) => b.price - a.price)[0];

  return (
    <div className="kpi-grid">
      <div className="kpi-card"><b>{cases.length}</b><span>кейсов</span></div>
      <div className="kpi-card"><b>{skins.length}</b><span>предметов внутри режимов</span></div>
      <div className="kpi-card"><b>{totalCaseValue.toLocaleString("ru-RU")}</b><span>суммарная цена кейсов {boom.short}</span></div>
      <div className="kpi-card"><b>{topSkin.price.toLocaleString("ru-RU")}</b><span>топ-дроп {boom.short}</span></div>
    </div>
  );
}
