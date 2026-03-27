import { useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-full cursor-pointer focus:outline-none",
  {
    variants: {
      variant: {
        primary: "bg-white text-black shadow-lg hover:shadow-white/10",
        gold: "bg-gold text-white shadow-lg hover:shadow-gold/20",
        outline: "border border-white/10 text-white hover:bg-white/5",
        ghost: "text-white/60 hover:text-white",
      },
      size: {
        default: "h-12 px-10",
        sm: "h-10 px-6",
        lg: "h-16 px-16 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children">,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
}

const MagneticButton = ({ className, variant, size, children, ...props }: ButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull distance
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Limit translation within the button radius
    mouseX.set(distanceX * 0.4); 
    mouseY.set(distanceY * 0.4);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-white/5 hover:opacity-100 blur-xl" />
    </motion.button>
  );
};

export { MagneticButton, buttonVariants };
