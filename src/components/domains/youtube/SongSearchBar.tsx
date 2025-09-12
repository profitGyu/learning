'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SongSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  filteredCount: number;
  totalCount: number;
}

export function SongSearchBar({
  searchQuery,
  onSearchChange,
  onClearSearch,
  filteredCount,
  totalCount
}: SongSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-4">
      {/* 검색 바 */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="아티스트나 곡명으로 검색하세요..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`pl-10 pr-12 h-12 text-lg transition-all duration-300 ${isFocused
              ? 'ring-2 ring-purple-500 border-purple-300 shadow-lg'
              : 'border-gray-200 hover:border-gray-300'
              }`}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* 검색 결과 정보 */}
      <AnimatePresence>
        {searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              <span className="text-sm text-gray-600">
                검색 결과: <span className="font-semibold text-purple-600">{filteredCount}</span>개
              </span>
            </div>
            <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
              전체 {totalCount}개 중
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 검색 힌트 */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
            <Search className="h-4 w-4" />
            <span>예: &quot;히게단&quot;, &quot;오피셜 단디즘 등으로 검색해보세요</span>
          </div>
        </motion.div>
      )}
    </div>
  );
}
