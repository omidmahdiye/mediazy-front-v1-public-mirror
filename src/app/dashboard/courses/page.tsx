import type { Metadata } from "next";
import Link from "next/link";
import { Search, PlayCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { courses } from "@/lib/data";
import { Num, ProgressBar } from "@/components/ui";
import { CourseThumb } from "@/components/cards";
import { Tabs } from "@/components/interactive";

export const metadata: Metadata = { title: "دوره‌های من" };

function EnrolledCard({ slug, completed }: { slug: string; completed?: boolean }) {
  const course = courses.find((c) => c.slug === slug)!;
  const progress = completed ? 100 : (course.progress ?? 0);
  return (
    <div className="card card-hover flex overflow-hidden">
      <div className="relative w-36 shrink-0 sm:w-44">
        <CourseThumb course={course} className="h-full rounded-r-(--radius-card)" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-sm font-bold text-slate-900">{course.title}</h3>
          {completed && (
            <span className="badge badge-success shrink-0">
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              تکمیل شده
            </span>
          )}
        </div>
        <p className="mt-1 text-[11px] text-slate-400">
          آخرین فعالیت: <Num>{completed ? "1404/04/18" : "1404/07/29"}</Num>
        </p>
        <div className="mt-3">
          <div className="mb-1.5 flex justify-between text-[11px]">
            <span className="text-slate-400">پیشرفت</span>
            <Num className={`font-bold ${completed ? "text-success" : "text-primary-700"}`}>{progress}%</Num>
          </div>
          <ProgressBar value={progress} tone={completed ? "success" : "primary"} />
        </div>
        <Link
          href={`/player/${course.slug}`}
          className={`btn btn-sm mt-auto w-fit min-w-28 ${completed ? "btn-outline" : "btn-primary"}`}
        >
          {completed ? (
            <>
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              مشاهده مجدد
            </>
          ) : (
            <>
              <PlayCircle className="h-4 w-4" aria-hidden="true" />
              ادامه
            </>
          )}
        </Link>
      </div>
    </div>
  );
}

export default function MyCoursesPage() {
  const learning = courses.filter((c) => c.progress !== undefined).map((c) => c.slug);
  const done = ["python-for-data", "modern-marketing"];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-slate-500">
          <Num className="font-bold text-slate-800">{learning.length + done.length}</Num> دوره در حساب شما
        </p>
        <div className="relative w-full sm:w-72">
          <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input type="search" placeholder="جستجو در دوره‌های من..." aria-label="جستجو در دوره‌های من" className="input h-10 rounded-(--radius-btn) pr-9 text-xs" />
        </div>
      </div>

      <Tabs
        tabs={[
          {
            label: <>در حال یادگیری <Num className="mr-1 text-xs text-slate-400">({learning.length})</Num></>,
            content: (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {learning.map((slug) => (
                  <EnrolledCard key={slug} slug={slug} />
                ))}
              </div>
            ),
          },
          {
            label: <>تکمیل شده <Num className="mr-1 text-xs text-slate-400">({done.length})</Num></>,
            content: (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {done.map((slug) => (
                  <EnrolledCard key={slug} slug={slug} completed />
                ))}
              </div>
            ),
          },
          {
            label: <>همه <Num className="mr-1 text-xs text-slate-400">({learning.length + done.length})</Num></>,
            content: (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {learning.map((slug) => (
                  <EnrolledCard key={slug} slug={slug} />
                ))}
                {done.map((slug) => (
                  <EnrolledCard key={slug} slug={slug} completed />
                ))}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
