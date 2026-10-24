import type { Metadata } from "next";
import Link from "next/link";
import { XCircle, RotateCcw, Headphones } from "lucide-react";
import { Num } from "@/components/ui";

export const metadata: Metadata = { title: "پرداخت ناموفق" };

export default function PaymentFailedPage() {
  return (
    <div className="container-site flex max-w-lg flex-col items-center pt-6 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-error-light">
        <XCircle className="h-11 w-11 text-error" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-2xl font-extrabold text-slate-900">پرداخت ناموفق بود</h1>
      <p className="mt-2 text-sm leading-7 text-slate-500">
        تراکنش توسط بانک تایید نشد یا در میانه راه لغو شد. اگر مبلغی از حساب شما کسر شده باشد، حداکثر تا{" "}
        <Num>72</Num> ساعت آینده به صورت خودکار بازگردانده می‌شود.
      </p>

      <dl className="card mt-8 w-full space-y-3 p-6 text-right text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">شماره پیگیری</dt>
          <dd><Num className="font-bold text-slate-800">ZP-991203001</Num></dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-slate-500">وضعیت</dt>
          <dd><span className="badge badge-error">ناموفق</span></dd>
        </div>
      </dl>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link href="/checkout" className="btn btn-primary btn-lg flex-1">
          <RotateCcw className="h-5 w-5" aria-hidden="true" />
          تلاش مجدد
        </Link>
        <Link href="/dashboard/support/new" className="btn btn-outline btn-lg flex-1">
          <Headphones className="h-5 w-5" aria-hidden="true" />
          تماس با پشتیبانی
        </Link>
      </div>
      <p className="mt-4 text-[11px] text-slate-400">
        هنگام تماس با پشتیبانی، شماره پیگیری بالا را اعلام کنید.
      </p>
    </div>
  );
}
