'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  gradient: string;
}

export function FeatureCard({ title, description, icon, href, gradient }: FeatureCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white mb-4 mx-auto`}>
            {icon}
          </div>
          <CardTitle className="text-center text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-center text-gray-600">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
