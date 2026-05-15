import PageHero from '@/components/PageHero';
import ImpactStatsSection from '@/sections/impact/ImpactStatsSection';
import SuccessStoriesSection from '@/sections/impact/SuccessStoriesSection';
import DonationCTASection from '@/sections/home/DonationCTASection';

export default function Impact() {
  return (
    <main>
      <PageHero
        title="Making a Real Difference"
        subtitle="Witness the transformative power of community support and empowerment through our tangible results."
        breadcrumbs={['Home', 'Impact']}
      />
      <ImpactStatsSection />
      <SuccessStoriesSection />
      <DonationCTASection />
    </main>
  );
}
