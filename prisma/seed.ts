import { PrismaClient, Rarity } from "@prisma/client";

const prisma = new PrismaClient();

const skinCatalog = [
  ["AK-47 | Redline", "AK-47", "Redline", "RARE", 2900, "/skins/ak-redline.svg"],
  ["AK-47 | Asiimov", "AK-47", "Asiimov", "MYTHIC", 7600, "/skins/ak-asiimov.svg"],
  ["AK-47 | Vulcan", "AK-47", "Vulcan", "MYTHIC", 9400, "/skins/ak-vulcan.svg"],
  ["AK-47 | Fire Serpent", "AK-47", "Fire Serpent", "LEGENDARY", 165000, "/skins/ak-fire-serpent.svg"],
  ["AWP | Asiimov", "AWP", "Asiimov", "MYTHIC", 11200, "/skins/awp-asiimov.svg"],
  ["AWP | Dragon Lore", "AWP", "Dragon Lore", "LEGENDARY", 950000, "/skins/awp-dragon-lore.svg"],
  ["AWP | Wildfire", "AWP", "Wildfire", "MYTHIC", 6200, "/skins/awp-wildfire.svg"],
  ["AWP | Hyper Beast", "AWP", "Hyper Beast", "EPIC", 4800, "/skins/awp-hyper-beast.svg"],
  ["M4A1-S | Printstream", "M4A1-S", "Printstream", "MYTHIC", 7800, "/skins/m4a1-printstream.svg"],
  ["M4A1-S | Hyper Beast", "M4A1-S", "Hyper Beast", "EPIC", 4200, "/skins/m4a1-hyper-beast.svg"],
  ["M4A4 | Howl", "M4A4", "Howl", "LEGENDARY", 450000, "/skins/m4a4-howl.svg"],
  ["M4A4 | The Emperor", "M4A4", "The Emperor", "EPIC", 3600, "/skins/m4a4-emperor.svg"],
  ["USP-S | Kill Confirmed", "USP-S", "Kill Confirmed", "MYTHIC", 12500, "/skins/usp-kill-confirmed.svg"],
  ["USP-S | Cortex", "USP-S", "Cortex", "RARE", 1200, "/skins/usp-cortex.svg"],
  ["Desert Eagle | Blaze", "Desert Eagle", "Blaze", "LEGENDARY", 68000, "/skins/deagle-blaze.svg"],
  ["Desert Eagle | Printstream", "Desert Eagle", "Printstream", "EPIC", 5200, "/skins/deagle-printstream.svg"],
  ["Glock-18 | Fade", "Glock-18", "Fade", "LEGENDARY", 210000, "/skins/glock-fade.svg"],
  ["Glock-18 | Water Elemental", "Glock-18", "Water Elemental", "RARE", 1500, "/skins/glock-water-elemental.svg"],
  ["Karambit | Doppler", "Karambit", "Doppler", "LEGENDARY", 145000, "/skins/knife-karambit-doppler.svg"],
  ["Butterfly Knife | Fade", "Butterfly Knife", "Fade", "LEGENDARY", 280000, "/skins/knife-butterfly-fade.svg"]
] as const;

const baseItems = [
  ["USP-S | Cortex", "RARE", 1200, 3600, "/skins/usp-cortex.svg"],
  ["Glock-18 | Water Elemental", "RARE", 1500, 2600, "/skins/glock-water-elemental.svg"],
  ["AK-47 | Redline", "RARE", 2900, 1700, "/skins/ak-redline.svg"],
  ["M4A4 | The Emperor", "EPIC", 3600, 1100, "/skins/m4a4-emperor.svg"],
  ["AWP | Hyper Beast", "EPIC", 4800, 700, "/skins/awp-hyper-beast.svg"],
  ["Desert Eagle | Printstream", "EPIC", 5200, 200, "/skins/deagle-printstream.svg"],
  ["AWP | Wildfire", "MYTHIC", 6200, 100, "/skins/awp-wildfire.svg"]
] as const;

const premiumItems = [
  ["M4A1-S | Hyper Beast", "EPIC", 4200, 3000, "/skins/m4a1-hyper-beast.svg"],
  ["Desert Eagle | Printstream", "EPIC", 5200, 2400, "/skins/deagle-printstream.svg"],
  ["AWP | Wildfire", "MYTHIC", 6200, 1900, "/skins/awp-wildfire.svg"],
  ["AK-47 | Asiimov", "MYTHIC", 7600, 1500, "/skins/ak-asiimov.svg"],
  ["M4A1-S | Printstream", "MYTHIC", 7800, 800, "/skins/m4a1-printstream.svg"],
  ["USP-S | Kill Confirmed", "MYTHIC", 12500, 300, "/skins/usp-kill-confirmed.svg"],
  ["Desert Eagle | Blaze", "LEGENDARY", 68000, 100, "/skins/deagle-blaze.svg"]
] as const;

const vaultItems = [
  ["AWP | Asiimov", "MYTHIC", 11200, 3500, "/skins/awp-asiimov.svg"],
  ["USP-S | Kill Confirmed", "MYTHIC", 12500, 2200, "/skins/usp-kill-confirmed.svg"],
  ["Desert Eagle | Blaze", "LEGENDARY", 68000, 1800, "/skins/deagle-blaze.svg"],
  ["Karambit | Doppler", "LEGENDARY", 145000, 1300, "/skins/knife-karambit-doppler.svg"],
  ["Butterfly Knife | Fade", "LEGENDARY", 280000, 700, "/skins/knife-butterfly-fade.svg"],
  ["M4A4 | Howl", "LEGENDARY", 450000, 400, "/skins/m4a4-howl.svg"],
  ["AWP | Dragon Lore", "LEGENDARY", 950000, 100, "/skins/awp-dragon-lore.svg"]
] as const;

const names = [
  "Rookie", "Carbon", "Inferno", "Eclipse", "Titan", "Phantom", "Legacy", "Diamond", "Royal", "Emperor",
  "Aurora", "Glacier", "Venom", "Volcano", "Mirage", "Frost", "Storm", "Eclipse X", "Black Gold", "Infinity",
  "Neon", "Cyber", "Shadow", "Dragon", "Universe", "Crimson", "Nightmare", "Omega", "Pulse", "Reactor",
  "Raptor", "Hunter", "Toxic", "Quartz", "Nova", "Spectre", "Vortex", "Blizzard", "Solar", "Comet",
  "Samurai", "Ronin", "Jungle", "Desert", "Ocean", "Phoenix", "Wolf", "Cobra", "Falcon", "Viper",
  "Mercury", "Platinum", "Obsidian", "Sapphire", "Ruby", "Emerald", "Onyx", "Chrome", "Nitro", "Overdrive",
  "Boost", "Rush", "Clutch", "Ace", "Headshot", "Defuse", "Plant", "Smoke", "Flash", "Molly",
  "Dust", "Inferno Map", "Nuke", "Ancient", "Vertigo", "Overpass", "Anubis", "Cache", "Train", "Cobblestone",
  "Knife Dream", "Glove Dream", "AWP Master", "AK Master", "M4 Master", "Pistol King", "Covert", "Classified", "Rare Special", "Collector",
  "Diamond Vault", "Emperor Vault", "Legacy Vault", "Millionaire", "Boss", "Elite", "Grand", "Prime", "Myth", "Final"
];

function caseImage(i: number) {
  return i % 3 === 0 ? "/cases/starter.svg" : i % 3 === 1 ? "/cases/pizza.svg" : "/cases/battle.svg";
}

function priceFor(i: number) {
  if (i === 0) return 0;
  if (i < 25) return 25 + i * 25;
  if (i < 60) return 700 + (i - 25) * 110;
  if (i < 90) return 5000 + (i - 60) * 900;
  return [50000, 100000, 150000, 250000, 500000, 750000, 1000000, 1250000, 1500000, 2000000][i - 90] || 50000;
}

async function main() {
  for (const [marketHashName, weapon, skinName, rarity, price, image] of skinCatalog) {
    await prisma.skinCatalogItem.upsert({
      where: { marketHashName },
      update: { weapon, skinName, rarity: rarity as Rarity, price, image, isActive: true },
      create: { marketHashName, weapon, skinName, rarity: rarity as Rarity, price, image, isActive: true }
    });
  }

  for (let i = 0; i < names.length; i++) {
    const price = priceFor(i);
    const title = `${names[i]} Case`;
    const slug = names[i].toLowerCase().replaceAll(" ", "-") + "-case";
    const description = price === 0
      ? "Бесплатный кейс для бонусной системы CaseBoom."
      : price >= 50000
        ? "Дорогой Vault-кейс с редкими предметами, ножами и дорогими дропами."
        : price > 5000
          ? "Премиум-кейс с повышенным шансом на редкие предметы."
          : "Кейс с предметами разных редкостей и прозрачными шансами.";

    const created = await prisma.case.upsert({
      where: { slug },
      update: { title, description, price, image: caseImage(i), isActive: true },
      create: { slug, title, description, price, image: caseImage(i), isActive: true }
    });

    await prisma.caseItem.deleteMany({ where: { caseId: created.id } });
    const items = price >= 50000 ? vaultItems : price > 5000 ? premiumItems : baseItems;

    for (const [name, rarity, itemPrice, chanceBps, image] of items) {
      await prisma.caseItem.create({
        data: { caseId: created.id, name, rarity: rarity as Rarity, price: itemPrice, chanceBps, image }
      });
    }
  }

  await prisma.promoCode.upsert({
    where: { code: "START500" },
    update: { amount: 500, maxUses: 1000, isActive: true },
    create: { code: "START500", amount: 500, maxUses: 1000 }
  });

  await prisma.promoCode.upsert({
    where: { code: "BOOM2026" },
    update: { amount: 2026, maxUses: 500, isActive: true },
    create: { code: "BOOM2026", amount: 2026, maxUses: 500 }
  });
}

main().finally(() => prisma.$disconnect());
