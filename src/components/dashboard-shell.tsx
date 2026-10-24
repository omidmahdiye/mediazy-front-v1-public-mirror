"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlayCircle,
  Bookmark,
  CreditCard,
  Receipt,
  Award,
  NotebookPen,
  Headphones,
  Bell,
  Settings,
  LogOut,
  Search,
  GraduationCap,
  MoreHorizontal,
} from "lucide-react";
import { user } from "@/lib/data";
import { Avatar } from "@/components/ui";

const navItems = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/dashboard/courses", label: "دوره‌های من", icon: PlayCircle },
  { href: "/dashboard/bookmarks", label: "نشان‌شده‌ها", icon: Bookmark },
  { href: "/dashboard/subscription", label: "اشتراک من", icon: CreditCard },
  { href: "/dashboard/payments", label: "تاریخچه پرداخت‌ها", icon: Receipt },
  { href: "/dashboard/certificates", label: "گواهینامه‌ها", icon: Award },
  { href: "/dashboard/notes", label: "یادداشت‌ها", icon: NotebookPen },
  { href: "/dashboard/support", label: "پشتیبانی", icon: Headphones },
  { href: "/dashboard/notifications", label: "اعلان‌ها", icon: Bell, badge: 2 },
  { href: "/dashboard/settings", label: "تنظیمات", icon: Settings },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = navItems.find((n) => isActive(pathname, n.href));

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar — RTL right side */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-l border-slate-200 bg-white lg:flex">
        <div className="flex items-center gap-2 px-5 py-5">
          <Link href="/" className="flex items-center gap-2" aria-label="دانش‌آرا — صفحه اصلی">
            <span className="flex h-9 w-9 items-center justify-center rounded-(--radius-btn) bg-primary-600 text-white">
              <GraduationCap className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="text-lg font-black text-slate-900">دانش‌آرا</span>
          </Link>
        </div>

        <div className="mx-4 mb-4 flex items-center gap-3 rounded-(--radius-card) bg-slate-50 p-3">
          <Avatar initials={user.initials} color={user.avatarColor} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-slate-800">{user.name}</p>
            <span className="badge badge-primary mt-0.5">اشتراک {user.plan}</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3" aria-label="منوی پنل کاربری">
          <ul className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon, badge }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-(--radius-btn) px-3 py-2.5 text-sm font-medium transition-colors ${
                      active ? "bg-primary-50 font-bold text-primary-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.6} aria-hidden="true" />
                      {label}
                    </span>
                    {badge && (
                      <span className="num flex h-5 min-w-5 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-(--radius-btn) px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-error-light hover:text-error"
          >
            <LogOut className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
            خروج
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-lg">
          <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-8">
            <h1 className="text-base font-extrabold text-slate-900 md:text-lg">
              {current?.label ?? "پنل کاربری"}
            </h1>
            <div className="flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="جستجو..."
                  aria-label="جستجو"
                  className="input h-10 w-56 rounded-(--radius-btn) pr-9 text-xs"
                />
              </div>
              <Link href="/dashboard/notifications" className="btn btn-ghost btn-icon relative" aria-label="اعلان‌ها — 2 خوانده‌نشده">
                <Bell className="h-5 w-5" strokeWidth={1.6} />
                <span className="num absolute top-1.5 left-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-0.5 text-[9px] font-bold text-white">
                  2
                </span>
              </Link>
              <Link href="/dashboard/settings" aria-label="تنظیمات پروفایل">
                <Avatar initials={user.initials} color={user.avatarColor} size="sm" />
              </Link>
            </div>
          </div>
        </header>

        <main id="main-content" className="flex-1 p-4 pb-24 md:p-8 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav aria-label="ناوبری پنل" className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-lg lg:hidden">
        <div className="grid grid-cols-5">
          {[
            navItems[0],
            navItems[1],
            navItems[3],
            navItems[7],
            { href: "/dashboard/settings", label: "بیشتر", icon: MoreHorizontal },
          ].map(({ href, label, icon: Icon }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href + label}
                href={href}
                className={`flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                  active ? "text-primary-700" : "text-slate-400"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.6} aria-hidden="true" />
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
