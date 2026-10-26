import { useState } from "react";

export function Logo({
  variant = "dark",
  height = 36,
  className = "",
}: {
  variant?: "dark" | "light";
  height?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = variant === "light" ? "/logo-light.png" : "/logo.png";

  if (failed) {
    return (
      <span
        className={[
          "inline-flex items-center font-serif text-[1.3rem] leading-none tracking-[-0.04em] text-current",
          className,
        ].join(" ")}
        style={{ height: `${height}px` }}
      >
        Edennia Homes
      </span>
    );
  }

  return (
    <img
      src={src}
      alt="Edennia Homes"
      width={180}
      height={height}
      className={className}
      style={{ height: `${height}px`, width: "auto" }}
      onError={() => setFailed(true)}
    />
  );
}
