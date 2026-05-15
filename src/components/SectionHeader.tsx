import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  centered = false,
  light = false,
  className
}: SectionHeaderProps) {
  return (
    <div className={cn(
      'mb-12 space-y-4',
      centered && 'text-center flex flex-col items-center',
      className
    )}>
      {Icon && (
        <div className={cn(
          'w-12 h-12 rounded-xl flex items-center justify-center mb-2',
          light ? 'bg-white/10 text-mao-gold' : 'bg-mao-blue-light text-mao-blue'
        )}>
          <Icon className="w-6 h-6" />
        </div>
      )}

      <div className={cn(centered && 'flex flex-col items-center')}>
        <h2 className={cn(
          'text-3xl md:text-4xl font-bold tracking-tight',
          light ? 'text-white' : 'text-mao-dark'
        )}>
          {title}
        </h2>
        <div className="w-16 h-1 mt-3 bg-mao-gold rounded-full" />
      </div>

      {subtitle && (
        <p className={cn(
          'text-lg max-w-3xl leading-relaxed',
          light ? 'text-white/80' : 'text-mao-body'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
