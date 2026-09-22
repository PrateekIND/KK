import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Tag, MapPin, Clock, Shield, Zap, ChevronRight } from 'lucide-react';
import { accentMap, type Feature } from '@/lib/data';

interface DrawerProps {
  feature: Feature | null;
  onClose: () => void;
}

export function SlideOverDrawer({ feature, onClose }: DrawerProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    if (!feature) return [];
    return feature.tags;
  }, [feature]);

  const highlights = useMemo(() => {
    if (!feature) return [];
    return feature.highlights;
  }, [feature]);

  const filteredHighlights = useMemo(() => {
    if (selectedTags.length === 0) return highlights;
    return highlights;
  }, [highlights, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const accent = feature ? accentMap[feature.accent] : null;
  const Icon = feature?.icon;

  return (
    <AnimatePresence onExitComplete={() => setSelectedTags([])}>
      {feature && accent && Icon && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-obsidian-300/80 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[540px] lg:w-[620px] glass-strong overflow-y-auto custom-scrollbar"
          >
            {/* Top gradient accent bar */}
            <div className={`h-1 bg-gradient-to-r ${accent.gradient}`} />

            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-2xl ${accent.soft} border ${accent.softBorder} flex items-center justify-center`}
                  >
                    <Icon className={`w-7 h-7 ${accent.text}`} />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-white/30 uppercase tracking-wider mb-1">
                      Feature Detail
                    </div>
                    <h2 className="text-xl font-bold tracking-tight">{feature.title}</h2>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.96 }}
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.08] transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Description */}
              <p className="text-white/50 leading-relaxed mb-8">{feature.description}</p>

              {/* Key metric highlight */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="glass rounded-xl p-4">
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">
                    {feature.metricLabel}
                  </div>
                  <div className={`text-2xl font-bold font-mono ${accent.text}`}>
                    {feature.metric}
                  </div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">
                    Category
                  </div>
                  <div className="text-sm font-semibold capitalize text-white/80 pt-1">
                    {feature.category}
                  </div>
                </div>
              </div>

              {/* Tag filters */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-white/30" />
                  <span className="text-sm font-medium text-white/60">Filter by tag</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => {
                    const active = selectedTags.includes(tag);
                    return (
                      <motion.button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        whileTap={{ scale: 0.96 }}
                        className={`
                          px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200
                          ${active
                            ? `${accent.soft} border ${accent.border} ${accent.text}`
                            : 'bg-white/[0.03] border border-white/[0.06] text-white/40 hover:text-white/70 hover:border-white/10'
                          }
                        `}
                      >
                        {active && <Check className="w-3 h-3 inline mr-1" />}
                        {tag}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Side-by-side comparison panels */}
              <div className="mb-8">
                <div className="text-sm font-medium text-white/60 mb-3">Capabilities</div>
                <div className="grid grid-cols-2 gap-3">
                  <ComparisonPanel
                    title="With Aether"
                    items={filteredHighlights}
                    accentClass={accent.text}
                    positive
                  />
                  <ComparisonPanel
                    title="Without Aether"
                    items={[
                      'Manual metric collection',
                      'Blind spots in distributed traces',
                      'Reactive incident response',
                      'Siloed observability tools',
                    ]}
                    accentClass="text-red-400/70"
                    positive={false}
                  />
                </div>
              </div>

              {/* Metadata */}
              <div className="glass rounded-xl p-4 mb-8 space-y-3">
                <MetaRow icon={MapPin} label="Deployment" value="Cloud + On-Prem" />
                <MetaRow icon={Clock} label="Setup time" value="< 5 minutes" />
                <MetaRow icon={Shield} label="Compliance" value="SOC 2, HIPAA, GDPR" />
                <MetaRow icon={Zap} label="Performance" value="Sub-millisecond" />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.02 }}
                  className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white bg-gradient-to-r ${accent.gradient} relative group`}
                >
                  <span className={`absolute inset-0 rounded-xl bg-gradient-to-r ${accent.gradient} blur-lg opacity-40 group-hover:opacity-70 transition-opacity`} />
                  <span className="relative z-10 flex items-center gap-2">
                    Explore this feature
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </motion.button>
                <motion.button
                  onClick={onClose}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-3.5 rounded-xl text-sm font-semibold text-white/60 hover:text-white bg-white/[0.03] border border-white/[0.08] hover:border-white/15 transition-colors"
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ComparisonPanel({
  title,
  items,
  accentClass,
  positive,
}: {
  title: string;
  items: string[];
  accentClass: string;
  positive: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 border ${
        positive ? 'bg-white/[0.03] border-white/[0.08]' : 'bg-red-500/[0.02] border-red-500/10'
      }`}
    >
      <div className={`text-xs font-semibold mb-3 ${positive ? accentClass : 'text-red-400/70'}`}>
        {title}
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: positive ? -10 : 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="flex items-start gap-2 text-xs text-white/50 leading-relaxed"
          >
            {positive ? (
              <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${accentClass}`} />
            ) : (
              <X className="w-3.5 h-3.5 mt-0.5 shrink-0 text-red-400/50" />
            )}
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-white/40">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <span className="text-sm font-medium text-white/70">{value}</span>
    </div>
  );
}
