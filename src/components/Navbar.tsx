import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Clock } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  onOpenTracker
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'collection', label: 'Bouquets' },
    { id: 'atelier', label: 'Custom Atelier' },
    { id: 'meanings', label: 'Flower Meanings' },
    { id: 'care', label: 'Care & Story' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E3DC] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('collection')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#24211D]"
        >
          <span className="font-editorial text-2xl md:text-3xl font-semibold tracking-tight text-[#24211D] group-hover:text-[#A84D3C] transition-colors">
            Maison Pétale
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-[#5F5951]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`relative py-1 cursor-pointer transition-colors hover:text-[#24211D] focus-visible:outline-none ${
                activeTab === link.id
                  ? 'text-[#24211D] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#A84D3C]'
                  : ''
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 py-1 text-[#5F5951] hover:text-[#24211D] cursor-pointer transition-colors focus-visible:outline-none"
          >
            <Clock className="w-4 h-4 text-[#8C8479]" />
            <span>Track Order</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('atelier')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-wide uppercase text-[#FAF8F5] bg-[#24211D] rounded-none hover:bg-[#3B3630] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#24211D]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D9C8A8]" />
            <span>Craft Bouquet</span>
          </button>

          <button
            onClick={onOpenCart}
            aria-label="View shopping bag"
            className="relative p-2.5 text-[#24211D] hover:text-[#A84D3C] rounded-md transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#24211D]"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[11px] font-semibold tabular-nums text-white bg-[#A84D3C] rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#24211D] hover:text-[#A84D3C] focus-visible:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8E3DC] bg-[#FAF8F5] px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 text-base font-medium transition-colors ${
                  activeTab === link.id ? 'text-[#A84D3C] font-semibold' : 'text-[#5F5951]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTracker();
              }}
              className="text-left py-2 text-base font-medium text-[#5F5951] flex items-center gap-2"
            >
              <Clock className="w-4 h-4 text-[#8C8479]" />
              <span>Track Order</span>
            </button>
            <div className="pt-2">
              <button
                onClick={() => handleNavClick('atelier')}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium tracking-wide uppercase text-[#FAF8F5] bg-[#24211D]"
              >
                <Sparkles className="w-4 h-4 text-[#D9C8A8]" />
                <span>Craft Your Own Bouquet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
