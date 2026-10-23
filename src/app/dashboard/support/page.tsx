import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { tickets } from "@/lib/data";
import { Num } from "@/components/ui";
import { ChipTabs } from "@/components/interactive";

export const metadata: Metadata = { title: "پشتیبانی" };

const statusColor: Record<string, string> = {
  "باز": "badge-info",
  "در حال بررسی": "badge-warning",
  "پاسخ داده شده": "badge-success",
  "بسته شده": "badge-neutral",
};

export default function SupportPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <ChipTabs options={["همه", "باز", "پاسخ داده شده", "بسته شده"]} />
        <Link href="/dashboard/support/new" className="btn btn-primary btn-md shrink-0">
          <Plus className="h-4 w-4" aria-hidden="true" />
          ارسال تیکت جدید
        </Link>
      </div>

      <div className="space-y-3">
        {tickets.map((t) => (
          <Link key={t.id} href={`/dashboard/support/${t.id}`} className="card card-hover block p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <Num className="shrink-0 text-xs font-bold text-slate-400">{t.id}</Num>
                <h2 className="truncate text-sm font-bold text-slate-900">{t.subject}</h2>
              </div>
              <span className={`badge shrink-0 ${statusColor[t.status]}`}>{t.status}</span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-slate-400">
              <span>دپارتمان: <span className="font-medium text-slate-600">{t.dept}</span></span>
              <span>ایجاد: <Num>{t.created}</Num></span>
              <span>آخرین به‌روزرسانی: <Num>{t.updated}</Num></span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
