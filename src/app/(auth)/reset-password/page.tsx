import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PasswordInput } from "@/components/interactive";

export const metadata: Metadata = { title: "تنظیم رمز عبور جدید" };

export default function ResetPasswordPage() {
  return (
    <div>
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
        <ShieldCheck className="h-7 w-7 text-primary-700" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-extrabold text-slate-900">تنظیم رمز عبور جدید</h1>
      <p className="mt-2 text-sm leading-7 text-slate-500">
        رمز عبور جدید باید حداقل 8 کاراکتر و ترکیبی از حروف و اعداد باشد.
      </p>

      <form className="mt-8 space-y-5">
        <PasswordInput id="new-password" label="رمز عبور جدید" strength />
        <PasswordInput id="confirm-password" label="تکرار رمز عبور جدید" />
        <button type="submit" className="btn btn-primary btn-lg w-full">ذخیره رمز عبور</button>
      </form>
    </div>
  );
}
