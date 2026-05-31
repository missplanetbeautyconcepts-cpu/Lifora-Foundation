import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDonation } from '@/context/DonationContext';

interface DonateButtonProps {
  variant?: 'primary' | 'white' | 'outline';
  className?: string;
}

export default function DonateButton({ variant = 'primary', className }: DonateButtonProps) {
  const { openModal } = useDonation();
  
  const variants = {
    primary: 'bg-mao-gold text-white hover:bg-opacity-90 shadow-md shadow-mao-gold/15 hover:shadow-lg hover:shadow-mao-gold/25',
    white: 'bg-white text-mao-blue hover:bg-gray-50 shadow-md shadow-black/5 hover:shadow-lg hover:shadow-black/10',
    outline: 'border border-mao-blue text-mao-blue hover:bg-mao-blue hover:text-white hover:shadow-md hover:shadow-mao-blue/5',
  };

  return (
    <button
      onClick={openModal}
      className={cn(
        'inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform active:scale-95 cursor-pointer',
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
