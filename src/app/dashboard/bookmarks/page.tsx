import type { Metadata } from "next";
import Link from "next/link";
import { X, Bookmark } from "lucide-react";
import { courses } from "@/lib/data";
import { EmptyState } from "@/components/ui";
import { CourseCard } from "@/components/cards";

export const metadata: Metadata = { title: "نشان‌شده‌ها" };

export default function BookmarksPage() {
  const saved = [courses[4], courses[6], courses[10]];

  return (
    <div className="mx-auto max-w-6xl">
      {saved.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((c) => (
            <div key={c.slug} className="relative">
              <button
                type="button"
                aria-label={`حذف ${c.title} از نشان‌شده‌ها`}
                className="absolute -top-2 -left-2 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 shadow-(--shadow-card) transition-colors hover:border-error hover:text-error"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <CourseCard course={c} />
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            icon={Bookmark}
            title="دوره‌ای را نشان نکرده‌اید"
            description="دوره‌های موردعلاقه خود را نشان کنید تا بعدا راحت پیدایشان کنید."
            action={<Link href="/courses" className="btn btn-primary btn-md">مرور دوره‌ها</Link>}
          />
        </div>
      )}
    </div>
  );
}
