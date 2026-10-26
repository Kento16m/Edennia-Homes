import type { ReactNode } from "react";

import { Header } from "@/components/home/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export function SiteLayout({ children, headerVariant = "default" }: { children: ReactNode; headerVariant?: "default" | "properties" }) {
  return (
    <>
      <Header variant={headerVariant} />
      {children}
      <Footer />
      <WhatsAppButton />
    </>
  );
}
