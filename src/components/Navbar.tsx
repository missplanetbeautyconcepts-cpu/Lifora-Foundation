import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import DonateButton from './DonateButton';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Get Involved', path: '/get-involved' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isScrolled = useScrollPosition();

  return (
    <nav className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      isScrolled ? 'bg-white shadow-nav py-3' : 'bg-white/95 py-5'
    )}>
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-12 h-12 bg-[#0B1B32] rounded-full flex items-center justify-center overflow-hidden p-1 transition-transform group-hover:scale-105">
            <img 
              src="https://raw.githubusercontent.com/perfectgbakidz/hostingimage/refs/heads/main/6d42c5fc-6978-4247-806d-6d44b35ccbd5yyy-removebg-preview.png" 
              alt="Lifora Foundation Logo" 
              className="w-full h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-bold text-mao-dark text-base sm:text-lg lg:text-xl tracking-tight uppercase transition-all duration-300 whitespace-nowrap">LIFORA FOUNDATION</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => cn(
                'text-sm font-medium transition-colors hover:text-mao-blue',
                isActive ? 'text-mao-blue border-b-2 border-mao-blue pb-1' : 'text-mao-body'
              )}
            >
              {link.name}
            </NavLink>
          ))}
          <DonateButton className="ml-4" />
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-mao-dark"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-bottom">
                <span className="font-bold text-mao-dark text-lg">Menu</span>
                <button onClick={() => setIsOpen(false)}><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => cn(
                      'text-lg font-semibold transition-colors',
                      isActive ? 'text-mao-blue' : 'text-mao-body'
                    )}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <DonateButton className="mt-4 w-full justify-center" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
