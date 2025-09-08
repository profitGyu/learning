'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradientFrom: string;
  gradientTo: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, subtitle, gradientFrom, gradientTo, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <Link href="/">
        <Button variant="outline" size="sm">
          <Home className="h-4 w-4 mr-2" />
          홈으로
        </Button>
      </Link>
      <div className="text-center">
        <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-600 mt-2">{subtitle}</p>
        )}
      </div>
      <div className="text-right">
        {children}
      </div>
    </div>
  );
}
