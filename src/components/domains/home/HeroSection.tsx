'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export function HeroSection() {
  return (
    <motion.div
      className="text-center mb-12"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-4"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        일본어 학습
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl text-gray-700 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        히라가나, 가타카나, J-Pop으로 재미있게 배워요!
      </motion.p>

      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Badge variant="secondary" className="text-sm">🌸 히라가나</Badge>
        <Badge variant="secondary" className="text-sm">🎌 가타카나</Badge>
        <Badge variant="secondary" className="text-sm bg-red-100 text-red-600">📺 YouTube 연동</Badge>
        <Badge variant="secondary" className="text-sm">🎵 J-Pop</Badge>
        <Badge variant="secondary" className="text-sm">📚 기초 일본어</Badge>
      </motion.div>
    </motion.div>
  );
}
