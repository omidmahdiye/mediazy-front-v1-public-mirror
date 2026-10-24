import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock, ChevronRight, ChevronLeft, Mail } from "lucide-react";
import { articles, getInstructor } from "@/lib/data";
import { PageHeader, Num, Avatar, DataIcon } from "@/components/ui";
import { ArticleCard } from "@/components/cards";

export const metadata: Metadata = { title: "مقالات" };

export default function BlogPage() {
  const [featured, ...rest] = articles;
  const author = getInstructor(featured.author)!;

  return (
    <>
      <PageHeader
        title="مقالات"
        description="راهنماها، تحلیل‌ها و تجربه‌های واقعی درباره یادگیری موثر و مسیر شغلی."
        crumbs={[{ label: "صفحه اصلی", href: "/" }, { label: "مقالات" }]}
      />

      <div className="container-site section-pad">
        {/* Featured */}
        <article className="card card-hover group relative mb-10 overflow-hidden lg:grid lg:grid-cols-2">
          <Link href={`/blog/${featured.slug}`} className="absolute inset-0 z-10" aria-label={featured.title} />
          <div className={`relative aspect-video overflow-hidden lg:aspect-auto lg:min-h-[320px] ${featured.color}`}>
            <span className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
            <span className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-black/10" aria-hidden="true" />
            <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <DataIcon name={featured.icon} className="h-14 w-14 text-white/80" strokeWidth={1} />
            </span>
          </div>
          <div className="flex flex-col justify-center p-6 lg:p-10">
            <span className="badge badge-primary w-fit">{featured.category}</span>
            <h2 className="mt-3 text-xl font-extrabold text-slate-900 transition-colors group-hover:text-primary-700 md:text-2xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Avatar initials={author.initials} color={author.avatarColor} size="sm" />
                {author.name}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                <Num>{featured.date}</Num>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <Num>{featured.readTime}</Num> دقیقه مطالعه
              </span>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Articles */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            {/* pagination */}
            <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="صفحه‌بندی مقالات">
              <button type="button" aria-label="صفحه قبل" className="btn btn-outline btn-icon h-10 w-10" disabled>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              {[1, 2, 3].map((n) => (
                <button key={n} type="button" aria-current={n === 1 ? "page" : undefined} className={`btn btn-icon h-10 w-10 text-sm ${n === 1 ? "btn-primary" : "btn-outline"}`}>
                  <Num>{n}</Num>
                </button>
              ))}
              <button type="button" aria-label="صفحه بعد" className="btn btn-outline btn-icon h-10 w-10">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
            </nav>
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="card p-5">
              <h2 className="mb-4 text-sm font-extrabold text-slate-900">دسته‌بندی‌ها</h2>
              <ul className="space-y-2 text-sm">
                {["مهارت یادگیری", "برنامه‌نویسی", "طراحی", "هوش مصنوعی", "بهره‌وری"].map((c, i) => (
                  <li key={c} className="flex items-center justify-between">
                    <Link href="#" className="text-slate-600 transition-colors hover:text-primary-700">{c}</Link>
                    <Num className="text-xs text-slate-400">{12 - i * 2}</Num>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-5">
              <h2 className="mb-4 text-sm font-extrabold text-slate-900">پربازدیدترین‌ها</h2>
              <ul className="space-y-4">
                {articles.slice(0, 3).map((a, i) => (
                  <li key={a.slug} className="flex gap-3">
                    <Num className="text-lg font-black text-slate-200">{i + 1}</Num>
                    <Link href={`/blog/${a.slug}`} className="line-clamp-2 text-xs leading-5 font-medium text-slate-600 transition-colors hover:text-primary-700">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card bg-primary-950 p-5">
              <Mail className="h-6 w-6 text-accent-400" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="mt-3 text-sm font-extrabold text-white">خبرنامه دانش‌آرا</h2>
              <p className="mt-1.5 text-xs leading-6 text-primary-200">هر هفته یک ایمیل کوتاه با بهترین مقالات و دوره‌های جدید.</p>
              <form className="mt-4 space-y-2">
                <label htmlFor="newsletter-email" className="sr-only">ایمیل</label>
                <input id="newsletter-email" type="email" dir="ltr" placeholder="you@example.com" className="input h-10 border-primary-800 bg-primary-900 text-left text-white placeholder:text-primary-400" />
                <button type="submit" className="btn btn-accent btn-md w-full">عضویت</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
