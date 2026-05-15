import PageHero from '@/components/PageHero';
import WaysToHelpSection from '@/sections/getinvolved/WaysToHelpSection';
import JoinFormSection from '@/sections/getinvolved/JoinFormSection';

export default function GetInvolved() {
  return (
    <main>
      <PageHero
        title="Be Part of the Change"
        subtitle="Your time, talent, and resources can create a lasting impact on multicultural communities across Canada."
        breadcrumbs={['Home', 'Get Involved']}
      />
      <WaysToHelpSection />
      <JoinFormSection />
    </main>
  );
}
