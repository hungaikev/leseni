/**
 * Auth Layout - Simple layout for login/signup pages
 */

import Link from "next/link";
import { Music } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <Music className="w-6 h-6 text-primary" />
            Leseni
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}

