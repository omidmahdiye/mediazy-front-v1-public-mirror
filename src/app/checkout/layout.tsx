import Link from "next/link";
import { GraduationCap, Lock } from "lucide-react";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-site flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="دانش‌آرا — صفحه اصلی">
            <span className="flex h-9 w-9 items-center justify-center rounded-(--radius-btn) bg-primary-600 text-white">
              <GraduationCap className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-lg font-black text-slate-900">دانش‌آرا</span>
          </Link>
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <Lock className="h-4 w-4 text-success" strokeWidth={1.8} aria-hidden="true" />
            پرداخت امن
          </span>
        </div>
      </header>
      <main id="main-content" className="flex-1 py-10">
        {children}
      </main>
    </div>
  );
}
