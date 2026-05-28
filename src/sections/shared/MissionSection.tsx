import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Target, Users, BookOpen, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const IMAGES = [
  "https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/4dc12810-fa29-4763-b875-b204def3b3d5.JPG",
  "https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/7518b41f-753c-4a88-a175-4cff04dd6494.JPG",
  "https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/ef6fbdeb-ca67-4868-ab67-0e252b67e960.JPG"
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0
  })
};

export default function MissionSection() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setPage((prev) => (prev + newDirection + IMAGES.length) % IMAGES.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <SectionHeader
              title="Our Mission & Vision"
              icon={Target}
            />

            <div className="space-y-8 mt-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-mao-blue flex items-center justify-center text-white">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-mao-dark mb-2">Our Mission</h4>
                  <p className="text-mao-body">To bring life where it is needed most by providing essential support, restoring dignity, and creating pathways for individuals and communities to rebuild and thrive.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-lg bg-mao-blue flex items-center justify-center text-white">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-mao-dark mb-2">Our Vision</h4>
                  <p className="text-mao-body">A world where every individual, regardless of circumstance, has access to the support, opportunity, and resources needed to live with dignity and purpose.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 bg-mao-gold/20 rounded-3xl -rotate-2" />
              <div className="relative rounded-2xl w-full h-[500px] overflow-hidden shadow-2xl bg-gray-100 group">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={page}
                    src={IMAGES[page]}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.25 }
                    }}
                    alt={`Community activity slide ${page + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Left navigation arrow */}
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white hover:scale-105 text-mao-dark md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center shadow-md transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right navigation arrow */}
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white hover:scale-105 text-mao-dark md:opacity-0 md:group-hover:opacity-100 flex items-center justify-center shadow-md transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Carousel position dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                  {IMAGES.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setDirection(index > page ? 1 : -1);
                        setPage(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                        index === page ? 'bg-mao-blue w-6' : 'bg-white/50 hover:bg-white'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
