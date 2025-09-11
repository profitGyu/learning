'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { YouTubeSong } from '@/data/types';
import { Youtube, Clock, Play, Music } from 'lucide-react';
import { ensureThumbnailUrl } from '@/lib/youtube-utils';

interface SongListViewProps {
  songs: YouTubeSong[];
  onSelectSong: (song: YouTubeSong) => void;
}

export function SongListView({ songs, onSelectSong }: SongListViewProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Music className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            학습할 노래를 선택하세요
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            실제 YouTube 영상과 동기화된 가사로 일본어를 재미있게 배워보세요!
            각 곡마다 정확한 발음과 한국어 번역이 제공됩니다.
          </p>
        </motion.div>
      </div>

      {/* 노래 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song, index) => {
          // 썸네일 URL이 없으면 자동 생성
          const songWithThumbnail = ensureThumbnailUrl(song);

          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 hover:border-red-300 overflow-hidden relative h-full flex flex-col">
                {/* 썸네일 배경 이미지 */}
                {songWithThumbnail.thumbnailUrl && (
                  <div className="absolute inset-0 z-0">
                    <img
                      src={songWithThumbnail.thumbnailUrl}
                      alt={`${songWithThumbnail.title} thumbnail`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // 썸네일 로드 실패 시 기본 배경으로 대체
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    {/* 오버레이 */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                  </div>
                )}

                {/* 썸네일이 없을 때의 기본 배경 */}
                {!songWithThumbnail.thumbnailUrl && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300" />
                )}

                <CardHeader className="pb-4 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300 shadow-lg">
                        <Youtube className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className={`text-lg font-bold truncate ${songWithThumbnail.thumbnailUrl ? 'text-white drop-shadow-lg' : 'text-gray-800'
                          }`}>
                          {songWithThumbnail.title}
                        </CardTitle>
                        <p className={`text-sm truncate ${songWithThumbnail.thumbnailUrl ? 'text-white/90 drop-shadow-md' : 'text-gray-600'
                          }`}>{songWithThumbnail.artist}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className={`text-xs ${songWithThumbnail.thumbnailUrl
                        ? 'bg-black/30 text-white border-white/30'
                        : ''
                        }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTime(songWithThumbnail.duration)}
                      </Badge>
                      <Badge variant="secondary" className={`text-xs ${songWithThumbnail.thumbnailUrl
                        ? 'bg-black/30 text-white'
                        : ''
                        }`}>
                        {songWithThumbnail.lyrics.length}개 가사
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${songWithThumbnail.thumbnailUrl
                        ? 'bg-purple-500/80 text-white border-purple-400/50'
                        : 'bg-purple-50 text-purple-600'
                        }`}>
                        YouTube 연동
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 relative z-10 flex-1 flex flex-col">
                  <div className="flex-1"></div>

                  {/* 학습 시작 버튼 - 하단 고정 */}
                  <div className="mt-4">
                    <Button
                      onClick={() => onSelectSong(songWithThumbnail)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 group-hover:shadow-lg shadow-lg"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      학습 시작하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* 추가 정보 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mt-8"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🎵 학습 기능 안내
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Youtube className="h-5 w-5 text-purple-600" />
              </div>
              <p className="font-medium">실시간 동기화</p>
              <p>영상과 가사가 완벽 동기화</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="h-5 w-5 text-pink-600" />
              </div>
              <p className="font-medium">구간 반복</p>
              <p>어려운 부분을 반복 학습</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Music className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="font-medium">발음 가이드</p>
              <p>한국어 발음 표기 제공</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
