import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Ambient background glows */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-glow/15 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-glow/12 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-glow/8 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '4s' }} />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(10,13,20,0.6)_70%,rgba(10,13,20,1)_100%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border border-white/10"
        >
          <Sparkles className="w-4 h-4 text-violet-glow" />
          <span className="text-sm font-medium text-white/70 tracking-tight">Now with AI-powered anomaly detection</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-glow animate-pulse" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          <span className="block text-white">See every signal.</span>
          <span className="block text-shimmer">Know every anomaly.</span>
          <span className="block">
            <span className="text-gradient-violet">Fix every incident.</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The real-time observability platform built for scale. Sub-millisecond metrics,
          distributed tracing, and AI-powered anomaly detection across 38 regions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 group"
        >
          <MagneticButton primary onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            Start free trial
            <ArrowRight className="w-4 h-4" />
          </MagneticButton>
          <MagneticButton onClick={() => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })}>
            <Play className="w-4 h-4" />
            Watch demo
          </MagneticButton>
        </motion.div>

        {/* Floating preview card */}
        <FloatingPreviewCard />
      </div>
    </section>
  );
}

function FloatingPreviewCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Glowing background mesh */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-glow via-cyan-glow to-emerald-glow opacity-20 blur-2xl rounded-3xl" />
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-glow/10 to-cyan-glow/10 blur-3xl rounded-3xl animate-pulse-slow" />

      {/* Card */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative glass-strong rounded-2xl overflow-hidden"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs font-mono text-white/30">aether.io / dashboard / overview</span>
          </div>
        </div>

        {/* Dashboard preview content */}
        <div className="grid grid-cols-12 gap-3 p-5">
          {/* Sidebar */}
          <div className="col-span-2 flex flex-col gap-2">
            {['Overview', 'Metrics', 'Traces', 'Logs', 'Alerts'].map((item, i) => (
              <div
                key={item}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium ${
                  i === 0
                    ? 'bg-violet-glow/15 text-violet-glow border border-violet-glow/20'
                    : 'text-white/30 hover:text-white/50'
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="col-span-10 flex flex-col gap-3">
            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-3">
              {[
                { label: 'RPS', value: '2.4M', color: 'text-violet-glow' },
                { label: 'P99', value: '18ms', color: 'text-cyan-glow' },
                { label: 'Error Rate', value: '0.02%', color: 'text-emerald-glow' },
                { label: 'Saturation', value: '47%', color: 'text-white/60' },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-lg p-3">
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className={`text-lg font-bold font-mono ${stat.color}`}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="glass rounded-lg p-4 flex-1 h-32 relative overflow-hidden">
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-2">Throughput — last 24h</div>
              <svg className="w-full h-20" viewBox="0 0 400 80" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="hero-chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,60 L33,50 L66,55 L100,35 L133,40 L166,25 L200,30 L233,20 L266,28 L300,18 L333,22 L366,15 L400,25 L400,80 L0,80 Z"
                  fill="url(#hero-chart-grad)"
                />
                <path
                  d="M0,60 L33,50 L66,55 L100,35 L133,40 L166,25 L200,30 L233,20 L266,28 L300,18 L333,22 L366,15 L400,25"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
