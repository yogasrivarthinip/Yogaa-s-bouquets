import React, { useState } from 'react';
import { X, Trash2, Calendar, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/bouquet';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: (deliveryDate: string, deliverySlot: string) => void;
  onStartBrowsing: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onStartBrowsing
}) => {
  // Tomorrow's date default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [deliveryDate, setDeliveryDate] = useState<string>(defaultDateStr);
  const [deliverySlot, setDeliverySlot] = useState<string>('Afternoon (14h - 18h)');

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    let price = 0;
    if (item.type === 'catalog' && item.product) {
      price = item.product.price + (item.selectedVase?.price || 0);
    } else if (item.type === 'custom' && item.customConfig) {
      price = item.customConfig.totalPrice;
    }
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 120 || items.length === 0 ? 0 : 15;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 border-l border-[#E8E3DC]"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E8E3DC] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#24211D]" />
            <h3 className="font-editorial text-2xl text-[#1E1C19]">Your Shopping Bag</h3>
            <span className="text-xs text-[#7A7368] tabular-nums">
              ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-1.5 text-[#7A7368] hover:text-[#24211D] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-24 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-[#C4BDB2] mx-auto" />
              <p className="font-editorial text-2xl text-[#1E1C19]">Your bag is currently empty</p>
              <p className="text-xs text-[#7A7368] max-w-xs mx-auto">
                Explore our seasonal collections or compose your own bespoke floral creation in the atelier.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onStartBrowsing();
                }}
                className="mt-4 px-6 py-2.5 text-xs font-medium tracking-widest uppercase bg-[#24211D] text-white hover:bg-[#3E3831] transition-colors cursor-pointer"
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const title = item.type === 'catalog' ? item.product?.title : item.customConfig?.name;
                const subtitle =
                  item.type === 'catalog'
                    ? item.product?.subtitle
                    : `${item.customConfig?.totalStemCount} Stems Atelier Arrangement`;
                const price =
                  item.type === 'catalog'
                    ? (item.product?.price || 0) + (item.selectedVase?.price || 0)
                    : item.customConfig?.totalPrice || 0;

                return (
                  <div
                    key={item.id}
                    className="p-4 border border-[#E8E3DC] bg-[#FAF8F5] flex gap-3.5 items-start justify-between"
                  >
                    {/* Thumbnail if catalog */}
                    {item.product?.image && (
                      <div className="w-16 h-16 bg-white border border-[#E8E3DC] overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={title || ''}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#1E1C19] truncate">{title}</h4>
                      <p className="text-[11px] text-[#7A7368] truncate">{subtitle}</p>

                      {item.selectedVase && item.selectedVase.id !== 'vase-none' && (
                        <div className="text-[11px] text-[#385544] mt-0.5">
                          + {item.selectedVase.name} (${item.selectedVase.price})
                        </div>
                      )}

                      {item.customConfig?.giftMessage && (
                        <div className="text-[10px] text-[#7A7368] italic line-clamp-1 mt-1 bg-white p-1 border border-[#E8E3DC]">
                          Card: "{item.customConfig.giftMessage}"
                        </div>
                      )}

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EAE4DC]">
                        <div className="flex items-center border border-[#DDD6CC] bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="px-2 py-0.5 text-xs text-[#5F5951] hover:text-[#1E1C19] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-semibold tabular-nums text-[#1E1C19]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="px-2 py-0.5 text-xs text-[#5F5951] hover:text-[#1E1C19] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-semibold text-[#1E1C19] tabular-nums">
                          ${(price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Remove item"
                      className="text-[#A69E92] hover:text-[#A84D3C] p-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Delivery Scheduling & Checkout Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E8E3DC] bg-[#FAF8F5] space-y-4">
            {/* Delivery Date & Slot */}
            <div className="space-y-2.5 pb-2 border-b border-[#E8E3DC]">
              <div className="flex items-center justify-between text-xs font-medium text-[#24211D]">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#385544]" />
                  <span>Courier Delivery Date</span>
                </span>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="bg-white border border-[#DDD6CC] text-xs px-2 py-1 text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-[#24211D]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#385544]" />
                  <span>Time Window</span>
                </span>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="bg-white border border-[#DDD6CC] text-xs px-2 py-1 text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
                >
                  <option value="Morning (09h - 13h)">Morning (09h - 13h)</option>
                  <option value="Afternoon (14h - 18h)">Afternoon (14h - 18h)</option>
                  <option value="Evening (18h - 21h)">Evening (18h - 21h)</option>
                </select>
              </div>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#5F5951]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-semibold text-[#1E1C19]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>White-Glove Floral Courier</span>
                <span className="tabular-nums font-semibold text-[#1E1C19]">
                  {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              {subtotal < 120 && (
                <div className="text-[11px] text-[#A84D3C] italic">
                  Add ${(120 - subtotal).toFixed(2)} more for complimentary white-glove delivery
                </div>
              )}
              <div className="pt-2 border-t border-[#E8E3DC] flex justify-between text-sm font-semibold text-[#1E1C19]">
                <span>Total Due</span>
                <span className="text-base tabular-nums font-bold">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => onProceedToCheckout(deliveryDate, deliverySlot)}
              className="w-full py-4 text-xs font-medium tracking-widest uppercase bg-[#24211D] text-white hover:bg-[#3E3831] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
