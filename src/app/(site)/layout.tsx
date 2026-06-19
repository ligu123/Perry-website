import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <main className="min-w-0 flex-1 pt-16 selection:bg-selection">{children}</main>
      <SiteFooter />
    </>
  );
}
