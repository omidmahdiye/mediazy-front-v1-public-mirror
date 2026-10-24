import type { Metadata } from "next";
import { Search } from "lucide-react";
import { courses, articles, instructors } from "@/lib/data";
import { Num } from "@/components/ui";
import { CourseCard, ArticleCard, InstructorCard } from "@/components/cards";
import { Tabs } from "@/components/interactive";

export const metadata: Metadata = { title: "نتایج جستجو" };

export default function SearchPage() {
  const foundCourses = courses.slice(0, 6);
  const foundArticles = articles.slice(0, 3);
  const foundInstructors = instructors.slice(0, 2);
  const total = foundCourses.length + foundArticles.length + foundInstructors.length;

  return (
    <div className="container-site section-pad">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">جستجو</h1>
        <div className="relative mt-6">
          <Search className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input type="search" defaultValue="یادگیری ماشین" aria-label="جستجو" className="input h-14 pr-12 text-base" />
        </div>
        <p className="mt-4 text-sm text-slate-500">
          <Num className="font-bold text-slate-800">{total}</Num> نتیجه برای «یادگیری ماشین» یافت شد
        </p>
      </div>

      <div className="mt-10">
        <Tabs
          tabs={[
            {
              label: (
                <>
                  همه <Num className="mr-1 text-xs text-slate-400">({total})</Num>
                </>
              ),
              content: (
                <div className="space-y-12">
                  <section>
                    <h2 className="mb-5 text-lg font-extrabold text-slate-900">دوره‌ها</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {foundCourses.slice(0, 3).map((c) => (
                        <CourseCard key={c.slug} course={c} />
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className="mb-5 text-lg font-extrabold text-slate-900">مقالات</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {foundArticles.map((a) => (
                        <ArticleCard key={a.slug} article={a} />
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2 className="mb-5 text-lg font-extrabold text-slate-900">مدرسین</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      {foundInstructors.map((i) => (
                        <InstructorCard key={i.slug} instructor={i} />
                      ))}
                    </div>
                  </section>
                </div>
              ),
            },
            {
              label: (
                <>
                  دوره‌ها <Num className="mr-1 text-xs text-slate-400">({foundCourses.length})</Num>
                </>
              ),
              content: (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {foundCourses.map((c) => (
                    <CourseCard key={c.slug} course={c} />
                  ))}
                </div>
              ),
            },
            {
              label: (
                <>
                  مقالات <Num className="mr-1 text-xs text-slate-400">({foundArticles.length})</Num>
                </>
              ),
              content: (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {foundArticles.map((a) => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
              ),
            },
            {
              label: (
                <>
                  مدرسین <Num className="mr-1 text-xs text-slate-400">({foundInstructors.length})</Num>
                </>
              ),
              content: (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {foundInstructors.map((i) => (
                    <InstructorCard key={i.slug} instructor={i} />
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
