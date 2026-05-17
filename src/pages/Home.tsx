import HomeHero from '@/sections/home/HomeHero';
import MissionSection from '@/sections/shared/MissionSection';
import WhoWeServeSection from '@/sections/about/WhoWeServeSection';
import HowWeHelpSection from '@/sections/home/HowWeHelpSection';
import ContactInfoSection from '@/sections/shared/ContactInfoSection';
import DonationCTASection from '@/sections/home/DonationCTASection';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HomeHero />
      <MissionSection />
      <WhoWeServeSection />
      <HowWeHelpSection />
      <DonationCTASection />
      <ContactInfoSection />
    </main>
  );
}
