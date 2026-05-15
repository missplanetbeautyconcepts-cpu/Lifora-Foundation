import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Search, Heart, ShieldCheck, Rocket } from 'lucide-react';

const steps = [
  {
    title: 'Reach',
    description: 'We identify and reach those most in need within our communities.',
    icon: Search
  },
  {
    title: 'Support',
    description: 'We provide immediate relief and essential support to address urgent needs.',
    icon: Heart
  },
  {
    title: 'Restore',
    description: 'We work to restore dignity and stability through resources and safe spaces.',
    icon: ShieldCheck
  },
  {
    title: 'Grow',
    description: 'We create pathways for growth, empowerment, and long-term independence.',
    icon: Rocket
  }
];

export default function HowWeWorkSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="How We Work"
          subtitle="Lifora combines direct action with long-term thinking to support lasting change."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <AnimatedSection key={step.title} delay={idx * 0.1} className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-card relative z-10 text-center h-full">
                <div className="w-16 h-16 rounded-full bg-mao-blue text-white flex items-center justify-center mx-auto mb-6 shadow-button">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mao-dark mb-4">{step.title}</h3>
                <p className="text-mao-body leading-relaxed">{step.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
