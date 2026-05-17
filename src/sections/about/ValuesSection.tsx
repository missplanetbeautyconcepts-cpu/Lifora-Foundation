import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Shield, Heart, Repeat, Zap, Users } from 'lucide-react';

const values = [
  {
    title: 'Dignity',
    description: 'Every individual deserves respect and care',
    icon: Shield
  },
  {
    title: 'Compassion',
    description: 'We respond with empathy and action',
    icon: Heart
  },
  {
    title: 'Consistency',
    description: 'Real impact comes from sustained effort',
    icon: Repeat
  },
  {
    title: 'Empowerment',
    description: 'We help people rebuild, not just receive',
    icon: Zap
  },
  {
    title: 'Community',
    description: 'Lasting change happens together',
    icon: Users
  }
];

export default function ValuesSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="What We Stand For"
          subtitle="Our core values guide every decision we make and every action we take."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16">
          {values.map((value, idx) => (
            <AnimatedSection key={value.title} delay={idx * 0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center h-full border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-mao-blue/10 text-mao-blue flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-mao-dark mb-3">{value.title}</h3>
                <p className="text-mao-body text-sm">{value.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
