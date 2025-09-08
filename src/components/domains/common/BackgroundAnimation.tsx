'use client';

import { motion } from 'framer-motion';

export function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-6xl opacity-5 select-none"
          initial={{ opacity: 0, y: 100 }}
          animate={{
            opacity: [0, 0.1, 0],
            y: [-100, -800],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${40 + Math.random() * 40}px`
          }}
        >
          {['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'][Math.floor(Math.random() * 10)]}
        </motion.div>
      ))}
    </div>
  );
}
