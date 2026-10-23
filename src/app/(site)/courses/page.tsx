import type { Metadata } from "next";
import { Search, SlidersHorizontal, LayoutGrid, List, ChevronDown, X, ChevronRight, ChevronLeft } from "lucide-react";
import { courses } from "@/lib/data";
import { PageHeader, Num } from "@/components/ui";
import { CourseCard } from "@/components/cards";

export const metadata: Metadata = { title: "دوره‌های آموزشی" };

function FilterSelect({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-11 cursor-pointer items-center justify-between gap-2 rounded-(--radius-btn) border border-slate-300 bg-white px-4 text-sm text-slate-600 transition-colors hover:border-primary-400"
    >
      {label}
      <ChevronDown className="h-4 w-4 text-slate-400" aria-hidden="true" />
    </button>
  );
}

export default function CoursesPage() {
  return (
    <>
      <PageHeader
        title="دوره‌های آموزشی"
        description="میان صدها دوره معتبر بین‌المللی جستجو کنید؛ همه با دوبله یا زیرنویس فارسی در دسترس شماست."
        crumbs={[{ label: "صفحه اصلی", href: "/" }, { label: "دوره‌ها" }]}
      />

      <div className="container-site py-8">
        {/* Search + filters */}
        <div className="card p-4 md:p-5">
          <div className="relative">
            <Search className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input type="search" placeholder="جستجوی دوره..." aria-label="جستجوی دوره" className="input pr-12" />
          </div>
          <div className="mt-4 hidden grid-cols-4 gap-3 md:grid">
            <FilterSelect label="دسته‌بندی" />
            <FilterSelect label="سطح دوره" />
            <FilterSelect label="زبان و ترجمه" />
            <FilterSelect label="مرتب‌سازی: محبوب‌ترین" />
          </div>
          <button type="button" className="btn btn-outline btn-md mt-4 w-full md:hidden">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            فیلترها
          </button>
          {/* active filter chips */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {["دوبله فارسی", "سطح متوسط"].map((f) => (
              <span key={f} className="badge badge-primary h-7 gap-1.5 px-3">
                {f}
                <button type="button" aria-label={`حذف فیلتر ${f}`} className="cursor-pointer rounded-full hover:bg-primary-100">
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ))}
            <button type="button" className="cursor-pointer text-xs font-medium text-slate-400 transition-colors hover:text-error">
              پاک کردن فیلترها
            </button>
          </div>
        </div>

        {/* results info */}
        <div className="mt-6 mb-5 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            <Num className="font-bold text-slate-800">{courses.length * 10 + 4}</Num> دوره یافت شد
          </p>
          <div className="hidden items-center gap-1 rounded-(--radius-btn) border border-slate-200 bg-white p-1 md:flex" role="group" aria-label="نحوه نمایش">
            <button type="button" aria-label="نمایش شبکه‌ای" className="rounded-lg bg-primary-50 p-1.5 text-primary-700">
              <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" aria-label="نمایش فهرستی" className="cursor-pointer rounded-lg p-1.5 text-slate-400 hover:text-slate-600">
              <List className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>

        {/* pagination */}
        <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="صفحه‌بندی">
          <button type="button" aria-label="صفحه قبل" className="btn btn-outline btn-icon h-10 w-10" disabled>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              aria-current={n === 1 ? "page" : undefined}
              className={`btn btn-icon h-10 w-10 text-sm ${n === 1 ? "btn-primary" : "btn-outline"}`}
            >
              <Num>{n}</Num>
            </button>
          ))}
          <span className="px-1 text-slate-400">…</span>
          <button type="button" className="btn btn-outline btn-icon h-10 w-10 text-sm">
            <Num>11</Num>
          </button>
          <button type="button" aria-label="صفحه بعد" className="btn btn-outline btn-icon h-10 w-10">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </>
  );
}
