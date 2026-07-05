import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  const html = `
<p>Редакция: ${config.docsVersion}. Правила являются частью пользовательского соглашения.</p>
<h2>Возраст</h2><p>Сервис предназначен только для пользователей 18+.</p>
<h2>Запреты</h2><p>Запрещены мультиаккаунты, попытки взлома, автоматизация, использование чужих аккаунтов, мошенничество, обход ограничений и нарушение законодательства РФ.</p>
<h2>Предметы и баланс</h2><p>В текущей версии баланс и предметы являются демонстрационными. Реальные платежи и ценность подключаются только после юридической проверки.</p>
`.replaceAll("${config.docsVersion}", config.docsVersion).replaceAll("${config.supportUrl}", config.supportUrl);
  return (
    <LegalDoc title="Правила сайта">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </LegalDoc>
  );
}
