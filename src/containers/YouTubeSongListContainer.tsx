'use client';

import { PageHeader } from '@/components/domains/common/PageHeader';
import { SongListView } from '@/components/domains/youtube/SongListView';
import { youtubeSongs } from '@/data';
import { Badge } from '@/components/ui/badge';
import type { YouTubeSong } from '@/data/types';
import { useRouter } from 'next/navigation';

export function YouTubeSongListContainer() {
  const router = useRouter();

  // 노래 선택 핸들러 - 동적 라우팅으로 이동
  const handleSelectSong = (song: YouTubeSong) => {
    router.push(`/youtube/${song.id}`);
  };

  const headerChildren = (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-blue-100 text-blue-600">
        {youtubeSongs.length}곡 준비됨
      </Badge>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100 p-2 sm:p-4">
      <div className="container mx-auto max-w-7xl">
        <PageHeader
          title="YouTube J-Pop 학습"
          subtitle="학습할 노래를 선택하고 실제 영상과 동기화된 가사로 일본어를 배워보세요!"
          gradientFrom="from-red-500 via-orange-500"
          gradientTo="to-yellow-500"
        >
          {headerChildren}
        </PageHeader>

        <SongListView
          songs={youtubeSongs}
          onSelectSong={handleSelectSong}
        />
      </div>
    </div>
  );
}
