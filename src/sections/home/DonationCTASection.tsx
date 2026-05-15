import AnimatedSection from '@/components/AnimatedSection';
import DonateButton from '@/components/DonateButton';

export default function DonationCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with parallax effect simulation */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
          alt="Helping hands"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-mao-blue/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-mao-dark to-transparent opacity-80" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            Support <span className="text-mao-gold">Lifora.</span>
          </h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed">
            Your support helps us extend our reach and deepen our impact. Whether through donations, partnerships, or advocacy, every contribution plays a role in changing lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <DonateButton variant="white" className="text-lg px-10 py-5" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
