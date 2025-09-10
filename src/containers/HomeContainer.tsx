'use client';

import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/domains/home/FeatureCard';
import { HeroSection } from '@/components/domains/home/HeroSection';
import { QuickStartSection } from '@/components/domains/home/QuickStartSection';
import { BackgroundAnimation } from '@/components/domains/common/BackgroundAnimation';
import { BookOpen, Music, Users } from 'lucide-react';

const features = [
  {
    title: "히라가나 암기",
    description: "46개 히라가나 문자를 카드 게임으로 재미있게 학습하세요",
    icon: <BookOpen className="h-8 w-8" />,
    href: "/hiragana",
    gradient: "from-pink-400 to-pink-600",
    delay: 0.1
  },
  {
    title: "가타카나 암기",
    description: "46개 가타카나 문자를 인터랙티브하게 연습하세요",
    icon: <Users className="h-8 w-8" />,
    href: "/katakana",
    gradient: "from-purple-400 to-purple-600",
    delay: 0.2
  },
  {
    title: "기초 일본어",
    description: "일상에서 자주 쓰이는 기본 일본어 단어와 표현을 배워보세요",
    icon: <BookOpen className="h-8 w-8" />,
    href: "/basic",
    gradient: "from-blue-400 to-blue-600",
    delay: 0.3
  },
  {
    title: "노래 학습",
    description: "실제 노래와 동기화된 가사로 일본어를 배워보세요",
    icon: <Music className="h-8 w-8" />,
    href: "/youtube",
    gradient: "from-red-400 to-orange-600",
    delay: 0.4
  }
];

export function HomeContainer() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundAnimation />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <HeroSection />

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + feature.delay }}
              whileHover={{ y: -5 }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        <QuickStartSection />
      </div>
    </div>
  );
}
