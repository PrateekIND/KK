import { useState, useCallback } from 'react';
import {
  AreaChart,
  Area,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, AlertCircle, Activity, Zap } from 'lucide-react';
import { metrics, chartData, accentMap, type MetricItem } from '@/lib/data';
import { useCountUp, useInView } from '@/lib/hooks';

type ChartMode = 'throughput' | 'latency' | 'errors';

const chartConfig: Record<ChartMode, {
  label: string;
  key: keyof typeof chartData[0];
  color: string;
  rgb: string;
  icon: typeof Activity;
  unit: string;
}> = {
  throughput: {
    label: 'Throughput',
    key: 'throughput',
    color: '#8B5CF6',
    rgb: '139, 92, 246',
    icon: Activity,
    unit: 'req/s',
  },
  latency: {
    label: 'P99 Latency',
    key: 'latency',
    color: '#06B6D4',
    rgb: '6, 182, 212',
    icon: Zap,
    unit: 'ms',
  },
  errors: {
    label: 'Error Rate',
    key: 'errors',
    color: '#10B981',
    rgb: '16, 185, 129',
    icon: AlertCircle,
    unit: 'errors',
  },
};

export function MetricsPanel() {
  const [chartMode, setChartMode] = useState<ChartMode>('throughput');
  const [ref, inView] = useInView<HTMLDivElement>(0.2);

  const config = chartConfig[chartMode];

  return (
    <section id="metrics" className="relative py-24 px-6">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-glow/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-mono text-emerald-glow uppercase tracking-widest mb-3 inline-block">
            Live Metrics
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Real-time data, <span className="text-gradient-cyan">real-time decisions</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            Monitor your infrastructure with live dashboards updated every second.
          </p>
        </motion.div>

        {/* Animated counter metrics */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard key={metric.label} metric={metric} inView={inView} delay={index * 0.1} />
          ))}
        </div>

        {/* Chart panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="glass rounded-2xl p-6 relative overflow-hidden"
        >
          {/* Chart header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-1 flex items-center gap-2">
                <config.icon className="w-5 h-5" style={{ color: config.color }} />
                {config.label}
                <span className="text-xs font-mono text-white/30 ml-2">last 24 hours</span>
              </h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-2xl font-bold font-mono" style={{ color: config.color }}>
                  {chartData[chartData.length - 1][config.key]}
                  <span className="text-sm text-white/40 ml-1">{config.unit}</span>
                </span>
                <span className="flex items-center gap-1 text-sm font-mono text-emerald-glow">
                  <TrendingUp className="w-4 h-4" />
                  +12.4%
                </span>
              </div>
            </div>

            {/* Chart mode tabs */}
            <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              {(Object.keys(chartConfig) as ChartMode[]).map((mode) => {
                const cfg = chartConfig[mode];
                const active = chartMode === mode;
                return (
                  <motion.button
                    key={mode}
                    onClick={() => setChartMode(mode)}
                    whileTap={{ scale: 0.96 }}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      active ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="chart-tab-pill"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute inset-0 rounded-lg border"
                        style={{
                          background: `rgba(${cfg.rgb}, 0.15)`,
                          borderColor: `rgba(${cfg.rgb}, 0.3)`,
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <cfg.icon className="w-3.5 h-3.5" style={{ color: cfg.color }} />
                      {cfg.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === 'errors' ? (
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<GlowingTooltip config={config} />} />
                  <Line
                    type="monotone"
                    dataKey={config.key}
                    stroke={config.color}
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: config.color, stroke: '#0A0D14', strokeWidth: 2 }}
                    isAnimationActive
                    animationDuration={1200}
                  />
                </LineChart>
              ) : (
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`area-grad-${chartMode}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={config.color} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={config.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis
                    dataKey="time"
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.2)"
                    tick={{ fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip content={<GlowingTooltip config={config} />} />
                  <Area
                    type="monotone"
                    dataKey={config.key}
                    stroke={config.color}
                    strokeWidth={2.5}
                    fill={`url(#area-grad-${chartMode})`}
                    dot={false}
                    activeDot={{ r: 5, fill: config.color, stroke: '#0A0D14', strokeWidth: 2 }}
                    isAnimationActive
                    animationDuration={1200}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  inView,
  delay,
}: {
  metric: MetricItem;
  inView: boolean;
  delay: number;
}) {
  const accent = accentMap[metric.accent];
  const value = useCountUp(metric.value, 2200, inView, metric.decimals ?? 0);
  const formatted = value.toLocaleString(undefined, {
    minimumFractionDigits: metric.decimals ?? 0,
    maximumFractionDigits: metric.decimals ?? 0,
  });

  const isPositive = metric.accent === 'emerald' || metric.accent === 'violet';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-xl p-5 relative overflow-hidden group"
    >
      <div
        className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-15 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: accent.bg }}
      />
      <div className="relative">
        <div className="text-[11px] font-mono text-white/30 uppercase tracking-wider mb-2">
          {metric.label}
        </div>
        <div className={`text-3xl font-bold font-mono ${accent.text} tabular-nums`}>
          {metric.prefix}{formatted}{metric.suffix}
        </div>
        <div className="flex items-center gap-1 mt-2 text-xs">
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-glow" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-emerald-glow" />
          )}
          <span className="font-mono text-white/30">
            {isPositive ? 'healthy' : 'optimal'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

interface GlowingTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: (typeof chartData)[0] }>;
  config: (typeof chartConfig)[ChartMode];
}

function GlowingTooltip({ active, payload, config }: GlowingTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div
      className="glass-strong rounded-xl p-3 border"
      style={{
        borderColor: `rgba(${config.rgb}, 0.3)`,
        boxShadow: `0 0 20px -5px rgba(${config.rgb}, 0.4)`,
      }}
    >
      <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-1">
        {data.time}
      </div>
      <div className="flex items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: config.color, boxShadow: `0 0 8px ${config.color}` }}
        />
        <span className="text-sm font-mono font-semibold" style={{ color: config.color }}>
          {payload[0].value} {config.unit}
        </span>
      </div>
    </div>
  );
}
