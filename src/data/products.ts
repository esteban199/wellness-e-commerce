export type Category =
  | 'Tinctures'
  | 'Topicals'
  | 'Skincare'
  | 'Bath'
  | 'Pets'
  | 'Vape'
  | 'Consumables'
  | 'Capsules'
  | 'Sets'
  | 'PMS';

export type Flavour = 'Orange Creamsicle' | 'Raspberry' | 'Vanilla Mint' | 'Mint Chocolate';

export interface ProductVariant {
  id: string;
  label: string;       // e.g. "60ml / 3000mg"
  price: number;
  image: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: 'Sacred Medicinals' | 'Mary Jay';
  categories: Category[];
  description: string;
  rating: number;
  variants: ProductVariant[];
  // optional extras
  flavours?: Flavour[];
  addons?: { id: string; label: string; price: number }[];
}

// ─── Sacred Medicinals ────────────────────────────────────────────────────────

export const products: Product[] = [

  // ── Tinctures ──

  {
    slug: 'full-spectrum-tincture',
    name: 'Full-Spectrum Tincture',
    brand: 'Sacred Medicinals',
    categories: ['Tinctures'],
    description: 'Our premium full-spectrum CBD tincture made with locally sourced BC hemp. Rich in cannabinoids and terpenes for maximum entourage effect.',
    rating: 4.9,
    variants: [
      { id: 'fst-60-3000', label: '60ml / 3000mg', price: 179, image: '/assets/products/full-spectrum-tincture-60ml-3000mg.jpg' },
      { id: 'fst-60-1500', label: '60ml / 1500mg', price: 95,  image: '/assets/products/full-spectrum-tincture-60ml-3000mg.jpg' },
      { id: 'fst-30-750',  label: '30ml / 750mg',  price: 55,  image: '/assets/products/full-spectrum-tincture-60ml-3000mg.jpg' },
    ],
  },

  {
    slug: 'isolate-tincture',
    name: 'Isolate Tincture',
    brand: 'Sacred Medicinals',
    categories: ['Tinctures'],
    description: 'Pure CBD isolate tincture — THC-free and ideal for those seeking the benefits of CBD without any other cannabinoids.',
    rating: 4.7,
    variants: [
      { id: 'it-60-1500', label: '60ml / 1500mg', price: 95, image: '/assets/products/isolate-tincture-60ml.jpg' },
      { id: 'it-30-750',  label: '30ml / 750mg',  price: 55, image: '/assets/products/isolate-tincture-30ml.jpg' },
    ],
  },

  // ── Topicals ──

  {
    slug: 'double-strength-topical-balm',
    name: 'Double Strength Topical Balm',
    brand: 'Sacred Medicinals',
    categories: ['Topicals', 'PMS'],
    description: 'Our most potent topical balm — double strength formula for fast-acting relief from chronic pain, inflammation and muscle soreness.',
    rating: 4.8,
    variants: [
      { id: 'dstb-140-4000', label: '140ml / 4000mg', price: 110, image: '/assets/products/double-strength-topical-balm.jpg' },
    ],
  },

  {
    slug: 'topical-balm',
    name: 'Topical Balm',
    brand: 'Sacred Medicinals',
    categories: ['Topicals', 'PMS'],
    description: 'Hand-crafted topical balm for targeted relief. Perfect for joint pain, muscle aches and inflammation.',
    rating: 4.6,
    variants: [
      { id: 'tb-60-1000', label: '60ml / 1000mg', price: 55, image: '/assets/products/topical-balm.jpg' },
    ],
  },

  {
    slug: 'roll-on-topical-balm',
    name: 'Roll-on Topical Balm',
    brand: 'Sacred Medicinals',
    categories: ['Topicals', 'PMS'],
    description: 'Convenient roll-on applicator for on-the-go relief. Mess-free and easy to apply to targeted areas.',
    rating: 4.7,
    variants: [
      { id: 'rotb-75-1500', label: '75ml / 1500mg', price: 72, image: '/assets/products/roll-on-topical-balm-1500mg.jpg' },
      { id: 'rotb-75-2500', label: '75ml / 2500mg', price: 85, image: '/assets/products/roll-on-topical-balm-2500mg.jpg' },
    ],
  },

  {
    slug: 'headache-roll-on',
    name: 'Headache Roll-on',
    brand: 'Sacred Medicinals',
    categories: ['Topicals'],
    description: 'Targeted headache relief with our compact roll-on formula. Apply directly to temples and neck for fast-acting comfort.',
    rating: 4.5,
    variants: [
      { id: 'hro-10-250', label: '10ml / 250mg', price: 18, image: '/assets/products/headache-roll-on.jpg' },
    ],
  },

  {
    slug: 'topical-pump-cream',
    name: 'Topical Pump Cream',
    brand: 'Sacred Medicinals',
    categories: ['Topicals', 'Skincare'],
    description: 'Lightweight CBD pump cream that absorbs quickly without leaving residue. Ideal for daily moisturizing and pain management.',
    rating: 4.4,
    variants: [
      { id: 'tpc-60', label: '60ml', price: 55, image: '/assets/products/topical-pump-cream.jpg' },
    ],
  },

  {
    slug: 'lemon-whipped-body-butter',
    name: 'Lemon Whipped Body Butter',
    brand: 'Sacred Medicinals',
    categories: ['Topicals', 'Skincare'],
    description: 'Luxuriously whipped body butter infused with CBD and brightening lemon. Deeply nourishing for dry skin.',
    rating: 4.6,
    variants: [
      { id: 'lwbb-150-500', label: '150ml / 500mg', price: 45, image: '/assets/products/lemon-whipped-body-butter.jpg' },
    ],
  },

  {
    slug: 'massage-oil',
    name: 'Massage Oil',
    brand: 'Sacred Medicinals',
    categories: ['Topicals'],
    description: 'Soothing CBD massage oil for relaxation and muscle recovery. Blended with premium carrier oils for smooth application.',
    rating: 4.3,
    variants: [
      { id: 'mo-60-250', label: '60ml / 250mg', price: 30, image: '/assets/products/massage-oil.jpg' },
    ],
  },

  {
    slug: 'magnesium-topical-spray',
    name: 'Magnesium Topical Spray',
    brand: 'Sacred Medicinals',
    categories: ['Topicals'],
    description: 'Transdermal magnesium spray to relieve muscle cramps, improve sleep and reduce tension. Available in regular and lavender.',
    rating: 4.5,
    variants: [
      { id: 'mts-regular',  label: 'Regular — 100ml',  price: 22, image: '/assets/products/magnesium-spray-regular.jpg' },
      { id: 'mts-lavender', label: 'Lavender — 100ml', price: 24, image: '/assets/products/magnesium-spray-lavender.jpg' },
    ],
  },

  // ── Skincare ──

  {
    slug: 'rose-gold-serum',
    name: 'Rose Gold Serum',
    brand: 'Sacred Medicinals',
    categories: ['Skincare'],
    description: 'Luxurious CBD-infused face serum with rose hip and gold botanicals. Targets fine lines, uneven tone and dehydration.',
    rating: 4.8,
    variants: [
      { id: 'rgs-30', label: '30ml', price: 42, image: '/assets/products/rose-gold-serum-30ml.jpg' },
      { id: 'rgs-50', label: '50ml', price: 62, image: '/assets/products/rose-gold-serum-50ml.jpg' },
    ],
  },

  {
    slug: 'lip-balm-tin',
    name: 'Lip Balm Tin',
    brand: 'Sacred Medicinals',
    categories: ['Skincare'],
    description: 'Moisturizing CBD lip balm tin in four delicious flavours. Keeps lips soft and hydrated all day.',
    rating: 4.4,
    variants: [
      { id: 'lbt-15', label: '15ml', price: 12, image: '/assets/products/lip-balm-tin.jpg' },
    ],
    flavours: ['Orange Creamsicle', 'Raspberry', 'Vanilla Mint', 'Mint Chocolate'],
  },

  {
    slug: 'lip-balm-stick',
    name: 'Lip Balm Stick',
    brand: 'Sacred Medicinals',
    categories: ['Skincare'],
    description: 'Convenient CBD lip balm stick with 100mg CBD for on-the-go lip care. Four flavour options.',
    rating: 4.3,
    variants: [
      { id: 'lbs-4-100', label: '4.5ml / 100mg', price: 8, image: '/assets/products/lip-balm-stick.jpg' },
    ],
    flavours: ['Orange Creamsicle', 'Raspberry', 'Vanilla Mint', 'Mint Chocolate'],
  },

  // ── Bath ──

  {
    slug: 'bath-bomb',
    name: 'Bath Bomb',
    brand: 'Sacred Medicinals',
    categories: ['Bath', 'PMS'],
    description: 'Fizzing CBD bath bombs for a luxurious, relaxing soak. Perfect for muscle recovery and stress relief.',
    rating: 4.5,
    variants: [
      { id: 'bb-1',  label: '1 Bath Bomb — 150mg',  price: 12, image: '/assets/products/bath-bomb.jpg' },
      { id: 'bb-2',  label: '2 Bath Bombs — 300mg', price: 22, image: '/assets/products/bath-bomb.jpg' },
      { id: 'bb-3',  label: '3 Bath Bombs — 450mg', price: 30, image: '/assets/products/bath-bomb.jpg' },
    ],
  },

  {
    slug: 'bath-salts',
    name: 'Bath Salts',
    brand: 'Sacred Medicinals',
    categories: ['Bath', 'PMS'],
    description: 'Mineral-rich CBD bath salts for deep muscle relaxation and skin nourishment. Soak away tension and pain.',
    rating: 4.4,
    variants: [
      { id: 'bs-600-250', label: '600g / 250mg', price: 38, image: '/assets/products/bath-salts.jpg' },
    ],
  },

  // ── Pets ──

  {
    slug: 'dog-treats',
    name: 'Dog Treats',
    brand: 'Sacred Medicinals',
    categories: ['Pets'],
    description: 'All-natural CBD dog treats for anxiety, joint pain and general wellness. Vet-approved formula loved by dogs.',
    rating: 4.8,
    variants: [
      { id: 'dt-150-10',  label: '150g — 10mg per treat', price: 35, image: '/assets/products/dog-treats-150g.jpg' },
      { id: 'dt-65-5',   label: '65g — 5mg per treat',   price: 20, image: '/assets/products/dog-treats-65g.jpg' },
    ],
  },

  // ── Consumables ──

  {
    slug: 'gummies',
    name: 'Gummies',
    brand: 'Sacred Medicinals',
    categories: ['Consumables'],
    description: 'Delicious CBD gummies — a tasty and discreet way to get your daily dose. 20mg per gummy.',
    rating: 4.6,
    variants: [
      { id: 'gum-20-20', label: '20 x 20mg', price: 25, image: '/assets/products/gummies.jpg' },
    ],
  },

  // ── Capsules ──

  {
    slug: 'gel-capsules',
    name: 'Gel Capsules',
    brand: 'Sacred Medicinals',
    categories: ['Capsules'],
    description: 'Easy-to-swallow CBD gel capsules for precise dosing. No taste, no mess — just consistent daily wellness.',
    rating: 4.7,
    variants: [
      { id: 'gc-50-30', label: '50 capsules — 30mg each', price: 110, image: '/assets/products/gel-capsules.jpg' },
      { id: 'gc-12-30', label: '12 capsules — 30mg each', price: 24,  image: '/assets/products/gel-capsules.jpg' },
      { id: 'gc-4-30',  label: '4 capsules — 30mg each',  price: 8,   image: '/assets/products/gel-capsules.jpg' },
    ],
  },

  // ── PMS ──

  {
    slug: 'suppositories',
    name: 'Suppositories',
    brand: 'Sacred Medicinals',
    categories: ['PMS'],
    description: 'CBD suppositories for fast-acting, targeted relief. Highly effective for pelvic pain, endometriosis and cramping.',
    rating: 4.6,
    variants: [
      { id: 'sup-5-50', label: '5 x 50mg', price: 25, image: '/assets/products/suppositories.jpg' },
    ],
  },

  // ── Vape ──

  {
    slug: 'vape-cartridge',
    name: 'Vape Cartridge',
    brand: 'Sacred Medicinals',
    categories: ['Vape'],
    description: 'Premium CBD vape cartridge for fast-acting relief. 1g of pure CBD oil with no additives or fillers.',
    rating: 4.5,
    variants: [
      { id: 'vc-1g-1000', label: '1g / 1000mg', price: 40, image: '/assets/products/vape-cartridge.jpg' },
    ],
    addons: [
      { id: 'vape-battery', label: 'Add battery pen', price: 10 },
    ],
  },

  // ── Mary Jay Skincare ──

  {
    slug: 'revive-beauty-cream',
    name: 'Revive Beauty Cream',
    brand: 'Mary Jay',
    categories: ['Skincare'],
    description: 'Rich CBD-infused beauty cream that revitalizes and hydrates. Reduces redness, evens skin tone and restores radiance.',
    rating: 4.8,
    variants: [
      { id: 'rbc-60-1000', label: '60ml / 1000mg', price: 85, image: '/assets/products/revive-beauty-cream.jpg' },
    ],
  },

  {
    slug: 'timeless-aging-serum',
    name: 'Timeless Aging Serum',
    brand: 'Mary Jay',
    categories: ['Skincare'],
    description: 'Advanced anti-aging CBD serum that targets fine lines and restores youthful radiance. Formulated with premium botanicals.',
    rating: 4.9,
    variants: [
      { id: 'tas-50-1000', label: '50ml / 1000mg', price: 95, image: '/assets/products/timeless-aging-serum-60ml.jpg' },
      { id: 'tas-30-500',  label: '30ml / 500mg',  price: 55, image: '/assets/products/timeless-aging-serum-30ml.jpg' },
    ],
  },

  {
    slug: 'mary-jay-skincare-duo',
    name: 'Mary Jay Skincare Duo',
    brand: 'Mary Jay',
    categories: ['Skincare', 'Sets'],
    description: 'The ultimate Mary Jay skincare pairing — Revive Beauty Cream (60ml/1000mg) + Timeless Aging Serum (60ml/1000mg). Save when you bundle.',
    rating: 5.0,
    variants: [
      { id: 'mjsd-set', label: 'Set (Cream 60ml + Serum 60ml)', price: 140, image: '/assets/products/mary-jay-skincare-duo.jpg' },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const ALL_CATEGORIES: Category[] = [
  'Tinctures', 'Topicals', 'Skincare', 'Bath', 'Pets', 'Vape', 'Consumables', 'Capsules', 'Sets',
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.categories.includes(category));
}

/** Default price = price of first variant */
export function getBasePrice(product: Product): number {
  return product.variants[0]?.price ?? 0;
}

/** Default image = image of first variant */
export function getBaseImage(product: Product): string {
  return product.variants[0]?.image ?? '/assets/products/placeholder.jpg';
}
