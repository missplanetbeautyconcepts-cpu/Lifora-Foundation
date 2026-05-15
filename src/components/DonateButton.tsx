import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface DonateButtonProps {
  variant?: 'primary' | 'white' | 'outline';
  className?: string;
}

export default function DonateButton({ variant = 'primary', className }: DonateButtonProps) {
  const variants = {
    primary: 'bg-mao-gold text-white hover:bg-opacity-90 shadow-button hover:shadow-button-hover',
    white: 'bg-white text-mao-blue hover:bg-gray-50',
    outline: 'border-2 border-mao-blue text-mao-blue hover:bg-mao-blue hover:text-white',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center gap-2 px-6 py-2.5 rounded-pill font-semibold transition-all duration-300',
        variants[variant],
        className
      )}
    >
      Donate Now
      <div className={cn(
        'w-5 h-5 rounded-full flex items-center justify-center transition-colors',
        variant === 'primary' ? 'bg-white/20' : 'bg-mao-blue/10'
      )}>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </button>
  );
}
