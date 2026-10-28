import clsx from 'clsx';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn_local(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  'aria-label'?: string;
  role?: string;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, ...props }, ref) => {
  const motionProps = {
    whileHover: { y: -2 },
    transition: { type: 'spring', stiffness: 300 },
  };

  return (
    <motion.div
      {...motionProps}
      ref={ref}
      className={cn_local(
        'rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});
Card.displayName = 'Card';

export { Card };
