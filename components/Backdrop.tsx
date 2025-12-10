'use client';

import { motion } from 'framer-motion';

export default function Backdrop({ onClick }: { onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-[9998]"
      onClick={onClick}
      style={{ pointerEvents: 'auto' }}
    />
  );
}
