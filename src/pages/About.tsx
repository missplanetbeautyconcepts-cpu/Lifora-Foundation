import PageHero from '@/components/PageHero';
import WhoWeAreSection from '@/sections/about/WhoWeAreSection';
import ValuesSection from '@/sections/about/ValuesSection';
import WhoWeServeSection from '@/sections/about/WhoWeServeSection';

export default function About() {
  return (
    <main>
      <PageHero
        title="Restoring Dignity, Rebuilding Lives."
        subtitle="Lifora exists to support vulnerable individuals and underserved communities through meaningful, consistent action at the intersection of compassion and structure."
        breadcrumbs={['Home', 'About Us']}
      />
      <WhoWeAreSection />
      <ValuesSection />
      <WhoWeServeSection />
    </main>
  );
}
