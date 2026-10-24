"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronLeft, ChevronRight, Landmark, Wallet, TicketPercent, ShieldCheck } from "lucide-react";
import { plans, formatToman } from "@/lib/data";
import { Num } from "@/components/ui";

const steps = ["انتخاب تعرفه", "اطلاعات پرداخت", "تایید و پرداخت"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [planId, setPlanId] = useState("pro");
  const [method, setMethod] = useState<"gateway" | "wallet">("gateway");
  const plan = plans.find((p) => p.id === planId)!;
  const yearlyTotal = plan.yearly * 12;
  const discount = 540_000;
  const final = yearlyTotal - discount;

  return (
    <div className="container-site max-w-3xl">
      {/* Stepper */}
      <ol className="mb-10 flex items-center justify-center gap-0" aria-label="مراحل خرید">
        {steps.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={s} className="flex items-center">
              <div className="flex flex-col items-center gap-2 sm:flex-row">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                    done ? "bg-success text-white" : active ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-500"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? <Check className="h-4.5 w-4.5" aria-hidden="true" /> : <Num>{i + 1}</Num>}
                </span>
                <span className={`text-xs font-medium sm:text-sm ${active ? "font-bold text-slate-900" : "text-slate-400"}`}>
                  {s}
                </span>
              </div>
              {i < steps.length - 1 && <span className={`mx-3 h-px w-8 sm:w-16 ${i < step ? "bg-success" : "bg-slate-200"}`} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>

      {/* Step 1: plan */}
      {step === 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {plans.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setPlanId(p.id)}
                aria-pressed={planId === p.id}
                className={`cursor-pointer rounded-(--radius-card) border-2 bg-white p-5 text-right transition-all ${
                  planId === p.id ? "border-primary-600 shadow-(--shadow-float)" : "border-slate-200 hover:border-primary-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-slate-900">{p.name}</span>
                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      planId === p.id ? "border-primary-600 bg-primary-600" : "border-slate-300"
                    }`}
                    aria-hidden="true"
                  >
                    {planId === p.id && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </span>
                </div>
                <p className="mt-3">
                  <Num className="text-xl font-black text-slate-900">{formatToman(p.yearly)}</Num>
                  <span className="mr-1 text-[11px] text-slate-400">تومان / ماه</span>
                </p>
                <p className="mt-1 text-[11px] text-slate-400">{p.tagline}</p>
              </button>
            ))}
          </div>

          <div className="card flex flex-col gap-3 p-5 sm:flex-row">
            <div className="relative flex-1">
              <TicketPercent className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input type="text" dir="ltr" placeholder="کد تخفیف" aria-label="کد تخفیف" className="input pr-12 text-left" />
            </div>
            <button type="button" className="btn btn-outline-primary btn-lg">اعمال</button>
          </div>

          <div className="flex justify-end">
            <button type="button" onClick={() => setStep(1)} className="btn btn-primary btn-lg">
              ادامه
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: payment info */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-900">خلاصه سفارش</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">پلن {plan.name} — سالانه</dt>
                <dd><Num className="font-medium text-slate-800">{formatToman(yearlyTotal)}</Num> <span className="text-xs text-slate-400">تومان</span></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">تخفیف پرداخت سالانه</dt>
                <dd className="text-success"><Num className="font-medium">{formatToman(discount)}-</Num> <span className="text-xs">تومان</span></dd>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3">
                <dt className="font-bold text-slate-900">مبلغ قابل پرداخت</dt>
                <dd><Num className="text-lg font-black text-primary-700">{formatToman(final)}</Num> <span className="text-xs text-slate-400">تومان</span></dd>
              </div>
            </dl>
          </div>

          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-900">روش پرداخت</h2>
            <div className="mt-4 space-y-3">
              {(
                [
                  { id: "gateway", icon: Landmark, title: "درگاه بانکی", desc: "پرداخت آنلاین با همه کارت‌های عضو شتاب" },
                  { id: "wallet", icon: Wallet, title: "کیف پول دانش‌آرا", desc: <>موجودی: <Num>120,000</Num> تومان</> },
                ] as const
              ).map(({ id, icon: Icon, title, desc }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMethod(id)}
                  aria-pressed={method === id}
                  className={`flex w-full cursor-pointer items-center gap-4 rounded-(--radius-card) border-2 p-4 text-right transition-colors ${
                    method === id ? "border-primary-600 bg-primary-50/50" : "border-slate-200 bg-white hover:border-primary-300"
                  }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-(--radius-btn) ${method === id ? "bg-primary-100" : "bg-slate-100"}`}>
                    <Icon className={`h-5 w-5 ${method === id ? "text-primary-700" : "text-slate-400"}`} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-slate-900">{title}</span>
                    <span className="mt-0.5 block text-xs text-slate-400">{desc}</span>
                  </span>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${method === id ? "border-primary-600 bg-primary-600" : "border-slate-300"}`} aria-hidden="true">
                    {method === id && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                  </span>
                </button>
              ))}
            </div>
            <label className="mt-5 flex cursor-pointer items-start gap-2 text-xs leading-6 text-slate-500">
              <input type="checkbox" defaultChecked className="mt-1 h-4.5 w-4.5 rounded border-slate-300" />
              <span>
                <Link href="/terms" className="font-medium text-primary-700 hover:underline">قوانین و مقررات</Link> و شرایط اشتراک را می‌پذیرم
              </span>
            </label>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(0)} className="btn btn-ghost btn-lg min-w-0">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
              بازگشت
            </button>
            <button type="button" onClick={() => setStep(2)} className="btn btn-primary btn-lg">
              ادامه
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: confirm */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-base font-extrabold text-slate-900">تایید نهایی</h2>
            <dl className="mt-4 space-y-3 text-sm">
              {[
                ["پلن انتخابی", <>حرفه‌ای — سالانه</>],
                ["روش پرداخت", method === "gateway" ? "درگاه بانکی (شتاب)" : "کیف پول دانش‌آرا"],
                ["مدت اشتراک", <><Num>12</Num> ماه — تا <Num>1405/07/30</Num></>],
              ].map(([k, v], i) => (
                <div key={i} className="flex justify-between">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-medium text-slate-800">{v}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-slate-100 pt-3">
                <dt className="font-bold text-slate-900">مبلغ قابل پرداخت</dt>
                <dd><Num className="text-lg font-black text-primary-700">{formatToman(final)}</Num> <span className="text-xs text-slate-400">تومان</span></dd>
              </div>
            </dl>
            <p className="mt-5 flex items-center gap-1.5 rounded-(--radius-btn) bg-success-light p-3 text-xs text-success-dark">
              <ShieldCheck className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
              پس از کلیک، به درگاه امن پرداخت منتقل می‌شوید. اطلاعات کارت شما نزد ما ذخیره نمی‌شود.
            </p>
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(1)} className="btn btn-ghost btn-lg min-w-0">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
              بازگشت
            </button>
            <Link href="/checkout/success" className="btn btn-primary btn-lg">
              پرداخت <Num>{formatToman(final)}</Num> تومان
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
