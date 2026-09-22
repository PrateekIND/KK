import { useRef, type ReactNode, type MouseEvent } from 'react';
import { motion, type MotionValue, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  primary?: boolean;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  className = '',
  primary = false,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const maxPull = 14;
    const pullX = (distanceX / (rect.width / 2)) * maxPull;
    const pullY = (distanceY / (rect.height / 2)) * maxPull;
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX as unknown as MotionValue<number>, y: springY as unknown as MotionValue<number> }}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`
        relative inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5
        text-sm font-semibold tracking-tight transition-colors duration-200
        cursor-pointer select-none
        ${primary
          ? 'text-white'
          : 'text-white/80 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06]'
        }
        ${className}
      `}
    >
      {primary && (
        <>
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow" />
          <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
        </>
      )}
      <span className={`relative z-10 flex items-center gap-2 ${primary ? '' : ''}`}>
        {children}
      </span>
    </motion.button>
  );
}
