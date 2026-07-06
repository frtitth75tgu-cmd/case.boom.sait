import { PageHero } from "@/components/PageHero";
import { UpgradeProClient } from "@/components/UpgradeProClient";

export default function Upgrade() {
  return (
    <main className="page">
      <PageHero
        label="Upgrade"
        title="Апгрейд"
        text="Настраиваемый шанс, кнопка «Крутить», выбор цели и быстрый режим апгрейда."
      />

      <section className="section">
        <UpgradeProClient />
      </section>
    </main>
  );
}
