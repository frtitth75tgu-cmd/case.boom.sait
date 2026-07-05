import { LegalDoc } from "@/components/LegalDoc";
import { config } from "@/lib/config";

export default function Page() {
  const html = `
<p>Текущая версия использует демонстрационные платежи. Реальные списания отключены.</p>
<h2>Провайдеры</h2><p>Для реального запуска может использоваться ЮKassa, Robokassa, CloudPayments или другой провайдер после договора и проверки проекта.</p>
<h2>Фискализация</h2><p>При реальных расчетах требуется корректно обеспечить чеки и выполнение применимых требований РФ.</p>
<h2>Возвраты</h2><p>Порядок возврата зависит от правовой природы услуги или цифрового товара и должен быть согласован с юристом.</p>
`.replaceAll("${config.docsVersion}", config.docsVersion).replaceAll("${config.supportUrl}", config.supportUrl);
  return (
    <LegalDoc title="Условия платежей">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </LegalDoc>
  );
}
