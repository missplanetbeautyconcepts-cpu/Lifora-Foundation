import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Globe } from 'lucide-react';

export default function MulticulturalSection() {
  return (
    <section className="py-24 bg-mao-blue text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border-[40px] border-white rounded-full" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <AnimatedSection>
          <SectionHeader
            title="Multicultural Awareness"
            subtitle="We believe that a society that understands its diverse parts is more resilient and innovative. Through cultural festivals, awareness campaigns, and educational media, we bring the beauty of multiculturalism to the forefront of Canadian life."
            icon={Globe}
            centered
            light
          />
          <button className="mt-8 px-8 py-3 bg-white text-mao-blue font-bold rounded-pill hover:bg-mao-blue-light transition-colors">
            Our Cultural Calendar
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
}
