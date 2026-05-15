import PageHero from '@/components/PageHero';
import MissionSection from '@/sections/shared/MissionSection';
import WhoWeServeSection from '@/sections/about/WhoWeServeSection';
import HowWeWorkSection from '@/sections/about/HowWeWorkSection';

export default function About() {
  return (
    <main>
      <PageHero
        title="Restoring Dignity, Rebuilding Lives."
        subtitle="Lifora exists to support vulnerable individuals and underserved communities through meaningful, consistent action at the intersection of compassion and structure."
        breadcrumbs={['Home', 'About Us']}
      />
      <MissionSection />
      <WhoWeServeSection />
      <HowWeWorkSection />
    </main>
  );
}
