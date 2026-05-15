import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  className?: string;
  dark?: boolean;
}

export default function StatCard({
  label,
  value,
  icon: Icon,
  className,
  dark = false
}: StatCardProps) {
  return (
    <div className={cn(
      'flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300',
      dark ? 'bg-mao-footer text-white' : 'bg-mao-blue-light text-mao-blue',
      className
    )}>
      <div className={cn(
        'w-12 h-12 rounded-full flex items-center justify-center mb-4',
        dark ? 'bg-white/10' : 'bg-white'
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <div className={cn(
        'text-4xl md:text-5xl font-extrabold mb-2',
        dark ? 'text-mao-gold' : 'text-mao-blue'
      )}>
        {value}
      </div>
      <div className={cn(
        'text-sm font-bold uppercase tracking-wider opacity-80',
        dark ? 'text-white' : 'text-mao-body'
      )}>
        {label}
      </div>
    </div>
  );
}
