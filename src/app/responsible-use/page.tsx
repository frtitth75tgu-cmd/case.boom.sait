import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  return (
    <LegalDoc title="Ответственное использование">
      <p>CaseBoom рассчитан на совершеннолетних пользователей. Не используйте сервис, если игровые механики вызывают у вас потерю контроля, стресс или финансовые проблемы.</p>
      <h2>Рекомендации</h2>
      <ul>
        <li>заранее устанавливайте личный лимит активности;</li>
        <li>не используйте заемные средства;</li>
        <li>делайте перерывы;</li>
        <li>обращайтесь в поддержку, если хотите ограничить доступ к аккаунту.</li>
      </ul>
      <p>Поддержка: <a href={config.supportUrl}>{config.supportUrl}</a>.</p>
    </LegalDoc>
  );
}
