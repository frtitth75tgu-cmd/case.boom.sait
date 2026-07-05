import { config } from "@/lib/config";

const rarityColors: Record<string, string> = {
  Consumer: "#bfc7d5",
  Industrial: "#5fa8ff",
  "Mil-Spec": "#3f6cff",
  Restricted: "#8b5cf6",
  Classified: "#ec4899",
  Covert: "#ff4d6d",
  Exotic: "#ffd45a",
};

export function SkinCard({ name, rarity, price }: { name: string; rarity: string; price: number }) {
  return (
    <div className="skin-card" style={{ ["--rarity" as any]: rarityColors[rarity] || "#ffd45a" }}>
      <div className="skin-image">
        <div style={{ width: 88, height: 30, borderRadius: 999, transform: "rotate(-18deg)", background: "linear-gradient(90deg,#e9eefc,#232b3d 35%,#ffd45a 60%,#ff7a2a)" }} />
      </div>
      <div className="skin-name">{name}</div>
      <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12 }}>{rarity}</div>
      <div className="skin-price">{price.toLocaleString("ru-RU")} {config.boomCoinShort}</div>
    </div>
  );
}
