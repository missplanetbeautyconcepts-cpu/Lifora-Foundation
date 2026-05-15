import SectionHeader from '@/components/SectionHeader';
import TestimonialCard from '@/components/TestimonialCard';
import AnimatedSection from '@/components/AnimatedSection';

const testimonials = [
  {
    quote: "When I arrived in Canada, I was lost. MAO provided me with a mentor who helped me navigate the job market. Today, I am working as a Senior Engineer thanks to their guidance.",
    author: "Elena Rodriguez",
    role: "Settled in 2021",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
  },
  {
    quote: "The workshops on cultural awareness helped our local business understand how to better serve our diverse neighborhood. It's transformed how we connect with our customers.",
    author: "Mark Thomson",
    role: "Local Business Owner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  }
];

export default function SuccessStoriesSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Success Stories"
          subtitle="Real people, real impact. See how your support transforms lives."
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <AnimatedSection key={t.author} delay={idx * 0.2}>
              <TestimonialCard {...t} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
