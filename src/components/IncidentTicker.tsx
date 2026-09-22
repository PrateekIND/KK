import { motion } from 'framer-motion';
import { incidents, type Incident } from '@/lib/data';

const severityConfig = {
  critical: { color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30', dot: 'bg-red-400' },
  warning: { color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30', dot: 'bg-amber-400' },
  info: { color: 'text-cyan-glow', bg: 'bg-cyan-glow/10', border: 'border-cyan-glow/30', dot: 'bg-cyan-glow' },
};

const statusConfig = {
  investigating: 'text-red-400',
  identified: 'text-amber-400',
  monitoring: 'text-cyan-glow',
  resolved: 'text-emerald-glow',
};

export function IncidentTicker() {
  return (
    <section className="relative py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-glow animate-pulse" />
          <span className="text-sm font-mono text-white/40 uppercase tracking-wider">
            Live Incidents
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incidents.map((incident, index) => (
            <IncidentCard key={incident.id} incident={incident} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IncidentCard({ incident, index }: { incident: Incident; index: number }) {
  const sev = severityConfig[incident.severity];
  const statusColor = statusConfig[incident.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="glass rounded-xl p-5 cursor-pointer group relative overflow-hidden"
    >
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${sev.bg} border-t ${sev.border}`} />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${sev.dot} animate-pulse`} />
          <span className={`text-xs font-mono font-semibold uppercase ${sev.color}`}>
            {incident.severity}
          </span>
        </div>
        <span className="text-xs font-mono text-white/30">{incident.time}</span>
      </div>

      <h4 className="text-sm font-semibold tracking-tight mb-2 group-hover:text-white transition-colors">
        {incident.title}
      </h4>

      <p className="text-xs text-white/40 leading-relaxed mb-3">{incident.impact}</p>

      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono text-white/30">{incident.region}</span>
        <span className={`text-[10px] font-mono font-semibold uppercase ${statusColor}`}>
          {incident.status}
        </span>
      </div>
    </motion.div>
  );
}
