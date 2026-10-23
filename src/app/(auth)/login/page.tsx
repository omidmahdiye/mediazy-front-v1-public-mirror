import type { Metadata } from "next";
import Link from "next/link";
import { PasswordInput } from "@/components/interactive";

export const metadata: Metadata = { title: "ورود" };

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06L5.84 9.9c.87-2.6 3.3-4.53 6.16-4.53Z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">ورود به حساب کاربری</h1>
      <p className="mt-2 text-sm text-slate-500">خوش برگشتید! یادگیری را از همان‌جا که رها کردید ادامه دهید.</p>

      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="identifier" className="label">ایمیل یا شماره موبایل</label>
          <input id="identifier" type="text" dir="ltr" className="input text-left" placeholder="you@example.com" autoComplete="username" />
        </div>
        <PasswordInput id="password" label="رمز عبور" />
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="h-5 w-5 rounded border-slate-300" defaultChecked />
            مرا به خاطر بسپار
          </label>
          <Link href="/forgot-password" className="text-xs font-medium text-primary-700 hover:text-primary-800">
            فراموشی رمز عبور
          </Link>
        </div>
        <button type="submit" className="btn btn-primary btn-lg w-full">ورود</button>
      </form>

      <div className="my-6 flex items-center gap-4" aria-hidden="true">
        <span className="divider" />
        <span className="text-xs text-slate-400">یا</span>
        <span className="divider" />
      </div>

      <button type="button" className="btn btn-outline btn-lg w-full">
        <GoogleIcon />
        ورود با گوگل
      </button>

      <p className="mt-8 text-center text-sm text-slate-500">
        حساب کاربری ندارید؟{" "}
        <Link href="/register" className="font-bold text-primary-700 hover:text-primary-800">ثبت نام</Link>
      </p>
    </div>
  );
}
