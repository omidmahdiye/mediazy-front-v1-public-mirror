import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, KeyRound } from "lucide-react";

export const metadata: Metadata = { title: "بازیابی رمز عبور" };

export default function ForgotPasswordPage() {
  return (
    <div>
      <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
        <KeyRound className="h-7 w-7 text-primary-700" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h1 className="text-2xl font-extrabold text-slate-900">بازیابی رمز عبور</h1>
      <p className="mt-2 text-sm leading-7 text-slate-500">
        ایمیل یا شماره موبایل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="identifier" className="label">ایمیل یا شماره موبایل</label>
          <input id="identifier" type="text" dir="ltr" className="input text-left" placeholder="you@example.com" />
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-full">ارسال لینک بازیابی</button>
      </form>

      <Link href="/login" className="mt-8 flex items-center justify-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary-700">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        بازگشت به ورود
      </Link>
    </div>
  );
}
