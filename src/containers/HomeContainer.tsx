'use client';

import { motion } from 'framer-motion';
import { FeatureCard } from '@/components/domains/home/FeatureCard';
import { HeroSection } from '@/components/domains/home/HeroSection';
import { QuickStartSection } from '@/components/domains/home/QuickStartSection';
import { BackgroundAnimation } from '@/components/domains/common/BackgroundAnimation';
import { BookOpen, Music } from 'lucide-react';

const features = [
  {
    title: "기초 일본어",
    description: "히라가나, 가타카나, 기본 단어를 체계적으로 학습하세요",
    icon: <BookOpen className="h-8 w-8" />,
    href: "/learn",
    gradient: "from-indigo-400 to-purple-600",
    delay: 0.1
  },
  {
    title: "노래 학습",
    description: "실제 노래와 동기화된 가사로 일본어를 배워보세요",
    icon: <Music className="h-8 w-8" />,
    href: "/youtube",
    gradient: "from-red-400 to-orange-600",
    delay: 0.2
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
        <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
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
