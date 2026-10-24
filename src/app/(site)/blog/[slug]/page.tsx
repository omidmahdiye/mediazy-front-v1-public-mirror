import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, Link2, Send, AtSign, Globe } from "lucide-react";
import { articles, getArticle, getInstructor } from "@/lib/data";
import { Breadcrumbs, Num, Avatar, DataIcon, SectionHeader } from "@/components/ui";
import { ArticleCard } from "@/components/cards";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const author = getInstructor(article.author)!;
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div className="container-site section-pad">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: "مقالات", href: "/blog" }, { label: article.title }]} />
        <span className="badge badge-primary">{article.category}</span>
        <h1 className="mt-4 text-2xl font-extrabold text-balance text-slate-900 md:text-4xl">{article.title}</h1>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Avatar initials={author.initials} color={author.avatarColor} size="sm" />
            <span className="font-medium text-slate-600">{author.name}</span>
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
            <Num>{article.date}</Num>
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            <Num>{article.readTime}</Num> دقیقه مطالعه
          </span>
        </div>

        {/* hero visual */}
        <div className={`relative mt-8 aspect-[21/9] overflow-hidden rounded-(--radius-modal) ${article.color}`}>
          <span className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-white/10" aria-hidden="true" />
          <span className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-black/10" aria-hidden="true" />
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <DataIcon name={article.icon} className="h-14 w-14 text-white/80" strokeWidth={1} />
          </span>
        </div>

        {/* body */}
        <div className="prose-fa mt-10 text-base leading-9">
          <p>{article.excerpt}</p>
          <h2>چرا این موضوع اهمیت دارد؟</h2>
          <p>
            داده‌های سال <Num>2025</Num> نشان می‌دهد یادگیرنده‌هایی که مسیر مشخص دارند، <Num>3</Num> برابر بیشتر از
            دیگران دوره‌های خود را تمام می‌کنند. اما مسیر مشخص به معنای فهرست بلندبالای منابع نیست؛ به معنای
            انتخاب آگاهانه و حذف جسورانه است.
          </p>
          <blockquote>یادگیری موثر یعنی نه گفتن به ده‌ها منبع خوب، برای وفادار ماندن به یک منبع عالی.</blockquote>
          <h2>سه گام عملی برای شروع</h2>
          <ul>
            <li>هدف شش‌ماهه خود را در یک جمله بنویسید و آن را جایی در معرض دید بگذارید.</li>
            <li>فقط یک دوره اصلی انتخاب کنید و تا پایان آن، منبع جدیدی باز نکنید.</li>
            <li>هر هفته <Num>30</Num> دقیقه آموخته‌هایتان را برای خودتان بازگو یا مکتوب کنید.</li>
          </ul>
          <p>
            در دانش‌آرا این مسیرها را به شکل «نقشه یادگیری» طراحی کرده‌ایم؛ مجموعه‌ای مرتب از دوره‌ها که شما را از
            نقطه صفر به سطح قابل استخدام می‌رساند. پیشنهاد می‌کنیم از صفحه دوره‌ها شروع کنید.
          </p>
        </div>

        {/* share */}
        <div className="mt-10 flex items-center gap-3 border-y border-slate-200 py-5">
          <span className="text-xs font-medium text-slate-500">اشتراک‌گذاری:</span>
          {[
            { icon: Link2, label: "کپی لینک" },
            { icon: Send, label: "تلگرام" },
            { icon: AtSign, label: "اینستاگرام" },
            { icon: Globe, label: "لینکدین" },
          ].map(({ icon: Icon, label }) => (
            <button key={label} type="button" aria-label={label} className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-700">
              <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* author box */}
        <div className="card mt-8 flex flex-col gap-5 p-6 sm:flex-row">
          <Avatar initials={author.initials} color={author.avatarColor} size="lg" />
          <div>
            <p className="text-xs text-slate-400">نویسنده</p>
            <h2 className="mt-1 text-base font-bold text-slate-900">{author.name}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{author.bio}</p>
            <Link href={`/instructors/${author.slug}`} className="mt-3 inline-block text-xs font-medium text-primary-700 hover:text-primary-800">
              مشاهده پروفایل و دوره‌ها
            </Link>
          </div>
        </div>
      </div>

      {/* related */}
      <div className="mx-auto mt-16 max-w-5xl">
        <SectionHeader title="مقالات مرتبط" href="/blog" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </div>
    </div>
  );
}
