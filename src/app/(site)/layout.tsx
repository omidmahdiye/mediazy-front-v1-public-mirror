import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import BottomNav from "@/components/bottom-nav";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
