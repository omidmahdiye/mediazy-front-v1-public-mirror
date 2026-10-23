import Link from "next/link";
import { Search, Compass } from "lucide-react";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { Num } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="w-full max-w-md text-center">
          <span className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary-50">
            <Compass className="h-10 w-10 text-primary-600" strokeWidth={1.2} aria-hidden="true" />
          </span>
          <p className="text-6xl font-black text-slate-200"><Num>404</Num></p>
          <h1 className="mt-4 text-xl font-extrabold text-slate-900">صفحه مورد نظر یافت نشد</h1>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
          </p>
          <div className="relative mt-8">
            <Search className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input type="search" placeholder="جستجو در دانش‌آرا..." aria-label="جستجو" className="input pr-12" />
          </div>
          <Link href="/" className="btn btn-primary btn-lg mt-5 w-full">بازگشت به صفحه اصلی</Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
