import { PageHeader, Num } from "@/components/ui";

export type LegalSection = { id: string; title: string; body: string[] };

export default function LegalPage({
  title,
  updated,
  sections,
  crumbLabel,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
  crumbLabel: string;
}) {
  return (
    <>
      <PageHeader
        title={title}
        description={
          <>
            آخرین به‌روزرسانی: <Num>{updated}</Num>
          </>
        }
        crumbs={[{ label: "صفحه اصلی", href: "/" }, { label: crumbLabel }]}
      />
      <div className="container-site section-pad grid grid-cols-1 gap-10 lg:grid-cols-4">
        <nav aria-label="فهرست مطالب" className="order-1 hidden lg:block">
          <div className="sticky top-24 card p-5">
            <h2 className="mb-4 text-sm font-extrabold text-slate-900">فهرست مطالب</h2>
            <ol className="space-y-2.5 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-2 text-slate-500 transition-colors hover:text-primary-700">
                    <Num className="text-xs text-slate-300">{i + 1}</Num>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
        <article className="order-2 lg:col-span-3">
          <div className="card p-6 md:p-10">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className={i > 0 ? "mt-10 scroll-mt-24" : "scroll-mt-24"}>
                <h2 className="flex items-baseline gap-2 text-lg font-extrabold text-slate-900">
                  <Num className="text-sm text-primary-600">{i + 1}.</Num>
                  {s.title}
                </h2>
                {s.body.map((p, j) => (
                  <p key={j} className="mt-3 text-sm leading-8 text-slate-600">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </div>
    </>
  );
}
