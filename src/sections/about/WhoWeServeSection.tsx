import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Users, GraduationCap, Heart, Home } from 'lucide-react';

const targets = [
  {
    title: 'Homeless Individuals',
    description: 'Providing immediate relief and long-term pathways to stable housing and dignity.',
    icon: Home
  },
  {
    title: 'Less Privileged',
    description: 'Supporting underserved communities with essential resources and opportunities.',
    icon: Heart
  },
  {
    title: 'Vulnerable Youth',
    description: 'Empowering the next generation with mentorship and educational support systems.',
    icon: GraduationCap
  },
  {
    title: 'Underserved Families',
    description: 'Working together to ensure every family has the stability needed to thrive.',
    icon: Users
  }
];

export default function WhoWeServeSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Who We Serve"
          subtitle="At Lifora, we believe that every individual deserves access to the support needed to live with dignity."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {targets.map((item, idx) => (
            <AnimatedSection key={item.title} delay={idx * 0.1}>
              <div className="p-8 rounded-2xl bg-mao-blue-light/30 border border-mao-blue-light text-center group hover:bg-mao-blue transition-all duration-500">
                <div className="w-14 h-14 rounded-full bg-mao-blue text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-mao-dark mb-4 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-mao-body group-hover:text-white/80 transition-colors">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
