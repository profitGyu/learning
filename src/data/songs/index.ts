// 노래 데이터 통합 export

import { rashisa } from './artists/japanese-artist/rashisa';
import { chiisanaKoiNoUta } from './artists/mongol800/chiisana-koi-no-uta';
import { tsugaruKaikyo } from './artists/ishikawa-sayuri/tsugaru-kaikyo';
import { japaneseArtistInfo } from './artists/japanese-artist';
import { mongol800Info } from './artists/mongol800';
import { ishikawaSayuriInfo } from './artists/ishikawa-sayuri';

// 개별 export들
export { rashisa } from './artists/japanese-artist/rashisa';
export { chiisanaKoiNoUta } from './artists/mongol800/chiisana-koi-no-uta';
export { tsugaruKaikyo } from './artists/ishikawa-sayuri/tsugaru-kaikyo';
export { japaneseArtistInfo } from './artists/japanese-artist';
export { mongol800Info } from './artists/mongol800';
export { ishikawaSayuriInfo } from './artists/ishikawa-sayuri';

// YouTube 노래 컬렉션
export const youtubeSongs = [rashisa];

// J-Pop 가사 예시 컬렉션
export const jpopLyrics = [chiisanaKoiNoUta, tsugaruKaikyo];

// 모든 아티스트 정보
export const artists = [japaneseArtistInfo, mongol800Info, ishikawaSayuriInfo];

// 타입들 re-export
export type { Song, YouTubeSong, TimedLyricLine, LyricLine, Artist } from '../types';
