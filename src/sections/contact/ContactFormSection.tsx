import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';

export default function ContactFormSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-4xl mx-auto px-4">
        <AnimatedSection>
          <div className="bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-gray-100">
            <SectionHeader
              title="Get in Touch"
              subtitle="Have a question or want to partner with us? Fill out the form and we'll start a conversation."
              centered
            />

            <form className="mt-12 space-y-8" onSubmit={(e) => { e.preventDefault(); console.log('Message sent!'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-mao-dark uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/20 outline-none transition-all"
                    placeholder="E.g. John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-mao-dark uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/20 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-mao-dark uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/20 outline-none transition-all"
                  placeholder="How can we help you?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-mao-dark uppercase tracking-wider">Your Message</label>
                <textarea
                  required
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-mao-blue focus:ring-2 focus:ring-mao-blue/20 outline-none transition-all h-48 resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-4.5 bg-mao-blue text-white font-bold text-lg rounded-xl shadow-md shadow-mao-blue/10 hover:shadow-lg hover:shadow-mao-blue/15 transition-all duration-300 translate-y-0 active:scale-95"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
