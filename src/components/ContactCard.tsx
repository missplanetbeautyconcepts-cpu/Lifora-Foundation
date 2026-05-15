import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

interface ContactCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export default function ContactCard({
  title,
  value,
  description,
  icon: Icon,
  className
}: ContactCardProps) {
  return (
    <div className={cn(
      'p-8 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 text-center flex flex-col items-center',
      className
    )}>
      <div className="w-14 h-14 rounded-full bg-mao-blue text-white flex items-center justify-center mb-6 shadow-button">
        <Icon className="w-6 h-6" />
      </div>

      <h3 className="text-xl font-bold text-mao-dark mb-2">{title}</h3>
      <p className="text-lg font-bold text-mao-blue mb-4 leading-tight">{value}</p>
      <p className="text-sm text-mao-muted leading-relaxed">{description}</p>
    </div>
  );
}
