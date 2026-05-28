import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeader from '@/components/SectionHeader';
import AnimatedSection from '@/components/AnimatedSection';
import { initAuth, googleSignIn, logout } from '@/lib/firebase';
import { User } from 'firebase/auth';
import {
  HandHeart,
  Users2,
  Calendar,
  Send,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Heart,
  Briefcase,
  FileText,
  Clock,
  CircleDot,
  Settings,
  X,
  Database,
  RefreshCw,
  LogOut,
  ExternalLink,
  Lock,
  AlertCircle,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

type TabType = 'volunteer' | 'partner';

export default function WaysToHelpSection() {
  const [activeTab, setActiveTab] = useState<TabType>('volunteer');

  // Google Forms Configuration State (persisted via localStorage)
  const [showSettings, setShowSettings] = useState(false);
  const [volunteerFormUrl, setVolunteerFormUrl] = useState(() => {
    return localStorage.getItem('lifora_volunteer_form_url') || 'https://docs.google.com/forms/d/e/1FAIpQLScfjw3IzPLCKI3L5jA92P8islbwHkJTJFSXdrzYW9PZPLLufw/viewform';
  });
  const [partnerFormUrl, setPartnerFormUrl] = useState(() => {
    return localStorage.getItem('lifora_partner_form_url') || 'https://docs.google.com/forms/d/e/1FAIpQLSdtebz_IB_1YIZLswDqZu8iVMXwzWR-T3iXyJPrPNEynwSPxg/viewform';
  });
  const [useGoogleForms, setUseGoogleForms] = useState(() => {
    const stored = localStorage.getItem('lifora_use_google_forms');
    return stored !== null ? stored === 'true' : true;
  });

  // Settings inputs state (committed only when user clicks "Save & Apply")
  const [tempVolUrl, setTempVolUrl] = useState(volunteerFormUrl);
  const [tempPartUrl, setTempPartUrl] = useState(partnerFormUrl);
  const [tempUseEmbed, setTempUseEmbed] = useState(useGoogleForms);

  // Google OAuth Hub States
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [formResponses, setFormResponses] = useState<any[]>([]);
  const [selectedDashboardForm, setSelectedDashboardForm] = useState<'volunteer' | 'partner'>('volunteer');

  const [autoCreating, setAutoCreating] = useState(false);
  const [autoCreateSuccess, setAutoCreateSuccess] = useState<string | null>(null);

  // Volunteer form local state
  const [volName, setVolName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volCity, setVolCity] = useState('');
  const [volArea, setVolArea] = useState('Community Support');
  const [volAvailability, setVolAvailability] = useState<string[]>([]);
  const [volNotes, setVolNotes] = useState('');
  const [isVolSubmitting, setIsVolSubmitting] = useState(false);
  const [volSubmitted, setVolSubmitted] = useState(false);

  // Partner form local state
  const [partnerCompany, setPartnerCompany] = useState('');
  const [partnerContact, setPartnerContact] = useState('');
  const [partnerEmail, setPartnerEmail] = useState('');
  const [partnerGoals, setPartnerGoals] = useState('');
  const [isPartnerSubmitting, setIsPartnerSubmitting] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  // Sync auth state on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Update local input fields if state updates
  useEffect(() => {
    setTempVolUrl(volunteerFormUrl);
    setTempPartUrl(partnerFormUrl);
    setTempUseEmbed(useGoogleForms);
    if (!showSettings) {
      setAutoCreateSuccess(null);
    }
  }, [volunteerFormUrl, partnerFormUrl, useGoogleForms, showSettings]);

  // Extract Form ID
  const extractFormId = (url: string): string | null => {
    if (!url) return null;
    const trimmed = url.trim();
    if (/^[a-zA-Z0-9_-]{25,}$/.test(trimmed)) {
      return trimmed;
    }
    const regex = /\/forms\/d\/(e\/)?([a-zA-Z0-9_-]+)/;
    const match = trimmed.match(regex);
    if (match && match[2]) {
      return match[2];
    }
    return null;
  };

  const getEditUrl = (url: string): string | null => {
    const formId = extractFormId(url);
    if (!formId) return null;
    return `https://docs.google.com/forms/d/${formId}/edit`;
  };

  const getResponsesUrl = (url: string): string | null => {
    const formId = extractFormId(url);
    if (!formId) return null;
    return `https://docs.google.com/forms/d/${formId}/edit#responses`;
  };

  const handleAutoCreateForms = async () => {
    if (!accessToken) {
      setApiError('Please authenticate with Google first below.');
      return;
    }

    setAutoCreating(true);
    setApiError(null);
    setAutoCreateSuccess(null);

    try {
      // 1. Create Volunteer Form
      const volCreateRes = await fetch('https://forms.googleapis.com/v1/forms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          info: {
            title: 'Become a Volunteer - Lifora Canada',
            description: 'Thank you for your interest in volunteering with Lifora Canada. Please fill out this form to register as a volunteer.'
          }
        })
      });

      if (!volCreateRes.ok) {
        throw new Error(`Failed to create Volunteer Form (HTTP ${volCreateRes.status})`);
      }
      const volForm = await volCreateRes.json();
      const volId = volForm.formId;
      const volUrl = volForm.responderUri; // public view link

      // Populate Volunteer Form
      const volUpdateRes = await fetch(`https://forms.googleapis.com/v1/forms/${volId}:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            {
              createItem: {
                item: {
                  title: 'Full Name',
                  description: 'Please enter your first and last name.',
                  questionItem: {
                    question: {
                      required: true,
                      textQuestion: {}
                    }
                  }
                },
                location: { index: 0 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Email Address',
                  description: 'This is where we will contact you.',
                  questionItem: {
                    question: {
                      required: true,
                      textQuestion: {}
                    }
                  }
                },
                location: { index: 1 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'City & Province',
                  description: 'e.g. Toronto, ON',
                  questionItem: {
                    question: {
                      required: true,
                      textQuestion: {}
                    }
                  }
                },
                location: { index: 2 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Preferred Volunteering Area',
                  questionItem: {
                    question: {
                      required: true,
                      choiceQuestion: {
                        type: 'RADIO',
                        options: [
                          { value: 'Community Support' },
                          { value: 'Sustainability Projects' },
                          { value: 'Digital & Creative (Remote)' },
                          { value: 'Administration' }
                        ]
                      }
                    }
                  }
                },
                location: { index: 3 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Briefly describe your skills and availability',
                  questionItem: {
                    question: {
                      required: false,
                      textQuestion: { paragraph: true }
                    }
                  }
                },
                location: { index: 4 }
              }
            }
          ]
        })
      });

      if (!volUpdateRes.ok) {
        throw new Error('Failed to set questions on Volunteer Form.');
      }

      // 2. Create Partner Form
      const partCreateRes = await fetch('https://forms.googleapis.com/v1/forms', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          info: {
            title: 'Partner With Us - Lifora Canada',
            description: 'Ready to align your organization with measurable social good? Submit your partnership goals below.'
          }
        })
      });

      if (!partCreateRes.ok) {
        throw new Error(`Failed to create Partner Form (HTTP ${partCreateRes.status})`);
      }
      const partForm = await partCreateRes.json();
      const partId = partForm.formId;
      const partUrl = partForm.responderUri; // public view link

      // Populate Partner Form
      const partUpdateRes = await fetch(`https://forms.googleapis.com/v1/forms/${partId}:batchUpdate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            {
              createItem: {
                item: {
                  title: 'Company/Organization Name',
                  questionItem: {
                    question: {
                      required: true,
                      textQuestion: {}
                    }
                  }
                },
                location: { index: 0 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Contact Name & Title',
                  questionItem: {
                    question: {
                      required: true,
                      textQuestion: {}
                    }
                  }
                },
                location: { index: 1 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Work Email Address',
                  questionItem: {
                    question: {
                      required: true,
                      textQuestion: {}
                    }
                  }
                },
                location: { index: 2 }
              }
            },
            {
              createItem: {
                item: {
                  title: 'Briefly describe your partnership goals',
                  questionItem: {
                    question: {
                      required: true,
                      textQuestion: { paragraph: true }
                    }
                  }
                },
                location: { index: 3 }
              }
            }
          ]
        })
      });

      if (!partUpdateRes.ok) {
        throw new Error('Failed to set questions on Partnership Form.');
      }

      // Sync and Save to state & storage
      setVolunteerFormUrl(volUrl);
      setPartnerFormUrl(partUrl);
      setTempVolUrl(volUrl);
      setTempPartUrl(partUrl);
      setUseGoogleForms(true);
      setTempUseEmbed(true);

      localStorage.setItem('lifora_volunteer_form_url', volUrl);
      localStorage.setItem('lifora_partner_form_url', partUrl);
      localStorage.setItem('lifora_use_google_forms', 'true');

      setAutoCreateSuccess('Both Volunteer and Partnership Forms were auto-created successfully directly inside your Google Drive! They are embedded in your website now.');
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Auto-creation of Forms failed. Double-check your Google permission scopes.');
    } finally {
      setAutoCreating(false);
    }
  };

  // Build clean embedded URL
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    let cleanUrl = url.trim();
    if (/^[a-zA-Z0-9_-]{20,}$/.test(cleanUrl)) {
      return `https://docs.google.com/forms/d/e/${cleanUrl}/viewform?embedded=true`;
    }
    if (cleanUrl.includes('embedded=true')) {
      return cleanUrl;
    }
    if (cleanUrl.endsWith('/edit')) {
      cleanUrl = cleanUrl.replace(/\/edit$/, '/viewform');
    }
    if (cleanUrl.includes('?')) {
      return `${cleanUrl}&embedded=true`;
    }
    return `${cleanUrl}?embedded=true`;
  };

  const handleApplySettings = (e: React.FormEvent) => {
    e.preventDefault();
    setVolunteerFormUrl(tempVolUrl);
    setPartnerFormUrl(tempPartUrl);
    setUseGoogleForms(tempUseEmbed);
    localStorage.setItem('lifora_volunteer_form_url', tempVolUrl);
    localStorage.setItem('lifora_partner_form_url', tempPartUrl);
    localStorage.setItem('lifora_use_google_forms', tempUseEmbed ? 'true' : 'false');
    setShowSettings(false);
  };

  // Google Login Callback
  const handleSignIn = async () => {
    try {
      setApiError(null);
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
      }
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'OAuth Connection failed.');
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setFormData(null);
    setFormResponses([]);
  };

  // Live responses API Fetching
  const fetchGoogleFormResponses = async (formUrl: string) => {
    const formId = extractFormId(formUrl);
    if (!formId) {
      setApiError('Invalid Google Form Link. Please paste a valid URL or Form ID.');
      return;
    }

    if (!accessToken) {
      setApiError('Please authenticate with Google first.');
      return;
    }

    setApiLoading(true);
    setApiError(null);
    setFormData(null);
    setFormResponses([]);

    try {
      // 1. Fetch Form Meta Title and Questions
      const metaRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!metaRes.ok) {
        if (metaRes.status === 403) {
          throw new Error('Access Forbidden (403). Make sure the connected Google account owns this form and Google Forms API is enabled.');
        }
        throw new Error(`Google Forms API returned error (HTTP ${metaRes.status})`);
      }
      const metaData = await metaRes.json();

      // 2. Fetch Form Submissions
      const respRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!respRes.ok) {
        throw new Error(`Failed to load responses (HTTP ${respRes.status}). Ensure responses exist in this form.`);
      }
      const respData = await respRes.json();

      setFormData(metaData);
      setFormResponses(respData.responses || []);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Failed to fetch live responses from Google Forms.');
    } finally {
      setApiLoading(false);
    }
  };

  // Toggle local checkboxes
  const handleAvailabilityChange = (time: string) => {
    setVolAvailability((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  // Standard submits (when google embed is false)
  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!volName || !volEmail || !volCity) return;
    setIsVolSubmitting(true);
    setApiError(null);

    try {
      const answers = {
        "Full Name": volName,
        "Email Address": volEmail,
        "City & Province": volCity,
        "Preferred Volunteering Area": volArea,
        "Briefly describe your skills and availability": `Availability: ${volAvailability.join(', ') || 'Not specified'}. Notes/Skills: ${volNotes || 'None'}`
      };

      const res = await fetch('/api/submit-to-google-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formUrl: volunteerFormUrl,
          answers
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit form to Google Forms.');
      }

      setVolSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Error submitting application.');
    } finally {
      setIsVolSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerCompany || !partnerContact || !partnerEmail || !partnerGoals) return;
    setIsPartnerSubmitting(true);
    setApiError(null);

    try {
      const answers = {
        "Company/Organization Name": partnerCompany,
        "Contact Name & Title": partnerContact,
        "Work Email Address": partnerEmail,
        "Briefly describe your partnership goals": partnerGoals
      };

      const res = await fetch('/api/submit-to-google-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formUrl: partnerFormUrl,
          answers
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to submit Inquiry to Google Forms.');
      }

      setPartnerSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Error submitting response.');
    } finally {
      setIsPartnerSubmitting(false);
    }
  };

  // Parse questions from Form Metadata
  const getQuestionsList = () => {
    if (!formData || !formData.items) return [];
    return formData.items.filter((item: any) => item.questionItem);
  };

  return (
    <section className="py-20 bg-mao-cream/40" id="get-involved-details">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div className="text-left">
            <h3 className="text-xs font-bold text-mao-blue tracking-wider uppercase">Action Center</h3>
            <p className="text-sm text-mao-muted">Custom Forms or Google Forms Integration</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-mao-blue-light/40 p-1.5 border border-mao-blue-light/60 shadow-inner">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`relative px-8 py-3.5 rounded-full text-sm font-semibold transition-all cursor-pointer flex items-center gap-2.5 ${
                activeTab === 'volunteer'
                  ? 'text-white'
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
                  ? 'text-white'
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Left Column: Volunteer info */}
              <div className="lg:col-span-7 space-y-10">
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative p-5 rounded-2xl bg-mao-blue-light/20 border border-mao-blue-light/40">
                      <div className="absolute top-4 right-4 text-3xl font-black text-mao-blue/15">1</div>
                      <h4 className="text-base font-bold text-mao-dark mb-1">Apply</h4>
                      <p className="text-xs text-mao-body/80 leading-relaxed">
                        Fill out our brief 2-minute application form with your details and interests.
                      </p>
                    </div>
                    <div className="relative p-5 rounded-2xl bg-mao-blue-light/20 border border-mao-blue-light/40">
                      <div className="absolute top-4 right-4 text-3xl font-black text-mao-blue/15">2</div>
                      <h4 className="text-base font-bold text-mao-dark mb-1">Connect</h4>
                      <p className="text-xs text-mao-body/80 leading-relaxed">
                        Have a brief chat with our coordinator to align your skills with available roles.
                      </p>
                    </div>
                    <div className="relative p-5 rounded-2xl bg-mao-blue-light/20 border border-mao-blue-light/40">
                      <div className="absolute top-4 right-4 text-3xl font-black text-mao-blue/15">3</div>
                      <h4 className="text-base font-bold text-mao-dark mb-1">Impact</h4>
                      <p className="text-xs text-mao-body/80 leading-relaxed">
                        Get onboarded, meet our active community builders, and start contributing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Dynamic Form Block */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-mao-blue to-mao-gold" />
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-mao-dark">Volunteer Application</h3>
                    <p className="text-sm text-mao-muted mt-1">Join hands with Lifora and become part of our support network.</p>
                  </div>

                  {volSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-mao-gold/15 text-mao-gold flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-xl font-bold text-mao-dark">Thank You so much!</h4>
                      <p className="text-sm text-mao-muted leading-relaxed max-w-sm mx-auto">
                        Your application was received successfully. A membership and volunteer coordinator will connect with you via email within the next 48 hours.
                      </p>
                      <button
                        onClick={() => {
                          setVolSubmitted(false);
                          setVolName('');
                          setVolEmail('');
                          setVolCity('');
                          setVolAvailability([]);
                          setVolNotes('');
                        }}
                        className="mt-6 px-6 py-2 rounded-full border border-mao-blue text-mao-blue font-semibold hover:bg-mao-blue/5 text-sm transition-all"
                      >
                        Submit another response
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleVolunteerSubmit} className="space-y-6">
                      {/* Section 1: Personal Info */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-mao-blue tracking-wider uppercase border-b border-gray-100 pb-1">
                          1. Personal Info
                        </h4>
                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Full Name</label>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={volName}
                            onChange={(e) => setVolName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Email Address</label>
                          <input
                            type="email"
                            required
                            placeholder="johndoe@example.com"
                            value={volEmail}
                            onChange={(e) => setVolEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">City & Province</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Toronto, ON"
                            value={volCity}
                            onChange={(e) => setVolCity(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark"
                          />
                        </div>
                      </div>

                      {/* Section 2: Interests & Availability */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-mao-blue tracking-wider uppercase border-b border-gray-100 pb-1">
                          2. Interests & Availability
                        </h4>
                        
                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Preferred Area</label>
                          <select
                            value={volArea}
                            onChange={(e) => setVolArea(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark pointer-events-auto"
                          >
                            <option value="Community Support">Community Support</option>
                            <option value="Sustainability Projects">Sustainability Projects</option>
                            <option value="Digital & Creative">Digital & Creative (Remote)</option>
                            <option value="Administration">Administration</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-2">Availability</label>
                          <div className="grid grid-cols-3 gap-2">
                            {['Weekdays', 'Evenings', 'Weekends'].map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleAvailabilityChange(time)}
                                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                                  volAvailability.includes(time)
                                    ? 'bg-mao-blue/10 border-mao-blue text-mao-blue shadow-sm'
                                    : 'bg-white border-gray-200 text-mao-muted hover:border-gray-300'
                                }`}
                              >
                                <span className={`w-2 h-2 rounded-full ${
                                  volAvailability.includes(time) ? 'bg-mao-blue' : 'bg-gray-300'
                                }`} />
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Skills / Notes (Optional)</label>
                          <textarea
                            rows={3}
                            placeholder="Briefly tell us about your background, special skills, or standard schedules..."
                            value={volNotes}
                            onChange={(e) => setVolNotes(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark resize-none"
                          />
                        </div>
                      </div>

                      {apiError && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-start gap-2 text-left">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                          <div>
                            <span className="font-bold">Submission failed:</span> {apiError}
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isVolSubmitting}
                        className="w-full py-3.5 bg-mao-blue text-white rounded-xl font-bold hover:bg-mao-blue-hover transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {isVolSubmitting ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <span>Sending Application...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4.5 h-4.5" />
                            <span>Submit Application</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
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
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Left Column: Partner Info & Pathway Details */}
              <div className="lg:col-span-7 space-y-12">
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
                        <li><strong className="text-mao-blue">Recognition:</strong> Logo placement on our website, annual reports, and PRs.</li>
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
                        <li><strong className="text-mao-blue">Recognition:</strong> Dedicated highlights in our newsletters and newsletters.</li>
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
              </div>

              {/* Right Column: Strategic Inquiry Custom or Google Form */}
              <div className="lg:col-span-5 w-full">
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-mao-blue via-mao-blue-hover to-mao-gold" />
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-mao-dark">Partnership Inquiry</h3>
                    <p className="text-sm text-mao-muted mt-1">Ready to align your organization with measurable social good?</p>
                  </div>

                  {partnerSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-mao-gold/15 text-mao-gold flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h4 className="text-xl font-bold text-mao-dark font-sans">Inquiry Received</h4>
                      <p className="text-sm text-mao-muted leading-relaxed max-w-sm mx-auto">
                        Wonderful! Your partnership goals have been submitted to our board of corporate relations. A senior relationships manager will match your profile and reach out within 2 business days.
                      </p>
                      <button
                        onClick={() => {
                          setPartnerSubmitted(false);
                          setPartnerCompany('');
                          setPartnerContact('');
                          setPartnerEmail('');
                          setPartnerGoals('');
                        }}
                        className="mt-6 px-6 py-2 rounded-full border border-mao-blue text-mao-blue font-semibold hover:bg-mao-blue/5 text-sm transition-all"
                      >
                        Submit another inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handlePartnerSubmit} className="space-y-6">
                      <div className="p-4 rounded-xl bg-mao-cream border border-mao-gold/20 text-xs text-mao-body leading-relaxed mb-2 font-medium">
                        “Let’s Build Something Together”
                        <br />
                        <span className="text-mao-muted font-normal block mt-1">
                          Fill out our brief partnership inquiry form below, and our alliances coordinator will discuss custom collaboration opportunities with you.
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Company Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Acme Corp"
                            value={partnerCompany}
                            onChange={(e) => setPartnerCompany(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Contact Name & Title</label>
                          <input
                            type="text"
                            required
                            placeholder="Jane Smith, VP of Sustainability"
                            value={partnerContact}
                            onChange={(e) => setPartnerContact(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Work Email</label>
                          <input
                            type="email"
                            required
                            placeholder="janesmith@acme.com"
                            value={partnerEmail}
                            onChange={(e) => setPartnerEmail(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-mao-dark mb-1.5">Briefly describe your partnership goals</label>
                          <textarea
                            required
                            rows={4}
                            placeholder="What initiatives align best with company values? Are you interested in program sponsorships, pro-bono support, cause-marketing or volunteering?"
                            value={partnerGoals}
                            onChange={(e) => setPartnerGoals(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-sm text-mao-dark resize-none text-[13px] leading-relaxed"
                          />
                        </div>
                      </div>

                      {apiError && (
                        <div className="p-4 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-start gap-2 text-left">
                          <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                          <div>
                            <span className="font-bold">Submission failed:</span> {apiError}
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isPartnerSubmitting}
                        className="w-full py-3.5 bg-mao-blue text-white rounded-xl font-bold hover:bg-mao-blue-hover transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        {isPartnerSubmitting ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <span>Sending Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <FileText className="w-4.5 h-4.5" />
                            <span>Submit Partnership Inquiry</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Google Forms Setup Hub Settings Drawer Modal */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[85vh] overflow-hidden shadow-2xl border border-gray-150 flex flex-col"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-mao-blue/10 flex items-center justify-center">
                      <Settings className="w-5 h-5 text-mao-blue" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-mao-dark text-left">Google Forms Connection & Setup</h3>
                      <p className="text-xs text-mao-muted text-left">Configure live web forms or view real-time API responses.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 rounded-full hover:bg-gray-100 text-mao-muted hover:text-mao-dark transition-all cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content body with scrolling */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                  
                  {/* Google Forms Auto-Generation Widget */}
                  <div className="p-6 rounded-3xl bg-mao-blue/5 border border-mao-blue-light/50 space-y-4 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-mao-blue/15 text-mao-blue flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-mao-dark">⚡ Setup Hub: 1-Click Auto-Create Google Forms</h4>
                        <p className="text-xs text-mao-muted mt-1">
                          Don't have these forms in your Google account yet? Get started instantly! Let our advanced setup helper build both forms directly inside your Google Account with matching questions.
                        </p>
                      </div>
                    </div>
                    
                    {user ? (
                      <div className="bg-white/80 border border-mao-blue-light/30 p-4 rounded-2xl space-y-4">
                        <p className="text-xs text-mao-body/95 leading-relaxed">
                          This will automatically build optimized forms for <strong>Become a Volunteer</strong> and <strong>Partner With Us</strong> with pre-configured questions exactly matching your site. They will link and embed instantly!
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                          <button
                            type="button"
                            onClick={handleAutoCreateForms}
                            disabled={autoCreating}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-mao-blue hover:bg-mao-blue-hover text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer w-full sm:w-auto justify-center"
                          >
                            {autoCreating ? (
                              <>
                                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>Generating Forms in Google Drive...</span>
                              </>
                            ) : (
                              <>
                                <Settings className="w-3.5 h-3.5" />
                                <span>🛠️ Build Google Forms in My Account</span>
                              </>
                            )}
                          </button>
                          {autoCreateSuccess && (
                            <span className="text-xs text-green-700 font-semibold bg-green-50 px-3 py-2 rounded-xl border border-green-200">
                              {autoCreateSuccess}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl text-xs text-amber-800 leading-relaxed">
                        👉 <strong>To auto-create forms in your personal Google Drive</strong>: First connect your Google Account under the <strong>Submissions Dashboard</strong> below! Once authenticated, you can build them instantly in 1-Click.
                      </div>
                    )}
                  </div>

                  {/* Row 1: Configurations */}
                  <form onSubmit={handleApplySettings} className="space-y-6">
                    <h4 className="text-xs font-bold text-mao-blue tracking-wider uppercase border-b border-gray-100 pb-2 text-left">
                      Iframe Embed Settings
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-left">
                        <label className="block text-xs font-semibold text-mao-dark mb-1.5">
                          Volunteer Application Form Link or ID
                        </label>
                        <input
                          type="text"
                          required
                          value={tempVolUrl}
                          onChange={(e) => setTempVolUrl(e.target.value)}
                          placeholder="Paste viewform or edit Link"
                          className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-mao-dark"
                        />
                        {getEditUrl(tempVolUrl) && (
                          <div className="mt-2.5 flex flex-wrap gap-2.5 items-center">
                            <a
                              href={getEditUrl(tempVolUrl)!}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-mao-blue hover:text-mao-blue-hover hover:underline bg-mao-blue/5 px-2.5 py-1 rounded-full border border-mao-blue/10"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Edit in Google Forms ↗</span>
                            </a>
                            <a
                              href={getResponsesUrl(tempVolUrl)!}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-mao-gold hover:text-opacity-80 hover:underline bg-mao-gold/5 px-2.5 py-1 rounded-full border border-mao-gold/10"
                            >
                              <FileText className="w-3 h-3 text-mao-gold" />
                              <span>View Form Responses ↗</span>
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="text-left">
                        <label className="block text-xs font-semibold text-mao-dark mb-1.5">
                          Partnership Inquiry Form Link or ID
                        </label>
                        <input
                          type="text"
                          required
                          value={tempPartUrl}
                          onChange={(e) => setTempPartUrl(e.target.value)}
                          placeholder="Paste viewform or edit Link"
                          className="w-full px-4 py-2.5 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-mao-dark"
                        />
                        {getEditUrl(tempPartUrl) && (
                          <div className="mt-2.5 flex flex-wrap gap-2.5 items-center">
                            <a
                              href={getEditUrl(tempPartUrl)!}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-mao-blue hover:text-mao-blue-hover hover:underline bg-mao-blue/5 px-2.5 py-1 rounded-full border border-mao-blue/10"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Edit in Google Forms ↗</span>
                            </a>
                            <a
                              href={getResponsesUrl(tempPartUrl)!}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-mao-gold hover:text-opacity-80 hover:underline bg-mao-gold/5 px-2.5 py-1 rounded-full border border-mao-gold/10"
                            >
                              <FileText className="w-3 h-3 text-mao-gold" />
                              <span>View Form Responses ↗</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-mao-cream/50 border border-mao-gold/20">
                      <div className="space-y-0.5 text-left">
                        <span className="text-xs font-bold text-mao-dark block">Enable Live Google Form Embeds</span>
                        <span className="text-[11px] text-mao-muted block">
                          This replaces our standard custom templates with your live interactive Google Forms on the frontend.
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTempUseEmbed(!tempUseEmbed)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          tempUseEmbed ? 'bg-mao-blue' : 'bg-gray-250'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            tempUseEmbed ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex justify-end border-b border-gray-100 pb-6">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-mao-blue text-white rounded-xl text-xs font-bold hover:bg-mao-blue-hover transition-all shadow-sm cursor-pointer"
                      >
                        Apply & Save Links
                      </button>
                    </div>
                  </form>

                  {/* Row 2: Live API Connection & Dashboard */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h4 className="text-xs font-bold text-mao-blue tracking-wider uppercase">
                        Real-Time Submissions Dashboard (Google API)
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] text-mao-muted">
                        <Lock className="w-3 h-3 text-mao-blue" />
                        <span>Encrypted SSL Scope Auth</span>
                      </div>
                    </div>

                    {/* Authentication toggle card */}
                    {!user ? (
                      <div className="p-6 rounded-2xl bg-gray-50 border border-gray-150 text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-mao-blue/10 flex items-center justify-center mx-auto text-mao-blue">
                          <Database className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="text-sm font-bold text-mao-dark">Connect Google Workspace Account</h5>
                          <p className="text-xs text-mao-muted max-w-md mx-auto leading-relaxed">
                            Sign in with your Google Account owning these forms. This uses your auth permission to read submissions and display them cleanly inside this administrator view.
                          </p>
                        </div>
                        <button
                          onClick={handleSignIn}
                          className="inline-flex items-center gap-2.5 px-6 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-mao-dark font-sans font-semibold text-xs transition-all shadow-sm cursor-pointer"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22l.81-.63z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                          </svg>
                          <span>Sign In with Google Workspace</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Profile Summary Card */}
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-150 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {user.photoURL ? (
                              <img src={user.photoURL} alt={user.displayName || 'Avatar'} className="w-10 h-10 rounded-full border border-gray-250 shrink-0" referrerpolicy="no-referrer" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-mao-blue text-white flex items-center justify-center font-bold font-sans">
                                {user.displayName ? user.displayName[0] : 'A'}
                              </div>
                            )}
                            <div className="text-left">
                              <span className="text-xs font-bold text-mao-dark block">{user.displayName || 'Google Organizer'}</span>
                              <span className="text-[11px] text-mao-muted block">{user.email}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] bg-green-50 border border-green-200 text-green-700 font-semibold mb-1 sm:mb-0">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                              OAuth Connected
                            </span>
                            <button
                              onClick={handleSignOut}
                              className="p-2 text-mao-muted hover:text-red-600 rounded-lg hover:bg-red-50 transition-all cursor-pointer text-xs flex items-center gap-1 font-semibold"
                              title="Sign Out"
                            >
                              <LogOut className="w-4 h-4" />
                              <span className="hidden sm:inline">Disconnect</span>
                            </button>
                          </div>
                        </div>

                        {/* Interactive Query Tools */}
                        <div className="p-5 rounded-2xl bg-white border border-gray-150 space-y-4">
                          <span className="text-xs font-bold text-mao-dark block text-left">Fetch Live Response Logs</span>
                          
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <div className="flex-1">
                              <select
                                value={selectedDashboardForm}
                                onChange={(e) => setSelectedDashboardForm(e.target.value as 'volunteer' | 'partner')}
                                className="w-full px-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-mao-blue text-xs text-mao-dark"
                              >
                                <option value="volunteer">Volunteer Application ({volunteerFormUrl ? 'Configured URL' : 'Default'})</option>
                                <option value="partner">Partnership Inquiry ({partnerFormUrl ? 'Configured URL' : 'Default'})</option>
                              </select>
                            </div>
                            
                            <button
                              type="button"
                              onClick={() => fetchGoogleFormResponses(selectedDashboardForm === 'volunteer' ? volunteerFormUrl : partnerFormUrl)}
                              disabled={apiLoading}
                              className="px-5 py-2.5 bg-mao-blue hover:bg-mao-blue-hover text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 ${apiLoading ? 'animate-spin' : ''}`} />
                              <span>{apiLoading ? 'Syncing...' : 'Load Submissions'}</span>
                            </button>
                          </div>

                          {apiError && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 flex items-start gap-2 text-left">
                              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                              <p className="leading-relaxed">
                                <strong>Error Syncing Logs:</strong> {apiError}
                                <br />
                                <span className="text-[10px] text-mao-muted mt-1 inline-block font-normal">
                                  💡 Fallback: Double-check that your active form URL matches your Google account owner account, and forms permit API access.
                                </span>
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Display Responses dynamic Table */}
                        {formData && (
                          <div className="space-y-4 text-left">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-extrabold text-mao-dark">
                                Google Form: <span className="text-mao-blue">{formData.info?.title || 'Untitled Form'}</span>
                              </h5>
                              <span className="text-[10px] bg-mao-blue/15 text-mao-blue font-bold px-2 py-0.5 rounded-full">
                                {formResponses.length} Submissions Found
                              </span>
                            </div>

                            {formResponses.length === 0 ? (
                              <div className="p-8 text-center bg-gray-50 border border-gray-150 rounded-2xl text-xs text-mao-muted">
                                Connection successful! However, there are no form responses collected on this form yet.
                              </div>
                            ) : (
                              <div className="border border-gray-150 rounded-2xl overflow-hidden bg-white shadow-inner max-h-[350px] overflow-auto">
                                <table className="w-full text-xs text-left text-mao-muted">
                                  <thead className="text-[10px] uppercase font-bold tracking-wider text-mao-dark bg-gray-50 border-b border-gray-150 sticky top-0 bg-white z-10">
                                    <tr>
                                      <th className="px-4 py-3 bg-gray-50 shrink-0">Submitted Date</th>
                                      {getQuestionsList().slice(0, 4).map((item: any) => (
                                        <th key={item.itemId} className="px-4 py-3 bg-gray-50 max-w-[150px] truncate">
                                          {item.title || 'Question'}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                    {formResponses.map((resp: any) => (
                                      <tr key={resp.responseId} className="hover:bg-gray-50/50 transition-all text-mao-dark/90">
                                        <td className="px-4 py-3 font-semibold text-mao-blue whitespace-nowrap text-[11px]">
                                          {new Date(resp.createTime).toLocaleString()}
                                        </td>
                                        {getQuestionsList().slice(0, 4).map((item: any) => {
                                          const qId = item.questionItem.question.questionId;
                                          const answerObj = resp.answers?.[qId];
                                          const answerText = answerObj?.textAnswers?.answers?.[0]?.value || '—';
                                          return (
                                            <td key={item.itemId} className="px-4 py-3 max-w-[150px] truncate" title={answerText}>
                                              {answerText}
                                            </td>
                                          );
                                        })}
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        )}

                      </div>
                    )}
                  </div>

                </div>

                {/* Footer buttons */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-[10px] text-mao-muted">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Links are cached securely in your local browser state.</span>
                  </div>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-6 py-2 bg-mao-dark text-white rounded-xl text-xs font-bold hover:bg-opacity-90 shadow-sm cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
