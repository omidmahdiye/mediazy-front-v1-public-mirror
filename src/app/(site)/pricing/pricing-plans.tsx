"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Minus, ShieldCheck } from "lucide-react";
import { plans, formatToman } from "@/lib/data";
import { Num } from "@/components/ui";

export default function PricingPlans() {
  const [yearly, setYearly] = useState(true);

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-3">
        <div className="relative flex rounded-full border border-slate-200 bg-white p-1" role="group" aria-label="دوره پرداخت">
          {(
            [
              { key: false, label: "ماهانه" },
              { key: true, label: "سالانه" },
            ] as const
          ).map((opt) => (
            <button
              key={String(opt.key)}
              type="button"
              aria-pressed={yearly === opt.key}
              onClick={() => setYearly(opt.key)}
              className={`cursor-pointer rounded-full px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                yearly === opt.key ? "bg-primary-600 text-white" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <span className="badge badge-accent h-7 px-3">تا 35% تخفیف</span>
      </div>

      {/* Plan cards */}
      <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 items-start gap-5 md:grid-cols-3">
        {plans.map((plan) => {
          const price = yearly ? plan.yearly : plan.monthly;
          return (
            <div
              key={plan.id}
              className={`relative rounded-(--radius-modal) border bg-white p-6 ${
                plan.recommended
                  ? "border-primary-600 shadow-(--shadow-float) ring-1 ring-primary-600 md:-mt-4 md:pb-10"
                  : "border-slate-200 shadow-(--shadow-card)"
              }`}
            >
              {plan.recommended && (
                <span className="badge badge-primary absolute -top-3 right-6 h-7 bg-primary-600 px-3 text-white">
                  پیشنهادی
                </span>
              )}
              <h3 className="text-lg font-extrabold text-slate-900">{plan.name}</h3>
              <p className="mt-1 text-xs text-slate-400">{plan.tagline}</p>

              <p className="mt-5">
                <Num className="text-3xl font-black text-slate-900 md:text-4xl">{formatToman(price)}</Num>
                <span className="mr-2 text-xs text-slate-400">تومان / ماهانه</span>
              </p>
              {yearly && (
                <p className="mt-1 text-[11px] text-slate-400">
                  پرداخت سالانه <Num className="font-bold text-slate-600">{formatToman(price * 12)}</Num> تومان
                </p>
              )}

              <Link
                href={`/checkout?plan=${plan.id}&period=${yearly ? "yearly" : "monthly"}`}
                className={`btn btn-lg mt-6 w-full ${plan.recommended ? "btn-primary" : "btn-outline-primary"}`}
              >
                شروع اشتراک {plan.name}
              </Link>

              <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                {plan.features.map((f) => (
                  <li key={f.text} className={`flex items-start gap-2.5 text-sm ${f.included ? "text-slate-700" : "text-slate-400"}`}>
                    {f.included ? (
                      <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-success" strokeWidth={2} aria-label="شامل می‌شود" />
                    ) : (
                      <Minus className="mt-0.5 h-4.5 w-4.5 shrink-0 text-slate-300" strokeWidth={2} aria-label="شامل نمی‌شود" />
                    )}
                    {f.text}
                  </li>
                ))}
              </ul>

              <p className="mt-5 flex items-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="h-4 w-4 text-success" strokeWidth={1.8} aria-hidden="true" />
                <Num>14</Num> روز ضمانت بازگشت وجه
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
