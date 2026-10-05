import { FlowerStem, WrappingOption, RibbonOption } from '../types/bouquet';

export const FLOWER_STEMS: FlowerStem[] = [
  {
    id: 'peony-pink',
    name: 'Sarah Bernhardt Peony',
    botanicalName: 'Paeonia lactiflora',
    category: 'focal',
    colorHex: '#F4B8C5',
    pricePerStem: 8.5,
    meaning: 'Bashful romance, noble prosperity, and lasting bliss.',
    maxStems: 12,
    defaultStems: 4,
    description: 'Voluminous, multi-layered petals with a sweet floral scent that opens over a week.',
    symbolismTag: 'Prosperity & Romance'
  },
  {
    id: 'garden-rose-cream',
    name: "Cream O'Hara Garden Rose",
    botanicalName: 'Rosa x centifolia',
    category: 'focal',
    colorHex: '#FFF5EA',
    pricePerStem: 6.0,
    meaning: 'Purity of devotion, quiet grace, and eternal affection.',
    maxStems: 15,
    defaultStems: 5,
    description: 'Quartered cabbage rose center with subtle blush ivory hues and rich citrus-floral perfume.',
    symbolismTag: 'Eternal Affection'
  },
  {
    id: 'rose-crimson',
    name: 'Velvet Crimson Rose',
    botanicalName: 'Rosa damascena',
    category: 'focal',
    colorHex: '#841B2D',
    pricePerStem: 5.5,
    meaning: 'Unapologetic passion, sovereign beauty, and ardent love.',
    maxStems: 18,
    defaultStems: 0,
    description: 'Deep ruby black-velvet petals with dramatic depth and classic romantic presence.',
    symbolismTag: 'Passionate Love'
  },
  {
    id: 'ranunculus-peach',
    name: 'French Butterfly Ranunculus',
    botanicalName: 'Ranunculus asiaticus',
    category: 'secondary',
    colorHex: '#F6B287',
    pricePerStem: 4.8,
    meaning: 'Radiant charm, dazzling intellect, and gentle wonder.',
    maxStems: 14,
    defaultStems: 3,
    description: 'Paper-thin concentric petal layers on naturally winding, graceful dancing stems.',
    symbolismTag: 'Radiant Charm'
  },
  {
    id: 'hydrangea-white',
    name: 'Alabaster Hydrangea',
    botanicalName: 'Hydrangea macrophylla',
    category: 'focal',
    colorHex: '#F9FBF8',
    pricePerStem: 9.0,
    meaning: 'Heartfelt gratitude, earnest understanding, and boundless abundance.',
    maxStems: 6,
    defaultStems: 2,
    description: 'Substantial spherical head formed of hundreds of delicate porcelain florets.',
    symbolismTag: 'Heartfelt Gratitude'
  },
  {
    id: 'dahlia-honey',
    name: 'Café au Lait Dahlia',
    botanicalName: 'Dahlia pinnata',
    category: 'focal',
    colorHex: '#DEB597',
    pricePerStem: 7.5,
    meaning: 'Dignity, inner strength, and steadfast commitment.',
    maxStems: 8,
    defaultStems: 0,
    description: 'Dinnerplate dahlia with swirling creamy mocha, blush, and buttery caramel tones.',
    symbolismTag: 'Steadfast Devotion'
  },
  {
    id: 'lisianthus-cream',
    name: 'Double Lisianthus',
    botanicalName: 'Eustoma grandiflorum',
    category: 'secondary',
    colorHex: '#EAE6DC',
    pricePerStem: 4.2,
    meaning: 'Lifelong bonding, appreciation, and calming poise.',
    maxStems: 12,
    defaultStems: 3,
    description: 'Rose-like cup blooms with delicate ruffled edges and long vase lifespan.',
    symbolismTag: 'Quiet Elegance'
  },
  {
    id: 'sweet-pea-blush',
    name: 'Heritage Sweet Pea',
    botanicalName: 'Lathyrus odoratus',
    category: 'accent',
    colorHex: '#E8A3B2',
    pricePerStem: 3.5,
    meaning: 'Blissful pleasure, tender goodbyes, and delicate thanks.',
    maxStems: 12,
    defaultStems: 2,
    description: 'Winged fluttery florets releasing a heavenly honey-orange blossom fragrance.',
    symbolismTag: 'Delicate Pleasure'
  },
  {
    id: 'astilbe-plum',
    name: 'Feathered Plum Astilbe',
    botanicalName: 'Astilbe chinensis',
    category: 'accent',
    colorHex: '#7C3A4D',
    pricePerStem: 3.8,
    meaning: 'Patient waiting, secret admiration, and gentle hope.',
    maxStems: 10,
    defaultStems: 0,
    description: 'Plumed textural spears adding airy movement and deep burgundy contrast.',
    symbolismTag: 'Secret Admiration'
  },
  {
    id: 'eucalyptus-silver',
    name: 'Silver Dollar Eucalyptus',
    botanicalName: 'Eucalyptus cinerea',
    category: 'foliage',
    colorHex: '#7E9181',
    pricePerStem: 3.0,
    meaning: 'Protection, purification, renewal, and quiet sanctuary.',
    maxStems: 15,
    defaultStems: 4,
    description: 'Glaucous round silver-blue leaves exuding a refreshing, crisp camphor aroma.',
    symbolismTag: 'Renewal & Protection'
  },
  {
    id: 'olive-branch',
    name: 'Tuscan Olive Branch',
    botanicalName: 'Olea europaea',
    category: 'foliage',
    colorHex: '#556B48',
    pricePerStem: 3.2,
    meaning: 'Peace, harmony, fruitful longevity, and reconciliation.',
    maxStems: 12,
    defaultStems: 2,
    description: 'Silvery-green slender leaves on woody branches signifying timeless tranquility.',
    symbolismTag: 'Peace & Harmony'
  },
  {
    id: 'lavender-provence',
    name: 'Grown French Lavender',
    botanicalName: 'Lavandula angustifolia',
    category: 'foliage',
    colorHex: '#8C7A9C',
    pricePerStem: 2.8,
    meaning: 'Serenity, devotion, untroubled calm, and grace.',
    maxStems: 15,
    defaultStems: 0,
    description: 'Intensely fragrant purple flowering spikes that naturally dry into lasting keepsake stems.',
    symbolismTag: 'Serenity & Grace'
  }
];

export const WRAPPING_OPTIONS: WrappingOption[] = [
  {
    id: 'wrap-kraft-parisian',
    name: 'Unbleached Parisian Kraft',
    description: 'Heavyweight organic recycled kraft paper with deckled edges and botanical wax stamp seal.',
    price: 0,
    colorHex: '#D6C5B3',
    borderHex: '#BEA894'
  },
  {
    id: 'wrap-blush-linen',
    name: 'Blush Powder Linen Paper',
    description: 'Tactile Japanese mulberry paper in soft dusty rose with delicate translucent fibers.',
    price: 6,
    colorHex: '#EFE2DC',
    borderHex: '#DDC9C0'
  },
  {
    id: 'wrap-alabaster-embossed',
    name: 'Alabaster Embossed Parchment',
    description: 'Crisp matte off-white parchment with blind-debossed floral monogram styling.',
    price: 8,
    colorHex: '#F7F5EE',
    borderHex: '#E2DFC8'
  },
  {
    id: 'wrap-midnight-matte',
    name: 'Charcoal Midnight Wrap',
    description: 'Sleek matte slate paper creating high-drama gallery contrast for vibrant blooms.',
    price: 7,
    colorHex: '#2E2D2B',
    borderHex: '#474542'
  }
];

export const RIBBON_OPTIONS: RibbonOption[] = [
  {
    id: 'ribbon-sage-silk',
    name: 'Sage Whisper',
    colorHex: '#6F8474',
    material: 'French Silk'
  },
  {
    id: 'ribbon-dusty-rose-velvet',
    name: 'Dusty Rose Velvet',
    colorHex: '#A26974',
    material: 'Crushed Velvet'
  },
  {
    id: 'ribbon-champagne-silk',
    name: 'Champagne Satin',
    colorHex: '#D9C8A8',
    material: 'French Silk'
  },
  {
    id: 'ribbon-terracotta-cotton',
    name: 'Raw Terracotta',
    colorHex: '#9E5647',
    material: 'Organic Cotton'
  }
];

export const FLORAL_SENTIMENTS = [
  {
    theme: 'Romance & Devotion',
    recommendedFlower: 'Garden Rose & Peony',
    promptIdeas: [
      'For you, who makes every ordinary day feel like Paris in full bloom.',
      'Loving you has been as natural and beautiful as flowers reaching for the sun.',
      'Every petal carries a quiet whisper of how deeply you are cherished.'
    ]
  },
  {
    theme: 'Deep Gratitude',
    recommendedFlower: 'Alabaster Hydrangea',
    promptIdeas: [
      'Words are small, but these blooms carry the immense warmth of my heartfelt thanks.',
      'Thank you for your generous spirit, gentle wisdom, and unwavering kindness.',
      'With sincere gratitude for being the light in my garden this season.'
    ]
  },
  {
    theme: 'Joyous Celebration & Birthday',
    recommendedFlower: 'Peach Ranunculus & Dahlia',
    promptIdeas: [
      'May this year unfold for you like the most radiant, fragrant peony.',
      'Celebrating you today and the boundless beauty and laughter you bring to our lives.',
      'Cheers to another year of growing, blossoming, and dazzling the world.'
    ]
  },
  {
    theme: 'Quiet Solace & Sympathy',
    recommendedFlower: 'White Lisianthus & Olive Branch',
    promptIdeas: [
      'Holding you close in thoughts and tender prayers during this time of sorrow.',
      'May the peace of these quiet blossoms bring a measure of comfort to your heart.',
      'Remembering a life so deeply cherished and forever surrounded by love.'
    ]
  },
  {
    theme: 'Thinking of You',
    recommendedFlower: 'French Lavender & Sweet Pea',
    promptIdeas: [
      'Just a little bouquet of beauty to brighten your desk and remind you how loved you are.',
      'Sending you a breath of fresh morning blooms across the miles.',
      'No occasion needed—simply wanted to see you smile today.'
    ]
  }
];
