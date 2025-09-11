'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { hiraganaChartData } from '@/data/characters/hiragana';

export function HiraganaChart() {
  // 50음도 헤더 (단 정보)
  const columnHeaders = ['', 'あ', 'い', 'う', 'え', 'お'];
  const rowHeaders = ['', 'あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ', 'ん'];

  // 차트 데이터를 5x11 그리드로 구성
  const getCharacterAtPosition = (row: number, col: number) => {
    if (row === 0 || col === 0) return null; // 헤더 행/열

    const index = (row - 1) * 5 + (col - 1);

    // 특수 처리: ん은 마지막 행 첫 번째 열에만
    if (row === 11) {
      return col === 1 ? hiraganaChartData[hiraganaChartData.length - 1] : null;
    }

    if (index < hiraganaChartData.length - 1) { // -1은 ん 제외
      return hiraganaChartData[index];
    }

    return null;
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <span className="text-2xl">🈷️</span>
          히라가나 50음도
        </CardTitle>
        <p className="text-center text-sm text-gray-600">
          일본어 기본 문자 체계를 한눈에 확인하세요
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full">
            {/* 50음도 표 */}
            <div className="grid grid-cols-6 gap-1 text-center text-sm">
              {/* 헤더 행 */}
              {columnHeaders.map((header, colIndex) => (
                <div
                  key={`header-${colIndex}`}
                  className={`p-2 font-bold ${colIndex === 0
                      ? 'bg-gray-100 text-gray-600'
                      : 'bg-blue-100 text-blue-700'
                    } rounded-t-lg`}
                >
                  {header}
                </div>
              ))}

              {/* 데이터 행들 */}
              {Array.from({ length: 11 }, (_, rowIndex) => {
                const actualRow = rowIndex + 1;

                return Array.from({ length: 6 }, (_, colIndex) => {
                  if (colIndex === 0) {
                    // 행 헤더
                    return (
                      <div
                        key={`row-header-${actualRow}`}
                        className="p-2 bg-gray-100 text-gray-600 font-bold"
                      >
                        {rowHeaders[actualRow]}
                      </div>
                    );
                  }

                  const character = getCharacterAtPosition(actualRow, colIndex);

                  return (
                    <motion.div
                      key={`${actualRow}-${colIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        delay: (actualRow - 1) * 0.05 + colIndex * 0.02,
                        duration: 0.3
                      }}
                      whileHover={character ? { scale: 1.1 } : {}}
                      className={`aspect-square flex items-center justify-center ${character
                          ? 'bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all duration-200'
                          : 'bg-gray-50 border border-gray-100'
                        } rounded-lg`}
                    >
                      {character && (
                        <div className="text-center">
                          <div className="text-lg md:text-xl font-bold text-gray-800 mb-1">
                            {character.character}
                          </div>
                          <div className="text-xs space-y-0.5">
                            <div className="text-gray-600">{character.romaji}</div>
                            <div className="text-pink-600 font-medium">{character.korean}</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                });
              })}
            </div>
          </div>
        </div>

        {/* 범례 */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-medium text-blue-800 mb-1">📚 읽는 법</div>
            <div className="text-blue-700">각 문자의 로마자와 한국어 발음을 확인하세요</div>
          </div>
          <div className="bg-pink-50 p-3 rounded-lg">
            <div className="font-medium text-pink-800 mb-1">✍️ 학습 팁</div>
            <div className="text-pink-700">같은 단(행)끼리 발음 규칙이 비슷합니다</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="font-medium text-green-800 mb-1">🎯 순서</div>
            <div className="text-green-700">あ단부터 ん까지 순서대로 외우세요</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
