import type { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronDown, NotebookPen, PlayCircle, Clock } from "lucide-react";
import { notes } from "@/lib/data";
import { Num, EmptyState } from "@/components/ui";

export const metadata: Metadata = { title: "یادداشت‌های من" };

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input type="search" placeholder="جستجو در یادداشت‌ها..." aria-label="جستجو در یادداشت‌ها" className="input h-10 rounded-(--radius-btn) pr-9 text-xs" />
        </div>
        <button type="button" className="flex h-10 cursor-pointer items-center justify-between gap-2 rounded-(--radius-btn) border border-slate-300 bg-white px-4 text-xs text-slate-600 transition-colors hover:border-primary-400 sm:w-56">
          همه دوره‌ها
          <ChevronDown className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
        </button>
      </div>

      {notes.length > 0 ? (
        <div className="space-y-3">
          {notes.map((n) => (
            <article key={n.id} className="card card-hover relative p-5">
              <Link href="/player/react-complete-guide" className="absolute inset-0 z-10" aria-label={`رفتن به ${n.lesson} در ${n.time}`} />
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                <span className="font-bold text-primary-700">{n.course}</span>
                <span aria-hidden="true">•</span>
                <span>{n.lesson}</span>
                <span className="badge badge-neutral mr-auto">
                  <PlayCircle className="h-3 w-3" aria-hidden="true" />
                  <Num>{n.time}</Num>
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-slate-700">{n.text}</p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="h-3 w-3" aria-hidden="true" />
                ثبت شده در <Num>{n.date}</Num>
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            icon={NotebookPen}
            title="یادداشتی ثبت نشده است"
            description="در حین تماشای دوره‌ها می‌توانید یادداشت با تایم‌استمپ ثبت کنید."
            action={<Link href="/dashboard/courses" className="btn btn-primary btn-md">رفتن به دوره‌های من</Link>}
          />
        </div>
      )}
    </div>
  );
}
