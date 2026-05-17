import { Mail, Phone } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-mao-blue text-white py-2 px-4 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-6">
          <a href="mailto:Liforacanada@gmail.com" className="flex items-center gap-2 hover:text-mao-blue-light transition-colors">
            <Mail className="w-4 h-4" />
            <span>Liforacanada@gmail.com</span>
          </a>
          <a href="tel:+14317882919" className="flex items-center gap-2 hover:text-mao-blue-light transition-colors">
            <Phone className="w-4 h-4" />
            <span>431-788-2919</span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline mr-2 opacity-80">Follow us:</span>
          <div className="flex items-center gap-3">
            <a 
              href="https://www.facebook.com/share/1E7jzDFp7b/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-5 h-5 flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Facebook"
            >
              <img 
                src="https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/faceboook.png" 
                alt="Facebook" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </a>
            <a 
              href="https://www.instagram.com/Liforacanada" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-5 h-5 flex items-center justify-center hover:opacity-80 transition-opacity"
              title="Instagram"
            >
              <img 
                src="https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/instagra.jpg" 
                alt="Instagram" 
                className="w-full h-full object-contain rounded-sm"
                referrerPolicy="no-referrer"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
