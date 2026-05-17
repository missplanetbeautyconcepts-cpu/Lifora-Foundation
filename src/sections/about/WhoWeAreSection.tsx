import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Target } from 'lucide-react';

export default function WhoWeAreSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <SectionHeader
              title="Who We Are"
              icon={Target}
            />
            <div className="mt-8 space-y-6 text-lg text-mao-body leading-relaxed">
              <p>
                Lifora is built on the belief that every life holds value and potential. Founded with a mission to bring life where it is needed most, Lifora exists to support vulnerable individuals and underserved communities through meaningful, consistent action.
              </p>
              <p>
                We operate at the intersection of compassion and structure—providing immediate support while building pathways toward long-term stability and independence.
              </p>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-mao-blue/10 rounded-3xl rotate-2" />
              <img
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000"
                alt="Support and compassion"
                className="relative rounded-2xl w-full h-[400px] object-cover shadow-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
