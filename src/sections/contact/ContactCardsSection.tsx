import { Mail, Phone, MapPin } from 'lucide-react';
import ContactCard from '@/components/ContactCard';
import AnimatedSection from '@/components/AnimatedSection';

const info = [
  {
    title: 'Call Us Anytime',
    value: '(416) 555-0123',
    description: 'Our team is available Mon-Fri, 9am - 5pm EST to assist with any inquiries.',
    icon: Phone
  },
  {
    title: 'Email Us',
    value: 'info@maocanada.org',
    description: 'Expect a response within 24-48 hours from our dedicated support staff.',
    icon: Mail
  },
  {
    title: 'Visit Our Office',
    value: 'Toronto, Ontario',
    description: '123 Inclusion Street, Suite 400, Toronto, ON M5V 2H1',
    icon: MapPin
  }
];

export default function ContactCardsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
