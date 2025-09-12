'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { SongListView } from '@/components/domains/youtube/SongListView';
import { SongSearchBar } from '@/components/domains/youtube/SongSearchBar';
import { youtubeSongs, artists } from '@/data';
import { Badge } from '@/components/ui/badge';
import type { YouTubeSong } from '@/data/types';
import { useRouter } from 'next/navigation';

export function YouTubeSongListContainer() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 필터링 로직
  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) {
      return youtubeSongs;
    }

    const query = searchQuery.toLowerCase().trim();

    return youtubeSongs.filter(song => {
      // 곡명과 아티스트명으로 검색
      const titleMatch = song.title.toLowerCase().includes(query);
      const artistMatch = song.artist.toLowerCase().includes(query);

      // 아티스트의 searchKeyword로 검색
      const artistInfo = artists.find(artist => artist.name === song.artist);
      const keywordMatch = artistInfo?.searchKeyword?.toLowerCase().includes(query) || false;

      return titleMatch || artistMatch || keywordMatch;
    });
  }, [searchQuery]);

  // 노래 선택 핸들러 - 동적 라우팅으로 이동
  const handleSelectSong = (song: YouTubeSong) => {
    router.push(`/youtube/${song.id}`);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // 검색어 초기화 핸들러
  const handleClearSearch = () => {
    setSearchQuery('');
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

        {/* 검색 바 */}
        <div className="mb-8">
          <SongSearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            filteredCount={filteredSongs.length}
            totalCount={youtubeSongs.length}
          />
        </div>

        <SongListView
          songs={filteredSongs}
          onSelectSong={handleSelectSong}
        />
      </div>
    </div>
  );
}
