import AnimatedSection from '@/components/AnimatedSection';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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
            <Link
              to="/get-involved"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-pill font-semibold bg-white text-mao-blue hover:bg-gray-50 text-lg transition-all duration-300 shadow-button hover:shadow-button-hover"
            >
              Become a Volunteer
              <div className="w-5 h-5 rounded-full flex items-center justify-center bg-mao-blue/10">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
