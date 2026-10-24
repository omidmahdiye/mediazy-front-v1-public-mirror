import Link from "next/link";
import { notFound } from "next/navigation";
import { Paperclip, Send, ArrowRight, Headphones } from "lucide-react";
import { tickets, user } from "@/lib/data";
import { Num, Avatar } from "@/components/ui";

export function generateStaticParams() {
  return tickets.map((t) => ({ id: t.id }));
}

const messages = [
  {
    from: "user",
    text: "سلام. هنگام پخش با کیفیت 1080p ویدیو هر چند ثانیه متوقف می‌شود، در حالی که سرعت اینترنت من 50 مگابیت است. با کیفیت 720p مشکلی ندارم.",
    time: "1404/07/20 — 14:22",
  },
  {
    from: "support",
    text: "سلام، وقت بخیر. ممنون از گزارش دقیق شما. لطفا یک‌بار کش مرورگر را پاک کنید و در تنظیمات پلیر گزینه «پخش تطبیقی» را فعال کنید. اگر مشکل ادامه داشت، نام مرورگر و سیستم‌عامل را بفرمایید.",
    time: "1404/07/20 — 16:05",
  },
  {
    from: "user",
    text: "پخش تطبیقی را فعال کردم و مشکل برطرف شد. سپاس از پیگیری سریع‌تان.",
    time: "1404/07/21 — 09:40",
  },
  {
    from: "support",
    text: "عالی است! خوشحالیم که مشکل حل شد. اگر سوال دیگری داشتید در خدمتیم. این تیکت را به حالت «پاسخ داده شده» تغییر می‌دهیم.",
    time: "1404/07/21 — 10:02",
  },
];

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ticket = tickets.find((t) => t.id === id);
  if (!ticket) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/dashboard/support" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-primary-700">
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
        بازگشت به تیکت‌ها
      </Link>

      {/* header */}
      <div className="card p-5 md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-extrabold text-slate-900">{ticket.subject}</h2>
          <span className="badge badge-success">{ticket.status}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-slate-400">
          <span>شماره تیکت: <Num className="font-bold text-slate-600">{ticket.id}</Num></span>
          <span>دپارتمان: <span className="font-medium text-slate-600">{ticket.dept}</span></span>
          <span>ایجاد: <Num>{ticket.created}</Num></span>
        </div>
      </div>

      {/* conversation */}
      <div className="mt-5 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.from === "user" ? "" : "flex-row-reverse"}`}>
            {m.from === "user" ? (
              <Avatar initials={user.initials} color={user.avatarColor} size="sm" className="mt-1" />
            ) : (
              <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200">
                <Headphones className="h-4 w-4 text-slate-500" strokeWidth={1.8} aria-hidden="true" />
              </span>
            )}
            <div
              className={`max-w-[85%] rounded-(--radius-card) p-4 ${
                m.from === "user"
                  ? "rounded-tr-sm bg-primary-600 text-white"
                  : "rounded-tl-sm border border-slate-200 bg-white text-slate-700"
              }`}
            >
              <p className="text-sm leading-7">{m.text}</p>
              <Num className={`mt-2 block text-[10px] ${m.from === "user" ? "text-primary-200" : "text-slate-400"}`}>
                {m.time}
              </Num>
            </div>
          </div>
        ))}
      </div>

      {/* reply */}
      <form className="card mt-6 p-5">
        <label htmlFor="reply" className="label">پاسخ شما</label>
        <textarea id="reply" className="textarea" placeholder="پیام خود را بنویسید..." />
        <div className="mt-4 flex items-center justify-between">
          <button type="button" className="btn btn-ghost btn-sm min-w-0 text-slate-500">
            <Paperclip className="h-4 w-4" aria-hidden="true" />
            ضمیمه فایل
          </button>
          <button type="submit" className="btn btn-primary btn-md">
            <Send className="h-4 w-4" aria-hidden="true" />
            ارسال پاسخ
          </button>
        </div>
      </form>
    </div>
  );
}
