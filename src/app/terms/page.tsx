import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  const html = `
<p>Редакция: ${config.docsVersion}. Этот документ — шаблон для РФ и не заменяет консультацию юриста.</p>
<h2>1. Общие положения</h2><p>Сервис предоставляет доступ к веб-платформе с авторизацией через Steam, профилем, кейсами и демонстрационными цифровыми механиками.</p>
<h2>2. Аккаунт</h2><p>Пользователь отвечает за безопасность Steam-аккаунта. Сайт не хранит пароль Steam.</p>
<h2>3. Ограничения</h2><p>Администрация вправе ограничить доступ при нарушениях, подозрении на злоупотребления или требованиях закона.</p>
<h2>4. Платежи</h2><p>Реальные платежи подключаются только через легального провайдера с учетом применимых требований РФ.</p>
`.replaceAll("${config.docsVersion}", config.docsVersion).replaceAll("${config.supportUrl}", config.supportUrl);
  return (
    <LegalDoc title="Пользовательское соглашение">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </LegalDoc>
  );
}
