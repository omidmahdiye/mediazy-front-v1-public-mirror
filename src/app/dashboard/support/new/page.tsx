import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Paperclip, Send, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "ارسال تیکت جدید" };

export default function NewTicketPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/dashboard/support" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary-700">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        بازگشت به تیکت‌ها
      </Link>

      <form className="card p-6 md:p-8">
        <h2 className="text-lg font-extrabold text-slate-900">ارسال تیکت جدید</h2>
        <p className="mt-1 text-xs text-slate-400">معمولا در کمتر از 4 ساعت کاری پاسخ می‌دهیم.</p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="dept" className="label">دپارتمان</label>
            <div className="relative">
              <select id="dept" className="input appearance-none pl-10">
                <option>فنی</option>
                <option>مالی</option>
                <option>آموزشی</option>
                <option>سایر</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            </div>
          </div>
          <div>
            <label htmlFor="priority" className="label">اولویت</label>
            <div className="relative">
              <select id="priority" className="input appearance-none pl-10">
                <option>متوسط</option>
                <option>کم</option>
                <option>زیاد</option>
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label htmlFor="subject" className="label">موضوع</label>
          <input id="subject" type="text" className="input" placeholder="خلاصه‌ای از مشکل یا درخواست شما" />
        </div>

        <div className="mt-5">
          <label htmlFor="message" className="label">شرح کامل</label>
          <textarea id="message" className="textarea min-h-[160px]" placeholder="جزئیات را کامل بنویسید؛ هرچه دقیق‌تر، پاسخ سریع‌تر." />
        </div>

        <div className="mt-5">
          <span className="label">فایل ضمیمه <span className="font-normal text-slate-400">(اختیاری)</span></span>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-(--radius-field) border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition-colors hover:border-primary-400 hover:bg-primary-50/40">
            <Paperclip className="h-6 w-6 text-slate-400" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-xs text-slate-500">فایل را این‌جا رها کنید یا <span className="font-bold text-primary-700">انتخاب فایل</span></span>
            <span className="text-[11px] text-slate-400">حداکثر 10 مگابایت — تصویر، PDF یا ZIP</span>
            <input type="file" className="sr-only" />
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-lg mt-7 w-full sm:w-auto">
          <Send className="h-4 w-4" aria-hidden="true" />
          ارسال تیکت
        </button>
      </form>
    </div>
  );
}
