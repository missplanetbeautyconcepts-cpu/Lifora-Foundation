import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function JoinFormSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Form Side */}
          <div className="p-8 md:p-12">
            <AnimatedSection>
              <SectionHeader
                title="Join Our Mission"
                subtitle="Fill out the form below and our team will get back to you with how you can help."
              />

              <form className="space-y-6 mt-8" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your interest! We will contact you soon.'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-mao-dark">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-mao-blue outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-mao-dark">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-mao-blue outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-mao-dark">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-mao-blue outline-none transition-all"
                    placeholder="(416) 555-0123"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-mao-dark">How would you like to help?</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-mao-blue outline-none transition-all appearance-none bg-white">
                    <option>Volunteer</option>
                    <option>Mentorship</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-mao-dark">Message (Optional)</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-mao-blue outline-none transition-all h-32 resize-none"
                    placeholder="Tell us a bit about why you want to get involved..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-mao-blue text-white font-bold rounded-pill shadow-button hover:bg-mao-blue-hover transition-all"
                >
                  Submit Application
                </button>
              </form>
            </AnimatedSection>
          </div>

          {/* Image Side */}
          <div className="relative hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
              alt="Volunteers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-mao-blue/20" />
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <div className="bg-mao-dark/80 backdrop-blur-md p-8 rounded-2xl border border-white/10">
                <h3 className="text-2xl font-bold mb-4 italic">"Volunteering here changed my perspective on what community really means."</h3>
                <p className="font-semibold text-mao-gold">— Sarah K., Volunteer since 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
