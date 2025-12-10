'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SpotlightProps {
  targetSelector: string;
}

export default function Spotlight({ targetSelector }: SpotlightProps) {
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const updateRect = () => {
      const element = document.querySelector(targetSelector);
      if (element) {
        setRect(element.getBoundingClientRect());
      }
    };

    updateRect();
    window.addEventListener('scroll', updateRect);
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('scroll', updateRect);
      window.removeEventListener('resize', updateRect);
    };
  }, [targetSelector]);

  if (!rect) return null;

  return (
    <motion.div
      layoutId="spotlight"
      className="fixed z-[9999] pointer-events-none border-2 border-orange-500 rounded-lg shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]"
      style={{
        top: rect.top - 4,
        left: rect.left - 4,
        width: rect.width + 8,
        height: rect.height + 8,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, top: rect.top - 4, left: rect.left - 4, width: rect.width + 8, height: rect.height + 8 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    />
  );
}
