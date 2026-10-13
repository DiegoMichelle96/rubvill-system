import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border bg-surface hover:bg-accent",
  ghost: "hover:bg-accent",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const sizes = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
  icon: "size-9",
};

export const buttonClass = ({ variant = "primary", size = "md", className } = {}) =>
  cn(
    "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
    variants[variant],
    sizes[size],
    className,
  );

export function Button({ variant, size, className, type = "button", ...props }) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...props} />;
}
