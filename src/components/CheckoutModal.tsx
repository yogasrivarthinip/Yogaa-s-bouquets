import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, User, Mail, Phone, Truck } from 'lucide-react';
import { CartItem, OrderRecord } from '../types/bouquet';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryDate: string;
  deliverySlot: string;
  onOrderPlaced: (order: OrderRecord) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryDate,
  deliverySlot,
  onOrderPlaced
}) => {
  const [recipientName, setRecipientName] = useState('Camille Laurent');
  const [recipientPhone, setRecipientPhone] = useState('+33 6 42 19 88 04');
  const [deliveryAddress, setDeliveryAddress] = useState('28 Rue Madame, 75006 Paris');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Code door: 48B9, 3rd floor left door.');
  
  const [senderName, setSenderName] = useState('Julien Moreau');
  const [senderEmail, setSenderEmail] = useState('julien.moreau@atelier.fr');
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

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

  const deliveryFee = subtotal >= 120 ? 0 : 15;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const order: OrderRecord = {
        orderNumber: `MP-${randomOrderNum}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...items],
        subtotal,
        deliveryFee,
        total,
        recipientName,
        senderName,
        deliveryAddress,
        deliveryDate,
        deliverySlot,
        giftMessage: items[0]?.customConfig?.giftMessage,
        status: 'Arranging',
        estimatedArrival: `${deliveryDate} · ${deliverySlot}`
      };

      setIsProcessing(false);
      onOrderPlaced(order);
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-[#E8E3DC] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          aria-label="Close checkout"
          className="absolute top-5 right-5 text-[#7A7368] hover:text-[#24211D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[#E8E3DC] pb-4 mb-6">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#385544]">
            Secure Boutique Checkout
          </div>
          <h2 className="font-editorial text-3xl text-[#1E1C19]">
            Finalize Your Floral Gift
          </h2>
          <p className="text-xs text-[#7A7368] mt-1">
            Hand-conditioned stems delivered with refrigerated hydration packs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Recipient Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24211D] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#A84D3C]" />
              <span>1. Recipient Information</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#7A7368] block mb-1">Recipient Name</label>
                <input
                  required
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#7A7368] block mb-1">Courier Phone Notice</label>
                <input
                  required
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-[#7A7368] block mb-1">Delivery Address & City</label>
              <input
                required
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
              />
            </div>

            <div>
              <label className="text-[11px] text-[#7A7368] block mb-1">Gate / Entry Code & Delivery Instructions</label>
              <input
                type="text"
                value={deliveryInstructions}
                onChange={(e) => setDeliveryInstructions(e.target.value)}
                className="w-full text-xs p-2.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
              />
            </div>
          </div>

          {/* Delivery Slot Confirmed */}
          <div className="p-3 bg-[#FAF8F5] border border-[#E8E3DC] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-[#24211D]">
              <Truck className="w-4 h-4 text-[#385544]" />
              <span>Scheduled Courier Slot:</span>
              <strong className="font-semibold">{deliveryDate}</strong> ({deliverySlot})
            </div>
          </div>

          {/* Sender Details */}
          <div className="space-y-3 pt-2 border-t border-[#E8E3DC]">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24211D] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#385544]" />
              <span>2. Sender & Receipt Email</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-[#7A7368] block mb-1">Your Full Name</label>
                <input
                  required
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
                />
              </div>
              <div>
                <label className="text-[11px] text-[#7A7368] block mb-1">Email for Courier Tracking</label>
                <input
                  required
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="w-full text-xs p-2.5 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
                />
              </div>
            </div>
          </div>

          {/* Order Summary & Payment Button */}
          <div className="pt-4 border-t border-[#E8E3DC] space-y-3">
            <div className="flex justify-between text-xs text-[#5F5951]">
              <span>Items ({items.length})</span>
              <span className="tabular-nums font-semibold text-[#1E1C19]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#5F5951]">
              <span>Florist Courier Delivery</span>
              <span className="tabular-nums font-semibold text-[#1E1C19]">
                {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-semibold text-[#1E1C19] pt-2 border-t border-[#F2ECE4]">
              <span>Total Payment</span>
              <span className="text-lg tabular-nums font-bold">${total.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 text-xs font-medium tracking-widest uppercase bg-[#24211D] text-white hover:bg-[#3E3831] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              {isProcessing ? (
                <span>Confirming Botanical Order...</span>
              ) : (
                <span>Complete Order & Authorize · ${total.toFixed(2)}</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#7A7368] pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#385544]" />
              <span>Complimentary handwritten calligraphed card & hydration guarantee included.</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
