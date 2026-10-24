"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, LifeBuoy } from "lucide-react";
import { faqs } from "@/lib/data";
import { PageHeader } from "@/components/ui";
import { Accordion } from "@/components/interactive";

const categories = Object.keys(faqs) as (keyof typeof faqs)[];

export default function FaqPage() {
  const [active, setActive] = useState<keyof typeof faqs>("عمومی");
  const [query, setQuery] = useState("");

  const items = faqs[active].filter(
    (f) => !query || f.q.includes(query) || f.a.includes(query)
  );

  return (
    <>
      <PageHeader
        title="سوالات متداول"
        description="پاسخ سریع‌ترین سوالات کاربران را این‌جا جمع کرده‌ایم."
        crumbs={[{ label: "صفحه اصلی", href: "/" }, { label: "سوالات متداول" }]}
      />

      <div className="container-site section-pad mx-auto max-w-3xl">
        <div className="relative">
          <Search className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در سوالات..."
            aria-label="جستجو در سوالات"
            className="input pr-12"
          />
        </div>

        <div className="scrollbar-none mt-6 flex gap-2 overflow-x-auto" role="tablist" aria-label="دسته‌بندی سوالات">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`chip shrink-0 ${active === cat ? "chip-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {items.length > 0 ? (
            <Accordion key={active + query} items={items.map((f) => ({ title: f.q, content: f.a }))} />
          ) : (
            <p className="card p-8 text-center text-sm text-slate-500">
              سوالی مطابق جستجوی شما یافت نشد.
            </p>
          )}
        </div>

        <div className="card mt-10 flex flex-col items-center gap-4 p-8 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50">
            <LifeBuoy className="h-7 w-7 text-primary-700" strokeWidth={1.5} aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-base font-bold text-slate-900">پاسخ خود را نیافتید؟</h2>
            <p className="mt-1 text-sm text-slate-500">تیم پشتیبانی ما آماده کمک به شماست.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/support/new" className="btn btn-primary btn-md">ارسال تیکت</Link>
            <Link href="/contact" className="btn btn-outline btn-md">تماس با ما</Link>
          </div>
        </div>
      </div>
    </>
  );
}
