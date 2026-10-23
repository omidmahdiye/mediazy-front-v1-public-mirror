import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const vazirmatn = localFont({
  src: "../fonts/Vazirmatn-Variable.woff2",
  weight: "100 900",
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "دانش‌آرا | پلتفرم آموزش آنلاین",
    template: "%s | دانش‌آرا",
  },
  description:
    "دسترسی نامحدود به صدها دوره آموزشی بین‌المللی با دوبله و زیرنویس فارسی",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:right-4 focus:z-[100] focus:rounded-(--radius-btn) focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          پرش به محتوای اصلی
        </a>
        {children}
      </body>
    </html>
  );
}
