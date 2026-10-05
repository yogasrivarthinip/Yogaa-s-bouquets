import React from 'react';
import { Droplets, Scissors, SunMedium, ThermometerSnowflake, ShieldCheck, HeartHandshake } from 'lucide-react';

interface CareGuideProps {
  onExploreCollection: () => void;
}

export const CareGuide: React.FC<CareGuideProps> = ({ onExploreCollection }) => {
  return (
    <section id="care" className="max-w-7xl mx-auto px-6 py-16 md:py-20 border-b border-[#E8E3DC]">
      {/* Header */}
      <div className="pb-10 border-b border-[#E8E3DC] text-center max-w-2xl mx-auto">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#385544] mb-2">
          Botanical Longevity & Stewardship
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1C19] tracking-tight">
          How to Nurture Your Stems
        </h2>
        <p className="text-sm text-[#5F5951] mt-2">
          With proper conditioning, our hand-selected botanical bouquets will unfurl 
          gracefully for 7 to 12 days in your home.
        </p>
      </div>

      {/* 4-Step Conditioning Ritual */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
        <div className="bg-white border border-[#E8E3DC] p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#F5F2EB] flex items-center justify-center text-[#24211D]">
            <Scissors className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A84D3C] block">
            Step 01
          </span>
          <h3 className="font-editorial text-xl text-[#1E1C19]">Trim at 45° Angle</h3>
          <p className="text-xs text-[#5F5951] leading-relaxed">
            Upon unboxing, cut 2–3 cm off each stem at a sharp 45-degree angle under cold running water 
            to prevent air embolism in the xylem vessels.
          </p>
        </div>

        <div className="bg-white border border-[#E8E3DC] p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#F5F2EB] flex items-center justify-center text-[#24211D]">
            <Droplets className="w-5 h-5 text-[#385544]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A84D3C] block">
            Step 02
          </span>
          <h3 className="font-editorial text-xl text-[#1E1C19]">Chilled Pure Water</h3>
          <p className="text-xs text-[#5F5951] leading-relaxed">
            Fill your clean vase with cool spring or filtered water mixed with the enclosed 
            botanical nutrient sachet. Strip any leaves that fall beneath the waterline.
          </p>
        </div>

        <div className="bg-white border border-[#E8E3DC] p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#F5F2EB] flex items-center justify-center text-[#24211D]">
            <SunMedium className="w-5 h-5 text-[#A84D3C]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A84D3C] block">
            Step 03
          </span>
          <h3 className="font-editorial text-xl text-[#1E1C19]">Avoid Drafts & Fruit</h3>
          <p className="text-xs text-[#5F5951] leading-relaxed">
            Position away from direct radiator heat, air conditioners, and fruit bowls. 
            Bananas and apples release ethylene gas which triggers rapid petal aging.
          </p>
        </div>

        <div className="bg-white border border-[#E8E3DC] p-6 space-y-3">
          <div className="w-10 h-10 rounded-none bg-[#F5F2EB] flex items-center justify-center text-[#24211D]">
            <ThermometerSnowflake className="w-5 h-5 text-[#24211D]" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A84D3C] block">
            Step 04
          </span>
          <h3 className="font-editorial text-xl text-[#1E1C19]">Refresh Every 48 Hours</h3>
          <p className="text-xs text-[#5F5951] leading-relaxed">
            Every two days, rinse the vase, replenish fresh chilled water, and give the stem tips 
            a gentle 1 cm trim to maintain clear vascular channels.
          </p>
        </div>
      </div>

      {/* Sustainable Atelier Story */}
      <div className="mt-14 bg-[#FAF8F5] border border-[#E8E3DC] p-8 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#385544]">
            Our Ecological Commitment
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#1E1C19]">
            Slow Flowers & Zero Floral Foam
          </h3>
          <p className="text-xs sm:text-sm text-[#5F5951] leading-relaxed">
            At Maison Pétale, we refuse toxic non-biodegradable green floral foam. 
            All our bouquets are hand-tied with natural raffia and wrapped in biodegradable 
            compostable paper. Over 80% of our stems are sourced from certified organic 
            growers in the Île-de-France and Loire regions.
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col items-start md:items-end justify-center">
          <button
            onClick={onExploreCollection}
            className="px-6 py-3 text-xs font-medium tracking-widest uppercase bg-[#24211D] text-white hover:bg-[#3E3831] transition-colors cursor-pointer"
          >
            Explore Fresh Harvest
          </button>
        </div>
      </div>
    </section>
  );
};
