import { notFound } from "next/navigation";
import { Globe, AtSign, Star } from "lucide-react";
import { instructors, courses, getInstructor } from "@/lib/data";
import { Breadcrumbs, Num, Avatar, Rating } from "@/components/ui";
import { CourseCard } from "@/components/cards";
import { Tabs } from "@/components/interactive";

export function generateStaticParams() {
  return instructors.map((i) => ({ slug: i.slug }));
}

const sampleReviews = [
  { name: "رضا کاظمی", course: "دوره جامع React و Next.js", rating: 5, text: "شیوه تدریس فوق‌العاده روان و پروژه‌محور. بهترین مدرسی که تا حالا دیده‌ام.", initials: "ر‌ک", color: "bg-primary-600", date: "1404/07/08" },
  { name: "مینا شریفی", course: "تایپ‌اسکریپت عمیق", rating: 5, text: "مفاهیم پیچیده را با مثال‌های ساده توضیح می‌دهد. دوبله هم عالی بود.", initials: "م‌ش", color: "bg-rose-500", date: "1404/06/20" },
];

export default async function InstructorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const instructor = getInstructor(slug);
  if (!instructor) notFound();
  const theirCourses = courses.filter((c) => c.instructor === slug);

  return (
    <>
      {/* profile header */}
      <section className="bg-primary-950">
        <div className="container-site py-10 lg:py-14">
          <Breadcrumbs items={[{ label: "صفحه اصلی", href: "/" }, { label: "مدرسین" }, { label: instructor.name }]} />
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-right">
            <Avatar initials={instructor.initials} color={instructor.avatarColor} size="xl" className="ring-4 ring-white/15" />
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold text-white md:text-3xl">{instructor.name}</h1>
              <p className="mt-1 text-xs text-primary-300" dir="ltr">{instructor.nameEn}</p>
              <p className="mt-2 text-sm text-primary-200">{instructor.title}</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-primary-100 sm:justify-start">
                <span><Num className="font-bold text-white">{instructor.courses}</Num> دوره</span>
                <span><Num className="font-bold text-white">{instructor.students.toLocaleString("en-US")}</Num> دانشجو</span>
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-accent-400 text-accent-400" aria-hidden="true" />
                  <Num className="font-bold text-white">{instructor.rating}</Num>
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {[{ icon: Globe, label: "وب‌سایت" }, { icon: AtSign, label: "شبکه اجتماعی" }].map(({ icon: Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container-site py-8 lg:py-12">
        <Tabs
          tabs={[
            {
              label: <>دوره‌ها <Num className="mr-1 text-xs text-slate-400">({theirCourses.length})</Num></>,
              content: (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {theirCourses.map((c) => (
                    <CourseCard key={c.slug} course={c} />
                  ))}
                </div>
              ),
            },
            {
              label: "درباره",
              content: (
                <div className="card max-w-3xl p-6 md:p-8">
                  <h2 className="text-lg font-extrabold text-slate-900">درباره {instructor.name}</h2>
                  <p className="prose-fa mt-4">{instructor.bio}</p>
                  <p className="prose-fa mt-3">
                    همه دوره‌های {instructor.name} در دانش‌آرا با دوبله یا زیرنویس فارسی در دسترس است و با خرید
                    اشتراک می‌توانید به صورت نامحدود تماشا کنید.
                  </p>
                </div>
              ),
            },
            {
              label: "نظرات",
              content: (
                <div className="max-w-3xl space-y-4">
                  {sampleReviews.map((r) => (
                    <article key={r.name} className="card flex gap-4 p-5">
                      <Avatar initials={r.initials} color={r.color} size="md" />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <h3 className="text-sm font-bold text-slate-800">{r.name}</h3>
                          <Num className="text-[11px] text-slate-400">{r.date}</Num>
                          <Rating value={r.rating} />
                        </div>
                        <p className="mt-1 text-[11px] text-slate-400">{r.course}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{r.text}</p>
                      </div>
                    </article>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
