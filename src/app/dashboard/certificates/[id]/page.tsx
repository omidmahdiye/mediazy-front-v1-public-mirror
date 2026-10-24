import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, FileDown, Link2, GraduationCap, ShieldCheck, ArrowRight } from "lucide-react";
import { certificates, user } from "@/lib/data";
import { Num } from "@/components/ui";

export function generateStaticParams() {
  return certificates.map((c) => ({ id: c.id }));
}

export default async function CertificateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cert = certificates.find((c) => c.id === id);
  if (!cert) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/dashboard/certificates" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary-700">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        بازگشت به گواهینامه‌ها
      </Link>

      {/* Certificate */}
      <div className="card overflow-hidden">
        <div className="bg-primary-950 p-8 md:p-12">
          <div className="rounded-(--radius-modal) border-2 border-accent-400/50 bg-primary-900/40 p-8 text-center md:p-12">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-400/15">
              <Award className="h-9 w-9 text-accent-400" strokeWidth={1.2} aria-hidden="true" />
            </span>
            <p className="mt-6 text-xs tracking-normal text-primary-300">گواهینامه پایان دوره</p>
            <p className="mt-4 text-sm text-primary-200">بدین‌وسیله گواهی می‌شود</p>
            <p className="mt-2 text-2xl font-black text-white md:text-3xl">{user.name}</p>
            <p className="mt-4 text-sm leading-7 text-primary-200">
              دوره <span className="font-bold text-white">«{cert.course}»</span> را به مدت{" "}
              <Num className="font-bold text-white">{cert.hours}</Num> ساعت با موفقیت به پایان رسانده است.
            </p>
            <div className="mx-auto mt-8 flex max-w-xs items-center justify-between border-t border-primary-800 pt-5 text-right">
              <div>
                <p className="text-[10px] text-primary-400">تاریخ صدور</p>
                <Num className="text-xs font-bold text-white">{cert.date}</Num>
              </div>
              <span className="flex h-10 w-10 items-center justify-center rounded-(--radius-btn) bg-primary-600">
                <GraduationCap className="h-5 w-5 text-white" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] text-primary-400">شناسه گواهینامه</p>
                <Num className="text-xs font-bold text-white">{cert.id}</Num>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2.5 text-xs leading-6 text-slate-500">
            <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-success" strokeWidth={1.8} aria-hidden="true" />
            <span>
              قابل استعلام با شناسه <Num className="font-bold text-slate-700">{cert.id}</Num> در آدرس{" "}
              <Num className="text-primary-700">daneshara.io/verify</Num>
            </span>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" className="btn btn-primary btn-md">
              <FileDown className="h-4 w-4" aria-hidden="true" />
              دانلود PDF
            </button>
            <button type="button" className="btn btn-outline btn-md">
              <Link2 className="h-4 w-4" aria-hidden="true" />
              کپی لینک
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
