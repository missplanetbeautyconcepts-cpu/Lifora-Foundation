import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import ContentCard from '@/components/ContentCard';
import { Heart, Home, Rocket, Users } from 'lucide-react';

const programs = [
  {
    title: 'Immediate Relief',
    description: 'We provide essential support including food, clothing, and basic care to individuals facing hardship, ensuring that urgent needs are met with speed and compassion.',
    icon: Heart
  },
  {
    title: 'Restoration & Stability',
    description: 'Lifora supports individuals in regaining stability by connecting them with resources, safe environments, and community support systems that help them transition out of crisis.',
    icon: Home
  },
  {
    title: 'Empowerment & Growth',
    description: 'We are committed to creating opportunities for individuals to rebuild their lives through skill development, access to information, and pathways toward independence.',
    icon: Rocket
  },
  {
    title: 'Community Impact',
    description: 'Lifora works with partners, volunteers, and local communities to address the root causes of poverty and displacement—creating sustainable, long-term solutions.',
    icon: Users
  }
];

export default function ImmigrantProgramsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="What We Do"
          subtitle="Our core programs are designed to bring life where it is needed most through immediate relief and long-term empowerment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((prog, idx) => (
            <AnimatedSection key={prog.title} delay={idx * 0.1}>
              <ContentCard {...prog} className="border-mao-blue-light/50 h-full" />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
