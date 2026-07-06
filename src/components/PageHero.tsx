export function PageHero({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <span className="badge">{label}</span>
      <h1>{title}</h1>
      <p className="candy-muted">{text}</p>
    </section>
  );
}
