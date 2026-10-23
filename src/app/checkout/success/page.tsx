import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileDown, PlayCircle } from "lucide-react";
import { Num } from "@/components/ui";

export const metadata: Metadata = { title: "پرداخت موفق" };

export default function PaymentSuccessPage() {
  return (
    <div className="container-site flex max-w-lg flex-col items-center pt-6 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-success-light">
        <CheckCircle2 className="h-11 w-11 text-success" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-2xl font-extrabold text-slate-900">پرداخت شما با موفقیت انجام شد</h1>
      <p className="mt-2 text-sm text-slate-500">اشتراک حرفه‌ای سالانه شما هم‌اکنون فعال است.</p>

      <dl className="card mt-8 w-full space-y-3 p-6 text-right text-sm">
        {(
          [
            ["شماره پیگیری", <Num key="1" className="font-bold text-slate-800">ZP-991203384</Num>],
            ["مبلغ پرداختی", <span key="2"><Num className="font-bold text-slate-800">4,860,000</Num> <span className="text-xs text-slate-400">تومان</span></span>],
            ["تاریخ و ساعت", <Num key="3" className="font-medium text-slate-700">1404/07/30 — 18:42</Num>],
            ["پلن فعال‌شده", <span key="4" className="badge badge-primary">حرفه‌ای — سالانه</span>],
          ] as const
        ).map(([k, v], i) => (
          <div key={i} className="flex items-center justify-between">
            <dt className="text-slate-500">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Link href="/dashboard/courses" className="btn btn-primary btn-lg flex-1">
          <PlayCircle className="h-5 w-5" aria-hidden="true" />
          شروع یادگیری
        </Link>
        <button type="button" className="btn btn-outline btn-lg flex-1">
          <FileDown className="h-5 w-5" aria-hidden="true" />
          مشاهده فاکتور
        </button>
      </div>
    </div>
  );
}
