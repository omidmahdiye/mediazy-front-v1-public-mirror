import type { Metadata } from "next";
import Link from "next/link";
import { Award, Eye, FileDown, Share2 } from "lucide-react";
import { certificates } from "@/lib/data";
import { Num, EmptyState } from "@/components/ui";

export const metadata: Metadata = { title: "گواهینامه‌ها" };

export default function CertificatesPage() {
  return (
    <div className="mx-auto max-w-4xl">
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {certificates.map((c) => (
            <div key={c.id} className="card overflow-hidden">
              {/* mini certificate preview */}
              <div className="relative border-b border-slate-100 bg-slate-50 p-6">
                <div className="rounded-(--radius-card) border-2 border-primary-200 bg-white p-5 text-center">
                  <Award className="mx-auto h-8 w-8 text-accent-500" strokeWidth={1.3} aria-hidden="true" />
                  <p className="mt-2 text-[10px] text-slate-400">گواهینامه پایان دوره</p>
                  <p className="mt-1 text-sm font-extrabold text-slate-900">{c.course}</p>
                  <Num className="mt-1 text-[10px] text-slate-400">{c.id}</Num>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>تاریخ صدور: <Num>{c.date}</Num></span>
                  <span><Num>{c.hours}</Num> ساعت آموزش</span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/dashboard/certificates/${c.id}`} className="btn btn-primary btn-sm flex-1">
                    <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                    مشاهده
                  </Link>
                  <button type="button" className="btn btn-outline btn-sm flex-1">
                    <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                    دانلود
                  </button>
                  <button type="button" aria-label="اشتراک‌گذاری گواهینامه" className="btn btn-outline btn-icon h-8 w-8 min-w-0">
                    <Share2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <EmptyState
            icon={Award}
            title="هنوز گواهینامه‌ای دریافت نکرده‌اید"
            description="با تکمیل هر دوره، گواهینامه معتبر و قابل استعلام دریافت می‌کنید."
            action={<Link href="/dashboard/courses" className="btn btn-primary btn-md">ادامه یادگیری</Link>}
          />
        </div>
      )}
    </div>
  );
}
