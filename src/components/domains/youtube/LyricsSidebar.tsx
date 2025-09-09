'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { TimedLyricLine } from '@/data/types';
import { Clock, Navigation } from 'lucide-react';

interface LyricsSidebarProps {
  lyrics: TimedLyricLine[];
  currentLyricIndex: number;
  currentTime: number;
  duration: number;
  showKorean: boolean;
  showRomaji: boolean;
  seekToTime: (time: number) => void;
}

export function LyricsSidebar({
  lyrics,
  currentLyricIndex,
  currentTime,
  duration,
  showKorean,
  showRomaji,
  seekToTime
}: LyricsSidebarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentLyricRef = useRef<HTMLDivElement>(null);
  const lyricRefs = useRef<(HTMLDivElement | null)[]>([]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // 특정 가사로 스크롤하는 함수
  const scrollToLyric = (index: number) => {
    if (index >= 0 && lyricRefs.current[index] && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const element = lyricRefs.current[index];

      if (element) {
        // 타임라인 높이를 고려하여 스크롤 위치 조정 (타임라인 높이 약 100px 고려)
        const timelineHeight = 100;
        const targetTop = element.offsetTop - timelineHeight - 20; // 20px 여백 추가

        container.scrollTo({
          top: Math.max(0, targetTop), // 음수가 되지 않도록
          behavior: 'smooth'
        });
      }
    }
  };

  // 현재 가사로 자동 스크롤
  useEffect(() => {
    scrollToLyric(currentLyricIndex);
  }, [currentLyricIndex]);

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

        {/* 타임라인 스크롤바 */}
        <div className="mt-4 space-y-2 p-3 bg-gray-50/50 rounded-lg border">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
            <Navigation className="h-4 w-4 text-orange-500" />
            <span>타임라인 내비게이션</span>
            <div className="ml-auto text-xs text-gray-500">
              {lyrics.length}개 가사 구간
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <div className="relative group">
              <Progress
                value={(currentTime / duration) * 100}
                className="h-3 cursor-pointer bg-gray-200 group-hover:h-4 transition-all duration-200"
              />
              <div
                className="absolute inset-0 cursor-pointer rounded-full group-hover:bg-orange-100/20 transition-colors duration-200"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(1, x / rect.width));
                  const newTime = percentage * duration;
                  seekToTime(newTime);
                }}
              />

              {/* 현재 재생 위치 인디케이터 */}
              <div
                className="absolute top-0 w-0.5 h-3 bg-red-600 rounded-full shadow-lg z-20 transform -translate-x-0.25 group-hover:h-4 transition-all duration-200"
                style={{ left: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-red-600 rounded-full shadow-lg animate-pulse group-hover:w-3 group-hover:h-3 group-hover:-top-1.5 group-hover:-left-1.5 transition-all duration-200" />
                {/* 시간 표시 투틀팁 */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {formatTime(currentTime)}
                </div>
              </div>

              {/* 가사 구간 표시 */}
              {lyrics.map((lyric, index) => {
                const startPosition = (lyric.startTime / duration) * 100;
                const endPosition = (lyric.endTime / duration) * 100;
                const width = endPosition - startPosition;

                return (
                  <div
                    key={index}
                    className={`absolute top-0 h-3 rounded-sm cursor-pointer transition-all duration-200 border ${currentLyricIndex === index
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 shadow-lg z-10 scale-y-125 border-orange-300'
                      : 'bg-gray-400/60 hover:bg-orange-300/70 hover:scale-y-110 border-gray-300/50 hover:border-orange-200'
                      }`}
                    style={{
                      left: `${startPosition}%`,
                      width: `${Math.max(width, 0.5)}%` // 최소 너비 보장
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      seekToTime(lyric.startTime);
                      scrollToLyric(index); // 해당 가사로 스크롤
                    }}
                    title={`${formatTime(lyric.startTime)}-${formatTime(lyric.endTime)}: ${lyric.japanese.substring(0, 30)}${lyric.japanese.length > 30 ? '...' : ''}`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent
        ref={scrollContainerRef}
        className="max-h-96 overflow-y-auto scroll-smooth"
      >
        <div className="space-y-3">
          {lyrics.map((lyric, index) => (
            <motion.div
              key={index}
              ref={(el) => {
                lyricRefs.current[index] = el;
                if (currentLyricIndex === index) {
                  currentLyricRef.current = el;
                }
              }}
              initial={{ opacity: 0.6 }}
              animate={{
                opacity: currentLyricIndex === index ? 1 : 0.6,
                scale: currentLyricIndex === index ? 1.05 : 1,
                backgroundColor: currentLyricIndex === index ? 'rgba(249, 115, 22, 0.15)' : 'transparent'
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${currentLyricIndex === index
                ? 'bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 shadow-lg transform'
                : 'hover:bg-gray-50 border border-transparent'
                }`}
              onClick={() => seekToTime(lyric.startTime)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {formatTime(lyric.startTime)}
                  </Badge>
                  {currentLyricIndex === index && (
                    <Badge className="text-xs bg-gradient-to-r from-orange-500 to-red-500 animate-pulse">
                      ♪ 재생 중
                    </Badge>
                  )}
                </div>
                <div className="text-lg font-bold text-gray-800">
                  {lyric.japanese}
                </div>
                {showRomaji && (
                  <div className="text-blue-600 font-medium">
                    {lyric.koreanPronunciation || lyric.romaji}
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
