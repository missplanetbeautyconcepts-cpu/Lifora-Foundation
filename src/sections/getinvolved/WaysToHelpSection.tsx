import SectionHeader from '@/components/SectionHeader';
import ContentCard from '@/components/ContentCard';
import AnimatedSection from '@/components/AnimatedSection';
import { Heart, Users, HandHeart } from 'lucide-react';

const ways = [
  {
    title: 'Support Lifora',
    description: 'Your support helps us extend our reach and deepen our impact. Every contribution plays a role in changing lives.',
    icon: Heart,
    linkText: 'Support the Mission'
  },
  {
    title: 'Volunteer',
    description: 'Join us in making a direct impact. We welcome individuals passionate about giving back and supporting communities.',
    icon: HandHeart,
    linkText: 'Join as Volunteer'
  },
  {
    title: 'Partner With Us',
    description: 'We collaborate with organizations, businesses, and leaders to expand our reach and deliver greater impact together.',
    icon: Users,
    linkText: 'Become a Partner'
  }
];

export default function WaysToHelpSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Ways to Get Involved"
          subtitle="There are many ways you can contribute to the success of diverse communities in Canada."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ways.map((way, idx) => (
            <AnimatedSection key={way.title} delay={idx * 0.1}>
              <ContentCard {...way} className="bg-mao-blue-light/20 border-mao-blue-light/40" />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
