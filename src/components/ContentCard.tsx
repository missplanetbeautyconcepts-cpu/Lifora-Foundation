import { LucideIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  linkText?: string;
  linkPath?: string;
  className?: string;
}

export default function ContentCard({
  title,
  description,
  icon: Icon,
  linkText,
  linkPath,
  className
}: ContentCardProps) {
  const CardContent = (
    <>
      <div className="w-14 h-14 rounded-xl bg-mao-blue-light text-mao-blue flex items-center justify-center mb-6 group-hover:bg-mao-blue group-hover:text-white transition-colors duration-300">
        <Icon className="w-7 h-7" />
      </div>

      <h3 className="text-xl font-bold text-mao-dark mb-4">{title}</h3>
      <p className="text-mao-body leading-relaxed mb-6">{description}</p>

      {linkText && (
        <div className="flex items-center gap-2 text-mao-blue font-bold group/btn">
          {linkText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </div>
      )}
    </>
  );

  const containerClasses = cn(
    'group p-8 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 block h-full text-left',
    className
  );

  if (linkPath) {
    return (
      <Link to={linkPath} className={containerClasses}>
        {CardContent}
      </Link>
    );
  }

  return (
    <div className={containerClasses}>
      {CardContent}
    </div>
  );
}
