import type { CharacterData } from '../types';

// 가타카나 50음도 데이터 (정확한 순서)
export const katakanaData: CharacterData[] = [
  // ア단 (a-dan)
  { character: 'ア', romaji: 'a', korean: '아' },
  { character: 'イ', romaji: 'i', korean: '이' },
  { character: 'ウ', romaji: 'u', korean: '우' },
  { character: 'エ', romaji: 'e', korean: '에' },
  { character: 'オ', romaji: 'o', korean: '오' },
  
  // カ단 (ka-dan)
  { character: 'カ', romaji: 'ka', korean: '카' },
  { character: 'キ', romaji: 'ki', korean: '키' },
  { character: 'ク', romaji: 'ku', korean: '쿠' },
  { character: 'ケ', romaji: 'ke', korean: '케' },
  { character: 'コ', romaji: 'ko', korean: '코' },
  
  // サ단 (sa-dan)
  { character: 'サ', romaji: 'sa', korean: '사' },
  { character: 'シ', romaji: 'shi', korean: '시' },
  { character: 'ス', romaji: 'su', korean: '스' },
  { character: 'セ', romaji: 'se', korean: '세' },
  { character: 'ソ', romaji: 'so', korean: '소' },
  
  // タ단 (ta-dan)
  { character: 'タ', romaji: 'ta', korean: '타' },
  { character: 'チ', romaji: 'chi', korean: '치' },
  { character: 'ツ', romaji: 'tsu', korean: '츠' },
  { character: 'テ', romaji: 'te', korean: '테' },
  { character: 'ト', romaji: 'to', korean: '토' },
  
  // ナ단 (na-dan)
  { character: 'ナ', romaji: 'na', korean: '나' },
  { character: 'ニ', romaji: 'ni', korean: '니' },
  { character: 'ヌ', romaji: 'nu', korean: '누' },
  { character: 'ネ', romaji: 'ne', korean: '네' },
  { character: 'ノ', romaji: 'no', korean: '노' },
  
  // ハ단 (ha-dan)
  { character: 'ハ', romaji: 'ha', korean: '하' },
  { character: 'ヒ', romaji: 'hi', korean: '히' },
  { character: 'フ', romaji: 'fu', korean: '후' },
  { character: 'ヘ', romaji: 'he', korean: '헤' },
  { character: 'ホ', romaji: 'ho', korean: '호' },
  
  // マ단 (ma-dan)
  { character: 'マ', romaji: 'ma', korean: '마' },
  { character: 'ミ', romaji: 'mi', korean: '미' },
  { character: 'ム', romaji: 'mu', korean: '무' },
  { character: 'メ', romaji: 'me', korean: '메' },
  { character: 'モ', romaji: 'mo', korean: '모' },
  
  // ヤ단 (ya-dan) - イ, エ 없음
  { character: 'ヤ', romaji: 'ya', korean: '야' },
  { character: 'ユ', romaji: 'yu', korean: '유' },
  { character: 'ヨ', romaji: 'yo', korean: '요' },
  
  // ラ단 (ra-dan)
  { character: 'ラ', romaji: 'ra', korean: '라' },
  { character: 'リ', romaji: 'ri', korean: '리' },
  { character: 'ル', romaji: 'ru', korean: '루' },
  { character: 'レ', romaji: 're', korean: '레' },
  { character: 'ロ', romaji: 'ro', korean: '로' },
  
  // ワ단 (wa-dan) - 현대 일본어에서는 ワ, ヲ만 사용
  { character: 'ワ', romaji: 'wa', korean: '와' },
  { character: 'ヲ', romaji: 'wo', korean: '오' }, // 발음은 '오'
  
  // 특수음
  { character: 'ン', romaji: 'n', korean: 'ㄴ' },
];

// 50음도 차트용 정렬된 데이터 (5x10 그리드)
export const katakanaChartData = [
  // 1행: ア イ ウ エ オ
  { character: 'ア', romaji: 'a', korean: '아' },
  { character: 'イ', romaji: 'i', korean: '이' },
  { character: 'ウ', romaji: 'u', korean: '우' },
  { character: 'エ', romaji: 'e', korean: '에' },
  { character: 'オ', romaji: 'o', korean: '오' },
  
  // 2행: カ キ ク ケ コ
  { character: 'カ', romaji: 'ka', korean: '카' },
  { character: 'キ', romaji: 'ki', korean: '키' },
  { character: 'ク', romaji: 'ku', korean: '쿠' },
  { character: 'ケ', romaji: 'ke', korean: '케' },
  { character: 'コ', romaji: 'ko', korean: '코' },
  
  // 3행: サ シ ス セ ソ
  { character: 'サ', romaji: 'sa', korean: '사' },
  { character: 'シ', romaji: 'shi', korean: '시' },
  { character: 'ス', romaji: 'su', korean: '스' },
  { character: 'セ', romaji: 'se', korean: '세' },
  { character: 'ソ', romaji: 'so', korean: '소' },
  
  // 4행: タ チ ツ テ ト
  { character: 'タ', romaji: 'ta', korean: '타' },
  { character: 'チ', romaji: 'chi', korean: '치' },
  { character: 'ツ', romaji: 'tsu', korean: '츠' },
  { character: 'テ', romaji: 'te', korean: '테' },
  { character: 'ト', romaji: 'to', korean: '토' },
  
  // 5행: ナ ニ ヌ ネ ノ
  { character: 'ナ', romaji: 'na', korean: '나' },
  { character: 'ニ', romaji: 'ni', korean: '니' },
  { character: 'ヌ', romaji: 'nu', korean: '누' },
  { character: 'ネ', romaji: 'ne', korean: '네' },
  { character: 'ノ', romaji: 'no', korean: '노' },
  
  // 6행: ハ ヒ フ ヘ ホ
  { character: 'ハ', romaji: 'ha', korean: '하' },
  { character: 'ヒ', romaji: 'hi', korean: '히' },
  { character: 'フ', romaji: 'fu', korean: '후' },
  { character: 'ヘ', romaji: 'he', korean: '헤' },
  { character: 'ホ', romaji: 'ho', korean: '호' },
  
  // 7행: マ ミ ム メ モ
  { character: 'マ', romaji: 'ma', korean: '마' },
  { character: 'ミ', romaji: 'mi', korean: '미' },
  { character: 'ム', romaji: 'mu', korean: '무' },
  { character: 'メ', romaji: 'me', korean: '메' },
  { character: 'モ', romaji: 'mo', korean: '모' },
  
  // 8행: ヤ (빈칸) ユ (빈칸) ヨ
  { character: 'ヤ', romaji: 'ya', korean: '야' },
  null, // イ단 빈칸
  { character: 'ユ', romaji: 'yu', korean: '유' },
  null, // エ단 빈칸
  { character: 'ヨ', romaji: 'yo', korean: '요' },
  
  // 9행: ラ リ ル レ ロ
  { character: 'ラ', romaji: 'ra', korean: '라' },
  { character: 'リ', romaji: 'ri', korean: '리' },
  { character: 'ル', romaji: 'ru', korean: '루' },
  { character: 'レ', romaji: 're', korean: '레' },
  { character: 'ロ', romaji: 'ro', korean: '로' },
  
  // 10행: ワ (빈칸) (빈칸) (빈칸) ヲ
  { character: 'ワ', romaji: 'wa', korean: '와' },
  null, // イ단 빈칸
  null, // ウ단 빈칸
  null, // エ단 빈칸
  { character: 'ヲ', romaji: 'wo', korean: '오' },
  
  // 11행: ン (특수)
  { character: 'ン', romaji: 'n', korean: 'ㄴ' },
];
