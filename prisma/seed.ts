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

const cases = [
  {
    slug: "starter",
    title: "Starter Case",
    description: "Недорогой кейс с популярными CS2-скинами.",
    price: 49,
    image: "/cases/starter.svg",
    items: [
      ["USP-S | Cortex", "RARE", 1200, 4200, "/skins/usp-cortex.svg"],
      ["Glock-18 | Water Elemental", "RARE", 1500, 3000, "/skins/glock-water-elemental.svg"],
      ["AK-47 | Redline", "RARE", 2900, 1900, "/skins/ak-redline.svg"],
      ["M4A4 | The Emperor", "EPIC", 3600, 800, "/skins/m4a4-emperor.svg"],
      ["AWP | Hyper Beast", "EPIC", 4800, 100, "/skins/awp-hyper-beast.svg"]
    ]
  },
  {
    slug: "premium",
    title: "Premium Case",
    description: "Кейс с Asiimov, Printstream, Wildfire и редкими предметами.",
    price: 299,
    image: "/cases/pizza.svg",
    items: [
      ["M4A1-S | Hyper Beast", "EPIC", 4200, 3500, "/skins/m4a1-hyper-beast.svg"],
      ["Desert Eagle | Printstream", "EPIC", 5200, 2600, "/skins/deagle-printstream.svg"],
      ["AWP | Wildfire", "MYTHIC", 6200, 2100, "/skins/awp-wildfire.svg"],
      ["AK-47 | Asiimov", "MYTHIC", 7600, 1400, "/skins/ak-asiimov.svg"],
      ["M4A1-S | Printstream", "MYTHIC", 7800, 400, "/skins/m4a1-printstream.svg"]
    ]
  },
  {
    slug: "legendary",
    title: "Legendary Case",
    description: "Дорогие скины, ножи и культовые предметы.",
    price: 999,
    image: "/cases/battle.svg",
    items: [
      ["AWP | Asiimov", "MYTHIC", 11200, 4000, "/skins/awp-asiimov.svg"],
      ["USP-S | Kill Confirmed", "MYTHIC", 12500, 2500, "/skins/usp-kill-confirmed.svg"],
      ["Desert Eagle | Blaze", "LEGENDARY", 68000, 1900, "/skins/deagle-blaze.svg"],
      ["Karambit | Doppler", "LEGENDARY", 145000, 1200, "/skins/knife-karambit-doppler.svg"],
      ["Butterfly Knife | Fade", "LEGENDARY", 280000, 400, "/skins/knife-butterfly-fade.svg"]
    ]
  }
] as const;

async function main() {
  for (const [marketHashName, weapon, skinName, rarity, price, image] of skinCatalog) {
    await prisma.skinCatalogItem.upsert({
      where: { marketHashName },
      update: { weapon, skinName, rarity: rarity as Rarity, price, image, isActive: true },
      create: { marketHashName, weapon, skinName, rarity: rarity as Rarity, price, image, isActive: true }
    });
  }

  for (const c of cases) {
    const created = await prisma.case.upsert({
      where: { slug: c.slug },
      update: { title: c.title, description: c.description, price: c.price, image: c.image, isActive: true },
      create: { slug: c.slug, title: c.title, description: c.description, price: c.price, image: c.image, isActive: true }
    });

    await prisma.caseItem.deleteMany({ where: { caseId: created.id } });

    for (const [name, rarity, price, chanceBps, image] of c.items) {
      await prisma.caseItem.create({
        data: {
          caseId: created.id,
          name,
          rarity: rarity as Rarity,
          price,
          chanceBps,
          image
        }
      });
    }
  }

  await prisma.promoCode.upsert({
    where: { code: "START500" },
    update: {},
    create: { code: "START500", amount: 500, maxUses: 1000 }
  });
}

main().finally(() => prisma.$disconnect());
