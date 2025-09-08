'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TimedLyricLine } from '@/lib/japanese-data';

interface CurrentLyricDisplayProps {
  lyric: TimedLyricLine;
  showKorean: boolean;
  showRomaji: boolean;
}

export function CurrentLyricDisplay({ lyric, showKorean, showRomaji }: CurrentLyricDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-300">
        <CardHeader>
          <CardTitle className="text-center text-lg">현재 가사</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="space-y-3">
            <div className="text-2xl md:text-3xl font-bold text-gray-800">
              {lyric.japanese}
            </div>
            {showRomaji && (
              <div className="text-lg text-gray-600 italic">
                {lyric.romaji}
              </div>
            )}
            {showKorean && (
              <div className="text-xl text-orange-600 font-medium">
                {lyric.korean}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
