import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Fingerprint, MessageCircle, Scale } from 'lucide-react';

const initiatives = [
  {
    title: 'Public Advocacy',
    description: 'Working with policymakers to ensure fair treatment and representation for all multicultural groups.',
    icon: Scale
  },
  {
    title: 'Anti-Racism Workshops',
    description: 'Educational sessions for organizations and individuals to identify and dismantle systemic bias.',
    icon: Fingerprint
  },
  {
    title: 'Community Dialogue',
    description: 'Safe spaces for open communication between different cultural groups to build mutual understanding.',
    icon: MessageCircle
  }
];

export default function AntiRacismSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Anti-Racism & Advocacy"
          subtitle="Actively working toward a society free from discrimination and prejudice."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item, idx) => (
            <AnimatedSection key={item.title} delay={idx * 0.1}>
              <div className="p-8 rounded-2xl bg-white shadow-card border border-gray-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-mao-gold/10 text-mao-gold flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-mao-dark mb-4">{item.title}</h3>
                <p className="text-mao-body leading-relaxed">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
