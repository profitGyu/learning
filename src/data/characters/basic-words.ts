import type { WordData } from '../types';

// 기초 일본어 단어
export const basicWords: WordData[] = [
  { japanese: 'こんにちは', romaji: 'konnichiwa', korean: '안녕하세요', category: '인사' },
  { japanese: 'ありがとう', romaji: 'arigatou', korean: '고맙습니다', category: '인사' },
  { japanese: 'すみません', romaji: 'sumimasen', korean: '죄송합니다', category: '인사' },
  { japanese: 'はじめまして', romaji: 'hajimemashite', korean: '처음 뵙겠습니다', category: '인사' },
  { japanese: 'おはよう', romaji: 'ohayou', korean: '좋은 아침', category: '인사' },
  { japanese: 'おやすみ', romaji: 'oyasumi', korean: '안녕히 주무세요', category: '인사' },
  
  { japanese: 'ねこ', romaji: 'neko', korean: '고양이', category: '동물' },
  { japanese: 'いぬ', romaji: 'inu', korean: '개', category: '동물' },
  { japanese: 'とり', romaji: 'tori', korean: '새', category: '동물' },
  { japanese: 'さかな', romaji: 'sakana', korean: '물고기', category: '동물' },
  
  { japanese: 'みず', romaji: 'mizu', korean: '물', category: '음식' },
  { japanese: 'おちゃ', romaji: 'ocha', korean: '차', category: '음식' },
  { japanese: 'ごはん', romaji: 'gohan', korean: '밥', category: '음식' },
  { japanese: 'りんご', romaji: 'ringo', korean: '사과', category: '음식' },
  
  { japanese: 'いち', romaji: 'ichi', korean: '하나', category: '숫자' },
  { japanese: 'に', romaji: 'ni', korean: '둘', category: '숫자' },
  { japanese: 'さん', romaji: 'san', korean: '셋', category: '숫자' },
  { japanese: 'よん', romaji: 'yon', korean: '넷', category: '숫자' },
  { japanese: 'ご', romaji: 'go', korean: '다섯', category: '숫자' },
];
