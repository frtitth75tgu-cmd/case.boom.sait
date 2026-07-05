import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  const html = `
<p>Используйте сервис осознанно. Не тратьте средства, которые нужны для жизни, учебы, семьи или обязательных платежей.</p>
<h2>Самоограничения</h2><p>Для реального запуска рекомендуется добавить лимиты пополнения, паузы аккаунта и самоисключение.</p>
<h2>Возраст</h2><p>Только 18+.</p>
`.replaceAll("${config.docsVersion}", config.docsVersion).replaceAll("${config.supportUrl}", config.supportUrl);
  return (
    <LegalDoc title="Ответственное использование">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </LegalDoc>
  );
}
