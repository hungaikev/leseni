/**
 * App Layout - Main application shell
 */

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              Leseni
            </a>
            <div className="flex gap-4">
              <a href="/catalog" className="text-sm hover:underline">
                Browse
              </a>
              <a href="/portfolio" className="text-sm hover:underline">
                Portfolio
              </a>
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

