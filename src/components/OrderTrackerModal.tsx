import React, { useState } from 'react';
import { X, Search, CheckCircle2, Clock, PackageCheck, Truck, Droplets } from 'lucide-react';
import { OrderRecord } from '../types/bouquet';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrder: OrderRecord | null;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  activeOrder
}) => {
  const [searchQuery, setSearchQuery] = useState(activeOrder ? activeOrder.orderNumber : 'MP-84920');

  if (!isOpen) return null;

  // Mock demo order if none active
  const order: OrderRecord = activeOrder || {
    orderNumber: 'MP-84920',
    date: 'Oct 4, 2026',
    items: [],
    subtotal: 135.0,
    deliveryFee: 0,
    total: 135.0,
    recipientName: 'Geneviève Dubois',
    senderName: 'Alexandre Roche',
    deliveryAddress: '14 Boulevard Saint-Germain, 75005 Paris',
    deliveryDate: 'Today',
    deliverySlot: 'Afternoon (14h - 18h)',
    status: 'Hydration Wrapping',
    estimatedArrival: 'Today between 15:30 and 16:30'
  };

  const steps = [
    {
      title: 'Stem Selection & Botanical Conditioning',
      desc: 'Dawn-harvested stems trimmed at 45° and hydrated in cold nutrient spring bath.',
      time: '08:15',
      completed: true,
      icon: Droplets
    },
    {
      title: 'Master Florist Spiral Arrangement',
      desc: 'Hand-tied with organic raffia, balance inspection, and washed silk ribboning.',
      time: '10:45',
      completed: true,
      icon: PackageCheck
    },
    {
      title: 'Hydration Pouch & Insulated Encasement',
      desc: 'Stems sealed in cold-gel hydration wrap and boxed in breathable linen-lined carton.',
      time: '12:20',
      completed: order.status === 'Hydration Wrapping' || order.status === 'With Courier' || order.status === 'Delivered',
      current: order.status === 'Hydration Wrapping',
      icon: Clock
    },
    {
      title: 'Dedicated Floral Courier Dispatched',
      desc: 'Temperature-managed transit directly to recipient doorstep.',
      time: 'Pending',
      completed: order.status === 'With Courier' || order.status === 'Delivered',
      current: order.status === 'With Courier',
      icon: Truck
    }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white border border-[#E8E3DC] shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6"
      >
        <button
          onClick={onClose}
          aria-label="Close tracker"
          className="absolute top-5 right-5 text-[#7A7368] hover:text-[#24211D] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-[#E8E3DC] pb-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-[#385544]">
            Live Atelier Status
          </div>
          <h2 className="font-editorial text-3xl text-[#1E1C19]">
            Order #{order.orderNumber}
          </h2>
          <p className="text-xs text-[#7A7368] mt-1">
            Real-time preparation timeline from our Paris workshop.
          </p>
        </div>

        {/* Search / Lookup input */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Order # (e.g. MP-84920)"
              className="w-full text-xs p-2.5 pl-8 border border-[#DDD6CC] bg-[#FAF8F5] text-[#1E1C19] focus:outline-none focus:border-[#24211D]"
            />
            <Search className="w-3.5 h-3.5 text-[#8C8479] absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
          <button
            onClick={() => {}}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider bg-[#24211D] text-white hover:bg-[#3E3831] cursor-pointer"
          >
            Track
          </button>
        </div>

        {/* Delivery Destination card */}
        <div className="p-4 bg-[#FAF8F5] border border-[#E8E3DC] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[11px] text-[#8C8479] uppercase tracking-wider block">Recipient</span>
            <span className="font-medium text-[#1E1C19]">{order.recipientName}</span>
            <p className="text-[#5F5951] mt-0.5">{order.deliveryAddress}</p>
          </div>
          <div>
            <span className="text-[11px] text-[#8C8479] uppercase tracking-wider block">Estimated Window</span>
            <span className="font-medium text-[#385544]">{order.estimatedArrival}</span>
            <p className="text-[#5F5951] mt-0.5">Dispatched from 14 Rue de Fleurus Atelier</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-6 pt-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#24211D]">
            Atelier Preparation Stages
          </h4>

          <div className="relative pl-6 space-y-6 border-l-2 border-[#E8E3DC]">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div key={idx} className="relative">
                  {/* Dot */}
                  <div
                    className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                      step.completed
                        ? 'bg-[#385544] border-white text-white'
                        : step.current
                        ? 'bg-[#FAF8F5] border-[#A84D3C] text-[#A84D3C]'
                        : 'bg-white border-[#DDD6CC] text-[#A69E92]'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <StepIcon className="w-3 h-3" />
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-semibold text-[#1E1C19]">{step.title}</h5>
                      <span className="text-[11px] text-[#8C8479] tabular-nums">{step.time}</span>
                    </div>
                    <p className="text-xs text-[#5F5951] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Receipt Summary */}
        <div className="pt-4 border-t border-[#E8E3DC] flex items-center justify-between">
          <div className="text-xs text-[#7A7368]">
            Total Invoiced: <strong className="text-[#1E1C19] tabular-nums">${order.total.toFixed(2)}</strong>
          </div>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider border border-[#24211D] text-[#24211D] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
