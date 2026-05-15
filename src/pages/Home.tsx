import HomeHero from '@/sections/home/HomeHero';
import MissionSection from '@/sections/shared/MissionSection';
import HowWeHelpSection from '@/sections/home/HowWeHelpSection';
import DonationCTASection from '@/sections/home/DonationCTASection';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HomeHero />
      <MissionSection />
      <HowWeHelpSection />
      <DonationCTASection />
    </main>
  );
}
