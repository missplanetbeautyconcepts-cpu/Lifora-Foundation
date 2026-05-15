import DonateButton from '@/components/DonateButton';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'motion/react';
import { Users, Heart, Globe } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center overflow-hidden bg-mao-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=2000"
          alt="Diverse community"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mao-dark via-mao-dark/80 to-transparent" />
      </div>

      {/* Decorative Stripes */}
      <div className="absolute right-0 top-0 h-full w-1/4 bg-mao-blue/20 skew-x-[-15deg] translate-x-1/2 z-10 hidden lg:block" />
      <div className="absolute right-32 top-0 h-full w-px bg-white/20 z-10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-20">
        <div className="max-w-3xl">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mao-blue/20 text-mao-blue-light border border-mao-blue/30 text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-mao-gold animate-pulse" />
              Bringing Life Where It’s Needed Most
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Bringing Life <span className="text-mao-gold">Where It’s Needed</span> Most.
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Lifora is a human-centered foundation committed to supporting the homeless and less privileged through immediate relief and long-term empowerment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <DonateButton className="text-lg px-8 py-4" />
              <button className="px-8 py-4 rounded-pill border-2 border-white/30 text-white font-bold hover:bg-white/10 transition-all">
                Partner With Us
              </button>
            </div>

            {/* Quick Stats Overlay - Desktop Only */}
            <div className="mt-8 grid grid-cols-3 gap-8 border-t border-white/10 pt-6 hidden md:grid">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-mao-gold/20 flex items-center justify-center text-mao-gold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">5,000+</div>
                  <div className="text-sm text-gray-400">Families Supported</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-mao-blue/20 flex items-center justify-center text-mao-blue">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">20+</div>
                  <div className="text-sm text-gray-400">Programs Offered</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">50+</div>
                  <div className="text-sm text-gray-400">Nationalities Served</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
