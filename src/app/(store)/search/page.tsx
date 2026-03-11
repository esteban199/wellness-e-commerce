'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

import { products as allProducts, getBasePrice, getBaseImage } from '@/data/products';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Product {
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

const products: Product[] = allProducts.map((p) => ({
  name: p.name,
  slug: p.slug,
  price: getBasePrice(p),
  image: getBaseImage(p),
  category: p.categories[0],
  rating: p.rating,
}));

const PRODUCTS_PER_PAGE = 9;
const SORT_OPTIONS = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Top Rated'];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs font-bold" style={{ color: '#FFB298' }}>
      <span className="text-sm">★</span>
      <span style={{ color: '#131414' }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group flex flex-col">
      <div className="relative w-full overflow-hidden rounded-xl bg-white" style={{ aspectRatio: '1/1' }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="pt-3">
        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-xs text-[#646464]">{product.category}</p>
          <StarRating rating={product.rating} />
        </div>
        <p className="text-sm font-bold text-[#131414] leading-snug mb-1">{product.name}</p>
        <p className="text-sm font-bold text-[#447361]">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

// ─── Inner page (uses useSearchParams) ────────────────────────────────────────

function SearchPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get('q') ?? '';

  const [inputValue, setInputValue] = useState(initialQ);
  const [query, setQuery] = useState(initialQ);
  const [sortBy, setSortBy] = useState('Relevance');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setQuery(initialQ);
    setInputValue(initialQ);
    setCurrentPage(1);
  }, [initialQ]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let result = q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        )
      : products;

    if (sortBy === 'Price: Low to High') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'Top Rated') result = [...result].sort((a, b) => b.rating - a.rating);

    return result;
  }, [query, sortBy]);

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setQuery(inputValue);
    setCurrentPage(1);
    router.push(`/search?q=${encodeURIComponent(inputValue)}`);
  }

  return (
    <main className="bg-[#FAF9F6]">

      {/* ── Hero with search bar ───────────────────────────────────────────────── */}
      <section className="relative min-h-[300px] flex flex-col items-center justify-center gap-6 overflow-hidden pb-12">
        <Image
          src="/assets/search-hero-bg.jpg"
          alt="West Coast Alpines Canada BC"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/35" />

        <h1
          className="relative z-10 text-center text-white font-bold px-4"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          Search Result
        </h1>

        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          className="relative z-10 flex w-full max-w-xl mx-auto px-4"
        >
          <div className="flex w-full rounded-full overflow-hidden shadow-md">
            <div className="flex items-center bg-white px-4">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#CFCFCF" strokeWidth={2}>
                <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-white px-3 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none"
            />
            <button
              type="submit"
              className="bg-[#FFB298] hover:bg-[#f0a082] text-white font-bold px-6 py-3 text-sm transition-colors whitespace-nowrap rounded-r-full"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      {/* ── Results ───────────────────────────────────────────────────────────── */}
      <section className="container mx-auto px-4 py-10">

        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm text-[#646464] font-medium">Active Filters:</span>
            <button className="flex items-center gap-1.5 bg-[#447361] text-white text-xs font-bold px-4 py-2 rounded-full">
              Availability
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            <button className="flex items-center gap-1.5 border border-[#CFCFCF] text-[#646464] text-xs font-bold px-4 py-2 rounded-full hover:border-[#447361] transition-colors">
              Price
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 relative">
              <span className="text-sm text-[#646464]">Sort by:</span>
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-1.5 bg-[#447361] text-white text-xs font-bold px-4 py-2 rounded-full"
              >
                {sortBy}
                <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {showSortMenu && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-[#CFCFCF] rounded-xl shadow-lg z-20 min-w-[180px] overflow-hidden">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSortBy(opt); setShowSortMenu(false); setCurrentPage(1); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#FAF9F6] transition-colors ${sortBy === opt ? 'text-[#447361] font-bold' : 'text-[#131414]'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <span className="text-sm text-[#646464]">{filtered.length} Results</span>
          </div>
        </div>

        {/* Product grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[#646464] text-lg">No products found for &ldquo;{query}&rdquo;.</p>
            <Link href="/shop" className="mt-4 inline-block text-[#447361] font-bold underline text-sm">
              Browse all products
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#CFCFCF] text-[#646464] hover:border-[#447361] hover:text-[#447361] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
              aria-label="Previous page"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-full border text-sm font-medium transition-colors ${
                  page === currentPage
                    ? 'bg-[#447361] border-[#447361] text-white'
                    : 'border-[#CFCFCF] text-[#646464] hover:border-[#447361] hover:text-[#447361]'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[#CFCFCF] text-[#646464] hover:border-[#447361] hover:text-[#447361] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}

      </section>
    </main>
  );
}

// ─── Page export wrapped in Suspense (required for useSearchParams) ────────────

export default function SearchPage() {
  return (
    <Suspense>
      <SearchPageInner />
    </Suspense>
  );
}
