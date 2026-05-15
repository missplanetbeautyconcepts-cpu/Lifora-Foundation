import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Target, Users, BookOpen, Heart } from 'lucide-react';

export default function MissionSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <SectionHeader
              title="Our Mission & Vision"
              subtitle="To bring life where it is needed most by providing essential support, restoring dignity, and creating pathways for individuals and communities to rebuild and thrive."
              icon={Target}
            />

            <div className="space-y-8 mt-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-mao-blue flex items-center justify-center text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-mao-dark mb-2">Our Vision</h4>
                  <p className="text-mao-body">A world where every individual, regardless of circumstance, has access to the support, opportunity, and resources needed to live with dignity and purpose.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-mao-blue flex items-center justify-center text-white">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-mao-dark mb-2">Community Driven</h4>
                  <p className="text-mao-body">Lifora is built on the belief that every life holds value and potential. We work together to create lasting change.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-mao-gold/20 rounded-3xl -rotate-2" />
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000"
                alt="Community meeting"
                className="relative rounded-2xl w-full h-[500px] object-cover shadow-2xl"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
