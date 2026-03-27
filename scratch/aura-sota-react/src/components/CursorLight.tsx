import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const CursorLight = () => {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 50, stiffness: 300 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none mix-blend-screen overflow-hidden">
      <motion.div
        style={{
          x: springX,
          y: springY,
          position: "absolute",
          left: 0,
          top: 0,
          width: "1400px",
          height: "1400px",
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

export { CursorLight };
