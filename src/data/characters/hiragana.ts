import type { CharacterData } from '../types';

// 히라가나 50음도 데이터 (정확한 순서)
export const hiraganaData: CharacterData[] = [
  // あ단 (a-dan)
  { character: 'あ', romaji: 'a', korean: '아' },
  { character: 'い', romaji: 'i', korean: '이' },
  { character: 'う', romaji: 'u', korean: '우' },
  { character: 'え', romaji: 'e', korean: '에' },
  { character: 'お', romaji: 'o', korean: '오' },
  
  // か단 (ka-dan)
  { character: 'か', romaji: 'ka', korean: '카' },
  { character: 'き', romaji: 'ki', korean: '키' },
  { character: 'く', romaji: 'ku', korean: '쿠' },
  { character: 'け', romaji: 'ke', korean: '케' },
  { character: 'こ', romaji: 'ko', korean: '코' },
  
  // さ단 (sa-dan)
  { character: 'さ', romaji: 'sa', korean: '사' },
  { character: 'し', romaji: 'shi', korean: '시' },
  { character: 'す', romaji: 'su', korean: '스' },
  { character: 'せ', romaji: 'se', korean: '세' },
  { character: 'そ', romaji: 'so', korean: '소' },
  
  // た단 (ta-dan)
  { character: 'た', romaji: 'ta', korean: '타' },
  { character: 'ち', romaji: 'chi', korean: '치' },
  { character: 'つ', romaji: 'tsu', korean: '츠' },
  { character: 'て', romaji: 'te', korean: '테' },
  { character: 'と', romaji: 'to', korean: '토' },
  
  // な단 (na-dan)
  { character: 'な', romaji: 'na', korean: '나' },
  { character: 'に', romaji: 'ni', korean: '니' },
  { character: 'ぬ', romaji: 'nu', korean: '누' },
  { character: 'ね', romaji: 'ne', korean: '네' },
  { character: 'の', romaji: 'no', korean: '노' },
  
  // は단 (ha-dan)
  { character: 'は', romaji: 'ha', korean: '하' },
  { character: 'ひ', romaji: 'hi', korean: '히' },
  { character: 'ふ', romaji: 'fu', korean: '후' },
  { character: 'へ', romaji: 'he', korean: '헤' },
  { character: 'ほ', romaji: 'ho', korean: '호' },
  
  // ま단 (ma-dan)
  { character: 'ま', romaji: 'ma', korean: '마' },
  { character: 'み', romaji: 'mi', korean: '미' },
  { character: 'む', romaji: 'mu', korean: '무' },
  { character: 'め', romaji: 'me', korean: '메' },
  { character: 'も', romaji: 'mo', korean: '모' },
  
  // や단 (ya-dan) - い, え 없음
  { character: 'や', romaji: 'ya', korean: '야' },
  { character: 'ゆ', romaji: 'yu', korean: '유' },
  { character: 'よ', romaji: 'yo', korean: '요' },
  
  // ら단 (ra-dan)
  { character: 'ら', romaji: 'ra', korean: '라' },
  { character: 'り', romaji: 'ri', korean: '리' },
  { character: 'る', romaji: 'ru', korean: '루' },
  { character: 'れ', romaji: 're', korean: '레' },
  { character: 'ろ', romaji: 'ro', korean: '로' },
  
  // わ단 (wa-dan) - 현대 일본어에서는 わ, を만 사용
  { character: 'わ', romaji: 'wa', korean: '와' },
  { character: 'を', romaji: 'wo', korean: '오' }, // 발음은 '오'
  
  // 특수음
  { character: 'ん', romaji: 'n', korean: 'ㄴ' },
];

// 50음도 차트용 정렬된 데이터 (5x10 그리드)
export const hiraganaChartData = [
  // 1행: あ い う え お
  { character: 'あ', romaji: 'a', korean: '아' },
  { character: 'い', romaji: 'i', korean: '이' },
  { character: 'う', romaji: 'u', korean: '우' },
  { character: 'え', romaji: 'e', korean: '에' },
  { character: 'お', romaji: 'o', korean: '오' },
  
  // 2행: か き く け こ
  { character: 'か', romaji: 'ka', korean: '카' },
  { character: 'き', romaji: 'ki', korean: '키' },
  { character: 'く', romaji: 'ku', korean: '쿠' },
  { character: 'け', romaji: 'ke', korean: '케' },
  { character: 'こ', romaji: 'ko', korean: '코' },
  
  // 3행: さ し す せ そ
  { character: 'さ', romaji: 'sa', korean: '사' },
  { character: 'し', romaji: 'shi', korean: '시' },
  { character: 'す', romaji: 'su', korean: '스' },
  { character: 'せ', romaji: 'se', korean: '세' },
  { character: 'そ', romaji: 'so', korean: '소' },
  
  // 4행: た ち つ て と
  { character: 'た', romaji: 'ta', korean: '타' },
  { character: 'ち', romaji: 'chi', korean: '치' },
  { character: 'つ', romaji: 'tsu', korean: '츠' },
  { character: 'て', romaji: 'te', korean: '테' },
  { character: 'と', romaji: 'to', korean: '토' },
  
  // 5행: な に ぬ ね の
  { character: 'な', romaji: 'na', korean: '나' },
  { character: 'に', romaji: 'ni', korean: '니' },
  { character: 'ぬ', romaji: 'nu', korean: '누' },
  { character: 'ね', romaji: 'ne', korean: '네' },
  { character: 'の', romaji: 'no', korean: '노' },
  
  // 6행: は ひ ふ へ ほ
  { character: 'は', romaji: 'ha', korean: '하' },
  { character: 'ひ', romaji: 'hi', korean: '히' },
  { character: 'ふ', romaji: 'fu', korean: '후' },
  { character: 'へ', romaji: 'he', korean: '헤' },
  { character: 'ほ', romaji: 'ho', korean: '호' },
  
  // 7행: ま み む め も
  { character: 'ま', romaji: 'ma', korean: '마' },
  { character: 'み', romaji: 'mi', korean: '미' },
  { character: 'む', romaji: 'mu', korean: '무' },
  { character: 'め', romaji: 'me', korean: '메' },
  { character: 'も', romaji: 'mo', korean: '모' },
  
  // 8행: や (빈칸) ゆ (빈칸) よ
  { character: 'や', romaji: 'ya', korean: '야' },
  null, // い단 빈칸
  { character: 'ゆ', romaji: 'yu', korean: '유' },
  null, // え단 빈칸
  { character: 'よ', romaji: 'yo', korean: '요' },
  
  // 9행: ら り る れ ろ
  { character: 'ら', romaji: 'ra', korean: '라' },
  { character: 'り', romaji: 'ri', korean: '리' },
  { character: 'る', romaji: 'ru', korean: '루' },
  { character: 'れ', romaji: 're', korean: '레' },
  { character: 'ろ', romaji: 'ro', korean: '로' },
  
  // 10행: わ (빈칸) (빈칸) (빈칸) を
  { character: 'わ', romaji: 'wa', korean: '와' },
  null, // い단 빈칸
  null, // う단 빈칸
  null, // え단 빈칸
  { character: 'を', romaji: 'wo', korean: '오' },
  
  // 11행: ん (특수)
  { character: 'ん', romaji: 'n', korean: 'ㄴ' },
];
