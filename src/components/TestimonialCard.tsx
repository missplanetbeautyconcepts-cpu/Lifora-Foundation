import { Quote } from 'lucide-react';
import { cn } from '@/lib/cn';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
  className?: string;
}

export default function TestimonialCard({
  quote,
  author,
  role,
  image,
  className
}: TestimonialCardProps) {
  return (
    <div className={cn(
      'p-8 rounded-2xl bg-white border border-gray-100 shadow-card relative flex flex-col',
      className
    )}>
      <div className="text-mao-gold mb-6">
        <Quote className="w-10 h-10 fill-current opacity-20" />
      </div>

      <p className="text-lg text-mao-dark italic leading-relaxed mb-8 relative z-10 flex-1">
        "{quote}"
      </p>

      <div className="flex items-center gap-4 border-t pt-6">
        {image && (
          <img
            src={image}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <h4 className="font-bold text-mao-dark leading-tight">{author}</h4>
          <p className="text-sm text-mao-muted">{role}</p>
        </div>
      </div>
    </div>
  );
}
