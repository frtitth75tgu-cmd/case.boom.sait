import { boom, skins } from "@/data/catalog";

export function LiveDropFeed() {
  const rows = skins.slice(0, 7);

  return (
    <div className="feed-list">
      {rows.map((item, index) => (
        <div className="feed-row" key={item.name}>
          <div className="avatar">{index + 1}</div>
          <div>
            <b>{item.weapon}</b>
            <br />
            <span style={{ color: "var(--muted)", fontSize: 12 }}>{item.finish}</span>
          </div>
          <b style={{ color: "var(--gold)" }}>{item.price.toLocaleString("ru-RU")} {boom.short}</b>
        </div>
      ))}
    </div>
  );
}
