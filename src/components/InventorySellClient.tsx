"use client";

import { useMemo, useState } from "react";
import { boom, Skin } from "@/data/catalog";
import { SkinCard } from "@/components/Visuals";

export function InventorySellClient({ items }: { items: Skin[] }) {
  const [balance, setBalance] = useState(15450);
  const [sold, setSold] = useState<Record<string, boolean>>({});

  const activeItems = useMemo(() => items, [items]);

  function sell(item: Skin) {
    if (sold[item.name]) return;
    setSold((prev) => ({ ...prev, [item.name]: true }));
    setBalance((prev) => prev + item.price);
  }

  return (
    <>
      <div className="balance-pill">
        Баланс: {balance.toLocaleString("ru-RU")} {boom.short}
      </div>

      <div className="grid" style={{ marginTop: 14 }}>
        {activeItems.map((item) => (
          <div key={item.name} style={{ opacity: sold[item.name] ? .45 : 1 }}>
            <SkinCard item={item} />
            <div className="item-actions">
              <a href="/upgrade">Апгрейд</a>
              <a href="/deposit-skins">Заявка</a>
            </div>
            <div style={{ marginTop: 8 }}>
              <button className="sell-action" disabled={sold[item.name]} onClick={() => sell(item)}>
                {sold[item.name]
                  ? "Продано"
                  : `Продать за ${item.price.toLocaleString("ru-RU")} ${boom.short}`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
