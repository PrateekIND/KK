import { motion } from 'framer-motion';
import { Activity, Github, Twitter, Linkedin } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Status'],
  Company: ['About', 'Blog', 'Careers', 'Contact', 'Partners'],
  Resources: ['Documentation', 'API Reference', 'Guides', 'Community', 'Support'],
  Legal: ['Privacy', 'Terms', 'Security', 'Compliance', 'SLA'],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-12">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-violet-glow/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-16 relative">
        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8 sm:p-12 text-center mb-16 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-violet-glow/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-glow/15 rounded-full blur-3xl" />
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
              Ready to see <span className="text-gradient-violet">everything</span>?
            </h3>
            <p className="text-white/40 mb-6 max-w-md mx-auto">
              Start your free trial today. No credit card required. Full access for 14 days.
            </p>
            <motion.button
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.04 }}
              className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white group"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow" />
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-glow to-cyan-glow blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative z-10 flex items-center gap-2">
                Start free trial
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-glow to-cyan-glow flex items-center justify-center">
                <Activity className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">Aether</span>
            </a>
            <p className="text-sm text-white/30 leading-relaxed mb-4">
              Real-time observability for modern infrastructure.
            </p>
            <div className="flex gap-3">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-white/40 hover:text-white hover:border-white/15 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h5 className="text-sm font-semibold text-white/70 mb-4">{section}</h5>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/30 hover:text-white/60 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-white/20">
            © 2026 Aether Systems, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-glow animate-pulse" />
            <span className="text-xs font-mono text-white/30">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
