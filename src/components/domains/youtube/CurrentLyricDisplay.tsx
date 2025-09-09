'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimedLyricLine } from '@/lib/japanese-data';

interface CurrentLyricDisplayProps {
  lyric: TimedLyricLine;
  showKorean: boolean;
  showRomaji: boolean;
  isActive?: boolean;
}

export function CurrentLyricDisplay({ lyric, showKorean, showRomaji, isActive = true }: CurrentLyricDisplayProps) {
  return (
    <motion.div
      key={lyric.japanese} // 가사 변경 시 애니메이션 재생
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        y: 0,
        scale: isActive ? 1 : 0.98
      }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <Card className={`transition-all duration-500 ${isActive
        ? 'bg-gradient-to-r from-orange-500/15 to-red-500/15 border-orange-400 shadow-lg'
        : 'bg-gradient-to-r from-gray-400/10 to-gray-500/10 border-gray-300 shadow-md'
        }`}>
        <CardHeader>
          <CardTitle className={`text-center text-lg transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-gray-500'
            }`}>
            {isActive ? '♪ 현재 가사' : '마지막 가사'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-3">
            <motion.div
              className={`text-2xl md:text-3xl font-bold transition-colors duration-300 ${isActive ? 'text-gray-800' : 'text-gray-600'
                }`}
              animate={{
                scale: isActive ? [1, 1.02, 1] : 1
              }}
              transition={{
                duration: 2,
                repeat: isActive ? Infinity : 0,
                ease: 'easeInOut'
              }}
            >
              {lyric.japanese}
            </motion.div>
            {showRomaji && (
              <div className={`text-lg font-medium transition-colors duration-300 ${isActive ? 'text-blue-600' : 'text-blue-400'
                }`}>
                {lyric.koreanPronunciation || lyric.romaji}
              </div>
            )}
            {showKorean && (
              <div className={`text-xl font-medium transition-colors duration-300 ${isActive ? 'text-orange-600' : 'text-gray-500'
                }`}>
                {lyric.korean}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
