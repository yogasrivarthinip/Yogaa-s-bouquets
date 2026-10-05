import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Catalog } from './components/Catalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomBouquetBuilder } from './components/CustomBouquetBuilder';
import { FlowerMeanings } from './components/FlowerMeanings';
import { CareGuide } from './components/CareGuide';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { Footer } from './components/Footer';

import { BOUQUET_PRODUCTS } from './data/bouquets';
import { BouquetProduct, CartItem, CustomBouquetConfig, OrderRecord, VaseOption } from './types/bouquet';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('collection');
  const [selectedProduct, setSelectedProduct] = useState<BouquetProduct | null>(null);

  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_petale_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    // Default initial item for instant delight
    return [
      {
        id: 'initial-item-1',
        type: 'catalog',
        product: BOUQUET_PRODUCTS[0],
        quantity: 1
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);

  // Checkout delivery metadata
  const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<string>('');
  const [selectedDeliverySlot, setSelectedDeliverySlot] = useState<string>('');

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('maison_petale_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (
    product: BouquetProduct,
    quantity: number = 1,
    vase?: VaseOption,
    giftMessage?: string
  ) => {
    const newItem: CartItem = {
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      type: 'catalog',
      product,
      quantity,
      selectedVase: vase,
      giftRecipient: giftMessage ? { recipientName: '', senderName: '', message: giftMessage, deliveryDate: '', deliverySlot: '' } : undefined
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added "${product.title}" to bag`);
  };

  const handleAddCustomToCart = (config: CustomBouquetConfig, vase?: VaseOption) => {
    const newItem: CartItem = {
      id: `custom-item-${Date.now()}`,
      type: 'custom',
      customConfig: config,
      quantity: 1,
      selectedVase: vase
    };

    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added custom bouquet "${config.name}" to bag`);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = (date: string, slot: string) => {
    setSelectedDeliveryDate(date);
    setSelectedDeliverySlot(slot);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderPlaced = (order: OrderRecord) => {
    setActiveOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    setIsTrackerOpen(true);
    showToast(`Order #${order.orderNumber} confirmed! Stems are being conditioned.`);
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#24211D]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#24211D] text-white px-5 py-3 text-xs font-medium tracking-wide shadow-xl border border-white/10 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#385544]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartTotalCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Main Content Area based on Tab */}
      <main className="flex-1">
        {activeTab === 'collection' && (
          <>
            <Hero
              onExploreCollection={() => {
                const el = document.getElementById('collection');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenAtelier={() => {
                setActiveTab('atelier');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <Catalog
              products={BOUQUET_PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onOpenAtelier={() => {
                setActiveTab('atelier');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <CareGuide onExploreCollection={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
          </>
        )}

        {activeTab === 'atelier' && (
          <CustomBouquetBuilder
            onAddCustomToCart={handleAddCustomToCart}
            onOpenMeanings={() => {
              setActiveTab('meanings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'meanings' && (
          <FlowerMeanings
            onExploreCollection={() => {
              setActiveTab('collection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onApplyCardMessage={(msg) => {
              showToast('Sentiment copied to card studio');
              setActiveTab('atelier');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'care' && (
          <CareGuide
            onExploreCollection={() => {
              setActiveTab('collection');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty, vase, note) => {
          handleAddToCart(p, qty, vase, note);
        }}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        onStartBrowsing={() => {
          setActiveTab('collection');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        deliveryDate={selectedDeliveryDate}
        deliverySlot={selectedDeliverySlot}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        activeOrder={activeOrder}
      />

      {/* Footer */}
      <Footer
        onNavClick={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />
    </div>
  );
}
