import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { features, categories, accentMap, type FeatureCategory, type Feature } from '@/lib/data';

interface BentoGridProps {
  onSelectFeature: (feature: Feature) => void;
}

export function BentoGrid({ onSelectFeature }: BentoGridProps) {
  const [activeCategory, setActiveCategory] = useState<FeatureCategory | 'all'>('all');

  const filteredFeatures =
    activeCategory === 'all'
      ? features
      : features.filter((f) => f.category === activeCategory);

  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-cyan-glow uppercase tracking-widest mb-3 inline-block">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-gradient-violet">observe everything</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            From sub-millisecond metrics to zero-trust security — Aether unifies your entire
            observability stack into one platform.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl glass">
            <TabButton
              label="All"
              active={activeCategory === 'all'}
              onClick={() => setActiveCategory('all')}
            />
            {categories.map((cat) => (
              <TabButton
                key={cat.id}
                label={cat.label}
                active={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
              />
            ))}
          </div>
        </div>

        {/* Bento grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          <AnimatePresence mode="popLayout">
            {filteredFeatures.map((feature, index) => (
              <BentoCard
                key={feature.id}
                feature={feature}
                index={index}
                onClick={() => onSelectFeature(feature)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function TabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        active ? 'text-white' : 'text-white/40 hover:text-white/70'
      }`}
    >
      {active && (
        <motion.div
          layoutId="active-tab-pill"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-violet-glow/30 to-cyan-glow/20 border border-white/10"
        />
      )}
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}

function BentoCard({
  feature,
  index,
  onClick,
}: {
  feature: Feature;
  index: number;
  onClick: () => void;
}) {
  const accent = accentMap[feature.accent];
  const Icon = feature.icon;

  const spanClass =
    feature.span === 'lg'
      ? 'md:col-span-2 md:row-span-1 lg:col-span-2 lg:row-span-2'
      : feature.span === 'md'
        ? 'md:col-span-1 lg:col-span-1 lg:row-span-1'
        : 'md:col-span-1 lg:col-span-1';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.06, 0.3),
        ease: 'easeOut',
      }}
      whileHover={{ y: -6 }}
      onClick={onClick}
      className={`group relative cursor-pointer ${spanClass}`}
    >
      {/* Glow border trace on hover */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(${accent.rgb}, 0.5), rgba(${accent.rgb}, 0))`,
          maskImage: 'linear-gradient(black, black)',
        }}
      />
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 30px -5px ${accent.shadow}, inset 0 0 0 1px rgba(${accent.rgb}, 0.3)`,
        }}
      />

      {/* Card body */}
      <div className="relative h-full glass rounded-2xl p-6 flex flex-col overflow-hidden transition-colors duration-300 group-hover:border-white/20">
        {/* Background glow */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: `rgba(${accent.rgb}, 0.6)` }}
        />

        {/* Icon */}
        <div className="relative flex items-start justify-between mb-4">
          <div
            className={`w-11 h-11 rounded-xl ${accent.soft} border ${accent.softBorder} flex items-center justify-center`}
          >
            <Icon className={`w-5 h-5 ${accent.text}`} />
          </div>
          <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-white/60 group-hover:rotate-0 -rotate-12 transition-all duration-300" />
        </div>

        {/* Title */}
        <h3 className="relative text-lg font-semibold tracking-tight mb-2 group-hover:text-white transition-colors">
          {feature.title}
        </h3>

        {/* Description */}
        <p className="relative text-sm text-white/40 leading-relaxed flex-1">
          {feature.description}
        </p>

        {/* Metric */}
        <div className="relative mt-4 pt-4 border-t border-white/[0.06] flex items-end justify-between">
          <div>
            <div className={`text-2xl font-bold font-mono ${accent.text}`}>
              {feature.metric}
            </div>
            <div className="text-[11px] font-mono text-white/30 uppercase tracking-wider mt-0.5">
              {feature.metricLabel}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-end max-w-[50%]">
            {feature.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
