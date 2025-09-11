'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { BasicLearningSelection } from '@/components/domains/basic/BasicLearningSelection';
import { HiraganaLearningView } from '@/components/domains/basic/HiraganaLearningView';
import { KatakanaLearningView } from '@/components/domains/basic/KatakanaLearningView';
import { BasicWordsLearningView } from '@/components/domains/basic/BasicWordsLearningView';
import { Badge } from '@/components/ui/badge';

type LearningMode = 'selection' | 'hiragana' | 'katakana' | 'basic-words';

export function BasicLearningContainer() {
  const [currentMode, setCurrentMode] = useState<LearningMode>('selection');
  const router = useRouter();

  // 학습 모드 선택 핸들러
  const handleSelectLearning = (path: string) => {
    switch (path) {
      case '/hiragana':
        setCurrentMode('hiragana');
        break;
      case '/katakana':
        setCurrentMode('katakana');
        break;
      case '/basic':
        setCurrentMode('basic-words');
        break;
      default:
        // 외부 라우트인 경우 직접 이동
        router.push(path);
    }
  };

  // 선택 화면으로 돌아가기
  const handleBackToSelection = () => {
    setCurrentMode('selection');
  };

  // 현재 모드에 따른 헤더 정보
  const getHeaderInfo = () => {
    switch (currentMode) {
      case 'hiragana':
        return {
          title: 'ひらがな 학습',
          subtitle: '일본어 기본 문자인 히라가나를 체계적으로 학습하세요',
          gradient: { from: 'from-blue-500', to: 'to-cyan-500' },
          badge: { text: '입문 과정', className: 'bg-blue-100 text-blue-600' }
        };
      case 'katakana':
        return {
          title: 'カタカナ 학습',
          subtitle: '외래어 표기에 사용되는 가타카나를 마스터하세요',
          gradient: { from: 'from-green-500', to: 'to-emerald-500' },
          badge: { text: '초급 과정', className: 'bg-green-100 text-green-600' }
        };
      case 'basic-words':
        return {
          title: '基本単語 학습',
          subtitle: '일상생활에 필요한 기본 일본어 단어를 배워보세요',
          gradient: { from: 'from-orange-500', to: 'to-red-500' },
          badge: { text: '초급 과정', className: 'bg-orange-100 text-orange-600' }
        };
      default:
        return {
          title: '기초 일본어 학습',
          subtitle: '일본어 학습의 첫걸음을 시작해보세요! 문자부터 기본 단어까지 체계적으로 배울 수 있습니다.',
          gradient: { from: 'from-indigo-500', to: 'to-purple-500' },
          badge: { text: '3개 과정 준비됨', className: 'bg-indigo-100 text-indigo-600' }
        };
    }
  };

  const headerInfo = getHeaderInfo();

  const headerChildren = (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className={headerInfo.badge.className}>
        {headerInfo.badge.text}
      </Badge>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 p-2 sm:p-4">
      <div className="container mx-auto max-w-7xl">
        <PageHeader
          title={headerInfo.title}
          subtitle={headerInfo.subtitle}
          gradientFrom={headerInfo.gradient.from}
          gradientTo={headerInfo.gradient.to}
        >
          {headerChildren}
        </PageHeader>

        {/* 뷰 모드에 따른 컨텐츠 렌더링 */}
        {currentMode === 'selection' && (
          <BasicLearningSelection onSelectLearning={handleSelectLearning} />
        )}

        {currentMode === 'hiragana' && (
          <HiraganaLearningView onBackToSelection={handleBackToSelection} />
        )}

        {currentMode === 'katakana' && (
          <KatakanaLearningView onBackToSelection={handleBackToSelection} />
        )}

        {currentMode === 'basic-words' && (
          <BasicWordsLearningView onBackToSelection={handleBackToSelection} />
        )}
      </div>
    </div>
  );
}
