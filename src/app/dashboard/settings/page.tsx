import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Upload, Trash2, KeyRound, ChevronLeft, CalendarDays } from "lucide-react";
import { user } from "@/lib/data";
import { Avatar, Num } from "@/components/ui";
import { Toggle } from "@/components/interactive";

export const metadata: Metadata = { title: "تنظیمات پروفایل" };

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Avatar */}
      <section className="card flex flex-col items-center gap-5 p-6 sm:flex-row md:p-8">
        <Avatar initials={user.initials} color={user.avatarColor} size="xl" />
        <div className="text-center sm:text-right">
          <h2 className="text-base font-extrabold text-slate-900">تصویر پروفایل</h2>
          <p className="mt-1 text-xs text-slate-400">تصویر مربعی با حداقل ابعاد 200×200 پیکسل</p>
          <div className="mt-4 flex justify-center gap-2 sm:justify-start">
            <button type="button" className="btn btn-outline btn-sm">
              <Upload className="h-3.5 w-3.5" aria-hidden="true" />
              تغییر تصویر
            </button>
            <button type="button" className="btn btn-ghost btn-sm min-w-0 text-slate-400 hover:text-error">
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              حذف
            </button>
          </div>
        </div>
      </section>

      {/* Personal info */}
      <section className="card p-6 md:p-8">
        <h2 className="text-base font-extrabold text-slate-900">اطلاعات شخصی</h2>
        <form className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="fullname" className="label">نام و نام خانوادگی</label>
            <input id="fullname" type="text" defaultValue={user.name} className="input" />
          </div>
          <div>
            <label htmlFor="email" className="label flex items-center gap-2">
              ایمیل
              <span className="badge badge-success">
                <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                تایید شده
              </span>
            </label>
            <input id="email" type="email" dir="ltr" defaultValue={user.email} className="input text-left" />
          </div>
          <div>
            <label htmlFor="phone" className="label flex items-center gap-2">
              شماره موبایل
              <span className="badge badge-success">
                <BadgeCheck className="h-3 w-3" aria-hidden="true" />
                تایید شده
              </span>
            </label>
            <input id="phone" type="tel" dir="ltr" defaultValue={user.phone} className="input text-left" />
          </div>
          <div>
            <label htmlFor="birthdate" className="label">تاریخ تولد</label>
            <div className="relative">
              <input id="birthdate" type="text" dir="ltr" placeholder="1375/04/12" className="input text-left" />
              <CalendarDays className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            </div>
            <p className="helper-text">تقویم شمسی با اعداد انگلیسی</p>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="bio" className="label">درباره من <span className="font-normal text-slate-400">(اختیاری)</span></label>
            <textarea id="bio" className="textarea" placeholder="چند جمله درباره خودتان..." />
          </div>
        </form>
      </section>

      {/* Preferences */}
      <section className="card p-6 md:p-8">
        <h2 className="text-base font-extrabold text-slate-900">ترجیحات یادگیری</h2>
        <fieldset className="mt-5">
          <legend className="label">زبان پیش‌فرض دوره‌ها</legend>
          <div className="space-y-2.5">
            {["فارسی (دوبله)", "انگلیسی (با زیرنویس فارسی)", "انگلیسی (بدون زیرنویس)"].map((opt, i) => (
              <label key={opt} className="flex cursor-pointer items-center gap-3 rounded-(--radius-btn) border border-slate-200 p-3.5 text-sm text-slate-700 transition-colors has-checked:border-primary-600 has-checked:bg-primary-50">
                <input type="radio" name="lang-pref" defaultChecked={i === 0} className="h-5 w-5 accent-primary-600" />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-7 space-y-4 border-t border-slate-100 pt-6">
          <h3 className="text-sm font-bold text-slate-900">اعلان‌های ایمیلی</h3>
          <Toggle label="دوره‌های جدید" defaultChecked description="وقتی دوره جدیدی در حوزه‌های موردعلاقه شما منتشر شود" />
          <Toggle label="یادآوری یادگیری" defaultChecked description="اگر چند روز درس جدیدی تماشا نکرده باشید" />
          <Toggle label="خبرنامه هفتگی" description="بهترین مقالات و پیشنهادهای هفته" />
        </div>
      </section>

      <div className="flex items-center justify-between">
        <button type="submit" className="btn btn-primary btn-lg">ذخیره تغییرات</button>
        <Link href="/dashboard/settings/password" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 hover:text-primary-800">
          <KeyRound className="h-4 w-4" aria-hidden="true" />
          تغییر رمز عبور
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      {/* Danger zone */}
      <section className="rounded-(--radius-card) border border-error/20 bg-error-light/50 p-6">
        <h2 className="text-sm font-bold text-error-dark">حذف حساب کاربری</h2>
        <p className="mt-1.5 text-xs leading-6 text-slate-500">
          با حذف حساب، همه داده‌های شما شامل پیشرفت دوره‌ها، یادداشت‌ها و گواهینامه‌ها برای همیشه پاک می‌شود. این عمل قابل بازگشت نیست.
        </p>
        <button type="button" className="btn btn-sm mt-4 min-w-0 border border-error/30 bg-white text-error hover:bg-error hover:text-white">
          حذف حساب کاربری
        </button>
      </section>
    </div>
  );
}
