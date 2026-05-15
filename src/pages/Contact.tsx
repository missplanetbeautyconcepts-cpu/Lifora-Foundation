import PageHero from '@/components/PageHero';
import ContactCardsSection from '@/sections/contact/ContactCardsSection';
import ContactFormSection from '@/sections/contact/ContactFormSection';

export default function Contact() {
  return (
    <main>
      <PageHero
        title="We are Here to Listen"
        subtitle="Connect with us to learn more about our programs, partnership opportunities, or how you can receive support."
        breadcrumbs={['Home', 'Contact']}
      />
      <ContactCardsSection />
      <ContactFormSection />
    </main>
  );
}
