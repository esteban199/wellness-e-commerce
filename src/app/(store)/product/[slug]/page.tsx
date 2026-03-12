'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, type ProductVariant } from '@/data/products';
import { useCartStore } from '@/store/cartStore';

// ─── Helper: star renderer ────────────────────────────────────────────────────

function Stars({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' }) {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = rating >= i;
        const half = !filled && rating >= i - 0.5;
        return (
          <svg
            key={i}
            className={`${starSize} flex-shrink-0`}
            viewBox="0 0 20 20"
            fill={filled || half ? '#F59E0B' : 'none'}
            stroke="#F59E0B"
            strokeWidth="1.5"
          >
            {half ? (
              <>
                <defs>
                  <linearGradient id={`half-${i}`} x1="0" x2="1" y1="0" y2="0">
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="50%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path
                  fill={`url(#half-${i})`}
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </>
            ) : (
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            )}
          </svg>
        );
      })}
    </span>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product?.variants[0] ?? { id: '', label: '', price: 0, image: '' }
  );
  const [selectedFlavour, setSelectedFlavour] = useState(product?.flavours?.[0] ?? '');
  const [selectedAddon, setSelectedAddon] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'application' | 'reviews'>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  // Deduplicated thumbnail images across all variants
  const thumbnails = useMemo(() => {
    if (!product) return [];
    const seen = new Set<string>();
    return product.variants
      .map((v) => v.image)
      .filter((img) => {
        if (seen.has(img)) return false;
        seen.add(img);
        return true;
      });
  }, [product]);

  const [mainImage, setMainImage] = useState(thumbnails[0] ?? '');

  const tabs = [
    { key: 'description', label: 'Description' },
    { key: 'application', label: 'Application' },
    { key: 'reviews', label: 'Reviews' },
  ] as const;

  // ── Not found ──
  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#FAF9F6]">
        <p className="font-playfair text-3xl font-bold text-[#131414]">Product not found</p>
        <Link href="/shop" className="text-[#447361] hover:underline text-sm font-semibold">
          ← Back to Shop
        </Link>
      </main>
    );
  }

  function handleAddToCart() {
    addItem({
      id: selectedVariant.id,
      slug: product!.slug,
      name: `${product!.name}${selectedFlavour ? ` — ${selectedFlavour}` : ''}`,
      variant: selectedVariant.label,
      price: selectedVariant.price + (selectedAddon ? (product!.addons?.find((a) => a.id === selectedAddon)?.price ?? 0) : 0),
      image: selectedVariant.image,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  // Description paragraphs (split on \n\n)
  const descParagraphs = product.description.split('\n\n').filter(Boolean);
  const howToUseParagraphs = product.howToUse?.split('\n\n').filter(Boolean) ?? [];

  return (
    <main className="bg-[#FAF9F6]">

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[280px] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/about-glad-product-line.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/35" />
        <h1 className="relative z-10 font-playfair text-4xl md:text-5xl font-bold text-white tracking-wide text-center px-4">
          Product Details
        </h1>
      </section>

      {/* ── Product Section ─────────────────────────────────────────────── */}
      <section className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">

            {/* Left: images */}
            <div className="w-full lg:w-[45%] flex flex-col gap-4">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white shadow-sm">
                <Image
                  src={mainImage || selectedVariant.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  priority
                />
              </div>

              {thumbnails.length > 1 && (
                <div className="flex gap-3">
                  {thumbnails.map((img) => (
                    <button
                      key={img}
                      onClick={() => setMainImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        (mainImage || selectedVariant.image) === img
                          ? 'border-[#447361] shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: details */}
            <div className="w-full lg:w-[55%] flex flex-col gap-5">

              {/* Brand + category */}
              <p className="text-sm text-[#646464] tracking-widest uppercase">
                {product.brand} · {product.categories[0]}
              </p>

              {/* Product name */}
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-[#131414] leading-tight -mt-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Stars rating={product.rating} />
                <span className="text-sm text-[#646464]">{product.rating} Stars</span>
              </div>

              {/* Price */}
              <p className="text-3xl font-bold text-[#447361]">
                ${selectedVariant.price.toFixed(2)}
              </p>

              {/* Short description (first paragraph only) */}
              <p className="text-sm text-[#646464] leading-relaxed">
                {descParagraphs[0]}
              </p>

              <div className="w-full h-px bg-gray-200" />

              {/* Variants */}
              {product.variants.length > 1 && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-[#131414]">Size / Strength</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          setSelectedVariant(v);
                          setMainImage(v.image);
                        }}
                        className={`px-4 py-1.5 text-sm border rounded-full transition-all ${
                          selectedVariant.id === v.id
                            ? 'bg-[#447361] text-white border-[#447361]'
                            : 'bg-white text-[#131414] border-gray-300 hover:border-[#447361]'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavours */}
              {product.flavours && product.flavours.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-[#131414]">Flavour</p>
                  <div className="flex flex-wrap gap-2">
                    {product.flavours.map((f) => (
                      <button
                        key={f}
                        onClick={() => setSelectedFlavour(f)}
                        className={`px-4 py-1.5 text-sm border rounded-full transition-all ${
                          selectedFlavour === f
                            ? 'bg-[#447361] text-white border-[#447361]'
                            : 'bg-white text-[#131414] border-gray-300 hover:border-[#447361]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Addons */}
              {product.addons && product.addons.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-[#131414]">Add-ons</p>
                  <div className="flex flex-wrap gap-2">
                    {product.addons.map((a) => (
                      <button
                        key={a.id}
                        onClick={() => setSelectedAddon(selectedAddon === a.id ? '' : a.id)}
                        className={`px-4 py-1.5 text-sm border rounded-full transition-all ${
                          selectedAddon === a.id
                            ? 'bg-[#447361] text-white border-[#447361]'
                            : 'bg-white text-[#131414] border-gray-300 hover:border-[#447361]'
                        }`}
                      >
                        {a.label} (+${a.price})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full h-px bg-gray-200" />

              {/* Quantity + Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-lg text-[#131414] hover:bg-gray-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-sm font-semibold text-[#131414] border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 flex items-center justify-center text-lg text-[#131414] hover:bg-gray-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="px-8 py-3 bg-[#447361] text-white text-sm font-semibold hover:bg-[#365c4e] transition-colors tracking-wide"
                >
                  {addedToCart ? '✓ Added!' : 'Add to Cart'}
                </button>

                <button className="px-6 py-3 bg-[#FFB298] text-[#66473d] text-sm font-semibold hover:bg-[#f0a085] transition-colors tracking-wide">
                  Buy Now
                </button>
              </div>

              {/* Categories */}
              <p className="text-sm text-[#646464]">
                <span className="font-semibold text-[#131414]">Categories: </span>
                {product.categories.join(', ')}
              </p>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#131414]">Share:</span>
                <a href="#" aria-label="Share on Instagram" className="text-[#646464] hover:text-[#447361] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" aria-label="Share on Pinterest" className="text-[#646464] hover:text-[#447361] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                  </svg>
                </a>
                <a href="#" aria-label="Share on Facebook" className="text-[#646464] hover:text-[#447361] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tabs Section ────────────────────────────────────────────────── */}
      <section className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab bar */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative flex-shrink-0 px-8 py-4 text-sm font-semibold tracking-wide transition-colors ${
                  activeTab === tab.key
                    ? 'text-[#447361]'
                    : 'text-[#646464] hover:text-[#131414]'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#447361]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-10">

            {/* Description tab */}
            {activeTab === 'description' && (
              <div className="max-w-3xl flex flex-col gap-4">
                <h3 className="font-playfair text-2xl font-bold text-[#131414]">
                  {product.name}
                </h3>
                {descParagraphs.map((para, i) => (
                  <p key={i} className="text-[#646464] leading-relaxed">{para}</p>
                ))}

                {product.ingredients && (
                  <>
                    <h4 className="font-semibold text-[#131414] mt-4">Ingredients</h4>
                    <p className="text-[#646464] leading-relaxed text-sm">{product.ingredients}</p>
                  </>
                )}
              </div>
            )}

            {/* Application tab */}
            {activeTab === 'application' && (
              <div className="max-w-3xl flex flex-col gap-4">
                <h3 className="font-playfair text-2xl font-bold text-[#131414]">
                  How to Use
                </h3>

                {howToUseParagraphs.length > 0 ? (
                  howToUseParagraphs.map((para, i) => (
                    <p key={i} className="text-[#646464] leading-relaxed">{para}</p>
                  ))
                ) : (
                  <p className="text-[#646464] leading-relaxed">
                    Apply as directed on the product label. For best results, consult a healthcare professional.
                  </p>
                )}

                {product.ingredients && (
                  <>
                    <h4 className="font-semibold text-[#131414] mt-4">Ingredients</h4>
                    <p className="text-[#646464] leading-relaxed text-sm">{product.ingredients}</p>
                  </>
                )}
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === 'reviews' && (
              <ReviewsTab productRating={product.rating} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Reviews tab sub-component ────────────────────────────────────────────────

const MOCK_REVIEWS = [
  {
    name: 'Amelia Christon',
    member: 'Member since Jan 2024',
    time: '1 month ago',
    rating: 4.5,
    title: 'Absolutely love this product!',
    text: "My skin has always had trouble staying moisturised, which causes a lot of irritation. With this product, I was able to restore my skin's moisture and also relieve the constant irritation.",
    images: ['/assets/products/revive-beauty-cream.jpg'],
  },
  {
    name: 'Carlota Bilches',
    member: 'Member since Jan 2024',
    time: '2 months ago',
    rating: 5,
    title: 'My first option',
    text: "It's one of my main cosmetics after bathing. It has a cool, minty effect and keeps my skin feeling great, and it greatly relieves the pain in my joints.",
    images: [],
  },
];

type Review = typeof MOCK_REVIEWS[number];

function ReviewsTab({ productRating }: { productRating: number }) {
  return (
    <div className="max-w-4xl flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-playfair text-2xl font-bold text-[#131414]">Review List</h3>
          <p className="text-sm text-[#646464] mt-1">
            Showing 1–{MOCK_REVIEWS.length} of {MOCK_REVIEWS.length} results
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#646464]">Sort by:</span>
          <select className="text-sm border border-gray-300 rounded px-3 py-1.5 text-[#131414] bg-white focus:outline-none focus:ring-1 focus:ring-[#447361]">
            <option>Newest</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-[#FAF9F6] rounded-lg border border-gray-100">
        <p className="text-5xl font-bold text-[#131414]">{productRating}</p>
        <div className="flex flex-col gap-1">
          <Stars rating={productRating} />
          <p className="text-sm text-[#646464]">Based on {MOCK_REVIEWS.length} reviews</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {MOCK_REVIEWS.map((review, idx) => (
          <ReviewCard key={idx} review={review} />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-[#447361] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="text-sm font-semibold text-[#131414]">{review.name}</p>
          <p className="text-xs text-[#646464]">{review.member}</p>
          <p className="text-xs text-[#646464]">{review.time}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-[#131414]">Qualification:</span>
        <Stars rating={review.rating} size="sm" />
        <span className="text-xs text-[#646464]">{review.rating} Stars</span>
      </div>

      <p className="font-semibold text-[#131414]">{review.title}</p>
      <p className="text-sm text-[#646464] leading-relaxed">{review.text}</p>

      {review.images.length > 0 && (
        <div className="flex gap-2 mt-1">
          {review.images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
              <Image src={img} alt={`Review photo ${i + 1}`} fill className="object-cover" sizes="80px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
