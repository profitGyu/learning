'use client';

import { motion } from 'framer-motion';

export function BackgroundAnimation() {
  // Deterministic values based on index to avoid hydration mismatch
  const characters = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => {
        // Use index to create deterministic but varied animations
        const seed = i + 1;
        const duration = 8 + (seed % 4);
        const delay = seed % 5;
        const leftPosition = (seed * 37) % 100; // Simple deterministic distribution
        const fontSize = 40 + (seed % 40);
        const charIndex = seed % characters.length;

        return (
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
              duration,
              repeat: Infinity,
              delay,
              ease: "linear"
            }}
            style={{
              left: `${leftPosition}%`,
              fontSize: `${fontSize}px`
            }}
          >
            {characters[charIndex]}
          </motion.div>
        );
      })}
    </div>
  );
}
