import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CosmicBackground from "./CosmicBackground";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <div className="starfield fixed inset-0 -z-10 opacity-50" />
      <div className="cosmic-glow" />
      <CosmicBackground />
      <Header />
      <main className="flex-1">
        <div className="container-page py-8 animate-fade-in">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
