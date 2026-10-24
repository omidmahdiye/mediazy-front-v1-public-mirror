"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, GraduationCap } from "lucide-react";

const navItems = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/courses", label: "دوره‌ها" },
  { href: "/pricing", label: "تعرفه‌ها" },
  { href: "/blog", label: "مقالات" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="دانش‌آرا — صفحه اصلی">
      <span className="flex h-9 w-9 items-center justify-center rounded-(--radius-btn) bg-primary-600 text-white">
        <GraduationCap className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className={`text-lg font-black ${light ? "text-white" : "text-slate-900"}`}>دانش‌آرا</span>
    </Link>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "border-b border-slate-200 bg-white/85 shadow-(--shadow-card) backdrop-blur-lg"
          : "border-b border-transparent bg-white"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        {/* Right (RTL start): logo */}
        <Logo />

        {/* Center: desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="ناوبری اصلی">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`nav-link ${active ? "nav-link-active" : ""}`}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Left (RTL end): actions */}
        <div className="flex items-center gap-2">
          <Link href="/search" className="btn btn-ghost btn-icon" aria-label="جستجو">
            <Search className="h-5 w-5" strokeWidth={1.8} />
          </Link>
          <Link href="/login" className="btn btn-outline btn-md hidden min-w-0 sm:inline-flex">
            ورود
          </Link>
          <Link href="/register" className="btn btn-primary btn-md hidden min-w-0 sm:inline-flex">
            ثبت نام
          </Link>
          <button
            type="button"
            className="btn btn-ghost btn-icon lg:hidden"
            aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="container-site flex flex-col py-3" aria-label="ناوبری موبایل">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-3 text-sm font-medium ${
                    active ? "bg-primary-50 font-bold text-primary-700" : "text-slate-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="mt-2 flex gap-2 border-t border-slate-100 px-3 pt-4 pb-2 sm:hidden">
              <Link href="/login" className="btn btn-outline btn-md flex-1">
                ورود
              </Link>
              <Link href="/register" className="btn btn-primary btn-md flex-1">
                ثبت نام
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
