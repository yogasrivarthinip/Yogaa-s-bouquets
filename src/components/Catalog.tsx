import React, { useState, useMemo } from 'react';
import { Search, Eye, Plus, Check } from 'lucide-react';
import { BouquetProduct } from '../types/bouquet';

interface CatalogProps {
  products: BouquetProduct[];
  onSelectProduct: (product: BouquetProduct) => void;
  onAddToCart: (product: BouquetProduct) => void;
  onOpenAtelier: () => void;
}

export const Catalog: React.FC<CatalogProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  onOpenAtelier
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('All');
  const [selectedPalette, setSelectedPalette] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  const occasions = ['All', 'Romance', 'Birthday', 'Sympathy', 'Everyday', 'Celebration'];
  const palettes = ['All', 'Blush & Nude', 'Rich Crimson', 'Blanc & Green', 'Golden Sunset'];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchOccasion = selectedOccasion === 'All' || item.occasion === selectedOccasion;
      const matchPalette = selectedPalette === 'All' || item.palette === selectedPalette;
      const matchQuery =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.stemBreakdown.some((s) => s.stemName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchOccasion && matchPalette && matchQuery;
    });
  }, [products, selectedOccasion, selectedPalette, searchQuery]);

  const handleQuickAdd = (e: React.MouseEvent, product: BouquetProduct) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => {
      setAddedId((curr) => (curr === product.id ? null : curr));
    }, 1500);
  };

  return (
    <section id="collection" className="max-w-7xl mx-auto px-6 py-16 md:py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8E3DC]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-[#A84D3C] mb-2">
            The Atelier Collection
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1C19] tracking-tight">
            Curated Seasonal Bouquets
          </h2>
          <p className="text-sm text-[#5F5951] mt-2 max-w-xl">
            Each composition is individually arranged by our master florists with fresh
            botanical conditioning, wrapped in organic unbleached linen paper.
          </p>
        </div>

        {/* Search input with clean styling */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stems, tones, occasions..."
            className="w-full bg-[#FAF8F5] border border-[#DDD6CC] text-sm text-[#1E1C19] placeholder-[#8C8479] pl-9 pr-4 py-2.5 rounded-none focus:outline-none focus:border-[#24211D] transition-colors"
          />
          <Search className="w-4 h-4 text-[#8C8479] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8479] hover:text-[#24211D]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Interactive Filter Bars (Segmented controls) */}
      <div className="py-6 space-y-4">
        {/* Occasion filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-[#7A7368] uppercase tracking-wider mr-2">
            Occasion:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {occasions.map((occ) => (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedOccasion === occ
                    ? 'bg-[#24211D] text-[#FAF8F5]'
                    : 'bg-[#F2ECE4] text-[#5F5951] hover:bg-[#EAE2D8] hover:text-[#1E1C19]'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Palette filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-[#7A7368] uppercase tracking-wider mr-2">
            Palette:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {palettes.map((pal) => (
              <button
                key={pal}
                onClick={() => setSelectedPalette(pal)}
                className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedPalette === pal
                    ? 'bg-[#A84D3C] text-[#FAF8F5]'
                    : 'bg-[#F2ECE4] text-[#5F5951] hover:bg-[#EAE2D8] hover:text-[#1E1C19]'
                }`}
              >
                {pal}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid: 3-column desktop layout with generous whitespace */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-[#DDD6CC] bg-[#FAF8F5] my-6">
          <p className="font-editorial text-2xl text-[#1E1C19]">No botanical arrangements found</p>
          <p className="text-sm text-[#7A7368] mt-2">
            Try adjusting your search keywords or resetting your filters.
          </p>
          <button
            onClick={() => {
              setSelectedOccasion('All');
              setSelectedPalette('All');
              setSearchQuery('');
            }}
            className="mt-5 px-5 py-2 text-xs font-medium uppercase tracking-wider bg-[#24211D] text-white hover:bg-[#3E3831]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
          {filteredProducts.map((product) => {
            const isAdded = addedId === product.id;
            return (
              <article
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group flex flex-col bg-white border border-[#E8E3DC] hover:border-[#C4BDB2] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Visual Area (4:3 aspect ratio, leads card) */}
                <div className="relative aspect-[4/3] w-full bg-[#F5F2EB] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Clean Fallback Background */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 bg-gradient-to-br ${product.fallbackGradient} flex items-center justify-center p-6 text-center`}
                  >
                    <span className="font-editorial text-xl italic text-[#5F5951]">
                      {product.title}
                    </span>
                  </div>

                  {/* Editorial Kicker as quiet unboxed text */}
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-medium tracking-wider text-[#24211D]">
                    {product.editorialKicker}
                  </div>

                  {/* Hover Quick Action Buttons */}
                  <div className="absolute inset-x-3 bottom-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="px-3 py-1.5 text-xs font-medium bg-white/95 text-[#24211D] hover:bg-white shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`px-3 py-1.5 text-xs font-medium shadow-sm flex items-center gap-1.5 transition-all ${
                        isAdded
                          ? 'bg-[#385544] text-white'
                          : 'bg-[#24211D] text-white hover:bg-[#3E3831]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Quick Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-[#7A7368] mb-1.5">
                      <span>{product.occasion}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.palette}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.fragranceLevel}</span>
                    </div>

                    <h3 className="font-editorial text-2xl text-[#1E1C19] group-hover:text-[#A84D3C] transition-colors leading-tight">
                      {product.title}
                    </h3>

                    <p className="text-xs text-[#7A7368] line-clamp-1 mt-1 font-normal">
                      {product.subtitle}
                    </p>

                    {/* Stems snippet */}
                    <p className="text-xs text-[#5F5951] mt-2.5 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price Baseline & Primary Action */}
                  <div className="pt-3 border-t border-[#F2ECE4] flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#8C8479] uppercase tracking-wider block">
                        Bouquet Total
                      </span>
                      <span className="font-sans font-semibold text-lg text-[#1E1C19] tabular-nums">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`text-xs font-medium uppercase tracking-wider transition-colors px-3 py-1.5 cursor-pointer ${
                        isAdded
                          ? 'text-[#385544] font-semibold'
                          : 'text-[#24211D] hover:text-[#A84D3C]'
                      }`}
                    >
                      {isAdded ? 'Added to Bag ✓' : 'Add to Bag +'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Atelier Banner callout */}
      <div className="mt-16 p-8 md:p-10 border border-[#E8E3DC] bg-[#FAF8F5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#385544]">
            Bespoke Floristry Atelier
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl text-[#1E1C19]">
            Looking for something uniquely personal?
          </h3>
          <p className="text-sm text-[#5F5951]">
            Step into our virtual flower bar. Hand-select individual stems of peonies, garden roses, 
            eucalyptus, and ranunculus, preview live layered arrangements, and pick your wrapping papers.
          </p>
        </div>

        <button
          onClick={onOpenAtelier}
          className="whitespace-nowrap px-6 py-3 text-xs font-medium tracking-widest uppercase text-white bg-[#24211D] hover:bg-[#3E3831] transition-colors cursor-pointer"
        >
          Open Custom Atelier →
        </button>
      </div>
    </section>
  );
};
