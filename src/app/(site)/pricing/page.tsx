import type { Metadata } from "next";
import { Check, Minus, ShieldCheck, Users, CreditCard } from "lucide-react";
import { plans, faqs } from "@/lib/data";
import { Num } from "@/components/ui";
import { Accordion } from "@/components/interactive";
import PricingPlans from "./pricing-plans";

export const metadata: Metadata = { title: "تعرفه اشتراک" };

const comparison: { feature: string; values: (string | boolean)[] }[] = [
  { feature: "تعداد دوره‌های قابل دسترس", values: ["250+", "350+", "350+"] },
  { feature: "زیرنویس فارسی و انگلیسی", values: [true, true, true] },
  { feature: "دوبله فارسی", values: [false, true, true] },
  { feature: "دستگاه‌های هم‌زمان", values: ["1", "2", "5"] },
  { feature: "دانلود برای تماشای آفلاین", values: [false, true, true] },
  { feature: "دوره‌های پریمیوم", values: [false, true, true] },
  { feature: "گواهینامه پایان دوره", values: [false, true, true] },
  { feature: "داشبورد گزارش تیمی", values: [false, false, true] },
  { feature: "پشتیبانی", values: ["استاندارد", "استاندارد", "اولویت‌دار"] },
];

export default function PricingPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-white">
        <div className="container-site py-12 text-center lg:py-16">
          <h1 className="text-3xl font-black text-slate-900 md:text-5xl">تعرفه اشتراک</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-500 md:text-base">
            با خرید اشتراک به تمامی دوره‌ها دسترسی نامحدود داشته باشید؛ هر زمان خواستید لغو کنید.
          </p>
          <div className="mt-10">
            <PricingPlans />
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-pad">
        <div className="container-site">
          <h2 className="mb-6 text-center text-xl font-extrabold text-slate-900 md:text-2xl">مقایسه کامل پلن‌ها</h2>
          <div className="scrollbar-none mx-auto max-w-4xl overflow-x-auto">
            <table className="w-full min-w-[560px] border-separate border-spacing-0 overflow-hidden rounded-(--radius-card) border border-slate-200 bg-white text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-900">
                  <th scope="col" className="border-b border-slate-200 px-5 py-4 text-right font-bold">امکانات</th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col" className={`border-b border-slate-200 px-5 py-4 text-center font-bold ${p.recommended ? "text-primary-700" : ""}`}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, ri) => (
                  <tr key={row.feature} className={ri % 2 === 1 ? "bg-slate-50/50" : ""}>
                    <th scope="row" className="px-5 py-3.5 text-right font-medium text-slate-600">{row.feature}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-5 py-3.5 text-center text-slate-600">
                        {v === true ? (
                          <Check className="mx-auto h-5 w-5 text-success" strokeWidth={2} aria-label="دارد" />
                        ) : v === false ? (
                          <Minus className="mx-auto h-5 w-5 text-slate-300" strokeWidth={2} aria-label="ندارد" />
                        ) : (
                          <Num className="font-medium">{v}</Num>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-slate-200 bg-white">
        <div className="container-site grid grid-cols-1 gap-6 py-10 text-center sm:grid-cols-3">
          {[
            { icon: ShieldCheck, title: "ضمانت بازگشت وجه", text: "تا 14 روز، بدون هیچ سوالی" },
            { icon: Users, title: "12,000+ کاربر فعال", text: "به جمع یادگیرنده‌های دانش‌آرا بپیوندید" },
            { icon: CreditCard, title: "پرداخت امن", text: "از طریق درگاه‌های معتبر شتاب" },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                <Icon className="h-6 w-6 text-primary-700" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="text-sm font-bold text-slate-900"><Num>{title}</Num></h3>
              <p className="text-xs text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-pad">
        <div className="container-site mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-xl font-extrabold text-slate-900 md:text-2xl">سوالات متداول</h2>
          <Accordion
            defaultOpen={0}
            items={[...faqs.اشتراک, ...faqs.پرداخت].map((f) => ({ title: f.q, content: f.a }))}
          />
        </div>
      </section>
    </>
  );
}
