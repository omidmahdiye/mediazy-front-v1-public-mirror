import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Send, AtSign, Globe, ChevronDown } from "lucide-react";
import { PageHeader, Num } from "@/components/ui";

export const metadata: Metadata = { title: "تماس با ما" };

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="تماس با ما"
        description="سوال، پیشنهاد یا مشکلی دارید؟ تیم پشتیبانی دانش‌آرا هر روز هفته پاسخگوی شماست."
        crumbs={[{ label: "صفحه اصلی", href: "/" }, { label: "تماس با ما" }]}
      />

      <div className="container-site section-pad grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Form */}
        <form className="card order-2 p-6 lg:order-1 lg:col-span-3 lg:p-8">
          <h2 className="text-lg font-extrabold text-slate-900">ارسال پیام</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label">نام و نام خانوادگی</label>
              <input id="name" type="text" className="input" placeholder="مثلا سارا محمدی" />
            </div>
            <div>
              <label htmlFor="email" className="label">ایمیل</label>
              <input id="email" type="email" dir="ltr" className="input text-left" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="phone" className="label">شماره تماس <span className="font-normal text-slate-400">(اختیاری)</span></label>
              <input id="phone" type="tel" dir="ltr" className="input text-left" placeholder="0912 345 6789" />
            </div>
            <div>
              <label htmlFor="subject" className="label">موضوع</label>
              <div className="relative">
                <select id="subject" className="input appearance-none pl-10">
                  <option>پشتیبانی فنی</option>
                  <option>سوال درباره اشتراک</option>
                  <option>همکاری سازمانی</option>
                  <option>سایر موارد</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="message" className="label">پیام شما</label>
            <textarea id="message" className="textarea" placeholder="پیام خود را بنویسید..." />
            <p className="helper-text">معمولا در کمتر از 4 ساعت کاری پاسخ می‌دهیم.</p>
          </div>
          <button type="submit" className="btn btn-primary btn-lg mt-6 w-full sm:w-auto">
            <Send className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            ارسال پیام
          </button>
        </form>

        {/* Contact info */}
        <div className="order-1 space-y-4 lg:order-2 lg:col-span-2">
          {[
            { icon: Phone, title: "تلفن پشتیبانی", value: <Num>021-91002030</Num>, sub: "شنبه تا پنجشنبه" },
            { icon: Mail, title: "ایمیل", value: <Num>support@daneshara.io</Num>, sub: "پاسخ در کمتر از 4 ساعت" },
            { icon: MapPin, title: "آدرس دفتر", value: <>تهران، خیابان ولیعصر، کوچه دانش، پلاک <Num>12</Num></>, sub: "طبقه سوم، واحد 6" },
            { icon: Clock, title: "ساعات کاری", value: <><Num>9:00</Num> تا <Num>18:00</Num></>, sub: "پنجشنبه‌ها تا 13:00" },
          ].map(({ icon: Icon, title, value, sub }) => (
            <div key={title} className="card flex items-start gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-btn) bg-primary-50">
                <Icon className="h-5 w-5 text-primary-700" strokeWidth={1.6} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-xs text-slate-400">{title}</h3>
                <p className="mt-0.5 text-sm font-bold text-slate-800">{value}</p>
                <p className="mt-0.5 text-[11px] text-slate-400">{sub}</p>
              </div>
            </div>
          ))}
          <div className="card p-5">
            <h3 className="mb-3 text-xs text-slate-400">شبکه‌های اجتماعی</h3>
            <div className="flex gap-2">
              {[
                { icon: AtSign, label: "اینستاگرام" },
                { icon: Globe, label: "لینکدین" },
                { icon: Send, label: "تلگرام" },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-700">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
