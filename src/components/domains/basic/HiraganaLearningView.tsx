'use client';

import { HiraganaContainer } from '@/containers/HiraganaContainer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, PenTool } from 'lucide-react';

interface HiraganaLearningViewProps {
  onBackToSelection: () => void;
}

export function HiraganaLearningView({ onBackToSelection }: HiraganaLearningViewProps) {
  return (
    <div className="space-y-4">
      {/* 헤더 - 뒤로가기 버튼과 현재 학습 정보 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 backdrop-blur-sm rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBackToSelection}
            variant="outline"
            size="sm"
            className="flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            학습 선택
          </Button>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-gray-800">ひらがな 히라가나</h3>
              <p className="text-sm text-gray-600">일본어 기본 문자 학습</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <Badge className="bg-blue-100 text-blue-700">
            입문 과정
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-600">
            46개 문자
          </Badge>
        </div>
      </div>

      {/* 히라가나 학습 컨테이너 */}
      <HiraganaContainer />
    </div>
  );
}
