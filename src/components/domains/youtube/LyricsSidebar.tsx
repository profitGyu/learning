'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TimedLyricLine } from '@/lib/japanese-data';
import { Clock } from 'lucide-react';

interface LyricsSidebarProps {
  lyrics: TimedLyricLine[];
  currentLyricIndex: number;
  showKorean: boolean;
  showRomaji: boolean;
  seekToTime: (time: number) => void;
}

export function LyricsSidebar({
  lyrics,
  currentLyricIndex,
  showKorean,
  showRomaji,
  seekToTime
}: LyricsSidebarProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-500" />
          실시간 동기화 가사
        </CardTitle>
        <p className="text-sm text-gray-600">
          영상과 자동으로 동기화되는 가사를 따라 읽어보세요
        </p>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        <div className="space-y-3">
          {lyrics.map((lyric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: currentLyricIndex === index ? 1 : 0.6,
                scale: currentLyricIndex === index ? 1.02 : 1,
                backgroundColor: currentLyricIndex === index ? 'rgba(249, 115, 22, 0.1)' : 'transparent'
              }}
              transition={{ duration: 0.3 }}
              className={`p-3 rounded-lg cursor-pointer transition-all ${currentLyricIndex === index
                  ? 'bg-orange-100 border border-orange-200 shadow-sm'
                  : 'hover:bg-gray-50'
                }`}
              onClick={() => seekToTime(lyric.startTime)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {formatTime(lyric.startTime)}
                  </Badge>
                  {currentLyricIndex === index && (
                    <Badge className="text-xs bg-orange-500">
                      재생 중
                    </Badge>
                  )}
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {lyric.japanese}
                </div>
                {showRomaji && (
                  <div className="text-gray-600 italic">
                    {lyric.romaji}
                  </div>
                )}
                {showKorean && (
                  <div className="text-orange-600 font-medium">
                    {lyric.korean}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
