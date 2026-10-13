import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ white, className }) {
  const image = (src, extra) => (
    <Image src={src} width={443} height={117} alt="RUBVILL Contadores Consultores" loading="eager" className={cn("h-auto w-full", className, extra)} />
  );
  if (white) return image("/images/logo-white.png");
  return (
    <>
      {image("/images/logo.png", "dark:hidden")}
      {image("/images/logo-white.png", "hidden dark:block")}
    </>
  );
}
