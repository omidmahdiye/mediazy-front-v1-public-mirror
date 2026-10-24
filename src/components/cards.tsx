import Link from "next/link";
import { Clock, Captions, Mic, BookmarkPlus, CalendarDays } from "lucide-react";
import {
  type Course,
  type Article,
  type Instructor,
  getInstructor,
  getCategory,
} from "@/lib/data";
import { DataIcon, Num, Rating, Avatar, ProgressBar } from "./ui";

/* Flat illustrated thumbnail — layered surfaces, no stock photos */
export function CourseThumb({ course, className = "" }: { course: Course; className?: string }) {
  const cat = getCategory(course.category)!;
  return (
    <div className={`relative aspect-video overflow-hidden ${cat.color} ${className}`}>
      {/* layered flat shapes */}
      <span className="absolute -top-8 -left-8 h-36 w-36 rounded-full bg-white/10" aria-hidden="true" />
      <span className="absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-black/10" aria-hidden="true" />
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="flex h-16 w-16 items-center justify-center rounded-(--radius-card) bg-white/15 backdrop-blur-sm">
          <DataIcon name={course.icon} className="h-8 w-8 text-white" strokeWidth={1.5} />
        </span>
      </span>
      {/* English title as subtle texture */}
      <span
        className="absolute bottom-3 left-1/2 w-full -translate-x-1/2 px-4 text-center text-[11px] font-medium tracking-normal text-white/50"
        dir="ltr"
        aria-hidden="true"
      >
        {course.titleEn}
      </span>
    </div>
  );
}

export function CourseCard({
  course,
  showProgress = false,
}: {
  course: Course;
  showProgress?: boolean;
}) {
  const instructor = getInstructor(course.instructor)!;
  const cat = getCategory(course.category)!;
  return (
    <article className="card card-hover group relative overflow-hidden">
      <Link href={`/courses/${course.slug}`} className="absolute inset-0 z-10" aria-label={course.title} />
      <div className="relative overflow-hidden rounded-t-(--radius-card)">
        <div className="transition-transform duration-300 group-hover:scale-[1.03]">
          <CourseThumb course={course} />
        </div>
        {/* duration badge — bottom right visually (RTL start) */}
        <span className="badge badge-dark absolute bottom-2 right-2">
          <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
          <Num>{course.hours}</Num> ساعت
        </span>
        {/* language badge */}
        <span className="badge badge-dark absolute bottom-2 left-2" dir="ltr">
          EN
          {course.dubbed && <Mic className="h-3 w-3" strokeWidth={2} aria-label="دوبله فارسی" />}
          {course.subtitled && <Captions className="h-3.5 w-3.5" strokeWidth={2} aria-label="زیرنویس فارسی" />}
        </span>
        {course.isNew && <span className="badge badge-accent absolute top-2 right-2 bg-accent-400 text-slate-900">جدید</span>}
      </div>

      <div className="p-4">
        <span className="badge badge-primary">{cat.title}</span>
        <h3 className="mt-2.5 line-clamp-2 min-h-[48px] text-base font-bold text-slate-900 transition-colors group-hover:text-primary-700">
          {course.title}
        </h3>
        <div className="mt-2 flex items-center gap-2">
          <Avatar initials={instructor.initials} color={instructor.avatarColor} size="xs" />
          <span className="text-xs text-slate-500">{instructor.name}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Rating value={course.rating} />
          <span className="text-xs text-slate-400">
            <Num>{course.students.toLocaleString("en-US")}</Num> دانشجو
          </span>
        </div>
        {showProgress && course.progress !== undefined && (
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-slate-500">پیشرفت شما</span>
              <Num className="font-bold text-primary-700">{course.progress}%</Num>
            </div>
            <ProgressBar value={course.progress} />
          </div>
        )}
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          {course.access === "free" ? (
            <span className="badge badge-success">رایگان</span>
          ) : (
            <span className="badge badge-neutral">شامل اشتراک</span>
          )}
          <span className="relative z-20 inline-flex items-center gap-1 text-xs font-medium text-slate-400">
            <BookmarkPlus className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            نشان کردن
          </span>
        </div>
      </div>
    </article>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  const author = getInstructor(article.author)!;
  return (
    <article className="card card-hover group relative overflow-hidden">
      <Link href={`/blog/${article.slug}`} className="absolute inset-0 z-10" aria-label={article.title} />
      <div className={`relative aspect-video overflow-hidden rounded-t-(--radius-card) ${article.color}`}>
        <span className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10" aria-hidden="true" />
        <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <DataIcon name={article.icon} className="h-10 w-10 text-white/80" strokeWidth={1.2} />
        </span>
      </div>
      <div className="p-4">
        <span className="badge badge-primary">{article.category}</span>
        <h3 className="mt-2.5 line-clamp-2 min-h-[48px] text-base font-bold text-slate-900 transition-colors group-hover:text-primary-700">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-6 text-slate-500">{article.excerpt}</p>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <Avatar initials={author.initials} color={author.avatarColor} size="xs" />
            {author.name}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
            <Num>{article.date}</Num>
          </span>
        </div>
      </div>
    </article>
  );
}

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article className="card card-hover relative p-6 text-center">
      <Link href={`/instructors/${instructor.slug}`} className="absolute inset-0 z-10" aria-label={instructor.name} />
      <Avatar initials={instructor.initials} color={instructor.avatarColor} size="lg" className="mx-auto" />
      <h3 className="mt-4 text-base font-bold text-slate-900">{instructor.name}</h3>
      <p className="mt-1 line-clamp-1 text-xs text-slate-500">{instructor.title}</p>
      <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-500">
        <span>
          <Num className="font-bold text-slate-800">{instructor.courses}</Num> دوره
        </span>
        <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
        <span>
          <Num className="font-bold text-slate-800">{(instructor.students / 1000).toFixed(1)}K</Num> دانشجو
        </span>
        <span className="h-3 w-px bg-slate-200" aria-hidden="true" />
        <Rating value={instructor.rating} />
      </div>
    </article>
  );
}
