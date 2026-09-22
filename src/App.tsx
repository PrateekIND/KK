import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BentoGrid } from '@/components/BentoGrid';
import { MetricsPanel } from '@/components/MetricsPanel';
import { IncidentTicker } from '@/components/IncidentTicker';
import { SlideOverDrawer } from '@/components/SlideOverDrawer';
import { Footer } from '@/components/Footer';
import type { Feature } from '@/lib/data';

export default function App() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);

  return (
    <div className="min-h-screen bg-obsidian-300 text-white relative overflow-x-hidden">
      {/* Global background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed top-0 left-0 w-[800px] h-[800px] bg-violet-glow/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-cyan-glow/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <BentoGrid onSelectFeature={setSelectedFeature} />
          <MetricsPanel />
          <IncidentTicker />
        </main>
        <Footer />
      </div>

      <SlideOverDrawer
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
      />
    </div>
  );
}
