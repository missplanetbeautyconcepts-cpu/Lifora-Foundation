import { Link } from 'react-router-dom';
import DonateButton from '@/components/DonateButton';
import AnimatedSection from '@/components/AnimatedSection';
import { motion } from 'motion/react';
import { Users, Heart, Globe } from 'lucide-react';

export default function HomeHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-mao-dark py-12 sm:py-16 md:py-24 lg:py-0">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=2000"
          alt="Diverse community"
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-mao-dark via-mao-dark/80 to-transparent" />
      </div>

      {/* Decorative Stripes */}
      <div className="absolute right-0 top-0 h-full w-1/4 bg-mao-blue/20 skew-x-[-15deg] translate-x-1/2 z-10 hidden lg:block" />
      <div className="absolute right-32 top-0 h-full w-px bg-white/20 z-10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-20">
        <div className="max-w-3xl">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-mao-blue/20 text-mao-blue-light border border-mao-blue/30 text-xs sm:text-sm font-bold mb-6">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-mao-gold animate-pulse" />
              Bringing Life Where It’s Needed Most
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Bringing Life <span className="text-mao-gold">Where It’s Needed</span> Most.
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              Lifora is a human-centered foundation committed to supporting the homeless and less privileged through immediate relief and long-term empowerment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md sm:max-w-none">
              <DonateButton className="text-base sm:text-lg px-6 py-3.5 sm:px-8 sm:py-4 w-full sm:w-auto" />
              <Link 
                to="/get-involved"
                className="inline-flex items-center justify-center px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95 text-center cursor-pointer w-full sm:w-auto"
              >
                Partner With Us
              </Link>
            </div>

            {/* Quick Stats Overlay - Responsive */}
            <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-6 md:gap-8 border-t border-white/10 pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-mao-gold/20 flex items-center justify-center text-mao-gold shrink-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-lg">5,000+</div>
                  <div className="text-[9px] sm:text-sm text-gray-400 leading-tight">Families Supported</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-mao-blue/20 flex items-center justify-center text-mao-blue shrink-0">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-lg">20+</div>
                  <div className="text-[9px] sm:text-sm text-gray-400 leading-tight">Programs Offered</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-lg">50+</div>
                  <div className="text-[9px] sm:text-sm text-gray-400 leading-tight">Nationalities Served</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
