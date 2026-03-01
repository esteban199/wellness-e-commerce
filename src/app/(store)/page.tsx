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
  { label: 'All Products',  image: '/assets/cat-all-products.png',  href: '/shop' },
  { label: 'Tropicals',     image: '/assets/cat-tropicals.png',     href: '/shop?category=tropicals' },
  { label: 'Skin Care',     image: '/assets/cat-skin-care.png',     href: '/shop?category=skin-care' },
  { label: 'Tinctures',     image: '/assets/cat-tinctures.png',     href: '/shop?category=tinctures' },
  { label: 'Vape',          image: '/assets/cat-vape.png',          href: '/shop?category=vape' },
  { label: 'Pets',          image: '/assets/cat-pets.png',          href: '/shop?category=pets' },
  { label: 'Bath',          image: '/assets/cat-bath.png',          href: '/shop?category=bath' },
  { label: 'Set',           image: '/assets/cat-set.png',           href: '/shop?category=set' },
  { label: 'Apothecary',   image: '/assets/cat-apothecary.png',    href: '/shop?category=apothecary' },
];

const commonSearches = ['Joint Pain', 'Skin Irritation', 'Headache', 'Muscle Pain', 'ADHD'];

const reviews = [
  {
    text: 'After years of dealing with joint pain, WestCoast Wellness products changed my routine. I feel like I\'ve regained mobility naturally and without harsh chemicals.',
    author: 'David R., Ontario',
  },
  {
    text: 'I have been using the Tropical Balm for my joints for 3 months. The results are amazing, truly natural and effective.',
    author: 'Marie, British Columbia',
  },
];

const featuredProducts = [
  { name: 'Mary Jay Skin Duo',                     slug: 'mary-jay-skin-duo',                     price: 140, image: '/assets/product-mary-jay-skin-duo.png',         rating: 4 },
  { name: '60ml Full Spectrum Tincture',           slug: '60ml-full-spectrum-tincture',           price: 95,  image: '/assets/product-60ml-full-spectrum.png',           rating: 5 },
  { name: '140ml Double Strenght Tropical Balm',   slug: '140ml-double-strenght-tropical-balm',   price: 110, image: '/assets/product-140ml-double-strenght.png',         rating: 5 },
  { name: '60ml Hand Crafted Tropical Balm',       slug: '60ml-hand-crafted-tropical-balm',       price: 55,  image: '/assets/product-60ml-hand-crafted.png',             rating: 4 },
];

const newProducts = [
  { name: '30ml Rose Gold Serum',                  slug: '30ml-rose-gold-serum',                  price: 140, image: '/assets/product-30ml-rose-gold-serum.png',          rating: 5 },
  { name: '50ml Rose Gold Tincture',               slug: '50ml-rose-gold-tincture',               price: 95,  image: '/assets/product-50ml-rose-gold-tincture.png',         rating: 5 },
  { name: '4 Vials CBD Natural Suppositories',     slug: '4-vials-cbd-natural-suppositories',     price: 110, image: '/assets/product-4-vials-cbd-suppositories.png',       rating: 5 },
  { name: 'Roll-on Tropical Balm Double Strenght', slug: 'roll-on-tropical-balm-double-strenght', price: 55,  image: '/assets/product-roll-on-tropical-balm.png',           rating: 4 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const prevHero = useCallback(() => setHeroIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length), []);
  const nextHero = useCallback(() => setHeroIndex((i) => (i + 1) % heroSlides.length), []);

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
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/25 to-transparent" />

        <div className="relative w-full px-6 lg:px-16 pt-[136px] pb-24">

          {/* ── Mobile layout ── */}
          <div className="lg:hidden text-white">

            {/* Text block */}
            <h1 className="font-playfair text-[28px] sm:text-[36px] font-bold leading-tight mb-3 tracking-tight drop-shadow-lg whitespace-nowrap">
              West Coast Wellness
            </h1>
            <p className="font-playfair text-base sm:text-lg font-bold text-[#FAF9F6] mb-2 leading-tight drop-shadow-md">
              Home of Sacred Medicinals &amp; Mary Jay Skincare
            </p>
            <p className="text-sm text-[#FAF9F6]/80 mb-6 drop-shadow">
              Premium plant-based wellness crafted with intention.
            </p>
            <div className="flex flex-col gap-3 mb-8 max-w-[300px]">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center bg-[#447361] hover:bg-[#3a6657] text-[#FAF9F6] font-bold px-6 py-4 transition-colors text-sm tracking-wide"
              >
                Shop Sacred Medicinals
              </Link>
              <Link
                href="/shop?collection=mary-jay"
                className="inline-flex items-center justify-center bg-[#FFB298] hover:bg-[#f0a082] font-bold px-6 py-4 transition-colors text-sm tracking-wide"
                style={{ color: '#66473d' }}
              >
                Explore Mary Jay
              </Link>
            </div>

            {/* Carousel product display — image on top, feature card below */}
            <div className="flex flex-col items-center gap-4">
              {/* Product image */}
              <Image
                key={`img-m-${heroIndex}`}
                src={slide.productImage}
                alt={slide.productName}
                width={220}
                height={260}
                priority
                className="object-contain drop-shadow-2xl animate-fade-in"
              />

              {/* Feature card */}
              <div
                className="w-full rounded-[18px] p-5"
                style={{ background: 'rgba(250,249,246,0.45)', border: '2px solid rgba(250,249,246,0.6)' }}
              >
                <p className="font-playfair text-xl font-bold text-[#FAF9F6] leading-tight mb-0.5">{slide.productName}</p>
                <p className="text-[#FAF9F6]/70 text-xs mb-4">{slide.productSub}</p>
                <div className="grid grid-cols-3 gap-3">
                  {slide.features.map((feat) => (
                    <div key={feat.label} className="flex flex-col items-center gap-2 text-center">
                      <Image src={feat.src} alt={feat.label} width={feat.w} height={feat.h} className="w-8 h-8" />
                      <p className="text-[#FAF9F6]/90 text-xs leading-snug">{feat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Desktop layout ── */}
          <div className="hidden lg:grid grid-cols-[1fr_auto_auto] items-center gap-8 max-w-[1400px] mx-auto">

            {/* Left: Text */}
            <div className="text-white">
              <h1 className="font-playfair font-bold leading-none mb-5 tracking-tight drop-shadow-lg whitespace-nowrap" style={{ fontSize: 'clamp(48px, 4.7vw, 90px)' }}>
                West Coast Wellness
              </h1>
              <p className="font-playfair font-bold text-[#FAF9F6] mb-3 leading-tight drop-shadow-md" style={{ fontSize: 'clamp(28px, 2.6vw, 50px)' }}>
                Home of Sacred Medicinals<br />&amp; Mary Jay Skincare
              </p>
              <p className="text-[#FAF9F6]/80 mb-10 drop-shadow" style={{ fontSize: 'clamp(16px, 1.6vw, 30px)' }}>
                Premium plant-based wellness crafted with intention.
              </p>
              <div className="flex gap-3">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-[#447361] hover:bg-[#3a6657] text-[#FAF9F6] font-bold px-8 py-5 transition-colors text-base tracking-wide min-w-[280px]"
                >
                  Shop Sacred Medicinals
                </Link>
                <Link
                  href="/shop?collection=mary-jay"
                  className="inline-flex items-center justify-center bg-[#FFB298] hover:bg-[#f0a082] font-bold px-8 py-5 transition-colors text-base tracking-wide min-w-[280px]"
                  style={{ color: '#66473d' }}
                >
                  Explore Mary Jay
                </Link>
              </div>
            </div>

            {/* Center: Product image */}
            <div className="relative self-end">
              <Image
                key={`img-${heroIndex}`}
                src={slide.productImage}
                alt={slide.productName}
                width={420}
                height={480}
                priority
                className="object-contain drop-shadow-2xl animate-fade-in"
              />
            </div>

            {/* Right: Feature panel */}
            <div
              className="flex flex-col gap-6 self-stretch rounded-[23px] p-7 w-[271px]"
              style={{ background: 'rgba(250,249,246,0.45)', border: '2px solid rgba(250,249,246,0.6)' }}
            >
              <div>
                <p className="font-playfair text-[35px] font-bold text-[#FAF9F6] leading-tight">{slide.productName}</p>
                <p className="text-[#FAF9F6]/70 text-base mt-1">{slide.productSub}</p>
              </div>
              {slide.features.map((feat) => (
                <div key={feat.label} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Image src={feat.src} alt={feat.label} width={feat.w} height={feat.h} className="w-11 h-11" />
                  </div>
                  <p className="text-[#FAF9F6]/90 text-sm leading-snug">{feat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom controls — solid chevrons + solid dots (Figma spec) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
          <button onClick={prevHero} className="hover:opacity-60 transition-opacity" aria-label="Previous slide">
            <svg width="17" height="23" viewBox="0 0 16.6424 23.2841" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.6412 23.2841C15.4303 23.284 15.2248 23.2172 15.0542 23.0932L0.41217 12.4511C0.284506 12.3584 0.180588 12.2368 0.108948 12.0962C0.0373076 11.9555 0 11.8 0 11.6422C0 11.4844 0.0373076 11.3288 0.108948 11.1882C0.180588 11.0476 0.284506 10.926 0.41217 10.8332L15.0542 0.191121C15.2688 0.0351738 15.5365 -0.0291575 15.7985 0.012288C16.0605 0.0537336 16.2952 0.19763 16.4512 0.41219C16.6071 0.62675 16.6715 0.894465 16.63 1.15645C16.5886 1.41844 16.4447 1.65322 16.2302 1.80916L2.70117 11.6422L16.2302 21.4752C16.4011 21.5994 16.5283 21.7745 16.5935 21.9754C16.6587 22.1764 16.6587 22.3928 16.5933 22.5937C16.5279 22.7946 16.4005 22.9697 16.2294 23.0937C16.0584 23.2177 15.8525 23.2844 15.6412 23.2841Z" fill="#447361"/>
            </svg>
          </button>

          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="rounded-full transition-all duration-300 flex-shrink-0"
              style={i === heroIndex
                ? { width: 21, height: 21, backgroundColor: '#447361', opacity: 0.9 }
                : { width: 17, height: 17, backgroundColor: '#447361', opacity: 0.45 }
              }
            />
          ))}

          <button onClick={nextHero} className="hover:opacity-60 transition-opacity" aria-label="Next slide">
            <svg width="17" height="23" viewBox="0 0 16.6424 23.2841" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
              <path d="M15.6412 23.2841C15.4303 23.284 15.2248 23.2172 15.0542 23.0932L0.41217 12.4511C0.284506 12.3584 0.180588 12.2368 0.108948 12.0962C0.0373076 11.9555 0 11.8 0 11.6422C0 11.4844 0.0373076 11.3288 0.108948 11.1882C0.180588 11.0476 0.284506 10.926 0.41217 10.8332L15.0542 0.191121C15.2688 0.0351738 15.5365 -0.0291575 15.7985 0.012288C16.0605 0.0537336 16.2952 0.19763 16.4512 0.41219C16.6071 0.62675 16.6715 0.894465 16.63 1.15645C16.5886 1.41844 16.4447 1.65322 16.2302 1.80916L2.70117 11.6422L16.2302 21.4752C16.4011 21.5994 16.5283 21.7745 16.5935 21.9754C16.6587 22.1764 16.6587 22.3928 16.5933 22.5937C16.5279 22.7946 16.4005 22.9697 16.2294 23.0937C16.0584 23.2177 15.8525 23.2844 15.6412 23.2841Z" fill="#447361"/>
            </svg>
          </button>
        </div>
      </section>

      {/* ── OUR PRODUCTS BY CATEGORY ─────────────────────────────────── */}
      <section className="py-16 bg-[#f5f2ee]">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-5xl font-bold text-[#131414] mb-10">
            Our Products by Category
          </h2>

          {/* 4×2 grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group relative overflow-hidden rounded-xl"
                style={{ aspectRatio: '7/10' }}
              >
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-4 px-4 flex items-center justify-between">
                  <span className="text-[#131414] text-sm font-medium">{cat.label}</span>
                  <svg className="w-4 h-4 text-[#447361] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          {/* Apothecary — last row, left-aligned */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href={categories[8].href}
              className="group relative overflow-hidden rounded-xl"
              style={{ aspectRatio: '7/10' }}
            >
              <Image
                src={categories[8].image}
                alt={categories[8].label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 py-4 px-4 flex items-center justify-between">
                <span className="text-[#131414] text-sm font-medium">{categories[8].label}</span>
                <svg className="w-4 h-4 text-[#447361] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEARCH BY NEED ───────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f2ee]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-[#131414] mb-3">
            Do you have any specific needs?
          </h2>
          <p className="text-gray-500 text-sm mb-10">
            Search here, according to your condition or symptom.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto relative mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What is your condition?"
              className="w-full pl-7 pr-16 py-4 rounded-full border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#3a7667] focus:ring-1 focus:ring-[#3a7667] shadow-sm text-gray-700"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6b7280] hover:bg-[#4b5563] text-white p-3 rounded-full transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>

          {/* Common searches */}
          <p className="text-sm text-gray-500 mb-3">Some common searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {commonSearches.map((s) => (
              <button
                key={s}
                onClick={() => setSearchQuery(s)}
                className="px-5 py-2 rounded-full text-sm bg-[#3a7667] text-white hover:bg-[#2d6a4f] transition-colors font-medium"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ─────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f2ee]">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <div className="flex justify-center mb-4">
            <Image src="/assets/ornament-review.svg" alt="" width={374} height={86} className="w-full max-w-xs opacity-80" />
          </div>
          <h2 className="font-playfair text-4xl font-bold text-[#131414] mb-8">Customer Reviews</h2>

          <div className="relative">
            <button onClick={prevReview} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 text-gray-300 hover:text-[#3a7667] transition-colors" aria-label="Previous review">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="px-10">
              <blockquote className="text-gray-600 text-base leading-relaxed mb-5 text-center">
                &ldquo;{reviews[reviewIndex].text}&rdquo;
              </blockquote>
              <p className="text-sm font-bold text-gray-800">{reviews[reviewIndex].author}</p>
            </div>

            <button onClick={nextReview} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 text-gray-300 hover:text-[#3a7667] transition-colors" aria-label="Next review">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setReviewIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === reviewIndex ? 'bg-[#3a7667]' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f2ee]">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-5xl font-bold text-[#131414] mb-10">Featured Products</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE FEATURES / BENEFITS BAR ──────────────────────────────── */}
      <section className="bg-[#3a7667] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 text-white text-center">
            {[
              { src: '/assets/icon-free-shipping.svg', w: 111, h: 111, label: 'Free Shipping over\n200$' },
              { src: '/assets/icon-high-quality.svg',   w: 91,  h: 111, label: 'High Quality\nProducts' },
              { src: '/assets/icon-natural-organic.svg',w: 121, h: 98,  label: 'Natural and\nOrganic' },
              { src: '/assets/icon-best-prices.svg',    w: 86,  h: 111, label: 'Best Prices' },
            ].map((item, idx) => (
              <div
                key={item.label}
                className={`flex flex-col items-center gap-4 py-6 px-4 ${idx < 3 ? 'border-r border-white/25' : ''}`}
              >
                <Image src={item.src} alt={item.label} width={item.w} height={item.h} className="h-14 w-auto" />
                <p className="text-sm font-medium text-white/90 whitespace-pre-line leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW PRODUCTS ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#f5f2ee]">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-5xl font-bold text-[#131414] mb-10 flex items-center gap-4">
            New Products
            <Image src="/assets/ornament-new-products.svg" alt="" width={108} height={96} className="h-8 w-auto" />
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {newProducts.map((p) => (
              <ProductCard key={p.slug} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SCIENCE & NATURE ─────────────────────────────────────────────── */}
      <section className="bg-[#447361] py-16">
        <div className="container mx-auto px-4">

          {/* Top: 2-column — photo left, title+text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-12">

            {/* Left: Mary Jay serum photo */}
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/assets/science-nature-image.png"
                alt="Science and Nature"
                width={577}
                height={435}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right: title + text + Benefits Subsection label */}
            <div className="text-white pt-4">
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-6">
                Science and Nature in Harmony
              </h2>
              <p className="text-white/75 text-sm leading-relaxed mb-5">
                CBD is a natural compound found in the hemp plant that interacts with your body&apos;s
                endocannabinoid system to promote homeostasis. At WestCoast Wellness, we eliminate myths
                and corporate barriers to offer you a pure, transparent, and effective product.
              </p>
              <p className="text-white/75 text-sm leading-relaxed mb-10">
                This alternative medicine is effective against arthritis, fibromyalgia, migraines, and
                chronic inflammation. Furthermore, its therapeutic use helps control anxiety, insomnia,
                and blood pressure, restoring vitality to those seeking a pure, Costa Rican solution.
              </p>
              <p className="font-playfair text-2xl font-bold text-white">Benefits Subsection</p>
            </div>
          </div>

          {/* Bottom: 3-column horizontal benefits row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pb-4">
            {[
              {
                src: '/assets/icon-inflammatory-relief.svg',
                w: 172, h: 172,
                title: 'Inflammatory Relief',
                desc: 'Effectively reduces chronic inflammation in joints and tissues.',
              },
              {
                src: '/assets/icon-mental-balance.svg',
                w: 172, h: 172,
                title: 'Mental Balance',
                desc: 'A calm mind to face daily challenges with serenity.',
              },
              {
                src: '/assets/icon-physical-recovery.svg',
                w: 172, h: 172,
                title: 'Physical Recovery:',
                desc: 'The perfect ally for rest and regeneration after exertion.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <Image src={item.src} alt={item.title} width={item.w} height={item.h} className="w-16 h-16" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base mb-1">{item.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOTED IN BC ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background: Canadian flag / BC mountains photo */}
        <div className="absolute inset-0">
          <Image
            src="/assets/rooted-in-bc-canadian-bg.png"
            alt="British Columbia"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1b2e23]/70" />
        </div>

        <div className="relative container mx-auto px-4 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: BC lake photo (564×489 from Figma) */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ aspectRatio: '564/489' }}>
              <Image
                src="/assets/rooted-in-bc-bg.png"
                alt="British Columbia landscape"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Right: text */}
            <div className="text-white">
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Rooted in BC,<br />Committed to Your Health
              </h2>
              <p className="text-white/75 text-sm leading-relaxed mb-8">
                We were born in the heart of B.C. with a clear mission: to humanize alternative
                medicine. At Westcoast Wellness, we believe that health shouldn&apos;t be a cold,
                industrial process, but a return to nature. We select each ingredient with botanical
                rigor to ensure that every drop of our products reflects the pure air and strength
                of the Canadian coast.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center bg-[#3a7667] hover:bg-[#2d6a4f] text-white font-semibold px-8 py-4 rounded transition-colors"
              >
                Discover Our Origins
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
