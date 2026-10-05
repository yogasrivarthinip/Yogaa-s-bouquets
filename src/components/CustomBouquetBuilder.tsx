import React, { useState, useMemo } from 'react';
import { Plus, Minus, Sparkles, RefreshCw, ShoppingBag, Check, Info } from 'lucide-react';
import { FLOWER_STEMS, WRAPPING_OPTIONS, RIBBON_OPTIONS } from '../data/stems';
import { VASE_OPTIONS } from '../data/bouquets';
import { CustomBouquetConfig, FlowerStem, VaseOption } from '../types/bouquet';

interface CustomBouquetBuilderProps {
  onAddCustomToCart: (config: CustomBouquetConfig, vase?: VaseOption) => void;
  onOpenMeanings: () => void;
}

export const CustomBouquetBuilder: React.FC<CustomBouquetBuilderProps> = ({
  onAddCustomToCart,
  onOpenMeanings
}) => {
  // Initialize stems with default counts
  const [stems, setStems] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    FLOWER_STEMS.forEach((s) => {
      initial[s.id] = s.defaultStems;
    });
    return initial;
  });

  const [activeCategory, setActiveCategory] = useState<'all' | 'focal' | 'secondary' | 'accent' | 'foliage'>('all');
  const [selectedWrapId, setSelectedWrapId] = useState<string>('wrap-kraft-parisian');
  const [selectedRibbonId, setSelectedRibbonId] = useState<string>('ribbon-sage-silk');
  const [selectedVaseId, setSelectedVaseId] = useState<string>('vase-none');
  const [bouquetTitle, setBouquetTitle] = useState<string>('Bespoke Atelier Creation');
  const [giftCardNote, setGiftCardNote] = useState<string>('');
  const [justAdded, setJustAdded] = useState(false);

  const selectedWrap = WRAPPING_OPTIONS.find((w) => w.id === selectedWrapId) || WRAPPING_OPTIONS[0];
  const selectedRibbon = RIBBON_OPTIONS.find((r) => r.id === selectedRibbonId) || RIBBON_OPTIONS[0];
  const selectedVase = VASE_OPTIONS.find((v) => v.id === selectedVaseId) || VASE_OPTIONS[0];

  // Stem calculations
  const totalStemCount = useMemo(() => {
    return Object.values(stems).reduce((acc, count) => acc + count, 0);
  }, [stems]);

  const totalStemPrice = useMemo(() => {
    return FLOWER_STEMS.reduce((acc, stem) => {
      const count = stems[stem.id] || 0;
      return acc + count * stem.pricePerStem;
    }, 0);
  }, [stems]);

  const grandTotal = totalStemPrice + selectedWrap.price + selectedVase.price;

  const handleUpdateStem = (stemId: string, delta: number) => {
    setStems((prev) => {
      const current = prev[stemId] || 0;
      const target = FLOWER_STEMS.find((s) => s.id === stemId);
      const max = target ? target.maxStems : 20;
      const next = Math.max(0, Math.min(max, current + delta));
      return { ...prev, [stemId]: next };
    });
  };

  const handleReset = () => {
    const initial: Record<string, number> = {};
    FLOWER_STEMS.forEach((s) => {
      initial[s.id] = s.defaultStems;
    });
    setStems(initial);
    setSelectedWrapId('wrap-kraft-parisian');
    setSelectedRibbonId('ribbon-sage-silk');
    setSelectedVaseId('vase-none');
  };

  // Bouquet size classification
  const bouquetTier = useMemo(() => {
    if (totalStemCount < 10) return { label: 'Petite Posy', note: 'Recommend 10+ stems for full lushness', color: 'text-[#8C8479]' };
    if (totalStemCount < 16) return { label: 'Classic Paris Bouquet', note: 'Balanced floral table presentation', color: 'text-[#385544]' };
    if (totalStemCount < 24) return { label: 'Signature Grand Atelier', note: 'Abundant multi-dimensional luxury', color: 'text-[#A84D3C]' };
    return { label: 'Opulent Imperial Masterpiece', note: 'Stunning exhibition centerpiece', color: 'text-[#6D2F24]' };
  }, [totalStemCount]);

  // Meaning story
  const compositeMeanings = useMemo(() => {
    const active = FLOWER_STEMS.filter((s) => (stems[s.id] || 0) > 0);
    return active.map((s) => ({
      name: s.name,
      tag: s.symbolismTag,
      count: stems[s.id]
    }));
  }, [stems]);

  const filteredStems = useMemo(() => {
    if (activeCategory === 'all') return FLOWER_STEMS;
    return FLOWER_STEMS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = () => {
    if (totalStemCount === 0) return;
    const config: CustomBouquetConfig = {
      id: `custom-${Date.now()}`,
      name: bouquetTitle || 'Custom Bouquet',
      stems: { ...stems },
      wrappingId: selectedWrap.id,
      ribbonId: selectedRibbon.id,
      vaseId: selectedVase.id !== 'vase-none' ? selectedVase.id : undefined,
      cardTheme: 'Artisanal Deckle-Edge Card',
      giftMessage: giftCardNote,
      totalPrice: grandTotal,
      totalStemCount
    };

    onAddCustomToCart(config, selectedVase.id !== 'vase-none' ? selectedVase : undefined);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section id="atelier" className="max-w-7xl mx-auto px-6 py-16 md:py-20 border-b border-[#E8E3DC]">
      {/* Header */}
      <div className="pb-8 border-b border-[#E8E3DC] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#385544] mb-2">
            The Bespoke Flower Bar
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1C19] tracking-tight">
            Design Your Custom Bouquet
          </h2>
          <p className="text-sm text-[#5F5951] mt-2 max-w-2xl">
            Choose individual stems of heritage roses, ruffled peonies, and botanical foliage. 
            Watch your creation take shape in real time, pair with artisanal wrapping, and convey 
            personal botanical sentiments.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMeanings}
            className="text-xs font-medium text-[#7A7368] hover:text-[#1E1C19] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Info className="w-4 h-4 text-[#A84D3C]" />
            <span>Floriography Guide</span>
          </button>

          <button
            onClick={handleReset}
            className="text-xs font-medium text-[#7A7368] hover:text-[#1E1C19] flex items-center gap-1.5 transition-colors cursor-pointer border border-[#DDD6CC] px-3 py-1.5 bg-[#FAF8F5]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Recipe</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
        {/* Left Column: Stem Palette Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap border-b border-[#E8E3DC] pb-3">
            {[
              { id: 'all', label: 'All Stems' },
              { id: 'focal', label: 'Focal Blooms' },
              { id: 'secondary', label: 'Secondary Blooms' },
              { id: 'accent', label: 'Accents & Spikes' },
              { id: 'foliage', label: 'Greenery & Branches' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#24211D] text-white'
                    : 'bg-[#F2ECE4] text-[#5F5951] hover:bg-[#E8E2D7] hover:text-[#1E1C19]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stem Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[620px] overflow-y-auto pr-1">
            {filteredStems.map((stem) => {
              const count = stems[stem.id] || 0;
              const isMax = count >= stem.maxStems;
              return (
                <div
                  key={stem.id}
                  className={`p-4 border transition-all ${
                    count > 0
                      ? 'border-[#24211D] bg-white shadow-xs'
                      : 'border-[#E8E3DC] bg-[#FAF8F5] opacity-85 hover:opacity-100 hover:border-[#C4BDB2]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0"
                        style={{ backgroundColor: stem.colorHex }}
                        title={stem.name}
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-[#1E1C19] leading-tight">
                          {stem.name}
                        </h4>
                        <span className="text-[11px] text-[#7A7368] italic font-serif">
                          {stem.botanicalName}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-semibold text-[#1E1C19] tabular-nums whitespace-nowrap">
                      ${stem.pricePerStem.toFixed(2)}
                    </span>
                  </div>

                  {/* Meaning & Symbolism */}
                  <div className="mt-2 text-[11px] text-[#5F5951] leading-snug">
                    <span className="text-[#A84D3C] font-medium mr-1">{stem.symbolismTag}:</span>
                    {stem.meaning}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="mt-3.5 pt-2.5 border-t border-[#F2ECE4] flex items-center justify-between">
                    <span className="text-[11px] text-[#8C8479]">
                      {count > 0 ? `${count} selected` : 'None added'}
                    </span>

                    <div className="flex items-center gap-2 border border-[#DDD6CC] bg-[#FAF8F5]">
                      <button
                        onClick={() => handleUpdateStem(stem.id, -1)}
                        disabled={count <= 0}
                        aria-label={`Decrease ${stem.name}`}
                        className="p-1 text-[#5F5951] hover:text-[#1E1C19] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-6 text-center text-xs font-semibold tabular-nums text-[#1E1C19]">
                        {count}
                      </span>

                      <button
                        onClick={() => handleUpdateStem(stem.id, 1)}
                        disabled={isMax}
                        aria-label={`Increase ${stem.name}`}
                        className="p-1 text-[#5F5951] hover:text-[#1E1C19] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wrapping & Ribbon Configurator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E8E3DC]">
            {/* Wrap */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#24211D] block">
                Artisanal Wrapping Paper
              </label>
              <div className="space-y-1.5">
                {WRAPPING_OPTIONS.map((wrap) => (
                  <label
                    key={wrap.id}
                    className={`flex items-center justify-between p-2.5 border text-xs cursor-pointer transition-all ${
                      selectedWrapId === wrap.id
                        ? 'border-[#24211D] bg-white'
                        : 'border-[#E8E3DC] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="custom-wrap"
                        checked={selectedWrapId === wrap.id}
                        onChange={() => setSelectedWrapId(wrap.id)}
                        className="accent-[#24211D]"
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: wrap.colorHex }}
                      />
                      <span className="font-medium text-[#1E1C19]">{wrap.name}</span>
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-[#7A7368]">
                      {wrap.price === 0 ? 'Free' : `+$${wrap.price}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ribbon */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#24211D] block">
                Hand-Tied Ribbon Tie
              </label>
              <div className="space-y-1.5">
                {RIBBON_OPTIONS.map((ribbon) => (
                  <label
                    key={ribbon.id}
                    className={`flex items-center justify-between p-2.5 border text-xs cursor-pointer transition-all ${
                      selectedRibbonId === ribbon.id
                        ? 'border-[#24211D] bg-white'
                        : 'border-[#E8E3DC] bg-[#FAF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="custom-ribbon"
                        checked={selectedRibbonId === ribbon.id}
                        onChange={() => setSelectedRibbonId(ribbon.id)}
                        className="accent-[#24211D]"
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: ribbon.colorHex }}
                      />
                      <span className="font-medium text-[#1E1C19]">
                        {ribbon.name} ({ribbon.material})
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Botanical Visualizer & Tally Module */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live SVG Bouquet Canvas Viewport */}
          <div className="bg-[#F3EFE8] border border-[#E0D9CE] p-6 relative flex flex-col items-center justify-center min-h-[380px] overflow-hidden">
            {/* Ambient Label */}
            <div className="absolute top-3 left-4 text-[11px] font-medium tracking-widest uppercase text-[#7A7368]">
              Live Atelier Preview
            </div>

            <div className="absolute top-3 right-4 text-xs font-semibold tabular-nums text-[#24211D]">
              {totalStemCount} Stems
            </div>

            {/* Dynamic Visual Bouquet SVG */}
            <div className="relative w-64 h-64 flex items-center justify-center mt-2">
              {totalStemCount === 0 ? (
                <div className="text-center p-6 space-y-2">
                  <Sparkles className="w-8 h-8 text-[#A84D3C] mx-auto opacity-40 animate-pulse" />
                  <p className="font-editorial text-lg text-[#5F5951]">The vase stands waiting</p>
                  <p className="text-xs text-[#8C8479]">Select stems from the flower bar to compose your bouquet</p>
                </div>
              ) : (
                <svg viewBox="0 0 240 240" className="w-full h-full drop-shadow-md">
                  {/* Stem bundle base */}
                  <g opacity="0.85">
                    <line x1="120" y1="130" x2="110" y2="215" stroke="#3A4D3B" strokeWidth="4" strokeLinecap="round" />
                    <line x1="120" y1="130" x2="120" y2="220" stroke="#485D49" strokeWidth="4.5" strokeLinecap="round" />
                    <line x1="120" y1="130" x2="130" y2="215" stroke="#3A4D3B" strokeWidth="4" strokeLinecap="round" />
                  </g>

                  {/* Wrapping Paper Cone */}
                  <polygon
                    points="60,110 180,110 135,210 105,210"
                    fill={selectedWrap.colorHex}
                    stroke={selectedWrap.borderHex}
                    strokeWidth="1.5"
                  />
                  {/* Wrap fold line */}
                  <line
                    x1="60"
                    y1="110"
                    x2="135"
                    y2="210"
                    stroke={selectedWrap.borderHex}
                    strokeWidth="1"
                    opacity="0.6"
                  />

                  {/* Ribbon Band & Bow */}
                  <rect
                    x="100"
                    y="170"
                    width="40"
                    height="10"
                    rx="2"
                    fill={selectedRibbon.colorHex}
                    stroke="rgba(0,0,0,0.15)"
                    strokeWidth="0.8"
                  />
                  <ellipse cx="112" cy="175" rx="7" ry="5" fill={selectedRibbon.colorHex} opacity="0.9" />
                  <ellipse cx="128" cy="175" rx="7" ry="5" fill={selectedRibbon.colorHex} opacity="0.9" />

                  {/* Rendered Foliage sprays in background */}
                  {FLOWER_STEMS.filter((s) => s.category === 'foliage' && (stems[s.id] || 0) > 0).map((s, idx) => {
                    const count = stems[s.id] || 0;
                    return Array.from({ length: Math.min(count, 8) }).map((_, fIdx) => {
                      const angle = -50 + (fIdx / 8) * 100;
                      const rad = (angle * Math.PI) / 180;
                      const x = 120 + Math.sin(rad) * 65;
                      const y = 95 - Math.cos(rad) * 45;
                      return (
                        <circle
                          key={`f-${idx}-${fIdx}`}
                          cx={x}
                          cy={y}
                          r={7 + (fIdx % 3)}
                          fill={s.colorHex}
                          opacity="0.85"
                          stroke="rgba(0,0,0,0.1)"
                          strokeWidth="0.5"
                        />
                      );
                    });
                  })}

                  {/* Rendered Blooms (Focal, Secondary, Accent) */}
                  {FLOWER_STEMS.filter((s) => s.category !== 'foliage' && (stems[s.id] || 0) > 0).map((s, sIdx) => {
                    const count = stems[s.id] || 0;
                    return Array.from({ length: Math.min(count, 10) }).map((_, bIdx) => {
                      // Deterministic botanical distribution cluster
                      const seed = sIdx * 5 + bIdx;
                      const spreadRadius = s.category === 'focal' ? 35 : 55;
                      const angle = (seed * 137.5 * Math.PI) / 180; // golden ratio scatter
                      const dist = Math.sqrt(bIdx / 10) * spreadRadius;
                      const cx = 120 + Math.cos(angle) * dist;
                      const cy = 90 + Math.sin(angle) * (dist * 0.75);
                      const radius = s.category === 'focal' ? 14 : s.category === 'secondary' ? 10 : 7;

                      return (
                        <g key={`b-${sIdx}-${bIdx}`} className="transition-all duration-300">
                          {/* Outer petal ring */}
                          <circle
                            cx={cx}
                            cy={cy}
                            r={radius}
                            fill={s.colorHex}
                            stroke="rgba(0,0,0,0.15)"
                            strokeWidth="0.75"
                          />
                          {/* Inner botanical swirl */}
                          <circle
                            cx={cx - 1}
                            cy={cy - 1}
                            r={radius * 0.55}
                            fill="white"
                            opacity="0.35"
                          />
                          <circle
                            cx={cx}
                            cy={cy}
                            r={radius * 0.25}
                            fill={s.category === 'focal' ? '#E8C170' : '#8A5847'}
                            opacity="0.8"
                          />
                        </g>
                      );
                    });
                  })}
                </svg>
              )}
            </div>

            {/* Live Palette Swatches */}
            {totalStemCount > 0 && (
              <div className="mt-4 pt-3 border-t border-[#E0D9CE] w-full flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#7A7368] uppercase tracking-wider">
                  Active Palette:
                </span>
                <div className="flex items-center gap-1.5">
                  {FLOWER_STEMS.filter((s) => (stems[s.id] || 0) > 0).map((s) => (
                    <span
                      key={s.id}
                      className="w-3.5 h-3.5 rounded-full border border-black/15 shadow-2xs"
                      style={{ backgroundColor: s.colorHex }}
                      title={`${s.name} (${stems[s.id]})`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bouquet Summary Box */}
          <div className="bg-white border border-[#E8E3DC] p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <input
                  type="text"
                  value={bouquetTitle}
                  onChange={(e) => setBouquetTitle(e.target.value)}
                  className="font-editorial text-2xl text-[#1E1C19] border-b border-transparent hover:border-[#DDD6CC] focus:border-[#24211D] focus:outline-none w-full bg-transparent"
                  placeholder="Name your bouquet..."
                />
                <div className={`text-xs font-medium mt-1 ${bouquetTier.color}`}>
                  {bouquetTier.label} · {bouquetTier.note}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#8C8479] uppercase tracking-wider block">
                  Total Tally
                </span>
                <span className="font-sans text-2xl font-bold text-[#1E1C19] tabular-nums">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Composite Meaning Synthesis */}
            {compositeMeanings.length > 0 && (
              <div className="p-3 bg-[#FAF8F5] border border-[#F2ECE4] space-y-1.5 text-xs">
                <span className="font-semibold text-[#385544] uppercase tracking-wider text-[10px] block">
                  The Floriography Voice of this Arrangement
                </span>
                <p className="text-[#5F5951] leading-relaxed italic">
                  {compositeMeanings.map((m, i) => (
                    <span key={i}>
                      {m.name} ({m.tag})
                      {i < compositeMeanings.length - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            )}

            {/* Card Note */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#24211D] block">
                Gift Card Message
              </label>
              <textarea
                value={giftCardNote}
                onChange={(e) => setGiftCardNote(e.target.value.slice(0, 180))}
                placeholder="Include a personal note to be calligraphed on our signature deckle-edge card..."
                rows={2}
                className="w-full text-xs p-2.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] placeholder-[#8C8479] rounded-none focus:outline-none focus:border-[#24211D]"
              />
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleAddToCart}
              disabled={totalStemCount === 0 || justAdded}
              className={`w-full py-4 px-6 text-xs font-medium uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                totalStemCount === 0
                  ? 'bg-[#EAE5DE] text-[#A69E92] cursor-not-allowed'
                  : justAdded
                  ? 'bg-[#385544] text-white'
                  : 'bg-[#24211D] text-white hover:bg-[#3E3831]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Shopping Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add Custom Bouquet to Bag · ${grandTotal.toFixed(2)}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
