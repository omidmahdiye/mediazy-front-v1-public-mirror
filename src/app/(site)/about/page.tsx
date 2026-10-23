import type { Metadata } from "next";
import { Target, Heart, Lightbulb, ShieldCheck, PlaySquare, Users, Mic, Clock } from "lucide-react";
import { PageHeader, Num, Avatar } from "@/components/ui";

export const metadata: Metadata = { title: "درباره ما" };

const team = [
  { name: "آرش صادقی", role: "هم‌بنیان‌گذار و مدیرعامل", bio: "سابقه 12 سال در صنعت آموزش آنلاین", initials: "آ‌ص", color: "bg-primary-600" },
  { name: "لیلا فرهادی", role: "هم‌بنیان‌گذار و مدیر محصول", bio: "پیش‌تر مدیر محصول در دو استارتاپ آموزشی", initials: "ل‌ف", color: "bg-rose-500" },
  { name: "کاوه رستمی", role: "مدیر فنی", bio: "مهندس نرم‌افزار با تمرکز بر زیرساخت ویدیو", initials: "ک‌ر", color: "bg-emerald-600" },
  { name: "شیرین اکبری", role: "مدیر دوبله و ترجمه", bio: "15 سال سابقه در دوبله حرفه‌ای و نشر ترجمه", initials: "ش‌ا", color: "bg-violet-600" },
];

const values = [
  { icon: Target, title: "کیفیت بدون مصالحه", text: "فقط دوره‌هایی را منتشر می‌کنیم که خودمان حاضر باشیم برایشان هزینه کنیم؛ دوبله و ترجمه هر درس سه مرحله بازبینی می‌شود." },
  { icon: Heart, title: "احترام به یادگیرنده", text: "قیمت‌گذاری شفاف، لغو آسان اشتراک و ضمانت بازگشت وجه؛ اعتماد شما سرمایه اصلی ماست." },
  { icon: Lightbulb, title: "یادگیری بدون مرز", text: "باور داریم زبان نباید مانع دسترسی به بهترین دانش روز جهان باشد؛ ماموریت ما برداشتن همین سد است." },
  { icon: ShieldCheck, title: "تعهد به نتیجه", text: "موفقیت ما را با پیشرفت شغلی کاربران‌مان اندازه می‌گیریم، نه صرفاً با ساعت تماشای ویدیو." },
];

const stats = [
  { icon: PlaySquare, value: "350+", label: "دوره آموزشی" },
  { icon: Users, value: "12,000+", label: "دانشجوی فعال" },
  { icon: Mic, value: "180+", label: "دوره دوبله‌شده" },
  { icon: Clock, value: "6,200+", label: "ساعت محتوای فارسی‌شده" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="درباره دانش‌آرا"
        description="ما سد زبان را از مسیر یادگیری برمی‌داریم تا بهترین دوره‌های جهان برای همه فارسی‌زبانان در دسترس باشد."
        crumbs={[{ label: "صفحه اصلی", href: "/" }, { label: "درباره ما" }]}
      />

      <section className="container-site section-pad">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">داستان ما</h2>
          <div className="prose-fa mt-5">
            <p>
              دانش‌آرا در سال <Num>1400</Num> با یک مشاهده ساده شروع شد: بهترین دوره‌های آموزشی جهان به زبان انگلیسی
              تولید می‌شوند، اما بخش بزرگی از یادگیرنده‌های فارسی‌زبان یا به آن‌ها دسترسی ندارند یا سد زبان،
              سرعت یادگیری‌شان را به‌شدت کاهش می‌دهد.
            </p>
            <p>
              ما تصمیم گرفتیم این مسئله را حرفه‌ای حل کنیم: با عقد قرارداد رسمی با ناشران بین‌المللی، دوره‌ها را با
              دوبله استودیویی و زیرنویس دقیق فنی فارسی‌سازی می‌کنیم. امروز بیش از <Num>12,000</Num> نفر هر روز با
              دانش‌آرا یاد می‌گیرند و تیم <Num>40</Num> نفره ما هر ماه ده‌ها ساعت محتوای جدید آماده می‌کند.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="container-site grid grid-cols-2 gap-6 py-12 text-center md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label}>
              <Icon className="mx-auto h-8 w-8 text-primary-600" strokeWidth={1.3} aria-hidden="true" />
              <p className="mt-3 text-2xl font-black text-slate-900 md:text-3xl"><Num>{value}</Num></p>
              <p className="mt-1 text-xs text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site section-pad">
        <h2 className="mb-8 text-center text-xl font-extrabold text-slate-900 md:text-2xl">ارزش‌های ما</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-(--radius-card) bg-primary-50">
                <Icon className="h-6 w-6 text-primary-700" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-site section-pad pt-0">
        <h2 className="mb-8 text-center text-xl font-extrabold text-slate-900 md:text-2xl">تیم دانش‌آرا</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m) => (
            <div key={m.name} className="card p-6 text-center">
              <Avatar initials={m.initials} color={m.color} size="lg" className="mx-auto" />
              <h3 className="mt-4 text-base font-bold text-slate-900">{m.name}</h3>
              <p className="mt-1 text-xs font-medium text-primary-700">{m.role}</p>
              <p className="mt-2 text-xs text-slate-500">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
