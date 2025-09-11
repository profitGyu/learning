'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CharacterData } from '@/data';

interface CharacterChartProps {
  data: CharacterData[];
}

export function CharacterChart({ data }: CharacterChartProps) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-3">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.02 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="aspect-square cursor-pointer hover:shadow-lg transition-all duration-200 bg-white/90 backdrop-blur-sm border-2 hover:border-green-300">
            <CardContent className="p-1.5 md:p-2 flex flex-col items-center justify-center h-full">
              <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-0.5 md:mb-1">
                {item.character}
              </div>
              <div className="text-xs text-gray-600 text-center space-y-0.5">
                <div className="font-medium">{item.romaji}</div>
                <div className="text-green-600 font-semibold text-xs">{item.korean}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
