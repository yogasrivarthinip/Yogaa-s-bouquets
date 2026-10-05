import { BouquetProduct, VaseOption } from '../types/bouquet';

export const HERO_IMAGE = '/src/assets/images/hero_floral_atelier_1791180824003.jpg';

export const BOUQUET_PRODUCTS: BouquetProduct[] = [
  {
    id: 'le-rose-pivoine',
    title: 'Le Rose Pivoine',
    subtitle: 'Blush Sarah Bernhardt Peonies & Heritage Garden Roses',
    price: 135,
    description: 'An ethereal gathering of ruffled pink peonies, creamy English garden roses, and silver dollar eucalyptus, hand-tied in raw deckle-edge paper with washed silk ribbon.',
    story: 'Inspired by the quiet morning air of the Tuileries gardens in early June. Each peony is hand-selected in semi-bud stage to unfurl over seven days in your home.',
    occasion: 'Romance',
    palette: 'Blush & Nude',
    image: '/src/assets/images/bouquet_blush_peony_1791180836846.jpg',
    fallbackGradient: 'from-[#F7ECE9] to-[#EBD9D4]',
    stemBreakdown: [
      { stemName: "Sarah Bernhardt Peonies", count: 5 },
      { stemName: "Cream O'Hara Garden Roses", count: 7 },
      { stemName: "White Ranunculus", count: 4 },
      { stemName: "Silver Dollar Eucalyptus", count: 6 },
      { stemName: "Sweet Peas & Waxflower", count: 4 }
    ],
    dimensions: 'Height 48cm · Spread 38cm',
    careTips: [
      'Trim stems 2cm at a 45-degree angle under cold running water.',
      'Place in clean, chilled spring water with the enclosed botanical nutrient packet.',
      'Keep away from direct radiator heat and direct noon sunlight to preserve petal velvetiness.'
    ],
    fragranceLevel: 'Rich & Heady',
    inStock: true,
    featured: true,
    editorialKicker: 'Signature Atelier Harvest'
  },
  {
    id: 'velours-nocturne',
    title: 'Velours Nocturne',
    subtitle: 'Deep Crimson Garden Roses & Midnight Ranunculus',
    price: 155,
    description: 'A dramatic, moody arrangement of dark velvety Black Baccara roses, crimson ranunculus, plum astilbe, and dark Italian ruscus foliage.',
    story: 'Designed for passionate evenings, grand milestone celebrations, and declarations of love that demand unforgettable intensity and gravitas.',
    occasion: 'Romance',
    palette: 'Rich Crimson',
    image: '/src/assets/images/bouquet_crimson_romance_1791180847899.jpg',
    fallbackGradient: 'from-[#2B1B1C] to-[#4A2024]',
    stemBreakdown: [
      { stemName: "Velvet Crimson Garden Roses", count: 8 },
      { stemName: "Burgundy French Ranunculus", count: 6 },
      { stemName: "Plum Astilbe Sprigs", count: 5 },
      { stemName: "Black Calla Accents", count: 3 },
      { stemName: "Italian Ruscus & Smoke Bush", count: 6 }
    ],
    dimensions: 'Height 52cm · Spread 42cm',
    careTips: [
      'Refresh water every 48 hours for maximum stem longevity.',
      'Mist foliage lightly every evening.',
      'Strip leaves below the waterline to keep water crystal clear.'
    ],
    fragranceLevel: 'Rich & Heady',
    inStock: true,
    featured: true,
    editorialKicker: 'Evening Haute Floristry'
  },
  {
    id: 'jardin-blanc',
    title: 'Jardin Blanc',
    subtitle: 'Alabaster Hydrangeas, White Lisianthus & Crisp Freesia',
    price: 120,
    description: 'An architectural composition of cloud-like white hydrangeas, porcelain lisianthus, fragrant sweet peas, and fresh silver leaf foliage.',
    story: 'Conceived as a tribute to classical French greenhouse architecture—pure, serene, and harmonizing with any interior palette from raw concrete to warm timber.',
    occasion: 'Sympathy',
    palette: 'Blanc & Green',
    image: '/src/assets/images/bouquet_white_botanical_1791180860513.jpg',
    fallbackGradient: 'from-[#EEF2ED] to-[#DFE7DD]',
    stemBreakdown: [
      { stemName: "Snow White Hydrangea Heads", count: 3 },
      { stemName: "Porcelain Double Lisianthus", count: 6 },
      { stemName: "Fragrant White Freesia", count: 5 },
      { stemName: "Silver Dollar Foliage", count: 7 },
      { stemName: "Baby's Breath Cloud Sprays", count: 4 }
    ],
    dimensions: 'Height 45cm · Spread 40cm',
    careTips: [
      'Hydrangea stems benefit from dipping cut ends in boiling water for 10 seconds before placing in cold vase water.',
      'Keep away from ripening fruit (which releases ethylene gas).',
      'Change water every 2 days.'
    ],
    fragranceLevel: 'Delicate',
    inStock: true,
    featured: true,
    editorialKicker: 'Architectural Botanical'
  },
  {
    id: 'aurore-d-or',
    title: "Aurore d'Or",
    subtitle: 'Honey Dahlias, Peach Ranunculus & Caramel Spray Roses',
    price: 128,
    description: 'Golden hour captured in botanical form: honey-toned dahlias, apricot spray roses, warm peach ranunculus, and wild chamomile flowers.',
    story: 'Harvested from our partner growers in the Loire Valley at first light. Radiates warmth, cheer, and quiet celebratory gratitude.',
    occasion: 'Birthday',
    palette: 'Golden Sunset',
    image: '/src/assets/images/bouquet_blush_peony_1791180836846.jpg', // uses aesthetic fallback with distinct styling
    fallbackGradient: 'from-[#FDF3E7] to-[#F5DEC2]',
    stemBreakdown: [
      { stemName: "Honey Cafe au Lait Dahlias", count: 4 },
      { stemName: "Warm Peach Ranunculus", count: 6 },
      { stemName: "Caramel Trendsetter Spray Roses", count: 5 },
      { stemName: "Wild Chamomile & Feverfew", count: 5 },
      { stemName: "Autumnal Oak Leaves & Eucalyptus", count: 4 }
    ],
    dimensions: 'Height 46cm · Spread 36cm',
    careTips: [
      'Keep dahlias topped with plenty of fresh water as they are thirsty blooms.',
      'Display on a credenza or dining table out of direct draft.'
    ],
    fragranceLevel: 'Aromatic & Herbal',
    inStock: true,
    featured: false,
    editorialKicker: 'Seasonal Sunlit Harvest'
  },
  {
    id: 'serenite-provencale',
    title: 'Sérénité Provençale',
    subtitle: 'French Lavender, Olive Branches & Powder Garden Roses',
    price: 110,
    description: 'An artisanal rustic-chic hand-tied bundle of aromatic French dried and fresh lavender, soft cream roses, and fragrant olive foliage.',
    story: 'Evoking lazy sun-drenched afternoons in the Luberon hills. Fills the room with calming botanical notes of lavender, sage, and wild eucalyptus.',
    occasion: 'Everyday',
    palette: 'Blanc & Green',
    image: '/src/assets/images/bouquet_white_botanical_1791180860513.jpg',
    fallbackGradient: 'from-[#F0F2EA] to-[#E1E5D5]',
    stemBreakdown: [
      { stemName: "Fresh Haute-Provence Lavender", count: 8 },
      { stemName: "Olive Branch Sprigs", count: 6 },
      { stemName: "Cream Garden Roses", count: 5 },
      { stemName: "White Larkspur Stems", count: 4 },
      { stemName: "Silver Dusty Miller Leaves", count: 4 }
    ],
    dimensions: 'Height 50cm · Spread 34cm',
    careTips: [
      'Lavender dries naturally and beautifully if left in an empty vase after water blooms expire.',
      'Trim stems gently every 3 days.'
    ],
    fragranceLevel: 'Aromatic & Herbal',
    inStock: true,
    featured: false,
    editorialKicker: 'Calming Botanical Herbarium'
  },
  {
    id: 'fete-imperiale',
    title: 'Fête Impériale',
    subtitle: 'Coral Charm Peonies, Deep Rose Ranunculus & Golden Eucalyptus',
    price: 165,
    description: 'A lavish celebration of changing colors: majestic Coral Charm peonies that transition from coral sunset to soft ivory, framed with luxury garden blooms.',
    story: 'Our most celebratory arrangement, chosen for gallery openings, anniversary feasts, and breathtaking gift surprises.',
    occasion: 'Celebration',
    palette: 'Golden Sunset',
    image: '/src/assets/images/bouquet_crimson_romance_1791180847899.jpg',
    fallbackGradient: 'from-[#FAECE5] to-[#F1D2C3]',
    stemBreakdown: [
      { stemName: "Coral Charm Peonies", count: 6 },
      { stemName: "Hot Coral & Apricot Ranunculus", count: 6 },
      { stemName: "David Austin Juliet Garden Roses", count: 5 },
      { stemName: "Golden-tinted Seeded Eucalyptus", count: 6 },
      { stemName: "Coral Astilbe Feathers", count: 4 }
    ],
    dimensions: 'Height 55cm · Spread 45cm',
    careTips: [
      'Watch petals shift in tone each morning from vivid flamingo coral to antique cream.',
      'Place in deep water and keep in a cool room overnight.'
    ],
    fragranceLevel: 'Delicate',
    inStock: true,
    featured: false,
    editorialKicker: 'Grand Milestone Atelier'
  }
];

export const VASE_OPTIONS: VaseOption[] = [
  {
    id: 'vase-none',
    name: 'Bouquet Only (Hand-Tied in Water Hydration Wrap)',
    price: 0,
    material: 'Linen Paper Wrap',
    description: 'Arrives in our signature breathable hydration wrap with ice-gel pouch to keep stems quenched in transit.',
    imageFallback: '💧'
  },
  {
    id: 'vase-fluted-ceramic',
    name: 'Fluted Bone Ceramic Urn',
    price: 38,
    material: 'Hand-thrown Stoneware, Matte Glaze',
    description: 'An artisanal matte ribbed vessel inspired by classical Greek column architecture, hand-crafted in Limoges.',
    imageFallback: '🏺'
  },
  {
    id: 'vase-smoked-amber',
    name: 'Smoked Amber Mouth-Blown Glass Vase',
    price: 44,
    material: 'Mouth-blown Borosilicate Glass',
    description: 'A warm, luminous amber glass vase that catches sunlight and highlights the sculptural stems inside.',
    imageFallback: '✨'
  },
  {
    id: 'vase-alabaster-minimal',
    name: 'Minimalist Alabaster Cylinder',
    price: 32,
    material: 'Fine Cast Porcelain',
    description: 'Clean architectural lines with a silk-touch satin finish, designed to let flower silhouettes take center stage.',
    imageFallback: '🏛️'
  }
];
