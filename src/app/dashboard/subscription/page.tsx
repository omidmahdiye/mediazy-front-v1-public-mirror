import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpCircle, CalendarDays, RotateCcw } from "lucide-react";
import { user, plans } from "@/lib/data";
import { Num, ProgressBar } from "@/components/ui";
import { Toggle } from "@/components/interactive";

export const metadata: Metadata = { title: "اشتراک من" };

export default function SubscriptionPage() {
  const plan = plans.find((p) => p.name === user.plan)!;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Current plan */}
      <section className="card p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-slate-900">پلن {user.plan} — سالانه</h2>
              <span className="badge badge-success">فعال</span>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              از <Num>{user.planStart}</Num> تا <Num>{user.planEnd}</Num>
            </p>
          </div>
          <div className="text-left">
            <p className="text-2xl font-black text-slate-900"><Num>{user.daysLeft}</Num></p>
            <p className="text-[11px] text-slate-400">روز باقی‌مانده</p>
          </div>
        </div>

        <div className="mt-6">
          <ProgressBar value={user.periodUsedPct} />
          <p className="mt-1.5 text-[11px] text-slate-400">
            <Num>{user.periodUsedPct}%</Num> از دوره اشتراک استفاده شده است
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <Toggle
            label="تمدید خودکار"
            defaultChecked
            description="در پایان دوره، اشتراک به صورت خودکار با همین پلن تمدید می‌شود"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/checkout?plan=team&period=yearly" className="btn btn-primary btn-md">
            <ArrowUpCircle className="h-4 w-4" aria-hidden="true" />
            ارتقا به سازمانی
          </Link>
          <Link href="/checkout?plan=pro&period=yearly" className="btn btn-outline btn-md">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            تمدید اشتراک
          </Link>
        </div>
      </section>

      {/* Plan features */}
      <section className="card p-6 md:p-8">
        <h2 className="text-base font-extrabold text-slate-900">امکانات پلن شما</h2>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {plan.features.map((f) => (
            <li key={f.text} className="flex items-start gap-2.5 text-sm text-slate-700">
              <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-success" strokeWidth={2} aria-hidden="true" />
              {f.text}
            </li>
          ))}
        </ul>
      </section>

      {/* Cancel */}
      <p className="text-center">
        <button type="button" className="cursor-pointer text-xs text-slate-400 transition-colors hover:text-error">
          لغو اشتراک
        </button>
      </p>
    </div>
  );
}
