import Link from "next/link";
import {
  Star,
  ChevronLeft,
  Code2,
  PenTool,
  Briefcase,
  Megaphone,
  Brain,
  BarChart3,
  Layers,
  Users,
  Braces,
  Network,
  Rocket,
  Search,
  TrendingUp,
  Map,
  Repeat,
  FolderOpen,
  Timer,
  Languages,
  Route,
  type LucideIcon,
} from "lucide-react";

/* Icon registry — all icons referenced by key in mock data */
const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  "pen-tool": PenTool,
  briefcase: Briefcase,
  megaphone: Megaphone,
  brain: Brain,
  "bar-chart": BarChart3,
  layers: Layers,
  users: Users,
  braces: Braces,
  network: Network,
  rocket: Rocket,
  search: Search,
  "trending-up": TrendingUp,
  map: Map,
  repeat: Repeat,
  "folder-open": FolderOpen,
  timer: Timer,
  languages: Languages,
  route: Route,
};

export function DataIcon({
  name,
  className,
  strokeWidth = 1.5,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = iconMap[name] ?? Code2;
  return <Icon className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/* English digits wrapper to keep LTR ordering inside RTL text */
export function Num({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`num ${className}`}>{children}</span>;
}

export function Rating({ value, count, className = "" }: { value: number; count?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <Star className="h-4 w-4 fill-accent-400 text-accent-400" aria-hidden="true" />
      <Num className="text-sm font-bold text-slate-800">{value}</Num>
      {count !== undefined && (
        <span className="text-xs text-slate-400">
          (<Num>{count.toLocaleString("en-US")}</Num> نظر)
        </span>
      )}
    </span>
  );
}

export function Avatar({
  initials,
  color,
  size = "md",
  className = "",
}: {
  initials: string;
  color: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    xs: "h-6 w-6 text-[10px]",
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-16 w-16 text-lg",
    xl: "h-24 w-24 text-2xl",
  };
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white ${color} ${sizes[size]} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function ProgressBar({
  value,
  className = "",
  tone = "primary",
}: {
  value: number;
  className?: string;
  tone?: "primary" | "success" | "accent";
}) {
  const tones = { primary: "bg-primary-600", success: "bg-success", accent: "bg-accent-400" };
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={`h-full rounded-full ${tones[tone]}`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function SectionHeader({
  title,
  href,
  hrefLabel = "مشاهده همه",
  subtitle,
}: {
  title: string;
  href?: string;
  hrefLabel?: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 md:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
        >
          {hrefLabel}
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="مسیر صفحه" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-primary-700">
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-slate-600">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <Icon className="h-8 w-8 text-slate-400" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-sm text-slate-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  crumbs,
}: {
  title: string;
  description?: React.ReactNode;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="container-site py-8 md:py-10">
        <Breadcrumbs items={crumbs} />
        <h1 className="text-2xl font-extrabold text-slate-900 md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm text-slate-500 md:text-base">{description}</p>}
      </div>
    </div>
  );
}
