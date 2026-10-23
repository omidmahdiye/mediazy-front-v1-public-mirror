import Link from "next/link";
import { Phone, Mail, MapPin, Send, AtSign, Globe, Rss, ShieldCheck, CreditCard } from "lucide-react";
import { Logo } from "./site-header";
import { Num } from "./ui";

const quickLinks = [
  { href: "/courses", label: "دوره‌های آموزشی" },
  { href: "/pricing", label: "تعرفه اشتراک" },
  { href: "/blog", label: "مقالات" },
  { href: "/about", label: "درباره ما" },
  { href: "/instructors/sarah-drasner", label: "مدرسین" },
];

const supportLinks = [
  { href: "/faq", label: "سوالات متداول" },
  { href: "/contact", label: "تماس با ما" },
  { href: "/terms", label: "قوانین و مقررات" },
  { href: "/privacy", label: "حریم خصوصی" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white pb-20 lg:pb-0">
      <div className="container-site grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <Logo />
          <p className="mt-4 text-sm leading-7 text-slate-500">
            دانش‌آرا، پل شما به بهترین دوره‌های آموزشی جهان؛ با دوبله حرفه‌ای و زیرنویس دقیق فارسی.
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { icon: AtSign, label: "اینستاگرام" },
              { icon: Globe, label: "لینکدین" },
              { icon: Rss, label: "وبلاگ" },
              { icon: Send, label: "تلگرام" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700"
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="دسترسی سریع">
          <h3 className="mb-4 text-sm font-extrabold text-slate-900">دسترسی سریع</h3>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="text-sm text-slate-500 transition-colors hover:text-primary-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="پشتیبانی">
          <h3 className="mb-4 text-sm font-extrabold text-slate-900">پشتیبانی</h3>
          <ul className="space-y-2.5">
            {supportLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-slate-500 transition-colors hover:text-primary-700">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="mb-4 text-sm font-extrabold text-slate-900">تماس با ما</h3>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} aria-hidden="true" />
              <Num>021-91002030</Num>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} aria-hidden="true" />
              <Num>support@daneshara.io</Num>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-400" strokeWidth={1.8} aria-hidden="true" />
              تهران، خیابان ولیعصر، کوچه دانش، پلاک <Num>12</Num>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-100">
        <div className="container-site flex flex-col items-center justify-between gap-4 py-5 sm:flex-row">
          <p className="text-xs text-slate-400">
            © <Num>2026</Num> دانش‌آرا — تمامی حقوق محفوظ است.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              نماد اعتماد الکترونیکی
            </span>
            <span className="flex items-center gap-1.5">
              <CreditCard className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              پرداخت امن شتاب
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
