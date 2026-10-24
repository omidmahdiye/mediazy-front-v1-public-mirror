import type { Metadata } from "next";
import { FileDown, ChevronDown } from "lucide-react";
import { payments, formatToman } from "@/lib/data";
import { Num } from "@/components/ui";

export const metadata: Metadata = { title: "تاریخچه پرداخت‌ها" };

export default function PaymentsPage() {
  return (
    <div className="mx-auto max-w-5xl">
      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {["همه وضعیت‌ها", "بازه زمانی"].map((f) => (
          <button key={f} type="button" className="flex h-10 cursor-pointer items-center gap-2 rounded-(--radius-btn) border border-slate-300 bg-white px-4 text-xs text-slate-600 transition-colors hover:border-primary-400">
            {f}
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="card hidden overflow-hidden md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-right text-xs text-slate-500">
              <th scope="col" className="px-5 py-3.5 font-medium">شماره فاکتور</th>
              <th scope="col" className="px-5 py-3.5 font-medium">تاریخ</th>
              <th scope="col" className="px-5 py-3.5 font-medium">شرح</th>
              <th scope="col" className="px-5 py-3.5 font-medium">مبلغ (تومان)</th>
              <th scope="col" className="px-5 py-3.5 font-medium">وضعیت</th>
              <th scope="col" className="px-5 py-3.5 font-medium">فاکتور</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id} className="border-t border-slate-100 transition-colors hover:bg-slate-50/60">
                <td className="px-5 py-4"><Num className="font-medium text-slate-700">{p.id}</Num></td>
                <td className="px-5 py-4"><Num className="text-slate-500">{p.date}</Num></td>
                <td className="px-5 py-4 text-slate-700">{p.desc}</td>
                <td className="px-5 py-4"><Num className="font-bold text-slate-900">{formatToman(p.amount)}</Num></td>
                <td className="px-5 py-4">
                  <span className={`badge ${p.status === "موفق" ? "badge-success" : "badge-error"}`}>{p.status}</span>
                </td>
                <td className="px-5 py-4">
                  <button type="button" aria-label={`دانلود فاکتور ${p.id}`} className="btn btn-ghost btn-icon h-8 w-8">
                    <FileDown className="h-4 w-4" strokeWidth={1.8} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {payments.map((p) => (
          <div key={p.id} className="card p-4">
            <div className="flex items-center justify-between">
              <Num className="text-xs font-bold text-slate-700">{p.id}</Num>
              <span className={`badge ${p.status === "موفق" ? "badge-success" : "badge-error"}`}>{p.status}</span>
            </div>
            <p className="mt-2 text-sm font-medium text-slate-800">{p.desc}</p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <Num className="text-xs text-slate-400">{p.date}</Num>
              <div className="flex items-center gap-3">
                <Num className="text-sm font-black text-slate-900">{formatToman(p.amount)}</Num>
                <button type="button" aria-label={`دانلود فاکتور ${p.id}`} className="btn btn-ghost btn-icon h-8 w-8">
                  <FileDown className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
