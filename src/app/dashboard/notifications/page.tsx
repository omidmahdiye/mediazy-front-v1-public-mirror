import type { Metadata } from "next";
import { PlaySquare, CreditCard, RefreshCcw, Megaphone, Flame, CheckCheck } from "lucide-react";
import { notifications } from "@/lib/data";
import { Num } from "@/components/ui";
import { ChipTabs } from "@/components/interactive";

export const metadata: Metadata = { title: "اعلان‌ها" };

const typeIcons = {
  course: PlaySquare,
  payment: CreditCard,
  update: RefreshCcw,
  system: Megaphone,
  reminder: Flame,
} as const;

export default function NotificationsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <ChipTabs options={["همه", "خوانده نشده"]} />
        <button type="button" className="btn btn-ghost btn-sm min-w-0 shrink-0 text-primary-700">
          <CheckCheck className="h-4 w-4" aria-hidden="true" />
          خواندن همه
        </button>
      </div>

      <div className="card divide-y divide-slate-100 overflow-hidden">
        {notifications.map((n) => {
          const Icon = typeIcons[n.type as keyof typeof typeIcons];
          return (
            <button
              key={n.id}
              type="button"
              className={`flex w-full cursor-pointer items-start gap-4 px-5 py-4 text-right transition-colors hover:bg-slate-50 ${
                n.unread ? "bg-primary-50/40" : ""
              }`}
            >
              <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${n.unread ? "bg-primary-100" : "bg-slate-100"}`}>
                <Icon className={`h-5 w-5 ${n.unread ? "text-primary-700" : "text-slate-400"}`} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className={`text-sm ${n.unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>{n.title}</span>
                  {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-primary-600" aria-label="خوانده نشده" />}
                </span>
                <span className="mt-1 block text-xs leading-6 text-slate-500">{n.desc}</span>
                <Num className="mt-1.5 block text-[11px] text-slate-400">{n.time}</Num>
              </span>
            </button>
          );
        })}
      </div>

      <button type="button" className="btn btn-outline btn-md mt-6 w-full">نمایش اعلان‌های قدیمی‌تر</button>
    </div>
  );
}
