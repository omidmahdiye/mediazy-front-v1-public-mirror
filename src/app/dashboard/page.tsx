import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  Flame,
  Award,
  PlayCircle,
  ChevronLeft,
  NotebookPen,
  Eye,
} from "lucide-react";
import { courses, user, activities } from "@/lib/data";
import { Num, ProgressBar, SectionHeader } from "@/components/ui";
import { CourseCard, CourseThumb } from "@/components/cards";

export const metadata: Metadata = { title: "داشبورد" };

const stats = [
  { icon: Clock, value: "86", label: "ساعت یادگیری" },
  { icon: CheckCircle2, value: "2", label: "دوره تکمیل‌شده" },
  { icon: Flame, value: "12", label: "روز متوالی" },
  { icon: Award, value: "2", label: "گواهینامه" },
];

const activityIcons = { watch: Eye, note: NotebookPen, complete: CheckCircle2, cert: Award } as const;

export default function DashboardHome() {
  const inProgress = courses.filter((c) => c.progress !== undefined);
  const recommended = courses.filter((c) => c.progress === undefined).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Welcome + subscription */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <section className="card p-6 lg:col-span-2">
          <p className="text-xs text-slate-400">امروز، <Num>1404/07/30</Num></p>
          <h2 className="mt-2 text-xl font-extrabold text-slate-900">سلام {user.name.split(" ")[0]}، خوش برگشتی</h2>
          <p className="mt-2 text-sm text-slate-500">
            این هفته <Num className="font-bold text-primary-700">4 ساعت و 20 دقیقه</Num> یاد گرفته‌اید — از{" "}
            <Num>78%</Num> کاربران جلوترید.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="rounded-(--radius-card) bg-slate-50 p-4">
                <Icon className="h-5 w-5 text-primary-600" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-2 text-xl font-black text-slate-900"><Num>{value}</Num></p>
                <p className="text-[11px] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card flex flex-col p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900">اشتراک من</h2>
            <span className="badge badge-success">فعال</span>
          </div>
          <p className="mt-3 text-lg font-black text-primary-700">پلن {user.plan} — سالانه</p>
          <p className="mt-1 text-xs text-slate-400">
            اعتبار تا <Num>{user.planEnd}</Num> (<Num>{user.daysLeft}</Num> روز باقی‌مانده)
          </p>
          <div className="mt-4">
            <ProgressBar value={user.periodUsedPct} />
            <p className="mt-1.5 text-[11px] text-slate-400"><Num>{user.periodUsedPct}%</Num> از دوره اشتراک استفاده شده</p>
          </div>
          <Link href="/dashboard/subscription" className="btn btn-outline-primary btn-md mt-auto w-full pt-0.5">
            مدیریت اشتراک
          </Link>
        </section>
      </div>

      {/* Continue learning */}
      <section>
        <SectionHeader title="ادامه یادگیری" href="/dashboard/courses" />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {inProgress.map((course) => (
            <div key={course.slug} className="card card-hover flex overflow-hidden">
              <div className="w-36 shrink-0 sm:w-48">
                <CourseThumb course={course} className="h-full rounded-r-(--radius-card)" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-4">
                <h3 className="line-clamp-1 text-sm font-bold text-slate-900">{course.title}</h3>
                <p className="mt-1 line-clamp-1 text-[11px] text-slate-400">
                  آخرین درس: Props و ترکیب کامپوننت‌ها
                </p>
                <div className="mt-3">
                  <div className="mb-1.5 flex justify-between text-[11px]">
                    <span className="text-slate-400">پیشرفت</span>
                    <Num className="font-bold text-primary-700">{course.progress}%</Num>
                  </div>
                  <ProgressBar value={course.progress!} />
                </div>
                <Link href={`/player/${course.slug}`} className="btn btn-primary btn-sm mt-auto w-fit min-w-24">
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  ادامه
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Activity */}
        <section className="lg:col-span-1">
          <h2 className="mb-5 text-lg font-extrabold text-slate-900">فعالیت‌های اخیر</h2>
          <div className="card p-5">
            <ol className="space-y-5">
              {activities.map((a, i) => {
                const Icon = activityIcons[a.type as keyof typeof activityIcons];
                return (
                  <li key={i} className="relative flex gap-3">
                    {i < activities.length - 1 && (
                      <span className="absolute top-9 right-[17px] h-[calc(100%-16px)] w-px bg-slate-100" aria-hidden="true" />
                    )}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50">
                      <Icon className="h-4 w-4 text-primary-700" strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs leading-5 font-medium text-slate-700">{a.text}</p>
                      <p className="mt-0.5 text-[11px] text-slate-400"><Num>{a.time}</Num></p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Recommended */}
        <section className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">پیشنهاد برای شما</h2>
            <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-medium text-primary-700 hover:text-primary-800">
              مرور دوره‌ها
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {recommended.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
