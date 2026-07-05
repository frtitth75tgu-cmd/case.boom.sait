import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  const html = `
<p>Редакция: ${config.docsVersion}. Политика описывает обработку данных пользователя.</p>
<h2>Данные</h2><p>SteamID, никнейм, аватар, IP-адрес, user-agent, согласия, действия на сайте, обращения и сведения о платежных заявках.</p>
<h2>Цели</h2><p>Авторизация, безопасность, работа профиля, поддержка, исполнение соглашения и выполнение требований закона.</p>
<h2>Передача</h2><p>Данные могут передаваться хостингу, платёжным провайдерам, операторам фискализации и государственным органам при наличии оснований.</p>
`.replaceAll("${config.docsVersion}", config.docsVersion).replaceAll("${config.supportUrl}", config.supportUrl);
  return (
    <LegalDoc title="Политика конфиденциальности">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </LegalDoc>
  );
}
