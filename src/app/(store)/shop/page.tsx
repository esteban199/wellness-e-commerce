'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { products as allProducts, getBasePrice, getBaseImage, ALL_CATEGORIES, type Category } from '@/data/products';

// ─── Adapter: flatten real products into shop-list format ────────────────────

interface ShopProduct {
  name: string;
  slug: string;
  price: number;
  image: string;
  category: string;      // display label (first category)
  categories: string[];  // all categories for filtering
  rating: number;
}

const products: ShopProduct[] = allProducts.map((p) => ({
  name: p.name,
  slug: p.slug,
  price: getBasePrice(p),
  image: getBaseImage(p),
  category: p.categories[0],
  categories: p.categories,
  rating: p.rating,
}));

const PRODUCTS_PER_PAGE = 9;

const PRODUCT_CATEGORIES = ['All Products', ...ALL_CATEGORIES];
const CONDITIONS = ['Joint Pain', 'Skin Irritation', 'Headache', 'Muscle Pain', 'ADHD', 'Artritis'];
const PROMOTIONS = ['New Arrivals', 'Best Sellers', 'On Sale'];
const AVAILABILITY = ['In Stock', 'Best Sellers'];

// Maps URL ?category= slug → one or more product Category values
const SLUG_TO_CATEGORIES: Record<string, Category[]> = {
  'tropicals':      ['Topicals'],
  'topicals':       ['Topicals'],
  'skin-care':      ['Skincare', 'Topicals'],
  'skincare':       ['Skincare'],
  'tinctures':      ['Tinctures'],
  'oils-tinctures': ['Tinctures'],
  'vape':           ['Vape'],
  'pets':           ['Pets'],
  'bath':           ['Bath'],
  'set':            ['Sets'],
  'sets':           ['Sets'],
  'apothecary':     ['Consumables', 'Capsules'],
  'consumables':    ['Consumables'],
  'capsules':       ['Capsules'],
  'therapeutic':    ['Topicals', 'PMS'],
  'pms':            ['PMS'],
  'facial-care':    ['Skincare'],
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  const starClass = size === 'sm' ? 'text-xs' : 'text-sm';

  return (
    <span className={`${starClass} text-amber-400`}>
      {'★'.repeat(full)}
      {hasHalf ? '½' : ''}
      <span className="text-gray-300">{'★'.repeat(empty)}</span>
    </span>
  );
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group py-[3px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-gray-300 accent-[#447361] cursor-pointer"
      />
      <span className="text-sm text-[#131414] group-hover:text-[#447361] transition-colors">{label}</span>
    </label>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="py-4 border-b border-[#CFCFCF] last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between mb-2 text-left"
      >
        <span className="text-sm font-semibold text-[#131414] uppercase tracking-wide">{title}</span>
        <svg
          className={`w-4 h-4 text-[#646464] transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}

function ProductCardItem({ product }: { product: ShopProduct }) {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group">
      {/* Image area */}
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden bg-[#F5F5F0]">
        <div className="relative w-full aspect-square">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        {/* Rating badge */}
        <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1 shadow-sm">
          <span className="text-amber-400 text-xs">★</span>
          <span className="text-xs font-semibold text-[#131414]">{product.rating.toFixed(1)}</span>
        </div>
      </Link>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-[#646464] mb-1">{product.category}</p>
        <Link href={`/product/${product.slug}`} className="flex-1">
          <h3 className="text-sm font-bold text-[#131414] leading-snug line-clamp-2 hover:text-[#447361] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 mb-3">
          <StarRating rating={product.rating} />
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-base font-bold text-[#131414]">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="text-xs font-semibold border border-[#FFB298] text-[#FFB298] hover:bg-[#FFB298] hover:text-white px-3 py-1.5 rounded transition-colors"
          >
            {addedToCart ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function ShopPageInner() {
  const searchParams = useSearchParams();

  // Filter state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedPromotions, setSelectedPromotions] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('Default Sorting');
  const [currentPage, setCurrentPage] = useState(1);

  // Sync category filter from URL ?category= param
  useEffect(() => {
    const slug = searchParams.get('category');
    if (slug) {
      const mapped = SLUG_TO_CATEGORIES[slug.toLowerCase()];
      if (mapped) {
        setSelectedCategories(mapped);
        setCurrentPage(1);
        return;
      }
    }
    setSelectedCategories([]);
  }, [searchParams]);

  // Toggle helpers
  const toggle = <T,>(arr: T[], item: T, set: (v: T[]) => void) => {
    set(arr.includes(item) ? arr.filter((i) => i !== item) : [...arr, item]);
    setCurrentPage(1);
  };

  // Build active filter chips
  const activeChips = useMemo(() => {
    const chips: { label: string; remove: () => void }[] = [];
    selectedCategories.forEach((c) =>
      chips.push({ label: c, remove: () => { setSelectedCategories((p) => p.filter((x) => x !== c)); setCurrentPage(1); } })
    );
    selectedConditions.forEach((c) =>
      chips.push({ label: c, remove: () => { setSelectedConditions((p) => p.filter((x) => x !== c)); setCurrentPage(1); } })
    );
    selectedPromotions.forEach((c) =>
      chips.push({ label: c, remove: () => { setSelectedPromotions((p) => p.filter((x) => x !== c)); setCurrentPage(1); } })
    );
    selectedAvailability.forEach((c) =>
      chips.push({ label: c, remove: () => { setSelectedAvailability((p) => p.filter((x) => x !== c)); setCurrentPage(1); } })
    );
    selectedRatings.forEach((r) =>
      chips.push({ label: `${r} Stars`, remove: () => { setSelectedRatings((p) => p.filter((x) => x !== r)); setCurrentPage(1); } })
    );
    return chips;
  }, [selectedCategories, selectedConditions, selectedPromotions, selectedAvailability, selectedRatings]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedConditions([]);
    setSelectedRatings([]);
    setSelectedPromotions([]);
    setSelectedAvailability([]);
    setSearchQuery('');
    setSearchInput('');
    setCurrentPage(1);
  };

  // Filtered products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }

    if (selectedCategories.length > 0 && !selectedCategories.includes('All Products')) {
      list = list.filter((p) =>
        p.categories.some((cat) => selectedCategories.includes(cat))
      );
    }

    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      list = list.filter((p) => p.rating >= minRating);
    }

    if (sortBy === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'Top Rated') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [searchQuery, selectedCategories, selectedRatings, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );
  const startResult = filteredProducts.length === 0 ? 0 : (currentPage - 1) * PRODUCTS_PER_PAGE + 1;
  const endResult = Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length);

  return (
    <main>
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/about-rooted-bccoast.jpg"
          alt="Shop hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/35" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-playfair text-6xl md:text-7xl font-bold text-white tracking-tight drop-shadow-lg">
            Shop
          </h1>
          <p className="mt-3 text-white/80 text-sm tracking-widest uppercase">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span>Shop</span>
          </p>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <section className="bg-[#FAF9F6] min-h-screen">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── Sidebar ───────────────────────────────────────────────────── */}
            <aside className="w-full lg:w-[280px] flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-base font-bold text-[#131414] mb-3 tracking-wide">Filter Options</h2>
                <hr className="border-[#CFCFCF] mb-2" />

                {/* By Product */}
                <FilterSection title="By Product">
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <FilterCheckbox
                      key={cat}
                      label={cat}
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggle(selectedCategories, cat, setSelectedCategories)}
                    />
                  ))}
                </FilterSection>

                {/* By Condition */}
                <FilterSection title="By Condition">
                  {CONDITIONS.map((cond) => (
                    <FilterCheckbox
                      key={cond}
                      label={cond}
                      checked={selectedConditions.includes(cond)}
                      onChange={() => toggle(selectedConditions, cond, setSelectedConditions)}
                    />
                  ))}
                </FilterSection>

                {/* By Review */}
                <FilterSection title="By Review">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <label key={star} className="flex items-center gap-2 cursor-pointer group py-[3px]">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(star)}
                        onChange={() => toggle(selectedRatings, star, setSelectedRatings)}
                        className="w-4 h-4 rounded border-gray-300 accent-[#447361] cursor-pointer"
                      />
                      <span className="text-amber-400 text-sm">{'★'.repeat(star)}</span>
                      <span className="text-xs text-[#646464]">&amp; up</span>
                    </label>
                  ))}
                </FilterSection>

                {/* By Promotion */}
                <FilterSection title="By Promotion">
                  {PROMOTIONS.map((promo) => (
                    <FilterCheckbox
                      key={promo}
                      label={promo}
                      checked={selectedPromotions.includes(promo)}
                      onChange={() => toggle(selectedPromotions, promo, setSelectedPromotions)}
                    />
                  ))}
                </FilterSection>

                {/* Availability */}
                <FilterSection title="Availability">
                  {AVAILABILITY.map((avail) => (
                    <FilterCheckbox
                      key={avail}
                      label={avail}
                      checked={selectedAvailability.includes(avail)}
                      onChange={() => toggle(selectedAvailability, avail, setSelectedAvailability)}
                    />
                  ))}
                </FilterSection>
              </div>
            </aside>

            {/* ── Right Content ─────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Title + Search */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-[#131414]">
                  Give All You Need
                </h2>
                <form
                  onSubmit={(e) => { e.preventDefault(); setSearchQuery(searchInput); setCurrentPage(1); }}
                  className="flex rounded-full overflow-hidden border border-[#CFCFCF] shadow-sm w-full sm:w-auto"
                >
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search products…"
                    className="px-5 py-2.5 text-sm text-[#131414] bg-white focus:outline-none w-full sm:w-56 placeholder-[#CFCFCF] rounded-l-full"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#FFB298] hover:bg-[#ff9a80] text-white text-sm font-semibold transition-colors whitespace-nowrap rounded-r-full"
                  >
                    Search
                  </button>
                </form>
              </div>

              {/* Active filter chips */}
              {activeChips.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {activeChips.map((chip) => (
                    <span
                      key={chip.label}
                      className="inline-flex items-center gap-1.5 bg-[#447361] text-white text-xs font-medium px-3 py-1.5 rounded-full"
                    >
                      {chip.label}
                      <button
                        onClick={chip.remove}
                        className="hover:text-white/70 transition-colors leading-none"
                        aria-label={`Remove ${chip.label} filter`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearAll}
                    className="text-xs font-semibold text-[#FFB298] hover:underline ml-1"
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* Results count + sort */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#CFCFCF]">
                <p className="text-sm text-[#646464]">
                  Showing{' '}
                  <span className="font-semibold text-[#131414]">{startResult} – {endResult}</span>{' '}
                  of{' '}
                  <span className="font-semibold text-[#131414]">{filteredProducts.length}</span>{' '}
                  results
                </p>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-[#646464] whitespace-nowrap">Sort by</label>
                  <select
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                    className="text-sm border border-[#CFCFCF] rounded-lg px-3 py-2 bg-white text-[#131414] focus:outline-none focus:ring-1 focus:ring-[#447361] cursor-pointer"
                  >
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Top Rated</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                  {paginatedProducts.map((product) => (
                    <ProductCardItem key={product.slug} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                  <p className="text-4xl mb-4">🌿</p>
                  <p className="text-lg font-semibold text-[#131414]">No products found</p>
                  <p className="text-sm text-[#646464] mt-1">Try adjusting your filters or search query.</p>
                  <button
                    onClick={clearAll}
                    className="mt-5 px-5 py-2.5 bg-[#447361] text-white text-sm font-semibold rounded-lg hover:bg-[#385f50] transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1 mt-10">
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
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopPageInner />
    </Suspense>
  );
}
