"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PlaySquare, Tag, LayoutDashboard, Newspaper } from "lucide-react";

const items = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/courses", label: "دوره‌ها", icon: PlaySquare },
  { href: "/pricing", label: "تعرفه‌ها", icon: Tag },
  { href: "/blog", label: "مقالات", icon: Newspaper },
  { href: "/dashboard", label: "پنل من", icon: LayoutDashboard },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="ناوبری پایین صفحه"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-lg lg:hidden"
    >
      <div className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
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
  );
}
