import React from 'react';
import { ArrowRight, Sparkles, Droplets, Sun, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/bouquets';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenAtelier: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenAtelier }) => {
  return (
    <section className="relative border-b border-[#E8E3DC] bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-18 lg:py-22">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#A84D3C]">
              <span>Artisanal Botanical Atelier</span>
              <span aria-hidden="true">·</span>
              <span>Paris & Beyond</span>
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1E1C19] leading-[1.08] tracking-tight text-balance">
              Flowers arranged with quiet reverence and wild grace.
            </h1>

            <p className="text-base sm:text-lg text-[#5F5951] leading-relaxed max-w-xl font-normal">
              Fresh seasonal stems harvested at dawn from sustainable French fields, 
              hand-tied in raw linen parchment, and delivered in custom hydration envelopes 
              to bloom gloriously in your space.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-medium tracking-widest uppercase text-white bg-[#24211D] hover:bg-[#3E3831] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24211D]"
              >
                <span>View Bouquets</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenAtelier}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-medium tracking-widest uppercase text-[#24211D] bg-transparent border border-[#24211D] hover:bg-[#F2ECE4] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24211D]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#A84D3C]" />
                <span>Build Custom Bouquet</span>
              </button>
            </div>

            {/* Botanical Trust Markers */}
            <div className="pt-6 border-t border-[#E8E3DC] grid grid-cols-3 gap-4 text-[#5F5951]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#24211D]">
                  <Droplets className="w-3.5 h-3.5 text-[#385544]" />
                  <span>Hydration Sealed</span>
                </div>
                <p className="text-[12px] text-[#7A7368] leading-tight">
                  Wet-stem pack for fresh delivery
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#24211D]">
                  <Sun className="w-3.5 h-3.5 text-[#A84D3C]" />
                  <span>Dawn Harvest</span>
                </div>
                <p className="text-[12px] text-[#7A7368] leading-tight">
                  Cut 24h prior to dispatch
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#24211D]">
                  <Award className="w-3.5 h-3.5 text-[#24211D]" />
                  <span>Florist Certified</span>
                </div>
                <p className="text-[12px] text-[#7A7368] leading-tight">
                  Bespoke hand-tied ribboning
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Resilient Fallback */}
          <div className="lg:col-span-6">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] rounded-sm overflow-hidden bg-[#ECE6DD] shadow-sm">
              <img
                src={HERO_IMAGE}
                alt="Artisan florist workbench at Maison Pétale studio"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                onError={(e) => {
                  // Fallback container if image cannot be rendered
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium flex items-center justify-between pointer-events-none drop-shadow-sm">
                <span className="font-editorial text-sm italic tracking-wide">
                  Atelier Workshop · 14 Rue de Fleurus
                </span>
                <span className="opacity-90">Daily Curation</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
