// 공통 타입 정의들

export type CharacterData = {
  character: string;
  romaji: string;
  korean: string;
};

export type WordData = {
  japanese: string;
  romaji: string;
  korean: string;
  category: string;
};

export type LyricLine = {
  japanese: string;
  romaji: string;
  korean: string;
};

export type TimedLyricLine = {
  startTime: number;
  endTime: number;
  japanese: string;
  romaji: string;
  korean: string;
  koreanPronunciation?: string;
};

export type Song = {
  title: string;
  artist: string;
  lyrics: LyricLine[];
};

export type YouTubeSong = {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  duration: number;
  lyrics: TimedLyricLine[];
  thumbnailUrl?: string;
};

export type Artist = {
  id: string;
  name: string;
  description?: string;
  searchKeyword?: string;
};
