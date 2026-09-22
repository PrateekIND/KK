import {
  Activity,
  Zap,
  Shield,
  Cpu,
  Globe,
  Lock,
  TrendingUp,
  GitBranch,
  Server,
  Network,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';

export type FeatureCategory = 'observability' | 'infrastructure' | 'security';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: typeof Activity;
  category: FeatureCategory;
  accent: 'violet' | 'cyan' | 'emerald';
  tags: string[];
  metric: string;
  metricLabel: string;
  span: 'sm' | 'md' | 'lg';
  highlights: string[];
}

export const categories: { id: FeatureCategory; label: string }[] = [
  { id: 'observability', label: 'Observability' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'security', label: 'Security' },
];

export const features: Feature[] = [
  {
    id: 'realtime-metrics',
    title: 'Sub-Millisecond Metrics',
    description: 'Stream 10M+ data points per second with p99 ingestion latency under 0.4ms. Powered by a custom time-series engine built in Rust.',
    icon: Activity,
    category: 'observability',
    accent: 'violet',
    tags: ['Time-Series', 'Streaming', 'p99 < 0.4ms'],
    metric: '10.4M',
    metricLabel: 'data points / sec',
    span: 'lg',
    highlights: [
      'Columnar storage with 14:1 compression ratio',
      'Downsampling with configurable rollups',
      'Histograms with dynamic bucketing',
      'Multi-dimensional cardinality up to 100K tags',
    ],
  },
  {
    id: 'distributed-tracing',
    title: 'Distributed Tracing',
    description: 'Trace requests across 500+ microservices with zero-code instrumentation and OpenTelemetry support.',
    icon: GitBranch,
    category: 'observability',
    accent: 'cyan',
    tags: ['OpenTelemetry', 'Span Analysis', 'TraceQL'],
    metric: '500+',
    metricLabel: 'services traced',
    span: 'md',
    highlights: [
      'Auto-instrumentation for 12 languages',
      'Span correlation with logs and metrics',
      'Tail-based sampling with custom rules',
      'Service map with latency heat overlays',
    ],
  },
  {
    id: 'anomaly-detection',
    title: 'AI Anomaly Detection',
    description: 'ML-powered detection with 99.2% precision. Trains on your baseline to surface anomalies before they escalate.',
    icon: TrendingUp,
    category: 'observability',
    accent: 'emerald',
    tags: ['Machine Learning', 'Forecasting', '99.2% precision'],
    metric: '99.2%',
    metricLabel: 'detection precision',
    span: 'md',
    highlights: [
      'Seasonal decomposition (STL + Prophet)',
      'Multi-variate correlation engine',
      'Alert deduplication with smart grouping',
      'Root-cause suggestions via causal graphs',
    ],
  },
  {
    id: 'edge-compute',
    title: 'Edge Compute Grid',
    description: '320+ edge locations with WASM-based processing. Run custom transforms at the edge, close to your users.',
    icon: Cpu,
    category: 'infrastructure',
    accent: 'violet',
    tags: ['WASM', 'Edge', '320+ PoPs'],
    metric: '320+',
    metricLabel: 'edge locations',
    span: 'md',
    highlights: [
      'WASM runtime with 50μs cold start',
      'Geo-routing with latency-aware balancing',
      'Stateful edge with CRDT-based sync',
      'Per-region cost attribution',
    ],
  },
  {
    id: 'global-network',
    title: 'Global Anycast Network',
    description: 'Private backbone with <20ms p95 global latency. Multi-region failover in under 200ms.',
    icon: Globe,
    category: 'infrastructure',
    accent: 'cyan',
    tags: ['Anycast', 'Backbone', '<20ms p95'],
    metric: '<20ms',
    metricLabel: 'global p95 latency',
    span: 'md',
    highlights: [
      'Private fiber backbone across 6 continents',
      'BGP-optimized routing with Anycast',
      'Automatic DDoS scrubbing at every PoP',
      'Cross-region replication < 50ms',
    ],
  },
  {
    id: 'auto-scaling',
    title: 'Predictive Auto-Scaling',
    description: 'Scale 10K+ instances proactively using traffic forecasting. No more cold-start spikes.',
    icon: Server,
    category: 'infrastructure',
    accent: 'emerald',
    tags: ['Kubernetes', 'Forecasting', '10K+ nodes'],
    metric: '10K+',
    metricLabel: 'nodes orchestrated',
    span: 'sm',
    highlights: [
      'LSTM-based traffic forecasting',
      'Pre-warm pools based on historical patterns',
      'Spot instance optimization (73% cost savings)',
      'Drift detection with auto-remediation',
    ],
  },
  {
    id: 'zero-trust',
    title: 'Zero-Trust Security',
    description: 'mTLS everywhere with SPIFFE-based identity. Every request authenticated, every packet encrypted.',
    icon: Lock,
    category: 'security',
    accent: 'violet',
    tags: ['mTLS', 'SPIFFE', 'Zero-Trust'],
    metric: '100%',
    metricLabel: 'mTLS coverage',
    span: 'md',
    highlights: [
      'SPIFFE/SPIRE workload identity',
      'Short-lived credentials (15-min rotation)',
      'Policy-as-code with OPA integration',
      'Encryption at rest with customer-managed keys',
    ],
  },
  {
    id: 'threat-detection',
    title: 'Threat Detection Engine',
    description: 'Real-time threat scoring on every request with behavioral anomaly models.',
    icon: Shield,
    category: 'security',
    accent: 'cyan',
    tags: ['WAF', 'Behavioral AI', 'Real-time'],
    metric: '<2ms',
    metricLabel: 'threat scoring',
    span: 'md',
    highlights: [
      'Behavioral fingerprinting per session',
      'OWASP Top-10 + custom rule packs',
      'Bot mitigation with JS challenges',
      'Threat intel feeds from 40+ sources',
    ],
  },
  {
    id: 'compliance',
    title: 'Compliance Automation',
    description: 'SOC 2, HIPAA, GDPR, PCI-DSS continuously verified with evidence collection automation.',
    icon: AlertTriangle,
    category: 'security',
    accent: 'emerald',
    tags: ['SOC 2', 'HIPAA', 'GDPR', 'PCI-DSS'],
    metric: '4',
    metricLabel: 'frameworks automated',
    span: 'sm',
    highlights: [
      'Continuous compliance monitoring',
      'Automated evidence collection',
      'Drift alerts on control violations',
      'Audit-ready reports in one click',
    ],
  },
  {
    id: 'network-security',
    title: 'Network Segmentation',
    description: 'Micro-segmentation with per-pod policies. East-west traffic encrypted and inspected.',
    icon: Network,
    category: 'security',
    accent: 'violet',
    tags: ['Micro-segmentation', 'East-West', 'Cilium'],
    metric: 'L7',
    metricLabel: 'policy enforcement',
    span: 'sm',
    highlights: [
      'Cilium-based eBPF enforcement',
      'L7 policy with HTTP/gRPC awareness',
      'Visual policy builder with simulation',
      'Zero-downtime policy rollouts',
    ],
  },
  {
    id: 'performance',
    title: 'Performance Insights',
    description: 'Flame graphs, profiling, and code-level diagnostics. Find the slow line, not just the slow service.',
    icon: Zap,
    category: 'observability',
    accent: 'cyan',
    tags: ['Profiling', 'Flame Graphs', 'eBPF'],
    metric: '1μs',
    metricLabel: 'profile resolution',
    span: 'sm',
    highlights: [
      'Continuous profiling with eBPF',
      'Flame graphs with code attribution',
      'Memory leak detection with diff views',
      'Allocation tracking per request path',
    ],
  },
  {
    id: 'bar-chart',
    title: 'Custom Dashboards',
    description: 'Build dashboards with 40+ widget types, variable interpolation, and template inheritance.',
    icon: BarChart3,
    category: 'observability',
    accent: 'emerald',
    tags: ['Dashboards', '40+ Widgets', 'Templates'],
    metric: '40+',
    metricLabel: 'widget types',
    span: 'sm',
    highlights: [
      'Drag-and-drop grid with snap-to-fit',
      'Variable interpolation with cascading filters',
      'Dashboard-as-code with GitOps sync',
      'Public sharing with embedded tokens',
    ],
  },
];

export const accentMap = {
  violet: {
    text: 'text-violet-glow',
    bg: 'bg-violet-glow',
    border: 'border-violet-glow/50',
    glow: 'glow-violet',
    gradient: 'from-violet-glow to-cyan-glow',
    rgb: '139, 92, 246',
    shadow: 'rgba(139, 92, 246, 0.5)',
    soft: 'bg-violet-glow/10',
    softBorder: 'border-violet-glow/20',
  },
  cyan: {
    text: 'text-cyan-glow',
    bg: 'bg-cyan-glow',
    border: 'border-cyan-glow/50',
    glow: 'glow-cyan',
    gradient: 'from-cyan-glow to-emerald-glow',
    rgb: '6, 182, 212',
    shadow: 'rgba(6, 182, 212, 0.5)',
    soft: 'bg-cyan-glow/10',
    softBorder: 'border-cyan-glow/20',
  },
  emerald: {
    text: 'text-emerald-glow',
    bg: 'bg-emerald-glow',
    border: 'border-emerald-glow/50',
    glow: 'glow-emerald',
    gradient: 'from-emerald-glow to-violet-glow',
    rgb: '16, 185, 129',
    shadow: 'rgba(16, 185, 129, 0.5)',
    soft: 'bg-emerald-glow/10',
    softBorder: 'border-emerald-glow/20',
  },
};

export interface MetricItem {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  decimals?: number;
  accent: 'violet' | 'cyan' | 'emerald';
}

export const metrics: MetricItem[] = [
  { label: 'Requests / sec', value: 2.4, suffix: 'M', prefix: '', decimals: 1, accent: 'violet' },
  { label: 'Uptime SLA', value: 99.999, suffix: '%', decimals: 3, accent: 'emerald' },
  { label: 'P99 Latency', value: 18, suffix: 'ms', decimals: 0, accent: 'cyan' },
  { label: 'Active Regions', value: 38, suffix: '', decimals: 0, accent: 'violet' },
];

export interface ChartPoint {
  time: string;
  throughput: number;
  latency: number;
  errors: number;
}

export const chartData: ChartPoint[] = [
  { time: '00:00', throughput: 1820, latency: 22, errors: 3 },
  { time: '02:00', throughput: 1450, latency: 19, errors: 1 },
  { time: '04:00', throughput: 1180, latency: 17, errors: 0 },
  { time: '06:00', throughput: 1620, latency: 20, errors: 2 },
  { time: '08:00', throughput: 2480, latency: 28, errors: 5 },
  { time: '10:00', throughput: 3120, latency: 32, errors: 8 },
  { time: '12:00', throughput: 3540, latency: 35, errors: 12 },
  { time: '14:00', throughput: 3890, latency: 31, errors: 6 },
  { time: '16:00', throughput: 4210, latency: 26, errors: 4 },
  { time: '18:00', throughput: 3680, latency: 24, errors: 3 },
  { time: '20:00', throughput: 2940, latency: 21, errors: 2 },
  { time: '22:00', throughput: 2180, latency: 19, errors: 1 },
];

export interface Incident {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'info';
  region: string;
  impact: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  time: string;
  affectedServices: string[];
  description: string;
}

export const incidents: Incident[] = [
  {
    id: 'INC-2041',
    title: 'Elevated P99 latency in eu-west-1',
    severity: 'warning',
    region: 'eu-west-1',
    impact: '12% of requests above 50ms threshold',
    status: 'monitoring',
    time: '14m ago',
    affectedServices: ['api-gateway', 'auth-service', 'billing-service'],
    description: 'Anomalous latency spike detected in the eu-west-1 region. The auto-scaler provisioned 40 additional pods and latency is trending down. Root cause identified as a cold-start surge after a deployment.',
  },
  {
    id: 'INC-2040',
    title: 'Throughput anomaly on checkout-service',
    severity: 'critical',
    region: 'us-east-1',
    impact: 'Checkout success rate dropped to 94.2%',
    status: 'identified',
    time: '38m ago',
    affectedServices: ['checkout-service', 'payment-gateway', 'inventory-service'],
    description: 'The AI anomaly detector flagged a 23% throughput deviation on the checkout service. Investigation traced the issue to a connection pool exhaustion in the payment gateway. A fix has been identified and is being rolled out.',
  },
  {
    id: 'INC-2039',
    title: 'Certificate rotation completed',
    severity: 'info',
    region: 'global',
    impact: 'No user-facing impact',
    status: 'resolved',
    time: '2h ago',
    affectedServices: ['edge-proxy', 'service-mesh'],
    description: 'Scheduled mTLS certificate rotation completed across all 320 edge locations. All workloads now have fresh 15-minute credentials. Zero downtime observed during rotation.',
  },
];
