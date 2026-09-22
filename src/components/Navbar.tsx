import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Metrics', href: '#metrics' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? 'glass-strong border-b border-white/[0.06]' : 'border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-violet-glow to-cyan-glow flex items-center justify-center">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-glow to-cyan-glow blur-md opacity-50 group-hover:opacity-80 transition-opacity" />
            <Activity className="w-4.5 h-4.5 text-white relative z-10" />
          </div>
          <span className="text-lg font-bold tracking-tight">Aether</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm font-medium text-white/60 hover:text-white transition-colors">
            Sign in
          </button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.04 }}
            className="relative inline-flex items-center px-5 py-2 rounded-lg text-sm font-semibold text-white overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-violet-glow to-cyan-glow rounded-lg" />
            <span className="absolute inset-0 bg-gradient-to-r from-violet-glow to-cyan-glow blur-md opacity-50 group-hover:opacity-80 transition-opacity rounded-lg" />
            <span className="relative z-10">Get started</span>
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/60"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden glass-strong border-t border-white/[0.06] overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-white/60 hover:text-white rounded-lg hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button className="mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-violet-glow to-cyan-glow">
              Get started
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
