import PageHero from '@/components/PageHero';

export default function PrivacyPolicy() {
  return (
    <main>
      <PageHero
        title="Privacy Policy"
        subtitle="How we protect and manage your personal information."
        breadcrumbs={['Home', 'Privacy Policy']}
      />
      
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-blue prose-lg">
          <p className="text-mao-body mb-8">Last Updated: May 17, 2026</p>
          
          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">1. Introduction</h2>
          <p className="text-mao-body mb-6">
            Lifora Foundation ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or participate in our programs.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">2. Information We Collect</h2>
          <p className="text-mao-body mb-6">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 mb-6 text-mao-body">
            <li>Donate to our foundation</li>
            <li>Sign up for our newsletter</li>
            <li>Volunteer for our programs</li>
            <li>Contact us via email or phone</li>
          </ul>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">3. How We Use Your Information</h2>
          <p className="text-mao-body mb-6">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-mao-body">
            <li>Process and acknowledge donations</li>
            <li>Communicate about our programs and impact</li>
            <li>Manage volunteer activities</li>
            <li>Improve our website and services</li>
          </ul>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">4. Data Protection</h2>
          <p className="text-mao-body mb-6">
            We implement appropriate technical and organizational security measures to protect the security of your personal information. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">5. Your Rights</h2>
          <p className="text-mao-body mb-6">
            You have the right to access, correct, or delete your personal information. If you would like to exercise any of these rights, please contact us at Liforacanada@gmail.com.
          </p>
        </div>
      </section>
    </main>
  );
}
