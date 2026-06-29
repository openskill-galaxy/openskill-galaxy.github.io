import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full flex flex-col">
      <div className="starfield fixed inset-0 -z-10 opacity-60" />
      <Header />
      <main className="flex-1">
        <div className="container-page py-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
