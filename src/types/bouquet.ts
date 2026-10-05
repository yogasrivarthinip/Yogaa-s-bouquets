export interface BouquetProduct {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  description: string;
  story: string;
  occasion: 'Romance' | 'Birthday' | 'Sympathy' | 'Everyday' | 'Celebration';
  palette: 'Blush & Nude' | 'Rich Crimson' | 'Blanc & Green' | 'Golden Sunset';
  image: string;
  fallbackGradient: string;
  stemBreakdown: { stemName: string; count: number }[];
  dimensions: string;
  careTips: string[];
  fragranceLevel: 'Delicate' | 'Rich & Heady' | 'Aromatic & Herbal';
  inStock: boolean;
  featured?: boolean;
  editorialKicker: string;
}

export interface FlowerStem {
  id: string;
  name: string;
  botanicalName: string;
  category: 'focal' | 'secondary' | 'accent' | 'foliage';
  colorHex: string;
  pricePerStem: number;
  meaning: string;
  maxStems: number;
  defaultStems: number;
  description: string;
  symbolismTag: string;
}

export interface WrappingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  colorHex: string;
  borderHex: string;
}

export interface RibbonOption {
  id: string;
  name: string;
  colorHex: string;
  material: 'French Silk' | 'Crushed Velvet' | 'Organic Cotton';
}

export interface VaseOption {
  id: string;
  name: string;
  price: number;
  material: string;
  description: string;
  imageFallback: string;
}

export interface CustomBouquetConfig {
  id: string;
  name: string;
  stems: Record<string, number>;
  wrappingId: string;
  ribbonId: string;
  vaseId?: string;
  cardTheme: string;
  giftMessage: string;
  totalPrice: number;
  totalStemCount: number;
}

export interface CartItem {
  id: string;
  type: 'catalog' | 'custom';
  product?: BouquetProduct;
  customConfig?: CustomBouquetConfig;
  quantity: number;
  selectedVase?: VaseOption;
  giftRecipient?: {
    recipientName: string;
    senderName: string;
    message: string;
    deliveryDate: string;
    deliverySlot: string;
  };
}

export interface OrderRecord {
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  recipientName: string;
  senderName: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliverySlot: string;
  giftMessage?: string;
  status: 'Arranging' | 'Hydration Wrapping' | 'With Courier' | 'Delivered';
  estimatedArrival: string;
}
