import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const contactInfo = [
  {
    title: 'Phone Number',
    value: '431-788-2919',
    icon: Phone,
    color: 'bg-blue-500'
  },
  {
    title: 'Email Address',
    value: 'Liforacanada@gmail.com',
    icon: Mail,
    color: 'bg-red-500'
  },
  {
    title: 'Office Address',
    value: '150 transcona Blvd, Winnipeg, MB',
    icon: MapPin,
    color: 'bg-green-500'
  },
  {
    title: 'Social Media',
    value: '@Liforacanada',
    icon: MessageSquare,
    color: 'bg-purple-500'
  }
];

export default function ContactInfoSection() {
  return (
    <section className="py-24 bg-mao-cream">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Connect With Us"
          subtitle="We are always ready to listen, partner, and support. Reach out through any of our channels."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {contactInfo.map((item, idx) => (
            <AnimatedSection key={item.title} delay={idx * 0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center h-full border border-gray-100 group">
                <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-mao-dark mb-3">{item.title}</h3>
                <p className="text-mao-body font-medium">{item.value}</p>
                {item.title === 'Social Media' && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <a 
                      href="https://www.facebook.com/share/1E7jzDFp7b/?mibextid=wwXIfr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#1877F2] transition-colors"
                    >
                       <img 
                        src="https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/faceboook.png" 
                        alt="Facebook" 
                        className="w-6 h-6 object-contain grayscale hover:grayscale-0 transition-all"
                      />
                    </a>
                    <a 
                      href="https://www.instagram.com/Liforacanada" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#E4405F] transition-colors"
                    >
                      <img 
                        src="https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/instagra.jpg" 
                        alt="Instagram" 
                        className="w-6 h-6 object-contain rounded-sm grayscale hover:grayscale-0 transition-all"
                      />
                    </a>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
