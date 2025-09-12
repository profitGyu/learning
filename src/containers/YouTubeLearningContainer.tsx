'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { LearningView } from '@/components/domains/youtube/LearningView';
import { youtubeSongs } from '@/data';
import { Badge } from '@/components/ui/badge';
import type { YouTubeSong } from '@/data/types';

interface YouTubeLearningContainerProps {
  songId: string;
}

export function YouTubeLearningContainer({ songId }: YouTubeLearningContainerProps) {
  const router = useRouter();
  const [selectedSong, setSelectedSong] = useState<YouTubeSong | null>(null);

  useEffect(() => {
    // songId로 해당 곡 찾기
    const song = youtubeSongs.find(s => s.id === songId);
    if (song) {
      setSelectedSong(song);
    } else {
      // 곡을 찾을 수 없으면 목록으로 리다이렉트
      router.push('/youtube');
    }
  }, [songId, router]);

  // 목록으로 돌아가기 핸들러
  const handleBackToList = () => {
    router.push('/youtube');
  };

  const headerChildren = (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-red-100 text-red-600">
        실시간 동기화
      </Badge>
    </div>
  );

  if (!selectedSong) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100 p-2 sm:p-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
              <p className="text-gray-600">곡 정보를 불러오는 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100 p-2 sm:p-4">
      <div className="container mx-auto max-w-7xl">
        <PageHeader
          title={`${selectedSong.title} - ${selectedSong.artist}`}
          subtitle="실제 영상과 동기화된 가사로 일본어를 배워보세요!"
          gradientFrom="from-red-500 via-orange-500"
          gradientTo="to-yellow-500"
        >
          {headerChildren}
        </PageHeader>

        <LearningView
          selectedSong={selectedSong}
          onBackToList={handleBackToList}
        />
      </div>
    </div>
  );
}
