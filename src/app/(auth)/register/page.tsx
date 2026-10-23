import type { Metadata } from "next";
import Link from "next/link";
import { PasswordInput } from "@/components/interactive";

export const metadata: Metadata = { title: "ثبت نام" };

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">ایجاد حساب کاربری</h1>
      <p className="mt-2 text-sm text-slate-500">
        در کمتر از یک دقیقه ثبت‌نام کنید و با دوره‌های رایگان شروع کنید.
      </p>

      <form className="mt-8 space-y-5">
        <div>
          <label htmlFor="fullname" className="label">نام و نام خانوادگی</label>
          <input id="fullname" type="text" className="input" placeholder="مثلا سارا محمدی" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="label">ایمیل</label>
          <input id="email" type="email" dir="ltr" className="input text-left" placeholder="you@example.com" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone" className="label">شماره موبایل</label>
          <input id="phone" type="tel" dir="ltr" className="input text-left" placeholder="0912 345 6789" autoComplete="tel" />
          <p className="helper-text">کد تایید به این شماره ارسال می‌شود.</p>
        </div>
        <PasswordInput id="password" label="رمز عبور" strength />
        <PasswordInput id="password-confirm" label="تکرار رمز عبور" />
        <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-600">
          <input type="checkbox" className="mt-1 h-5 w-5 rounded border-slate-300" />
          <span>
            <Link href="/terms" className="font-medium text-primary-700 hover:underline">قوانین و مقررات</Link>{" "}
            را مطالعه کرده و می‌پذیرم
          </span>
        </label>
        <button type="submit" className="btn btn-primary btn-lg w-full">ثبت نام</button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        حساب کاربری دارید؟{" "}
        <Link href="/login" className="font-bold text-primary-700 hover:text-primary-800">ورود</Link>
      </p>
    </div>
  );
}
