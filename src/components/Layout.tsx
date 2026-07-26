import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col bg-page">
      {/* Subtle ambient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% -8%, var(--accent-soft), transparent 70%)",
        }}
      />
      <Header />
      <main className="flex-1">
        <div className="container-page py-10 sm:py-12 animate-fade-in">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
