import { Rarity } from "@prisma/client";

const labels: Record<Rarity, string> = {
  COMMON: "Обычный",
  UNCOMMON: "Необычный",
  RARE: "Редкий",
  EPIC: "Эпический",
  MYTHIC: "Мифический",
  LEGENDARY: "Легендарный"
};

export function ItemCard({
  name,
  rarity,
  price,
  image
}: {
  name: string;
  rarity: Rarity;
  price: number;
  image?: string | null;
}) {
  return (
    <div className={`card rarity-${rarity.toLowerCase()} overflow-hidden border-l-4`}>
      <div className="skin-image flex h-32 items-center justify-center">
        {image ? <img src={image} alt={name} className="h-full w-full object-cover" /> : <span className="text-4xl">🔫</span>}
      </div>
      <div className="p-4">
        <div className="text-sm text-white/50">{labels[rarity]}</div>
        <div className="mt-1 font-bold">{name}</div>
        <div className="mt-3 text-accent">{price} ₽</div>
      </div>
    </div>
  );
}
