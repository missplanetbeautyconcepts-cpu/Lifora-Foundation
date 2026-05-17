import PageHero from '@/components/PageHero';

export default function CookiePolicy() {
  return (
    <main>
      <PageHero
        title="Cookie Policy"
        subtitle="Information about how we use cookies on our website."
        breadcrumbs={['Home', 'Cookie Policy']}
      />
      
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-blue prose-lg">
          <p className="text-mao-body mb-8">Last Updated: May 17, 2026</p>
          
          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">1. What Are Cookies</h2>
          <p className="text-mao-body mb-6">
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the owners of the site.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">2. How We Use Cookies</h2>
          <p className="text-mao-body mb-6">
            We use cookies to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-mao-body">
            <li>Understand how you use our website</li>
            <li>Remember your preferences</li>
            <li>Improve your overall experience</li>
            <li>Ensure the security of our site</li>
          </ul>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">3. Types of Cookies We Use</h2>
          <p className="text-mao-body mb-6">
            <strong>Essential Cookies:</strong> These are necessary for the website to function properly.
            <br />
            <strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and see how visitors move around our website.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">4. Controlling Cookies</h2>
          <p className="text-mao-body mb-6">
            Most web browsers allow you to control cookies through their settings. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">5. Changes to This Policy</h2>
          <p className="text-mao-body mb-6">
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
          </p>
        </div>
      </section>
    </main>
  );
}
