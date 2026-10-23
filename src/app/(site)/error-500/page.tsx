import type { Metadata } from "next";
import Link from "next/link";
import { ServerCrash, RotateCcw } from "lucide-react";
import { Num } from "@/components/ui";

export const metadata: Metadata = { title: "خطای سرور" };

export default function ServerErrorPage() {
  return (
    <div className="flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-md text-center">
        <span className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-error-light">
          <ServerCrash className="h-10 w-10 text-error" strokeWidth={1.2} aria-hidden="true" />
        </span>
        <p className="text-6xl font-black text-slate-200"><Num>500</Num></p>
        <h1 className="mt-4 text-xl font-extrabold text-slate-900">خطای سرور</h1>
        <p className="mt-2 text-sm leading-7 text-slate-500">
          مشکلی در سرور رخ داده است. لطفا دقایقی بعد مجددا تلاش کنید.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button type="button" className="btn btn-primary btn-lg">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            تلاش مجدد
          </button>
          <Link href="/" className="btn btn-outline btn-lg">بازگشت به صفحه اصلی</Link>
        </div>
      </div>
    </div>
  );
}
