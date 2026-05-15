import { ReactNode } from 'react';
import AnimatedSection from './AnimatedSection';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  breadcrumbs?: string[];
}

export default function PageHero({
  title,
  subtitle,
  children,
  breadcrumbs = []
}: PageHeroProps) {
  return (
    <section className="relative bg-mao-blue text-white pt-24 pb-32 overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-[-20deg] translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 skew-x-[-20deg] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSection>
          {breadcrumbs.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-mao-blue-light mb-4 font-medium">
              {breadcrumbs.map((crumb, idx) => (
                <span key={crumb} className="flex items-center gap-2">
                  {crumb}
                  {idx < breadcrumbs.length - 1 && <span className="opacity-50">/</span>}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xl text-mao-blue-light max-w-2xl leading-relaxed mb-8">
              {subtitle}
            </p>
          )}

          {children}
        </AnimatedSection>
      </div>
    </section>
  );
}
