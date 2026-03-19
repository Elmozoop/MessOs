import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { motion } from "framer-motion";

export function cn_local(...inputs) {
  return twMerge(clsx(inputs));
}

const Card = forwardRef(({ className, children, ...props }, ref) => (
  <motion.div
    whileHover={{ y: -2 }}
    transition={{ type: "spring", stiffness: 300 }}
    ref={ref}
    className={cn_local(
      "bg-[var(--card)] rounded-2xl p-6 transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-[var(--border)]",
      className
    )}
    {...props}
  >
    {children}
  </motion.div>
));
Card.displayName = "Card";

export { Card };
