import Link from "next/link";
import {
  PlayCircle,
  CheckCircle2,
  Star,
  Users,
  PlaySquare,
  ThumbsUp,
  Mic,
  Captions,
  BadgeCheck,
  ChevronLeft,
} from "lucide-react";
import { categories, courses, instructors, testimonials, articles } from "@/lib/data";
import { DataIcon, Num, SectionHeader, Avatar } from "@/components/ui";
import { CourseCard, ArticleCard, InstructorCard } from "@/components/cards";
import { ChipTabs } from "@/components/interactive";

const stats = [
  { icon: PlaySquare, value: "350+", label: "دوره آموزشی" },
  { icon: Users, value: "12,000+", label: "دانشجوی فعال" },
  { icon: Mic, value: "180+", label: "دوره دوبله‌شده" },
  { icon: ThumbsUp, value: "98%", label: "رضایت کاربران" },
];

function HeroMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-lg rounded-(--radius-modal) border border-slate-200 bg-white shadow-(--shadow-modal)"
      aria-hidden="true"
    >
      {/* browser chrome */}
      <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
        <span className="mr-3 h-6 flex-1 rounded-full bg-slate-100" />
      </div>
      {/* player area */}
      <div className="p-4">
        <div className="relative aspect-video overflow-hidden rounded-(--radius-card) bg-primary-950">
          <span className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary-800/60" />
          <span className="absolute -right-12 -bottom-14 h-48 w-48 rounded-full bg-primary-900" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-(--shadow-float)">
              <PlayCircle className="h-8 w-8 text-primary-700" strokeWidth={1.5} />
            </span>
          </span>
          {/* control bar */}
          <div className="absolute inset-x-3 bottom-3 rounded-lg bg-black/40 px-3 py-2 backdrop-blur-sm">
            <div className="h-1 w-full rounded-full bg-white/25">
              <div className="h-full w-2/3 rounded-full bg-accent-400" />
            </div>
            <div className="mt-2 flex items-center justify-between" dir="ltr">
              <span className="text-[10px] font-medium text-white/80">14:32 / 22:08</span>
              <div className="flex items-center gap-2">
                <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-bold text-white">FA دوبله</span>
                <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-bold text-white">زیرنویس</span>
                <span className="rounded bg-white/15 px-1.5 py-0.5 text-[9px] font-bold text-white">1080p</span>
              </div>
            </div>
          </div>
        </div>
        {/* lesson rows */}
        <div className="mt-4 space-y-2.5">
          {[
            { title: "Props و ترکیب کامپوننت‌ها", time: "22:08", active: true },
            { title: "مدیریت State محلی", time: "19:54" },
            { title: "رویدادها و فرم‌ها", time: "16:40" },
          ].map((l) => (
            <div
              key={l.title}
              className={`flex items-center justify-between rounded-(--radius-btn) border px-3 py-2.5 ${
                l.active ? "border-primary-200 bg-primary-50" : "border-slate-100 bg-white"
              }`}
            >
              <span className="flex items-center gap-2">
                <PlayCircle
                  className={`h-4 w-4 ${l.active ? "text-primary-600" : "text-slate-300"}`}
                  strokeWidth={1.8}
                />
                <span className={`text-xs font-medium ${l.active ? "text-primary-800" : "text-slate-600"}`}>
                  {l.title}
                </span>
              </span>
              <Num className="text-[10px] text-slate-400">{l.time}</Num>
            </div>
          ))}
        </div>
      </div>
      {/* floating badge */}
      <div className="absolute -right-4 -bottom-5 flex items-center gap-2 rounded-(--radius-card) border border-slate-200 bg-white px-4 py-3 shadow-(--shadow-float)">
        <BadgeCheck className="h-6 w-6 text-success" strokeWidth={1.5} />
        <div>
          <p className="text-xs font-bold text-slate-900">گواهینامه معتبر</p>
          <p className="text-[10px] text-slate-400">پس از اتمام هر دوره</p>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const popular = [...courses].sort((a, b) => b.students - a.students).slice(0, 4);
  const newest = courses.filter((c) => c.isNew).concat(courses.slice(0, 4)).slice(0, 4);

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-site grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
          <div className="text-center lg:text-right">
            <span className="badge badge-primary mb-5 h-7 px-3 text-xs">
              <Mic className="h-3.5 w-3.5" aria-hidden="true" />
              دوبله و زیرنویس فارسی برای همه دوره‌ها
            </span>
            <h1 className="text-3xl font-black text-balance text-slate-900 md:text-5xl">
              بهترین دوره‌های جهان،
              <br />
              <span className="text-primary-700">این بار به زبان شما</span>
            </h1>
            <p className="mx-auto mt-5 max-w-md text-base leading-8 text-slate-500 lg:mx-0 lg:text-lg">
              به صدها دوره معتبر بین‌المللی از برترین مدرسان دنیا دسترسی پیدا کنید؛ با دوبله حرفه‌ای و
              زیرنویس دقیق فارسی، بدون سد زبان یاد بگیرید.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/courses" className="btn btn-primary btn-lg">
                مشاهده دوره‌ها
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </Link>
              <Link href="/pricing" className="btn btn-outline-primary btn-lg">
                خرید اشتراک
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <HeroMockup />
          </div>
        </div>

        {/* stats bar */}
        <div className="container-site pb-10 lg:pb-14">
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="card flex items-center gap-3 p-4 md:p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-btn) bg-primary-50">
                  <Icon className="h-5 w-5 text-primary-700" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <div>
                  <dd className="text-lg font-extrabold text-slate-900 md:text-xl">
                    <Num>{value}</Num>
                  </dd>
                  <dt className="text-xs text-slate-500">{label}</dt>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ Categories ============ */}
      <section className="section-pad">
        <div className="container-site">
          <SectionHeader title="دسته‌بندی دوره‌ها" href="/courses" />
          <div className="scrollbar-none -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-4 sm:px-0 lg:grid-cols-8">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/courses?category=${cat.slug}`}
                className="card card-hover flex min-w-[130px] shrink-0 snap-start flex-col items-center gap-3 p-5 text-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-(--radius-card) bg-slate-100">
                  <DataIcon name={cat.icon} className="h-6 w-6 text-primary-700" strokeWidth={1.5} />
                </span>
                <span>
                  <span className="block text-sm font-bold text-slate-800">{cat.title}</span>
                  <span className="mt-0.5 block text-[11px] text-slate-400">
                    <Num>{cat.count}</Num> دوره
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Popular courses ============ */}
      <section className="section-pad pt-0">
        <div className="container-site">
          <SectionHeader title="محبوب‌ترین دوره‌ها" href="/courses" />
          <ChipTabs
            className="mb-6"
            options={["همه", "برنامه‌نویسی", "طراحی", "هوش مصنوعی", "کسب‌وکار", "بازاریابی"]}
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ Subscription CTA ============ */}
      <section className="bg-primary-950">
        <div className="container-site grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="text-2xl font-extrabold text-balance text-white md:text-3xl">
              با یک اشتراک، به همه دوره‌ها دسترسی پیدا کنید
            </h2>
            <ul className="mt-6 space-y-3.5">
              {[
                "دسترسی نامحدود به بیش از 350 دوره بین‌المللی",
                "دوبله حرفه‌ای و زیرنویس فارسی برای همه محتوا",
                "گواهینامه معتبر پایان دوره و پشتیبانی اختصاصی",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-primary-100 md:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" strokeWidth={1.8} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/pricing" className="btn btn-accent btn-lg">
                مشاهده تعرفه‌ها
              </Link>
              <Link href="/courses" className="btn btn-outline-white btn-lg">
                دوره‌های رایگان
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "پایه", price: "290,000", note: "ماهانه در پلن سالانه" },
              { name: "حرفه‌ای", price: "450,000", note: "ماهانه در پلن سالانه", hot: true },
            ].map((p) => (
              <div
                key={p.name}
                className={`rounded-(--radius-modal) border p-6 ${
                  p.hot ? "border-accent-400/60 bg-primary-900" : "border-primary-800 bg-primary-900/50"
                }`}
              >
                {p.hot && <span className="badge badge-accent mb-3 bg-accent-400 text-slate-900">پیشنهادی</span>}
                <p className="text-sm font-bold text-primary-200">اشتراک {p.name}</p>
                <p className="mt-2 text-2xl font-black text-white">
                  <Num>{p.price}</Num>
                  <span className="mr-1 text-xs font-medium text-primary-300">تومان</span>
                </p>
                <p className="mt-1 text-[11px] text-primary-400">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Newest courses ============ */}
      <section className="section-pad">
        <div className="container-site">
          <SectionHeader title="جدیدترین دوره‌ها" href="/courses?sort=newest" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {newest.map((course) => (
              <CourseCard key={course.slug} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ Instructors ============ */}
      <section className="section-pad border-y border-slate-200 bg-white">
        <div className="container-site">
          <SectionHeader
            title="مدرسین برتر"
            subtitle="از معتبرترین متخصصان جهان یاد بگیرید — بدون واسطه و بدون سد زبان"
          />
          <div className="scrollbar-none -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:px-0 lg:grid-cols-4">
            {instructors.map((ins) => (
              <div key={ins.slug} className="min-w-[240px] shrink-0 snap-start">
                <InstructorCard instructor={ins} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Testimonials ============ */}
      <section className="section-pad">
        <div className="container-site">
          <SectionHeader title="نظرات دانشجویان" subtitle="تجربه واقعی کاربران دانش‌آرا" />
          <div className="scrollbar-none -mx-4 flex snap-x gap-5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:px-0">
            {testimonials.map((t) => (
              <figure key={t.name} className="card flex min-w-[300px] shrink-0 snap-start flex-col p-6 lg:min-w-0">
                <div className="flex gap-0.5" aria-label={`امتیاز ${t.rating} از 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < t.rating ? "fill-accent-400 text-accent-400" : "fill-slate-200 text-slate-200"}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-7 text-slate-600">{t.text}</blockquote>
                <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <Avatar initials={t.initials} color={t.color} size="md" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{t.name}</p>
                    <p className="text-[11px] text-slate-400">{t.course}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Blog preview ============ */}
      <section className="section-pad pt-0">
        <div className="container-site">
          <SectionHeader title="آخرین مقالات" href="/blog" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
