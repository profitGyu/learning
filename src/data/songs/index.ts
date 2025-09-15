// 노래 데이터 통합 export

import { rashisa } from './artists/official-higedan/rashisa';
import { goodbye } from './artists/official-higedan/goodbye';
import { hero } from './artists/official-higedan/hero';
import { chiisanaKoiNoUta } from './artists/mongol800/chiisana-koi-no-uta';
import { tsugaruKaikyo } from './artists/ishikawa-sayuri/tsugaru-kaikyo';
import { japaneseArtistInfo, peanuts } from './artists/official-higedan';
import { mongol800Info } from './artists/mongol800';
import { ishikawaSayuriInfo } from './artists/ishikawa-sayuri';
import { betelgeuse, yuriInfo } from './artists/yuri';

// 개별 export들
export { rashisa } from './artists/official-higedan/rashisa';
export { goodbye } from './artists/official-higedan/goodbye';
export { hero } from './artists/official-higedan/hero';
export { chiisanaKoiNoUta } from './artists/mongol800/chiisana-koi-no-uta';
export { tsugaruKaikyo } from './artists/ishikawa-sayuri/tsugaru-kaikyo';
export { japaneseArtistInfo } from './artists/official-higedan';
export { mongol800Info } from './artists/mongol800';
export { ishikawaSayuriInfo } from './artists/ishikawa-sayuri';
export { betelgeuse } from './artists/yuri/betelgeuse';
export { yuriInfo } from './artists/yuri';

// YouTube 노래 컬렉션
export const youtubeSongs = [rashisa, goodbye, hero, peanuts, betelgeuse];

// J-Pop 가사 예시 컬렉션
export const jpopLyrics = [chiisanaKoiNoUta, tsugaruKaikyo];

// 모든 아티스트 정보
export const artists = [japaneseArtistInfo, mongol800Info, ishikawaSayuriInfo, yuriInfo];

// 타입들 re-export
export type { Song, YouTubeSong, TimedLyricLine, LyricLine, Artist } from '../types';
