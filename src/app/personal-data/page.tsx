import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  const html = `
<p>Пользователь дает согласие на обработку персональных данных для работы сервиса.</p>
<h2>Состав данных</h2><p>SteamID, никнейм, аватар, IP, user-agent, дата согласия, история действий, обращения и сведения о платежных заявках.</p>
<h2>Действия</h2><p>Сбор, запись, хранение, уточнение, использование, передача в необходимых случаях, блокирование и удаление.</p>
<h2>Отзыв</h2><p>Согласие можно отозвать через поддержку, при этом доступ к части функций может быть ограничен.</p>
`.replaceAll("${config.docsVersion}", config.docsVersion).replaceAll("${config.supportUrl}", config.supportUrl);
  return (
    <LegalDoc title="Согласие на обработку персональных данных">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </LegalDoc>
  );
}
