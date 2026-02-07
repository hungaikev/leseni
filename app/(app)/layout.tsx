/**
 * App Layout - Main application shell with consistent header and footer
 */

import { Header } from "@/components/layout/Header";
import { AppFooter } from "@/components/layout/AppFooter";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
