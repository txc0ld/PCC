import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  width?: "narrow" | "medium" | "wide" | "full";
};

const widths = {
  narrow: "max-w-[680px]",
  medium: "max-w-[920px]",
  wide: "max-w-[1248px]",
  full: "max-w-none",
};

export function Container({
  width = "wide",
  className,
  children,
  ...rest
}: Props) {
  return (
    <div className={cn("container-pcc", className)} {...rest}>
      <div className={cn("mx-auto", widths[width])}>{children}</div>
    </div>
  );
}
