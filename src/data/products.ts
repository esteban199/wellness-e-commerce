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
  ingredients?: string;
  howToUse?: string;
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
    description:
      'Some days your body just feels out of balance — whether it\'s pain, stress, tension, restless sleep, or simply the pace of everyday life. Our full-spectrum tincture was crafted to support exactly that.\n\nIt delivers a naturally derived active ingredient alongside the plant\'s beneficial compounds, working together in what\'s known as the entourage effect. This synergy helps support the body\'s natural balance and overall wellbeing.\n\nMany people include this tincture in their routine to treat pain, support relaxation, ease everyday tension, promote better sleep, and help with common discomforts such as inflammation or sore joints. Because this tincture is full-spectrum, it preserves the plant\'s naturally occurring compounds so they can work together synergistically to support the body\'s endocannabinoid system.',
    howToUse:
      'Place your desired amount under the tongue, hold for 60 seconds, then swallow. It can also be added to beverages or food.',
    ingredients: 'Full-spectrum Active Ingredient, MCT oil',
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
    description:
      'This tincture contains the purified active ingredient without additional plant cannabinoids, making it a great option for pets, children, or those who may be subject to drug testing.\n\nIsolate is often used to support pain, inflammation, anxiety, relaxation, calmness, and more.',
    howToUse: 'Place under the tongue, hold briefly, then swallow.',
    ingredients: 'Isolate Active Ingredient, MCT oil',
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
    description:
      'This version of our famous Topical Balm is by far our most popular product and provides instant relief. It contains double the active ingredient for those looking for stronger support. Thousands of customers reach for this balm as part of their routine for tired muscles, joint stiffness, everyday tension, and so much more. Many refer to it as a "miracle balm" and could not live without it!\n\nMenthol, peppermint, and wintergreen create a refreshing cooling sensation, while ginger and rosemary provide gentle warmth. Together they help support comfort while the balm melts smoothly into the skin.',
    howToUse:
      'Massage a small amount directly onto the desired area and allow the balm to absorb into the skin. Reapply as needed.',
    ingredients:
      'Full-spectrum Active Ingredient, Coconut oil, Lanolin, Beeswax, Menthol, Camphor, Wintergreen, Peppermint, Ginger, Thyme, Rosemary, Eucalyptus',
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
    description:
      'Our famous Topical Balm delivers our naturally derived active ingredient alongside cooling and warming botanicals to help support comfort right where you need it. Thousands of customers reach for this balm as part of their routine for tired muscles, joint stiffness, everyday tension, and so much more. Many refer to it as a "miracle balm" and could not live without it!\n\nMenthol, peppermint, and wintergreen create a refreshing cooling sensation, while ginger and rosemary provide gentle warmth. Together they help support comfort while the balm melts smoothly into the skin.',
    howToUse:
      'Massage a small amount directly onto the desired area and allow the balm to absorb into the skin. Reapply as needed.',
    ingredients:
      'Full-Spectrum Active Ingredient, Coconut oil, Lanolin, Beeswax, Menthol, Camphor, Wintergreen, Peppermint, Ginger, Thyme, Rosemary, Eucalyptus',
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
    description:
      'The same soothing formula as our famous topical balm in a lightweight and portable container for hands-free, mess-free use. Apply directly to areas of tension whenever quick comfort is needed.\n\nOur famous Topical Balm delivers our naturally derived active ingredient alongside cooling and warming botanicals to help support comfort right where you need it. Thousands of customers reach for this balm for tired muscles, joint stiffness, everyday tension, and so much more.',
    ingredients:
      'Full-spectrum Active Ingredient, Coconut oil, Lanolin, Beeswax, Menthol, Camphor, Wintergreen, Peppermint, Ginger, Thyme, Rosemary, Eucalyptus',
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
    description:
      'When tension builds in your head or neck, a cooling botanical blend can provide a refreshing moment of relief. Our headache roll-on was designed for exactly those moments.\n\nThis refreshing roll-on combines our naturally derived active ingredient with soothing essential oils. Apply to the temples, neck, or forehead for a calming sensation and to reduce headaches and migraines naturally.',
    ingredients:
      'Full-Spectrum Active Ingredient, Menthol, Camphor, Wintergreen, Peppermint, Ginger, Thyme, Rosemary, Eucalyptus',
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
    description:
      'Lightweight CBD pump cream that absorbs quickly without leaving residue. Ideal for daily moisturizing and targeted pain management.',
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
    description:
      'After a shower or bath, your skin is ready to soak up deep hydration. Our Whipped Lemon Body Butter transforms that everyday moment into a refreshing skin ritual.\n\nA rich yet airy body butter that melts into the skin to deliver lasting moisture. The refreshing citrus aroma uplifts the senses while nourishing ingredients soften and hydrate dry or stressed skin. Perfect after bathing or showering.',
    ingredients:
      'Full-spectrum Active Ingredient, Shea butter, Sunflower oil, Aloe gel, Vitamin E oil, Arrowroot, MSM, Lemongrass, Lemon balm / Propanediol, Frankincense, Benzoin, Ylang ylang, Limonene, Rosemary co2',
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
    description:
      'At the end of a long day, few things feel better than slowing down and releasing built-up tension in the body. Our massage oil was created to help turn that moment into a deeply relaxing ritual.\n\nThis smooth, refreshing, and relaxing massage oil is infused with our naturally derived active ingredient and calming botanicals designed to relax muscles and ease tension. Perfect for massage, recovery after physical activity, or simply unwinding after a long day.',
    ingredients:
      'Full-spectrum active ingredient, Jojoba oil, Lavender, Wintergreen, Lemongrass, Frankincense, Rosemary, Ylang ylang',
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
    description:
      'Our magnesium topical spray delivers magnesium directly through the skin to help support muscle relaxation, recovery, and overall wellness. Magnesium plays an essential role in muscle function and relaxation, and topical application allows the body to absorb this important mineral quickly and effectively.\n\nAlso available with calming lavender essential oil — ideal for evening routines or before bedtime.',
    howToUse:
      'Spray onto the skin and massage gently into the desired area. Perfect after workouts, long days on your feet, or whenever your body needs extra support.',
    ingredients:
      'Distilled water, Magnesium chloride, Aloe vera extract liquid (lavender variant also contains Lavender essential oil)',
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
    description:
      'Glow Naturally. Restore Radiance.\n\nInfused with luxurious rosehip, hemp seed, and antioxidant-rich oils, Rose Gold Serum is a deeply nourishing facial oil designed to balance, calm, and beautify your skin.\n\n100% Natural (No parabens, silicones, or preservatives) · Lightweight · Non-comedogenic · Suitable for all skin types including mature, dry, dull or breakout-prone.',
    ingredients:
      'Castor oil, Pomegranate oil, Hemp seed oil, Sacha inchi oil, Argan oil, Emu oil, Squalene oil, MCT oil, Jojoba oil, Rosehips oil, Vitamin E, Bulgarian rose essential oil, Frankincense essential oil',
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
    description:
      'Dry lips can happen anytime — from cold weather to sunny days outdoors. Our nourishing lip balm helps keep lips soft, smooth, and protected. Beeswax and botanical oils help protect and moisturize dry lips while providing smooth hydration.',
    ingredients:
      'Full-spectrum Active Ingredient, Natural Wax Jelly, Beeswax, Prunus Amygdalus Dulcis Oil, Caprylic/capric triglyceride, Castor Wax Jelly, Tocopherol, Sativa Seed Oil',
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
    description:
      'Dry lips can happen anytime — from cold weather to sunny days outdoors. Our nourishing lip balm helps keep lips soft, smooth, and protected. Beeswax and botanical oils help protect and moisturize dry lips while providing smooth hydration.',
    ingredients:
      'Full-spectrum Active Ingredient, Natural Wax Jelly, Beeswax, Prunus Amygdalus Dulcis Oil, Caprylic/capric triglyceride, Castor Wax Jelly, Tocopherol, Sativa Seed Oil',
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
    description:
      'Sometimes the best way to reset is simply soaking in a warm bath and letting the day melt away. Our bath bombs help transform that moment into a relaxing ritual.\n\nTransform your bath into a spa experience with our luxurious bath bombs infused with 150mg of our naturally derived active ingredient. As the bomb dissolves, it releases soothing minerals and botanical oils designed to relax tired muscles, ease tension, and help you unwind after a long day. Perfect for post-workout recovery or a relaxing evening ritual.',
    ingredients:
      'Full-spectrum active ingredient, Baking soda, Citric acid, Epsom salts, Arrowroot powder, Cornflower petals',
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
    description:
      'A warm bath has long been one of the simplest ways to relax the body and mind. Our mineral-rich bath salts elevate that experience even further.\n\nOur bath salts combine magnesium-rich Epsom salts and mineral-dense Dead Sea salts with our naturally derived active ingredient and calming essential oils. This therapeutic soak helps relax tired muscles, support circulation, and encourage deep relaxation.\n\nWe suggest splitting the bath salts into 2–4 baths depending on the strength you desire.',
    howToUse: 'Simply add to warm bath water and soak away the stress of the day.',
    ingredients:
      'Full-spectrum active ingredient, Therapeutic grade Epsom salts, Dead Sea salts, Australian sun-dried sea salts, MCT oil (fractionated coconut oil), Local French Lavender oil, Rosemary, Frankincense, Eucalyptus, Geranium',
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
    description:
      'These specially formulated treats contain our naturally derived active ingredient to support calmness, comfort, and overall wellbeing for your dog.\n\nMany pet owners use these treats to help support relaxation during stressful situations, ease joint discomfort in older dogs, or simply promote daily balance. Available in two sizes for different dog breeds.',
    ingredients: 'Isolate active ingredient, Pure beef liver, MCT oil',
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
    description:
      'Sometimes the easiest wellness routines are the ones you actually enjoy. Our gummies offer a simple and delicious way to incorporate this active ingredient into your daily routine.\n\nEach gummy contains 20mg of our full-spectrum active ingredient. Flavour: Mixed.',
    ingredients:
      'Full-Spectrum Active ingredient, Glucose syrup, Sucrose, Distilled water, Gelatin, Pectin, Citric acid, Natural flavour, Refined vegetable oil, Beeswax, Carnauba wax, Coconut oil, Vitamin E, Artificial colour',
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
    description:
      'Each capsule contains 30mg of our naturally derived full-spectrum active ingredient, providing a convenient and consistent way to incorporate it into your daily wellness routine. Capsules are ideal for those who prefer a tasteless and easy-to-measure option.',
    ingredients: 'Full-spectrum Active Ingredient, Gelatin, MCT oil',
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
    description:
      'Experience targeted, natural relief where your body needs it most. These vaginal suppositories are designed to support comfort during your cycle by helping ease cramping, tension, and inflammation from within.\n\nIdeal for those seeking a gentle, natural, and effective alternative to traditional pain relief. Each suppository delivers deeply soothing ingredients directly to the source of discomfort. Whether you experience sharp cramps, lower back tension, or pelvic pressure, this formula offers fast-acting and localized support. Many users report a noticeable reduction in pain and muscle tightness within 20–30 minutes of use.\n\n5 suppositories per pack · 50mg per suppository · Full-spectrum oil · Non-psychoactive',
    howToUse:
      'Insert one suppository into the vaginal canal as far up as possible and then lay down with your legs elevated for 10–15 minutes to allow for optimal absorption.\n\nStorage: Store in the fridge upon receiving and only remove immediately before use. If they melt in their plastic mold, they will become solid again once returned to the fridge.',
    ingredients: 'Cocoa butter, coconut oil, active ingredient',
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
    description:
      'Sometimes you want support quickly, especially during moments of sudden stress or tension. Our vape cartridge contains 1000mg of our naturally derived active ingredient in a convenient and fast-acting format.\n\nBecause inhalation allows the compound to enter the bloodstream quickly through the lungs, vaping is often the fastest way to feel the effects. Many customers choose this option when they want rapid support for moments of stress, anxiety, or sudden tension. The effects are typically felt within minutes, making it a popular choice for those who want quick relief and easy dose control.',
    ingredients: 'Full-Spectrum Active Ingredient (Distillate)',
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
    description:
      'When skin feels dry, irritated, or simply tired, the right combination of nourishing ingredients can make all the difference. Our Revive Beauty Cream was created to help restore moisture, calm the skin, and support a healthy glow. We swear, every person who tries this beauty cream becomes obsessed with it and can\'t switch to any other facial creams after using this one!\n\nThis nourishing beauty cream combines botanical oils, vitamins, and our naturally derived active ingredient within a liposomal base designed to help deliver beneficial ingredients deeper into the skin. It helps calm irritation, restore moisture, and promote smoother, healthier-looking skin.',
    ingredients:
      'Transdermal liposome base, Aloe vera, Shea butter, Sweet almond oil, Vitamin E, Hyaluronic acid, Beeswax, Rosehips seed oil, Argan oil, Carrot oil, Sea buckthorn oil, Cacay oil, Essential oils including peppermint, frankincense, helichrysum, camomile, grapefruit, and lavender oil (Non-comedogenic)',
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
    description:
      'Healthy skin often starts with simple, nourishing ingredients used consistently. Our Timeless Aging Serum was created for those who want to support radiant, balanced skin while embracing the natural beauty of aging.\n\nThis lightweight serum combines nourishing plant oils with our naturally derived active ingredient to support calm, balanced, and hydrated skin. Many customers use it to help reduce redness, improve moisture, and soften the appearance of fine lines while promoting a healthy and natural glow.',
    ingredients:
      'Full-spectrum Active Ingredient, MCT oil, Moringa oil, Jojoba oil, Geranium essential oil',
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
    description:
      'Save $10 on this skincare bundle and treat your skin to the ultimate healthy glow! This duo includes our 60ml Timeless Aging Serum and our Revive Beauty Cream — two of our most loved Mary Jay skincare products in one beautifully packaged set.',
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
