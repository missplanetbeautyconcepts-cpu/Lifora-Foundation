import { Mail, Phone, Globe, MessageSquare, Share2 } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-mao-blue text-white py-2 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <a href="mailto:info@lifora.org" className="flex items-center gap-2 hover:text-mao-blue-light transition-colors">
            <Mail className="w-4 h-4" />
            <span>info@lifora.org</span>
          </a>
          <a href="tel:+14165550123" className="flex items-center gap-2 hover:text-mao-blue-light transition-colors">
            <Phone className="w-4 h-4" />
            <span>(416) 555-0123</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline mr-2 opacity-80">Follow us:</span>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-mao-blue-light transition-colors"><Globe className="w-4 h-4" /></a>
            <a href="#" className="hover:text-mao-blue-light transition-colors"><MessageSquare className="w-4 h-4" /></a>
            <a href="#" className="hover:text-mao-blue-light transition-colors"><Share2 className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
