'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { SongListView } from '@/components/domains/youtube/SongListView';
import { LearningView } from '@/components/domains/youtube/LearningView';
import { youtubeSongs } from '@/data';
import { Badge } from '@/components/ui/badge';
import type { YouTubeSong } from '@/data/types';

export function YouTubeContainer() {
  const [selectedSong, setSelectedSong] = useState<YouTubeSong | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'learning'>('list');

  // 노래 선택 핸들러
  const handleSelectSong = (song: YouTubeSong) => {
    setSelectedSong(song);
    setViewMode('learning');
  };

  // 목록으로 돌아가기 핸들러
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedSong(null);
  };

  const headerChildren = (
    <div className="flex items-center gap-2">
      {viewMode === 'learning' && (
        <Badge variant="outline" className="bg-red-100 text-red-600">
          실시간 동기화
        </Badge>
      )}
      {viewMode === 'list' && (
        <Badge variant="outline" className="bg-blue-100 text-blue-600">
          {youtubeSongs.length}곡 준비됨
        </Badge>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100 p-2 sm:p-4">
      <div className="container mx-auto max-w-7xl">
        <PageHeader
          title="YouTube J-Pop 학습"
          subtitle={
            viewMode === 'list'
              ? "학습할 노래를 선택하고 실제 영상과 동기화된 가사로 일본어를 배워보세요!"
              : "실제 영상과 동기화된 가사로 일본어를 배워보세요!"
          }
          gradientFrom="from-red-500 via-orange-500"
          gradientTo="to-yellow-500"
        >
          {headerChildren}
        </PageHeader>

        {/* 뷰 모드에 따른 컨텐츠 렌더링 */}
        {viewMode === 'list' ? (
          <SongListView
            songs={youtubeSongs}
            onSelectSong={handleSelectSong}
          />
        ) : (
          selectedSong && (
            <LearningView
              selectedSong={selectedSong}
              onBackToList={handleBackToList}
            />
          )
        )}
      </div>
    </div>
  );
}