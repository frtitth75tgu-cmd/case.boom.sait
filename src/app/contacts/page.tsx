import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  const html = `
<p>Поддержка: <a className="text-ice" href="${config.supportUrl}">${config.supportUrl}</a></p>
<p>Перед реальным запуском сюда нужно добавить реквизиты ИП/ООО, адрес для претензий и email поддержки.</p>
`.replaceAll("${config.docsVersion}", config.docsVersion).replaceAll("${config.supportUrl}", config.supportUrl);
  return (
    <LegalDoc title="Контакты">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </LegalDoc>
  );
}
