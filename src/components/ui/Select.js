import { cn } from "@/lib/cn";
import { controlClass } from "@/components/ui/Input";

export function Select({ options, placeholder, className, ...props }) {
  return (
    <select className={cn(controlClass, "pr-8", className)} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
