import { forwardRef } from "react";
import { cn_local } from "./Card";
import { motion } from "framer-motion";

const Button = forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "glass-sage shadow-[0_8px_24px_-8px_#B5C9B7] hover:-translate-y-0.5 transition-all text-[#2c402e] font-semibold border border-white/40",
    outline: "border border-slate-200 text-slate-500 bg-white shadow-sm hover:border-[var(--color-sage)] hover:text-[var(--color-sage)] hover:shadow-[0_4px_12px_-4px_#B5C9B7] transition-all",
    ghost: "hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-all",
    danger: "glass-rose shadow-[0_8px_24px_-8px_#E8C4C4] hover:-translate-y-0.5 transition-all text-[#5a2a2a] font-semibold border border-white/40",
  };

  const sizes = {
    default: "h-11 px-6 py-2 rounded-[14px]",
    sm: "h-9 px-4 text-sm rounded-[10px]",
    lg: "h-14 px-8 text-lg font-bold rounded-2xl",
    icon: "h-11 w-11 flex items-center justify-center rounded-[14px]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      ref={ref}
      className={cn_local(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button };
