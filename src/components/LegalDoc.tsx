export function LegalDoc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <article className="card p-8 leading-7 text-white/75">
        <h1 className="mb-6 text-4xl font-black text-white">{title}</h1>
        <div className="space-y-5">{children}</div>
      </article>
    </main>
  );
}
