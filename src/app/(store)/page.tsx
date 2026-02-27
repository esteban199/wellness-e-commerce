'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import ProductCard from '@/components/shop/ProductCard';

// ─── Data ────────────────────────────────────────────────────────────────────

const heroSlides = [
  {
    productImage: '/assets/tropical-balm-140ml.png',
    productName: 'Tropical Balm',
    productSub: 'Hand Crafted Tropicals',
    features: [
      { src: '/assets/icon-double-efficiency.svg', w: 55, h: 55, label: 'Double Potency Formula' },
      { src: '/assets/icon-dual-thermal.svg', w: 43, h: 59, label: 'Dual Thermal Effect' },
      { src: '/assets/icon-natural-medicine.svg', w: 58, h: 51, label: 'Origin Natural and Medicinal' },
    ],
  },
  {
    productImage: '/assets/tropical-balm-140ml.png',
    productName: 'Tropical Balm',
    productSub: 'Hand Crafted Tropicals',
    features: [
      { src: '/assets/icon-double-efficiency.svg', w: 55, h: 55, label: 'Double Potency Formula' },
      { src: '/assets/icon-dual-thermal.svg', w: 43, h: 59, label: 'Dual Thermal Effect' },
      { src: '/assets/icon-natural-medicine.svg', w: 58, h: 51, label: 'Origin Natural and Medicinal' },
    ],
  },
  {
    productImage: '/assets/tropical-balm-140ml.png',
    productName: 'Tropical Balm',
    productSub: 'Hand Crafted Tropicals',
    features: [
      { src: '/assets/icon-double-efficiency.svg', w: 55, h: 55, label: 'Double Potency Formula' },
      { src: '/assets/icon-dual-thermal.svg', w: 43, h: 59, label: 'Dual Thermal Effect' },
      { src: '/assets/icon-natural-medicine.svg', w: 58, h: 51, label: 'Origin Natural and Medicinal' },
    ],
  },
];

const categories = [
  { label: 'Oil Tinctures', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop', href: '/shop?category=oil-tinctures' },
  { label: 'Tinctures', image: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400&h=400&fit=crop', href: '/shop?category=tinctures' },
  { label: 'Skin Care', image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', href: '/shop?category=skin-care' },
  { label: 'Tinctures', image: 'https://images.unsplash.com/photo-1611003229011-e56e0e62e4e1?w=400&h=400&fit=crop', href: '/shop?category=tinctures-2' },
  { label: 'Vape', image: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=400&h=400&fit=crop', href: '/shop?category=vape' },
  { label: 'Pets', image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', href: '/shop?category=pets' },
  { label: 'Gum', image: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=400&h=400&fit=crop', href: '/shop?category=gum' },
  { label: 'Gel', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', href: '/shop?category=gel' },
  { label: 'Aromatherapy', image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop', href: '/shop?category=aromatherapy' },
];

const symptoms = [
  'Sleeping', 'Stress', 'Pain', 'Anxiety', 'Inflammation',
  'Focus', 'Energy', 'Mood', 'Digestion', 'Skin',
];

const reviews = [
  {
    text: 'Westcoast Wellness has completely transformed my daily routine. Their CBD tincture has helped me manage my chronic pain and I sleep so much better now.',
    author: 'Garcell, Ontario',
  },
  {
    text: 'I have been using the Tropical Balm for my joints for 3 months. The results are amazing, truly natural and effective.',
    author: 'Marie, British Columbia',
  },
  {
    text: 'Best CBD products I\'ve tried in Canada. Fast shipping and incredible quality. The Skin Care line is absolutely wonderful.',
    author: 'James, Alberta',
  },
];

const featuredProducts = [
  { name: 'Mary Jay Skin Duo', slug: 'mary-jay-skin-duo', price: 140, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', rating: 5 },
  { name: '60ml Full Spectrum Tincture', slug: '60ml-full-spectrum-tincture', price: 95, image: 'https://images.unsplash.com/photo-1611003228941-98852ba62227?w=400&h=400&fit=crop', rating: 5 },
  { name: '140ml Double Strength Tropical Balm', slug: '140ml-double-strength-tropical-balm', price: 110, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop', rating: 5 },
  { name: '60ml Hand Crafted Tropical Balm', slug: '60ml-hand-crafted-tropical-balm', price: 55, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop', rating: 5 },
];

const newProducts = [
  { name: '10ml Rose Gold Serum', slug: '10ml-rose-gold-serum', price: 140, image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop', rating: 5 },
  { name: '10ml Rose Gold Tincture', slug: '10ml-rose-gold-tincture', price: 95, image: 'https://images.unsplash.com/photo-1611003229011-e56e0e62e4e1?w=400&h=400&fit=crop', rating: 5 },
  { name: '4 Vials CBD Natural Suppositories', slug: '4-vials-cbd-natural-suppositories', price: 110, image: 'https://images.unsplash.com/photo-1600803907087-f56d462fd26b?w=400&h=400&fit=crop', rating: 5 },
  { name: 'Roll-on Tropical Balm Double Strength', slug: 'roll-on-tropical-balm-double-strength', price: 55, image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop', rating: 5 },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} className={`w-3.5 h-3.5 ${s <= rating ? 'text-amber-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);

  const prevHero = useCallback(() => setHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length), []);
  const nextHero = useCallback(() => setHeroIndex((i) => (i + 1) % heroSlides.length), []);

  // Auto-advance carousel every 6 seconds
  useEffect(() => {
    const t = setInterval(nextHero, 6000);
    return () => clearInterval(t);
  }, [nextHero]);

  const prevReview = () => setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length);

  const slide = heroSlides[heroIndex];

  return (
    <main>

      {/* ── HERO CAROUSEL ─────────────────────────────────────────────── */}
      <section
        className="relative min-h-[88vh] flex items-center -mt-[120px] select-none"
        style={{ backgroundImage: 'url(/assets/hero-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        onTouchStart={(e) => {
          const x = e.touches[0].clientX;
          (e.currentTarget as HTMLElement).dataset.touchX = String(x);
        }}
        onTouchEnd={(e) => {
          const startX = Number((e.currentTarget as HTMLElement).dataset.touchX ?? 0);
          const diff = startX - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) diff > 0 ? nextHero() : prevHero();
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

        {/* Slide content */}
        <div className="relative w-full px-8 lg:px-16 pt-[136px] pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] items-end gap-8 max-w-[1400px] mx-auto">

            {/* Left: Text */}
            <div className="text-white">
              <h1 className="text-6xl lg:text-8xl font-bold leading-none mb-4 tracking-tight">
                WestCoast Wellness
              </h1>
              <p className="text-xl lg:text-2xl font-semibold italic text-white mb-2">
                Home of Sacred Medicinals<br />&amp; Mary Jay Skincare
              </p>
              <p className="text-sm text-white/70 mb-8">
                Premium plant-based wellness crafted with intention.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/shop" className="inline-flex items-center bg-[#3a7667] hover:bg-[#2d6a4f] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
                  Shop Sacred Medicinals
                </Link>
                <Link href="/shop?collection=mary-jay" className="inline-flex items-center bg-[#c97b5a] hover:bg-[#b86b4a] text-white font-semibold px-7 py-3 rounded-full transition-colors text-sm">
                  Explore Mary Jay
                </Link>
              </div>
            </div>

            {/* Center: Product image — animates on slide change */}
            <div className="hidden lg:block relative self-end">
              <Image
                key={`img-${heroIndex}`}
                src={slide.productImage}
                alt={slide.productName}
                width={360}
                height={400}
                priority
                className="object-contain drop-shadow-2xl animate-fade-in"
              />
            </div>

            {/* Right: Glassmorphism feature card */}
            <div className="hidden lg:flex flex-col gap-4 self-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 w-52">
              <div>
                <p className="text-white font-bold text-lg leading-tight">{slide.productName}</p>
                <p className="text-white/60 text-xs mt-0.5">{slide.productSub}</p>
              </div>
              <div className="w-full h-px bg-white/20" />
              {slide.features.map((feat) => (
                <div key={feat.label} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
                    <Image src={feat.src} alt={feat.label} width={feat.w} height={feat.h} className="w-7 h-7" />
                  </div>
                  <p className="text-white/80 text-xs leading-tight">{feat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom controls: ‹ • • • › */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
          <button
            onClick={prevHero}
            className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous slide"
          >
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none"><path d="M5 1L1 5.5L5 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full border border-white/60 transition-all duration-300 ${i === heroIndex ? 'bg-white scale-110' : 'bg-transparent hover:bg-white/40'}`}
            />
          ))}

          <button
            onClick={nextHero}
            className="w-7 h-7 rounded-full border border-white/60 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next slide"
          >
            <svg width="6" height="11" viewBox="0 0 6 11" fill="none"><path d="M1 1L5 5.5L1 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────────────────── */}
      <section id="categories" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">Our Products By Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.label + cat.href}
                href={cat.href}
                className="group text-center"
              >
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700 group-hover:text-[#2d6a4f] transition-colors">
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
          {/* Aromatherapy centered */}
          <div className="mt-4 flex justify-start sm:justify-center">
            <Link href={categories[8].href} className="group text-center w-1/2 sm:w-1/4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2 shadow-sm group-hover:shadow-md transition-shadow">
                <Image
                  src={categories[8].image}
                  alt={categories[8].label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
              </div>
              <p className="text-sm font-medium text-gray-700 group-hover:text-[#2d6a4f] transition-colors">
                {categories[8].label}
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SPECIFIC NEEDS ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Do you have any specific needs?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Search here according to your condition or symptom
          </p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative mb-6">
            <input
              type="text"
              placeholder="Search by condition..."
              className="w-full pl-5 pr-12 py-3 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#2d6a4f] focus:ring-1 focus:ring-[#2d6a4f] shadow-sm"
            />
            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#2d6a4f] text-white p-2 rounded-full hover:bg-[#1b4332] transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Symptom pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {symptoms.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSymptom(activeSymptom === s ? null : s)}
                className={`px-4 py-1.5 rounded-full text-sm border transition-colors ${
                  activeSymptom === s
                    ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                    : 'border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#2d6a4f] hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          {/* Decorative ornament */}
          <div className="flex justify-center mb-4">
            <Image
              src="/assets/ornament-review.svg"
              alt=""
              width={374}
              height={86}
              className="w-full max-w-xs opacity-80"
            />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customer Reviews</h2>

          {/* Review carousel */}
          <div className="relative">
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 text-gray-300 hover:text-[#2d6a4f] transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="px-8">
              <div className="flex justify-center mb-3">
                <StarRating rating={5} />
              </div>
              <blockquote className="text-gray-600 text-sm leading-relaxed italic mb-4">
                &ldquo;{reviews[reviewIndex].text}&rdquo;
              </blockquote>
              <p className="text-sm font-semibold text-gray-800">— {reviews[reviewIndex].author}</p>
            </div>

            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 text-gray-300 hover:text-[#2d6a4f] transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-1.5 mt-6">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${i === reviewIndex ? 'bg-[#2d6a4f]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800">Featured Products</h2>
            <Link href="/shop" className="text-sm text-[#2d6a4f] hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS BAR ─────────────────────────────────────────────────── */}
      <section className="bg-[#2d6a4f] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-white text-center">
            {[
              { src: '/assets/icon-free-shipping.svg', w: 111, h: 111, label: 'Free Shipping over 200$' },
              { src: '/assets/icon-high-quality.svg', w: 91, h: 111, label: 'High Quality Products' },
              { src: '/assets/icon-natural-organic.svg', w: 121, h: 98, label: 'Natural and Organic' },
              { src: '/assets/icon-best-prices.svg', w: 86, h: 111, label: 'Best Prices' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-3">
                <Image
                  src={item.src}
                  alt={item.label}
                  width={item.w}
                  height={item.h}
                  className="h-14 w-auto"
                />
                <p className="text-sm font-medium text-white/90">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW PRODUCTS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-3">
              New Products
              <Image
                src="/assets/ornament-new-products.svg"
                alt=""
                width={108}
                height={96}
                className="h-7 w-auto"
              />
            </h2>
            <Link href="/shop?filter=new" className="text-sm text-[#2d6a4f] hover:underline font-medium">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {newProducts.map((p) => (
              <ProductCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SCIENCE & NATURE ─────────────────────────────────────────────── */}
      <section className="bg-[#1b2e23]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Product image */}
            <div className="relative min-h-[420px] lg:min-h-[500px]">
              <Image
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=800&fit=crop"
                alt="Science and Nature"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Text content */}
            <div className="py-16 px-8 lg:px-12 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Science and Nature in Harmony
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-10">
                Our products combine cutting-edge science with the finest natural ingredients,
                carefully selected from the Pacific coast. Each formula is designed to support
                your body&apos;s natural balance and promote lasting wellbeing.
              </p>

              <div className="space-y-7">
                {[
                  {
                    src: '/assets/icon-inflammatory-relief.svg',
                    w: 172, h: 172,
                    title: 'Inflammatory Relief',
                    desc: 'Natural compounds that help reduce inflammation and support recovery.',
                  },
                  {
                    src: '/assets/icon-mental-balance.svg',
                    w: 172, h: 172,
                    title: 'Mental Balance',
                    desc: 'Support cognitive clarity, reduce anxiety, and promote calm focus.',
                  },
                  {
                    src: '/assets/icon-physical-recovery.svg',
                    w: 172, h: 172,
                    title: 'Physical Recovery',
                    desc: 'Formulas that ease joint stiffness and support active lifestyles.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-5">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.src}
                        alt={item.title}
                        width={item.w}
                        height={item.h}
                        className="w-14 h-14"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROOTED IN BC ─────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&h=800&fit=crop"
            alt="British Columbia nature"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1b2e23]/80" />
        </div>
        <div className="relative container mx-auto px-4 max-w-2xl text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Rooted in BC, Committed to Your Health
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8">
            Born from the pristine landscapes of British Columbia, our products reflect our deep
            commitment to quality, sustainability, and the communities we serve. Every ingredient
            is thoughtfully sourced and rigorously tested.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 bg-white text-[#2d6a4f] font-semibold px-8 py-3 rounded hover:bg-gray-100 transition-colors"
          >
            Discover Our Origin
          </Link>
        </div>
      </section>

    </main>
  );
}
