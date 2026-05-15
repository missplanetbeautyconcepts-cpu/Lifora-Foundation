import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, MessageSquare, Share2, ChevronRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-mao-footer text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 divide-y divide-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-12 h-12 bg-[#0B1B32] rounded-full flex items-center justify-center overflow-hidden p-1 transition-transform group-hover:scale-105">
                <img 
                  src="https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/6d42c5fc-6978-4247-806d-6d44b35ccbd5yyy-removebg-preview.png" 
                  alt="Lifora Foundation Logo" 
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-bold text-white text-xl tracking-tight uppercase">LIFORA FOUNDATION</span>
            </Link>
            <p className="text-sm leading-relaxed opacity-80">
              Lifora Foundation is built on the belief that every life holds value and potential. We exist to support vulnerable individuals and underserved communities through meaningful, consistent action.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-mao-blue hover:text-white transition-all"><Globe className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-mao-blue hover:text-white transition-all"><MessageSquare className="w-4 h-4" /></a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-mao-blue hover:text-white transition-all"><Share2 className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Programs', 'Impact', 'Get Involved', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center gap-2 hover:text-mao-blue transition-colors text-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-mao-blue" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-mao-blue shrink-0" />
                <span>123 Inclusion Street, Suite 400<br />Toronto, ON M5V 2H1</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-mao-blue shrink-0" />
                <span>(416) 555-0123</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-mao-blue shrink-0" />
                <span>info@lifora.org</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-white font-bold mb-6">Support Our Cause</h4>
            <p className="text-sm opacity-80 mb-6">Join our community and help us make a difference in the lives of many.</p>
            <Link
              to="/get-involved"
              className="block w-full bg-mao-blue text-white text-center py-3 rounded-lg font-semibold hover:bg-mao-blue-hover transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>

        <div className="pt-8 text-center text-xs opacity-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Lifora Foundation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
