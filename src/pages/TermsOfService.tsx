import PageHero from '@/components/PageHero';

export default function TermsOfService() {
  return (
    <main>
      <PageHero
        title="Terms of Service"
        subtitle="The rules and guidelines for using our services."
        breadcrumbs={['Home', 'Terms of Service']}
      />
      
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 prose prose-blue prose-lg">
          <p className="text-mao-body mb-8">Last Updated: May 17, 2026</p>
          
          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">1. Acceptance of Terms</h2>
          <p className="text-mao-body mb-6">
            By accessing or using the Lifora Foundation website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">2. Use License</h2>
          <p className="text-mao-body mb-6">
            Permission is granted to temporarily download one copy of the materials (information or software) on Lifora Foundation's website for personal, non-commercial transitory viewing only.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">3. Disclaimer</h2>
          <p className="text-mao-body mb-6">
            The materials on Lifora Foundation's website are provided on an 'as is' basis. Lifora Foundation makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">4. Limitations</h2>
          <p className="text-mao-body mb-6">
            In no event shall Lifora Foundation or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Lifora Foundation's website.
          </p>

          <h2 className="text-2xl font-bold text-mao-dark mt-12 mb-6">5. Governing Law</h2>
          <p className="text-mao-body mb-6">
            These terms and conditions are governed by and construed in accordance with the laws of Manitoba, Canada and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
          </p>
        </div>
      </section>
    </main>
  );
}
