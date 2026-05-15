import SectionHeader from '@/components/SectionHeader';
import StatCard from '@/components/StatCard';
import AnimatedSection from '@/components/AnimatedSection';
import { Users, Globe, Briefcase } from 'lucide-react';

export default function ImpactStatsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Our Impact in Numbers"
          subtitle="Behind every statistic is a story of resilience, opportunity, and success."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedSection delay={0.1}>
            <StatCard
              label="Families Supported"
              value="5,240+"
              icon={Users}
            />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <StatCard
              label="Nationalities Served"
              value="54"
              icon={Globe}
            />
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <StatCard
              label="Job Placements"
              value="1,850+"
              icon={Briefcase}
            />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
