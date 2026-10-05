import React from 'react';
import { Heart, Droplets } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onOpenTracker }) => {
  return (
    <footer className="border-t border-[#E8E3DC] bg-[#FAF8F5] text-[#5F5951]">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-editorial text-2xl text-[#1E1C19] font-semibold block">
              Maison Pétale
            </span>
            <p className="text-xs text-[#7A7368] leading-relaxed max-w-sm">
              Artisanal botanical studio and floral atelier. Handcrafted bespoke bouquets, 
              custom stem composition, and ethical slow-flower sourcing.
            </p>
            <div className="pt-2 text-xs text-[#7A7368]">
              <span>Atelier: 14 Rue de Fleurus, 75006 Paris</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24211D]">
              Atelier Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavClick('collection')}
                  className="hover:text-[#24211D] transition-colors cursor-pointer"
                >
                  Curated Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('atelier')}
                  className="hover:text-[#24211D] transition-colors cursor-pointer"
                >
                  Custom Stem Atelier
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('meanings')}
                  className="hover:text-[#24211D] transition-colors cursor-pointer"
                >
                  Floriography & Meanings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('care')}
                  className="hover:text-[#24211D] transition-colors cursor-pointer"
                >
                  Botanical Care & Longevity
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24211D]">
              Care & Courier
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-[#24211D] transition-colors cursor-pointer"
                >
                  Track Order Status
                </button>
              </li>
              <li>Same-Day Paris Courier (Orders before 13h)</li>
              <li>Biodegradable Hydration Wrap</li>
              <li>Zero Floral Foam Promise</li>
            </ul>
          </div>

          {/* Atelier Hours */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24211D]">
              Workshop Hours
            </h4>
            <div className="text-xs space-y-1 text-[#7A7368]">
              <p>Mon – Sat: 08:30 – 19:30</p>
              <p>Sunday: 09:00 – 15:00</p>
              <p className="text-[#385544] font-medium pt-1">Fresh Harvest Daily</p>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-[#E8E3DC] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8479] gap-4">
          <p>© {new Date().getFullYear()} Maison Pétale Botanique. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Hand-tied with reverence for nature.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
