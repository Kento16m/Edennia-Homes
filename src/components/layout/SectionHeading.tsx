import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("text-[11px] font-semibold uppercase tracking-[0.26em] text-primary", className)}>{children}</p>;
}

export function SectionHeading({ eyebrow, title, className }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={cn("mt-3 text-[clamp(1.8rem,2.4vw,2.6rem)] font-normal leading-tight text-foreground", className)}>{title}</h2>
    </div>
  );
}
