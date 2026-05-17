import SectionHeader from '@/components/SectionHeader';
import ContentCard from '@/components/ContentCard';
import AnimatedSection from '@/components/AnimatedSection';
import { Heart, Home, Rocket } from 'lucide-react';

const services = [
  {
    title: 'Immediate Relief',
    description: 'Essential support including food, clothing, and basic care for individuals facing hardship.',
    icon: Heart,
    linkText: 'Learn More',
    linkPath: '/about'
  },
  {
    title: 'Restoration & Stability',
    description: 'Connecting individuals with resources, safe environments, and community support systems.',
    icon: Home,
    linkText: 'Learn More',
    linkPath: '/about'
  },
  {
    title: 'Empowerment & Growth',
    description: 'Skill development, access to information, and pathways toward independence.',
    icon: Rocket,
    linkText: 'Learn More',
    linkPath: '/about'
  }
];

export default function HowWeHelpSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="What We Do"
          subtitle="Lifora is committed to supporting the homeless and less privileged through immediate relief and long-term empowerment."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <AnimatedSection key={service.title} delay={idx * 0.1}>
              <ContentCard {...service} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
