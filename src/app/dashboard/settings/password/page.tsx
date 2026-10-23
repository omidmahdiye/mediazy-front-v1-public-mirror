import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PasswordInput } from "@/components/interactive";

export const metadata: Metadata = { title: "تغییر رمز عبور" };

export default function ChangePasswordPage() {
  return (
    <div className="mx-auto max-w-md">
      <Link href="/dashboard/settings" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary-700">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        بازگشت به تنظیمات
      </Link>

      <form className="card p-6 md:p-8">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
          <ShieldCheck className="h-6 w-6 text-primary-700" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-extrabold text-slate-900">تغییر رمز عبور</h2>
        <p className="mt-1 text-xs leading-6 text-slate-400">
          رمز عبور جدید باید حداقل 8 کاراکتر و ترکیبی از حروف و اعداد باشد.
        </p>

        <div className="mt-6 space-y-5">
          <PasswordInput id="current-password" label="رمز عبور فعلی" />
          <PasswordInput id="new-password" label="رمز عبور جدید" strength />
          <PasswordInput id="confirm-password" label="تکرار رمز عبور جدید" />
        </div>

        <button type="submit" className="btn btn-primary btn-lg mt-7 w-full">ذخیره رمز عبور جدید</button>
      </form>
    </div>
  );
}
