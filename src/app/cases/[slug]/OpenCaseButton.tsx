"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type RouletteItem = {
  name: string;
  image: string | null;
  price: number;
};

export default function OpenCaseButton({
  caseSlug,
  isLoggedIn,
  items = []
}: {
  caseSlug: string;
  isLoggedIn: boolean;
  items?: RouletteItem[];
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const roulette = useMemo(() => {
    const base = items.length ? items : [{ name: "CS2 Skin", image: null, price: 0 }];
    return Array.from({ length: 24 }).map((_, i) => base[i % base.length]);
  }, [items]);

  if (!isLoggedIn) {
    return <Link href="/login" className="btn mt-6">Войти через Steam</Link>;
  }

  async function open() {
    setLoading(true);
    setError("");
    setResult(null);

    const res = await fetch(`/api/cases/${caseSlug}/open`, { method: "POST" });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Ошибка открытия");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setResult(data);
      setLoading(false);
    }, 1200);
  }

  return (
    <div className="mt-6">
      <button onClick={open} disabled={loading} className="btn">
        {loading ? "Открываем..." : "Открыть кейс"}
      </button>

      {loading && (
        <div className="case-roulette relative mx-auto mt-6 max-w-4xl rounded-3xl border border-white/10 bg-bg p-4">
          <div className="absolute left-1/2 top-0 z-10 h-full w-1 -translate-x-1/2 bg-accent shadow-[0_0_30px_#ff8a1c]" />
          <div className="case-roulette-track">
            {roulette.map((item, i) => (
              <div key={i} className="min-w-44 overflow-hidden rounded-2xl border border-white/10 bg-soft">
                {item.image ? <img src={item.image} alt="" className="h-24 w-full object-cover" /> : <div className="h-24" />}
                <div className="truncate p-3 text-sm font-bold">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="mx-auto mt-5 max-w-md rounded-2xl border border-hot/30 bg-hot/10 p-4 text-hot">{error}</div>}

      {result && (
        <div className="mx-auto mt-6 max-w-lg overflow-hidden rounded-3xl border border-accent/30 bg-accent/10">
          {result.item.image && <img src={result.item.image} alt={result.item.name} className="h-56 w-full object-cover" />}
          <div className="p-6">
            <p className="text-white/55">Выпало</p>
            <h3 className="mt-2 text-2xl font-black">{result.item.name}</h3>
            <p className="mt-2 text-accent">{result.item.price} ₽</p>
            <p className="mt-3 text-xs text-white/45">
              Roll: {result.fair.rollBps}/10000 · Hash: {result.fair.serverSeedHash.slice(0, 16)}...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
