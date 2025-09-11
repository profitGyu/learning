'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { YouTubePlayer } from '@/components/domains/youtube/YouTubePlayer';
import { LyricsSidebar } from '@/components/domains/youtube/LyricsSidebar';
import { CurrentLyricDisplay } from '@/components/domains/youtube/CurrentLyricDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { YouTubeSong } from '@/data/types';
import { YouTubePlayer as YTPlayer } from 'react-youtube';
import { ArrowLeft, Music } from 'lucide-react';

interface LearningViewProps {
  selectedSong: YouTubeSong;
  onBackToList: () => void;
}

export function LearningView({ selectedSong, onBackToList }: LearningViewProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [lastValidLyricIndex, setLastValidLyricIndex] = useState(-1);
  const [showKorean, setShowKorean] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const timeUpdateRef = useRef<NodeJS.Timeout | undefined>(undefined);

  // YouTube player options - 반응형으로 수정
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      fs: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
  };

  // Time tracking functions
  const stopTimeTracking = useCallback(() => {
    if (timeUpdateRef.current) {
      clearInterval(timeUpdateRef.current);
      timeUpdateRef.current = undefined;
    }
  }, []);

  const startTimeTracking = useCallback(() => {
    if (timeUpdateRef.current) {
      clearInterval(timeUpdateRef.current);
    }

    timeUpdateRef.current = setInterval(() => {
      if (playerRef.current && playerReady) {
        try {
          const time = playerRef.current.getCurrentTime();
          if (typeof time === 'number' && !isNaN(time)) {
            setCurrentTime(time);
          }
        } catch (error) {
          console.warn('Failed to get current time from player:', error);
        }
      }
    }, 50); // 더 정확한 동기화를 위해 50ms로 단축
  }, [playerReady]);

  // 뮤트 상태를 토글하는 함수
  const toggleMute = useCallback(() => {
    if (!playerRef.current || !playerReady) return;

    try {
      if (isMuted) {
        playerRef.current.unMute();
        playerRef.current.setVolume(50);
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch (error) {
      console.warn('Failed to toggle mute:', error);
    }
  }, [isMuted, playerReady]);

  // YouTube player event handlers
  const onReady = useCallback((event: { target: YTPlayer }) => {
    console.log('YouTube player ready');
    playerRef.current = event.target;
    setPlayerReady(true);
    try {
      playerRef.current.setVolume(50);
      // 뮤트 상태 초기화
      if (isMuted) {
        playerRef.current.mute();
      }
    } catch (error) {
      console.warn('Failed to set initial volume/mute:', error);
    }
  }, [isMuted]);

  const onPlay = useCallback(() => {
    setIsPlaying(true);
    startTimeTracking();
  }, [startTimeTracking]);

  const onPause = useCallback(() => {
    setIsPlaying(false);
    stopTimeTracking();
  }, [stopTimeTracking]);

  const onEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentLyricIndex(-1);
    stopTimeTracking();
  }, [stopTimeTracking]);

  const onStateChange = useCallback((event: { data: number }) => {
    console.log('YouTube player state changed:', event.data);
    if (event.data === 1) { // PLAYING
      onPlay();
    } else if (event.data === 2) { // PAUSED
      onPause();
    } else if (event.data === 0) { // ENDED
      onEnd();
    } else if (event.data === 3) { // BUFFERING
      // 버퍼링 중에는 재생 상태를 유지하되 시간 추적은 잠시 중단
      stopTimeTracking();
    } else if (event.data === 5) { // CUED
      setCurrentTime(0);
      setCurrentLyricIndex(-1);
    }
  }, [onPlay, onPause, onEnd, stopTimeTracking]);

  // Find current lyric based on time
  useEffect(() => {
    const currentLyric = selectedSong.lyrics.findIndex(lyric =>
      currentTime >= lyric.startTime && currentTime <= lyric.endTime
    );
    setCurrentLyricIndex(currentLyric);

    // 유효한 가사가 있을 때만 마지막 가사 인덱스 업데이트
    if (currentLyric >= 0) {
      setLastValidLyricIndex(currentLyric);
    }
  }, [currentTime, selectedSong.lyrics]);

  // Control functions
  const seekToTime = useCallback((time: number) => {
    if (playerRef.current && playerReady) {
      try {
        playerRef.current.seekTo(time, true);
        setCurrentTime(time);
        // 가사 인덱스도 즉시 업데이트
        const lyricIndex = selectedSong.lyrics.findIndex(lyric =>
          time >= lyric.startTime && time <= lyric.endTime
        );
        setCurrentLyricIndex(lyricIndex);
        if (lyricIndex >= 0) {
          setLastValidLyricIndex(lyricIndex);
        }
      } catch (error) {
        console.warn('Failed to seek to time:', error);
      }
    }
  }, [playerReady, selectedSong.lyrics]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopTimeTracking();
    };
  }, [stopTimeTracking]);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* 헤더 - 뒤로가기 버튼과 현재 곡 정보 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBackToList}
            variant="outline"
            size="sm"
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            목록으로
          </Button>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Music className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-800 truncate">{selectedSong.title}</h3>
              <p className="text-sm text-gray-600 truncate">{selectedSong.artist}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge variant="outline" className="bg-red-100 text-red-600">
            실시간 동기화
          </Badge>
          <Badge variant="secondary">
            {selectedSong.lyrics.length}개 가사
          </Badge>
        </div>
      </div>

      {/* Main Content - 모바일 친화적 레이아웃 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        <YouTubePlayer
          selectedSong={selectedSong}
          currentTime={currentTime}
          isPlaying={isPlaying}
          playerReady={playerReady}
          isMuted={isMuted}
          showKorean={showKorean}
          showRomaji={showRomaji}
          currentLyricIndex={currentLyricIndex}
          setShowKorean={setShowKorean}
          setShowRomaji={setShowRomaji}
          playerRef={playerRef}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          seekToTime={seekToTime}
          toggleMute={toggleMute}
        />

        <div className="space-y-3 sm:space-y-4">
          <LyricsSidebar
            lyrics={selectedSong.lyrics}
            currentLyricIndex={currentLyricIndex}
            currentTime={currentTime}
            duration={selectedSong.duration}
            showKorean={showKorean}
            showRomaji={showRomaji}
            seekToTime={seekToTime}
          />

          {/* 현재 가사가 있으면 현재 가사, 없으면 마지막 유효 가사 표시 */}
          {(currentLyricIndex >= 0 || lastValidLyricIndex >= 0) && (
            <CurrentLyricDisplay
              lyric={selectedSong.lyrics[currentLyricIndex >= 0 ? currentLyricIndex : lastValidLyricIndex]}
              showKorean={showKorean}
              showRomaji={showRomaji}
              isActive={currentLyricIndex >= 0}
            />
          )}
        </div>
      </div>
    </div>
  );
}
