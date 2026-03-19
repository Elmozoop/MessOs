import { cn_local } from "./Card";

export function Badge({ children, className, variant = "default" }) {
  const variants = {
    default: "glass-sage",
    secondary: "glass-sky",
    danger: "glass-rose",
  };

  return (
    <span
      className={cn_local(
        "inline-flex items-center rounded-[8px] px-2.5 py-0.5 text-xs font-bold tracking-wide shadow-sm border border-white/40",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
