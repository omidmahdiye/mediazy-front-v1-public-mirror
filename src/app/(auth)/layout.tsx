import Link from "next/link";
import { GraduationCap, Mic, Captions, Award, PlayCircle } from "lucide-react";
import { Num } from "@/components/ui";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Form side (RTL start = right) */}
      <main id="main-content" className="flex w-full flex-col lg:w-[46%]">
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2" aria-label="دانش‌آرا — صفحه اصلی">
            <span className="flex h-9 w-9 items-center justify-center rounded-(--radius-btn) bg-primary-600 text-white">
              <GraduationCap className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-lg font-black text-slate-900">دانش‌آرا</span>
          </Link>
          <Link href="/" className="text-xs font-medium text-slate-400 transition-colors hover:text-primary-700">
            بازگشت به سایت
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </main>

      {/* Brand side */}
      <aside className="relative hidden flex-1 overflow-hidden bg-primary-950 lg:block" aria-hidden="true">
        <span className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-900" />
        <span className="absolute -right-32 -bottom-32 h-[480px] w-[480px] rounded-full bg-primary-900/60" />
        <div className="relative flex h-full flex-col justify-center p-14">
          <h2 className="max-w-md text-3xl leading-[1.4] font-black text-white">
            بهترین دوره‌های جهان،
            <br />
            به زبان شما
          </h2>
          <ul className="mt-10 space-y-5">
            {[
              { icon: PlayCircle, text: "دسترسی نامحدود به 350+ دوره بین‌المللی" },
              { icon: Mic, text: "دوبله استودیویی فارسی" },
              { icon: Captions, text: "زیرنویس دقیق فارسی و انگلیسی" },
              { icon: Award, text: "گواهینامه معتبر پایان دوره" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-primary-100">
                <span className="flex h-10 w-10 items-center justify-center rounded-(--radius-btn) bg-white/10">
                  <Icon className="h-5 w-5 text-accent-400" strokeWidth={1.6} />
                </span>
                <Num>{text}</Num>
              </li>
            ))}
          </ul>
          <figure className="mt-12 max-w-md rounded-(--radius-modal) bg-white/5 p-6 backdrop-blur-sm">
            <blockquote className="text-sm leading-7 text-primary-100">
              در سه ماه بیشتر از دو سال گذشته پیشرفت کردم. کیفیت دوبله واقعا غافلگیرکننده است.
            </blockquote>
            <figcaption className="mt-3 text-xs text-primary-300">مریم احمدی — دانشجوی یادگیری ماشین</figcaption>
          </figure>
        </div>
      </aside>
    </div>
  );
}
