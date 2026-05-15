import PageHero from '@/components/PageHero';
import ImmigrantProgramsSection from '@/sections/programs/ImmigrantProgramsSection';

export default function Programs() {
  return (
    <main>
      <PageHero
        title="Pathways to Stability & Empowerment"
        subtitle="Explore our range of initiatives focused on immediate relief, long-term empowerment, and restored dignity."
        breadcrumbs={['Home', 'Programs']}
      />
      <ImmigrantProgramsSection />
    </main>
  );
}
