import { Mail, Phone, MapPin, Share2 } from 'lucide-react';
import ContactCard from '@/components/ContactCard';
import AnimatedSection from '@/components/AnimatedSection';

const info = [
  {
    title: 'Call Us Anytime',
    value: '431-788-2919',
    description: 'Our team is available Mon-Fri, 9am - 5pm EST to assist with any inquiries.',
    icon: Phone
  },
  {
    title: 'Email Us',
    value: 'Liforacanada@gmail.com',
    description: 'Expect a response within 24-48 hours from our dedicated support staff.',
    icon: Mail
  },
  {
    title: 'Visit Our Office',
    value: 'Winnipeg, Manitoba',
    description: '150 transcona Blvd',
    icon: MapPin
  },
  {
    title: 'Follow Us',
    value: '@Liforacanada',
    description: 'Join our community on Facebook and Instagram for latest updates.',
    icon: Share2
  }
];

export default function ContactCardsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {info.map((item, idx) => (
            <AnimatedSection key={item.title} delay={idx * 0.1}>
              <ContactCard {...item} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
