import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HandHeart,
  Users2,
  Sparkles,
  ShieldCheck,
  Heart,
  Briefcase,
  Clock,
  CircleDot,
  Send
} from 'lucide-react';

type TabType = 'volunteer' | 'partner';

export default function WaysToHelpSection() {
  const [activeTab, setActiveTab] = useState<TabType>('volunteer');

  return (
    <section className="py-20 bg-mao-cream/40" id="get-involved-details">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-left w-full text-center sm:text-left">
            <h3 className="text-xs font-bold text-mao-blue tracking-wider uppercase">Ways to Help</h3>
            <p className="text-sm text-mao-muted">Connect with our team to start making a real difference</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-mao-blue-light/40 p-1.5 border border-mao-blue-light/60 shadow-inner">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`relative px-8 py-3.5 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === 'volunteer'
                  ? 'text-white font-bold'
                  : 'text-mao-dark hover:text-mao-blue'
              }`}
            >
              {activeTab === 'volunteer' && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 bg-mao-blue rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <HandHeart className="w-4.5 h-4.5 z-10" />
              <span className="relative z-10">Become a Volunteer</span>
            </button>
            <button
              onClick={() => setActiveTab('partner')}
              className={`relative px-8 py-3.5 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === 'partner'
                  ? 'text-white font-bold'
                  : 'text-mao-dark hover:text-mao-blue'
              }`}
            >
              {activeTab === 'partner' && (
                <motion.div
                  layoutId="active-tab-bg"
                  className="absolute inset-0 bg-mao-blue rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Users2 className="w-4.5 h-4.5 z-10" />
              <span className="relative z-10">Partner With Us</span>
            </button>
          </div>
        </div>

        {/* Tab Contents with animations */}
        <AnimatePresence mode="wait">
          {activeTab === 'volunteer' ? (
            <motion.div
              key="volunteer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-12"
              id="volunteer-details-view"
            >
              {/* Volunteer info */}
              <div className="space-y-10 text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-mao-blue-light/60 text-mao-dark border border-mao-blue-light">
                    <Sparkles className="w-3.5 h-3.5 text-mao-blue" />
                    <span>Volunteer with Lifora Canada</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-mao-dark tracking-tight leading-tight">
                    Make a Difference in Your Community
                  </h2>
                  <p className="text-lg text-mao-body/90 leading-relaxed font-normal">
                    Our grassroots initiatives are powered by the passion and talent of volunteers. Whether you want to give back locally, build new skills, or connect with change-makers, your time creates lasting impact across Canada.
                  </p>
                </div>

                {/* Ways You Can Help */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-mao-dark flex items-center gap-2 border-b border-mao-blue-light pb-2.5">
                    <Heart className="w-5 h-5 text-mao-blue" />
                    <span>Ways You Can Help</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-bold text-mao-dark mb-1.5 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-mao-blue inline-block shrink-0" />
                        Community Support
                      </h4>
                      <p className="text-sm text-mao-muted leading-relaxed">
                        Assist with local outreach, resource distribution, and event coordination.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-bold text-mao-dark mb-1.5 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-mao-gold inline-block shrink-0" />
                        Sustainability Projects
                      </h4>
                      <p className="text-sm text-mao-muted leading-relaxed">
                        Help with environmental campaigns and green initiatives.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-bold text-mao-dark mb-1.5 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-mao-blue inline-block shrink-0" />
                        Digital & Creative (Remote)
                      </h4>
                      <p className="text-sm text-mao-muted leading-relaxed">
                        Lend your skills in graphic design, social media, writing, or web tech.
                      </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all">
                      <h4 className="font-bold text-mao-dark mb-1.5 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-mao-gold inline-block shrink-0" />
                        Administration
                      </h4>
                      <p className="text-sm text-mao-muted leading-relaxed">
                        Support our core team with logistics, data entry, and planning.
                      </p>
                    </div>
                  </div>
                </div>

                {/* How It Works */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-mao-dark flex items-center gap-2 border-b border-mao-blue-light pb-2.5">
                    <Clock className="w-5 h-5 text-mao-blue" />
                    <span>How It Works</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative p-5 rounded-2xl bg-mao-blue-light/10 border border-mao-blue-light/30">
                      <div className="absolute top-4 right-4 text-3xl font-black text-mao-blue/15">1</div>
                      <h4 className="text-base font-bold text-mao-dark mb-1">Get in Touch</h4>
                      <p className="text-xs text-mao-body/80 leading-relaxed">
                        Connect with us using our contact form below and specify your volunteer interests.
                      </p>
                    </div>
                    <div className="relative p-5 rounded-2xl bg-mao-blue-light/10 border border-mao-blue-light/30">
                      <div className="absolute top-4 right-4 text-3xl font-black text-mao-blue/15">2</div>
                      <h4 className="text-base font-bold text-mao-dark mb-1">Make an Impact</h4>
                      <p className="text-xs text-mao-body/80 leading-relaxed">
                        Our volunteer coordinators will reach out to onboard you into active community initiatives.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Get in touch CTA */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-mao-blue/5 border border-mao-blue/10">
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-mao-dark">Ready to become a volunteer?</h4>
                    <p className="text-sm text-mao-muted mt-1">Send us a message below and our team will get in touch shortly.</p>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-form');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-mao-blue hover:bg-mao-blue-hover text-white text-sm font-bold rounded-xl transition-all shadow-md transform active:scale-95 duration-200 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Get in Touch Today</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="partner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-12"
              id="partner-details-view"
            >
              {/* Partner Info & Pathway Details */}
              <div className="space-y-12 text-left">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-mao-gold/15 text-mao-dark border border-mao-gold/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-mao-gold" />
                    <span>Alliance & Progress Partnership</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-mao-dark tracking-tight leading-tight">
                    Fueling Progress Through Shared Values
                  </h2>
                  <p className="text-base text-mao-body/90 leading-relaxed font-normal">
                    At Lifora Canada, we believe that systemic social and environmental challenges cannot be solved in isolation. True, lasting impact requires collaboration. We team up with forward-thinking corporations, local businesses, and foundational partners to scale our grassroots community initiatives across Canada.
                  </p>
                  <p className="text-base text-mao-body/90 leading-relaxed font-normal">
                    By partnering with Lifora Canada, your organization drives measurable front-line impact while advancing your Corporate Social Responsibility (CSR) mandates and deepening community trust.
                  </p>
                </div>

                {/* Strategic Partnership Pathways */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-mao-dark flex items-center gap-2 border-b border-mao-blue-light pb-2.5">
                    <Briefcase className="w-5 h-5 text-mao-blue" />
                    <span>Strategic Partnership Pathways</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-mao-blue" />
                      <h4 className="font-bold text-base text-mao-dark mb-2 pl-2">
                        1. Corporate Philanthropy & Program Sponsorship
                      </h4>
                      <p className="text-xs text-mao-muted leading-relaxed mb-3 pl-2">
                        Directly fund one of our high-impact programs in community empowerment or sustainable development.
                      </p>
                      <ul className="text-xs space-y-1 text-mao-dark bg-mao-cream/50 p-3 rounded-lg pl-2 border border-gray-50/50">
                        <li><strong className="text-mao-blue">The Impact:</strong> Your investment goes straight to front-line delivery.</li>
                        <li><strong className="text-mao-blue">Recognition:</strong> Prominent logo placement on our website, annual impact reports, and press releases.</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-mao-gold" />
                      <h4 className="font-bold text-base text-mao-dark mb-2 pl-2">
                        2. Cause-Related Marketing
                      </h4>
                      <p className="text-xs text-mao-muted leading-relaxed mb-3 pl-2">
                        Align your brand's commercial success with social good by pledging a percentage of sales or campaign proceeds.
                      </p>
                      <ul className="text-xs space-y-1 text-mao-dark bg-mao-cream/50 p-3 rounded-lg pl-2 border border-gray-50/50">
                        <li><strong className="text-mao-gold">The Impact:</strong> Engages your customers in a shared mission.</li>
                        <li><strong className="text-mao-gold">Recognition:</strong> Joint digital marketing campaigns and mutual social spotlights.</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-mao-blue" />
                      <h4 className="font-bold text-base text-mao-dark mb-2 pl-2">
                        3. Employee Engagement
                      </h4>
                      <p className="text-xs text-mao-muted leading-relaxed mb-3 pl-2">
                        Boost company morale and foster team-building by involving your workforce directly in community action days.
                      </p>
                      <ul className="text-xs space-y-1 text-mao-dark bg-mao-cream/50 p-3 rounded-lg pl-2 border border-gray-50/50">
                        <li><strong className="text-mao-blue">The Impact:</strong> Delivers hands-on, practical help to local communities.</li>
                        <li><strong className="text-mao-blue">Recognition:</strong> Dedicated highlights in our newsletters.</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-mao-gold" />
                      <h4 className="font-bold text-base text-mao-dark mb-2 pl-2">
                        4. In-Kind Support & Pro-Bono Services
                      </h4>
                      <p className="text-xs text-mao-muted leading-relaxed mb-3 pl-2">
                        Lend professional services (legal, tech, coding), software licenses, event spaces, or physical goods.
                      </p>
                      <ul className="text-xs space-y-1 text-mao-dark bg-mao-cream/50 p-3 rounded-lg pl-2 border border-gray-50/50">
                        <li><strong className="text-mao-gold">The Impact:</strong> Lowers operations overhead, and channels more support.</li>
                        <li><strong className="text-mao-gold">Recognition:</strong> Listed as an Operational Supporter in annual filings.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Why Partner Pillars */}
                <div className="p-8 rounded-3xl bg-mao-blue/5 border border-mao-blue-light/40 space-y-6">
                  <h4 className="text-lg font-bold text-mao-dark">Why Partner with LIFORA CANADA</h4>
                  
                  {/* Radical Transparency Card */}
                  <div className="p-5 rounded-2xl bg-white border border-mao-blue/20">
                    <h5 className="font-bold text-mao-dark text-sm flex items-center gap-1.5">
                      <CircleDot className="w-4 h-4 text-mao-blue inline shrink-0" />
                      Radical Transparency:
                    </h5>
                    <p className="text-xs text-mao-muted mt-1 leading-relaxed">
                      Every dollar and resource allocated through corporate partnerships is tracked with strict financial accountability. We provide comprehensive impact breakdowns that your team can confidently share with stakeholders, board members, and consumers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-white/60">
                      <div className="font-bold text-mao-dark text-sm mb-1">1. National Reach, Local Roots</div>
                      <p className="text-xs text-mao-muted leading-relaxed">Your support is deployed where it is needed most within Canadian communities.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/60">
                      <div className="font-bold text-mao-dark text-sm mb-1">2. Brand Alignment</div>
                      <p className="text-xs text-mao-muted leading-relaxed">Association with an ethical, progressive non-profit representing Canadian diversity.</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/60">
                      <div className="font-bold text-mao-dark text-sm mb-1">3. Measurable Metrics</div>
                      <p className="text-xs text-mao-muted leading-relaxed">We deliver hard data on outcomes—such as people supported or completions.</p>
                    </div>
                  </div>
                </div>

                {/* Get in touch CTA */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-mao-gold/5 border border-mao-gold/20">
                  <div className="text-left">
                    <h4 className="text-lg font-bold text-mao-dark">Interested in partnering with us?</h4>
                    <p className="text-sm text-mao-muted mt-1">Pitch your ideas or CSR targets to us below, and we'll connect soon.</p>
                  </div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('contact-form');
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="shrink-0 inline-flex items-center gap-2 px-8 py-3.5 bg-mao-gold text-mao-dark hover:bg-opacity-90 text-sm font-bold rounded-xl transition-all shadow-md transform active:scale-95 duration-200 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Connect With Us</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
