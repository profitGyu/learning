'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  PenTool,
  Languages,
  ArrowRight,
  Sparkles,
  Target,
  Clock
} from 'lucide-react';

interface LearningOption {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  color: {
    from: string;
    to: string;
    accent: string;
    bg: string;
  };
  features: string[];
  difficulty: '입문' | '초급' | '중급';
  estimatedTime: string;
  path: string;
}

const learningOptions: LearningOption[] = [
  {
    id: 'hiragana',
    title: 'ひらがな',
    subtitle: '히라가나',
    description: '일본어의 기본 문자인 히라가나를 체계적으로 학습하세요',
    icon: PenTool,
    color: {
      from: 'from-blue-500',
      to: 'to-cyan-500',
      accent: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    features: ['46개 기본 문자', '실시간 연습', '발음 가이드'],
    difficulty: '입문',
    estimatedTime: '1-2시간',
    path: '/hiragana'
  },
  {
    id: 'katakana',
    title: 'カタカナ',
    subtitle: '가타카나',
    description: '외래어 표기에 사용되는 가타카나를 마스터하세요',
    icon: Languages,
    color: {
      from: 'from-green-500',
      to: 'to-emerald-500',
      accent: 'text-green-600',
      bg: 'bg-green-50'
    },
    features: ['46개 기본 문자', '메모리 게임', '단계별 학습'],
    difficulty: '초급',
    estimatedTime: '1-2시간',
    path: '/katakana'
  },
  {
    id: 'basic-words',
    title: '基本単語',
    subtitle: '기초 단어',
    description: '일상생활에 필요한 기본 일본어 단어를 배워보세요',
    icon: BookOpen,
    color: {
      from: 'from-orange-500',
      to: 'to-red-500',
      accent: 'text-orange-600',
      bg: 'bg-orange-50'
    },
    features: ['카테고리별 분류', '퀴즈 모드', '실용 단어'],
    difficulty: '초급',
    estimatedTime: '2-3시간',
    path: '/basic'
  }
];

interface BasicLearningSelectionProps {
  onSelectLearning: (path: string) => void;
}

export function BasicLearningSelection({ onSelectLearning }: BasicLearningSelectionProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case '입문': return 'bg-blue-100 text-blue-700';
      case '초급': return 'bg-green-100 text-green-700';
      case '중급': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* 헤더 섹션 */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            기초 일본어 학습
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            일본어 학습의 첫걸음! 문자부터 기본 단어까지 체계적으로 배워보세요.
            각 과정은 초보자도 쉽게 따라할 수 있도록 설계되었습니다.
          </p>
        </motion.div>
      </div>

      {/* 학습 옵션 카드들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningOptions.map((option, index) => {
          const IconComponent = option.icon;

          return (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectLearning(option.path)}
            >
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-xl bg-white/90 backdrop-blur-sm border-2 hover:border-indigo-300 h-full flex flex-col">
                <CardHeader className="pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 bg-gradient-to-r ${option.color.from} ${option.color.to} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <Badge className={getDifficultyColor(option.difficulty)}>
                        {option.difficulty}
                      </Badge>
                    </div>

                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800 mb-1">
                        {option.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 font-medium">
                        {option.subtitle}
                      </p>
                    </div>

                    <p className="text-sm text-gray-700 leading-relaxed">
                      {option.description}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 flex-1 flex flex-col">
                  <div className="flex-1 space-y-4">
                    {/* 특징 목록 */}
                    <div className={`${option.color.bg} rounded-lg p-3 space-y-2`}>
                      <p className={`text-sm font-medium ${option.color.accent} mb-2`}>
                        주요 특징:
                      </p>
                      <ul className="space-y-1">
                        {option.features.map((feature, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                            <Target className={`h-3 w-3 ${option.color.accent} flex-shrink-0`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 예상 시간 */}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>예상 학습시간: {option.estimatedTime}</span>
                    </div>
                  </div>

                  {/* 학습 시작 버튼 - 하단 고정 */}
                  <div className="mt-4">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); // 카드 클릭 이벤트 중복 방지
                        onSelectLearning(option.path);
                      }}
                      className={`w-full bg-gradient-to-r ${option.color.from} ${option.color.to} hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 group-hover:shadow-lg`}
                    >
                      학습 시작하기
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* 학습 팁 섹션 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center mt-12"
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            💡 효과적인 학습 팁
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="text-center">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
              </div>
              <p className="font-medium">순서대로 학습</p>
              <p>히라가나 → 가타카나 → 기초단어 순으로</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <p className="font-medium">반복 연습</p>
              <p>매일 조금씩 꾸준히 연습하기</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Sparkles className="h-5 w-5 text-pink-600" />
              </div>
              <p className="font-medium">실전 활용</p>
              <p>배운 내용을 실제로 써보기</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
