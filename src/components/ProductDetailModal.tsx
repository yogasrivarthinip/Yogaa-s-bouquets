import React, { useState } from 'react';
import { X, Check, Droplets, HeartHandshake, Sparkles } from 'lucide-react';
import { BouquetProduct, VaseOption } from '../types/bouquet';
import { VASE_OPTIONS } from '../data/bouquets';

interface ProductDetailModalProps {
  product: BouquetProduct | null;
  onClose: () => void;
  onAddToCart: (product: BouquetProduct, quantity: number, vase?: VaseOption, giftMessage?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVaseId, setSelectedVaseId] = useState<string>('vase-none');
  const [giftNote, setGiftNote] = useState<string>('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!product) return null;

  const selectedVase = VASE_OPTIONS.find((v) => v.id === selectedVaseId) || VASE_OPTIONS[0];
  const unitPrice = product.price + selectedVase.price;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedVase.id !== 'vase-none' ? selectedVase : undefined, giftNote);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-white border border-[#E8E3DC] shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 p-2 text-[#7A7368] hover:text-[#24211D] bg-white/80 backdrop-blur-xs transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Image & Botanical Specs */}
          <div className="md:col-span-6 bg-[#F5F2EB] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E3DC]">
            <div className="space-y-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white shadow-sm border border-[#E8E3DC]">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Exact Stem Breakdown */}
              <div className="bg-white p-5 border border-[#E8E3DC] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#385544]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exact Stem Composition</span>
                </div>
                <ul className="space-y-2 text-xs text-[#5F5951]">
                  {product.stemBreakdown.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between border-b border-[#F2ECE4] pb-1.5 last:border-0 last:pb-0">
                      <span>{item.stemName}</span>
                      <span className="font-semibold text-[#1E1C19] tabular-nums">
                        {item.count} stems
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Atelier Conditioning Notes */}
              <div className="space-y-2 text-xs text-[#7A7368]">
                <div className="flex items-center gap-1.5 font-medium text-[#24211D]">
                  <Droplets className="w-3.5 h-3.5 text-[#385544]" />
                  <span>Florist Care & Longevity</span>
                </div>
                <p className="leading-relaxed">
                  Arrives in signature hydration pouch. Trim stems diagonally 2cm and place in
                  cool spring water with flower food. Expected vase life: 7–10 days.
                </p>
                <p className="text-[11px] text-[#8C8479]">Dimensions: {product.dimensions}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 text-xs text-[#7A7368] mb-1">
                  <span>{product.occasion}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.palette}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.fragranceLevel}</span>
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#1E1C19] leading-tight">
                  {product.title}
                </h2>
                <p className="text-sm text-[#7A7368] mt-1">{product.subtitle}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-4 border-b border-[#E8E3DC]">
                <span className="font-sans text-2xl font-bold text-[#1E1C19] tabular-nums">
                  ${totalPrice.toFixed(2)}
                </span>
                {selectedVase.price > 0 && (
                  <span className="text-xs text-[#7A7368]">
                    (Includes ${selectedVase.price.toFixed(2)} {selectedVase.name})
                  </span>
                )}
              </div>

              {/* Story */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24211D]">
                  Florist's Inspiration
                </h4>
                <p className="text-xs text-[#5F5951] leading-relaxed italic font-serif text-[15px]">
                  "{product.story}"
                </p>
              </div>

              {/* Vase Pairing Selection */}
              <div className="space-y-3 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#24211D] block">
                  Select Vase Pairing
                </label>
                <div className="space-y-2">
                  {VASE_OPTIONS.map((vase) => (
                    <label
                      key={vase.id}
                      className={`flex items-start justify-between p-3 border cursor-pointer transition-all ${
                        selectedVaseId === vase.id
                          ? 'border-[#24211D] bg-[#FAF8F5]'
                          : 'border-[#E8E3DC] hover:border-[#C4BDB2]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <input
                          type="radio"
                          name="vase-option"
                          checked={selectedVaseId === vase.id}
                          onChange={() => setSelectedVaseId(vase.id)}
                          className="mt-0.5 accent-[#24211D]"
                        />
                        <div>
                          <div className="text-xs font-medium text-[#1E1C19]">{vase.name}</div>
                          <div className="text-[11px] text-[#7A7368]">{vase.description}</div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#1E1C19] tabular-nums whitespace-nowrap pl-2">
                        {vase.price === 0 ? 'Included' : `+$${vase.price}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Gift Card Message */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#24211D] flex items-center gap-1.5">
                    <HeartHandshake className="w-3.5 h-3.5 text-[#A84D3C]" />
                    <span>Complimentary Deckle-Edge Card Message</span>
                  </label>
                  <span className="text-[11px] text-[#8C8479] tabular-nums">
                    {giftNote.length}/200
                  </span>
                </div>
                <textarea
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value.slice(0, 200))}
                  placeholder="Enter handwritten recipient sentiment (e.g. 'Dearest Camille, happy anniversary...')"
                  rows={2}
                  className="w-full text-xs p-3 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] placeholder-[#8C8479] rounded-none focus:outline-none focus:border-[#24211D]"
                />
              </div>

              {/* Quantity Selector & Primary CTA */}
              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[#DDD6CC] bg-[#FAF8F5]">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-sm text-[#5F5951] hover:text-[#1E1C19] cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-2 text-xs font-semibold tabular-nums text-[#1E1C19]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="px-3 py-2 text-sm text-[#5F5951] hover:text-[#1E1C19] cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={addedSuccess}
                    className={`flex-1 py-3.5 px-6 text-xs font-medium uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      addedSuccess
                        ? 'bg-[#385544] text-white'
                        : 'bg-[#24211D] text-white hover:bg-[#3E3831]'
                    }`}
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Shopping Bag</span>
                      </>
                    ) : (
                      <span>Add to Bag · ${totalPrice.toFixed(2)}</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
