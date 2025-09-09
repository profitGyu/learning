'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { WordData } from '@/data';

interface CategorySelectionProps {
  categories: Array<{ name: string; icon: string; color: string }>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  basicWords: WordData[];
}

export function CategorySelection({ categories, selectedCategory, onCategoryChange, basicWords }: CategorySelectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">카테고리 선택</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 ${selectedCategory === category.name
                  ? 'ring-2 ring-indigo-500 bg-indigo-50'
                  : 'hover:shadow-lg bg-white/80'
                }`}
              onClick={() => onCategoryChange(category.name)}
            >
              <CardContent className="p-4 text-center">
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-white mb-3 mx-auto`}>
                  📚
                </div>
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {basicWords.filter(w => w.category === category.name).length}개 단어
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
