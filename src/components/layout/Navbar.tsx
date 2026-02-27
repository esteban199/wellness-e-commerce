'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import Logo from './Logo';
import { useCartStore } from '@/store/cartStore';

const shopCategories = [
  { label: 'Oils & Tinctures', href: '/shop?category=oils-tinctures' },
  { label: 'Skin Care', href: '/shop?category=skin-care' },
  { label: 'Therapeutic Line', href: '/shop?category=therapeutic' },
  { label: 'Facial Care', href: '/shop?category=facial-care' },
  { label: 'All Products', href: '/shop' },
];

const aboutLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [shopOpen, setShopOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const itemCount = useCartStore((s) => s.itemCount());

  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-white/30 shadow-sm">
      <nav className="container mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-6">

        {/* ── Logo ── */}
        <Logo size={64} />

        {/* ── Desktop Nav links ── */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-800">
          <Link href="/" className="hover:text-[#3a7667] transition-colors">
            Home
          </Link>

          {/* Shop dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <button className="flex items-center gap-1.5 hover:text-[#3a7667] transition-colors">
              Shop
              <svg
                className={`w-3 h-3 transition-transform ${shopOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {shopOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white shadow-xl rounded-xl py-2 z-50 border border-gray-100">
                {shopCategories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#3a7667] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button className="flex items-center gap-1.5 hover:text-[#3a7667] transition-colors">
              About
              <svg
                className={`w-3 h-3 transition-transform ${aboutOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {aboutOpen && (
              <div className="absolute top-full left-0 mt-2 w-44 bg-white shadow-xl rounded-xl py-2 z-50 border border-gray-100">
                {aboutLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#3a7667] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right side actions ── */}
        <div className="hidden lg:flex items-center gap-5 text-sm text-gray-800">

          {/* Search */}
          {searchOpen ? (
            <input
              autoFocus
              type="text"
              placeholder="Search products..."
              className="border border-gray-300 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-[#3a7667] w-48 transition-all"
              onBlur={() => setSearchOpen(false)}
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 hover:text-[#3a7667] transition-colors"
            >
              {/* Circle search icon */}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
              Search
            </button>
          )}

          {/* Cart — real SVG icon + black badge */}
          <Link href="/cart" className="flex items-center gap-2 hover:text-[#3a7667] transition-colors relative">
            <div className="relative">
              <Image
                src="/assets/icon-cart.svg"
                alt="Cart"
                width={35}
                height={46}
              />
              {/* Badge — sits on the dark circle of the SVG */}
              <span className="absolute top-[18.4px] right-[9.6px] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {itemCount}
              </span>
            </div>
            Cart
          </Link>

          {/* Calculate Dose */}
          <Link href="/cbd-calculator" className="hover:text-[#3a7667] transition-colors whitespace-nowrap">
            Calculate Dose
          </Link>

          {/* My Account */}
          <Link href="/account" className="hover:text-[#3a7667] transition-colors whitespace-nowrap">
            My Account
          </Link>

          {/* Language */}
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button className="flex items-center gap-1.5 hover:text-[#3a7667] transition-colors">
              <svg
                className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              EN
              <Image
                src="/assets/icon-world.svg"
                alt="Language"
                width={41}
                height={41}
                className="w-5 h-5"
              />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white shadow-xl rounded-xl py-2 z-50 border border-gray-100">
                <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 font-medium text-[#3a7667]">
                  EN — English
                </button>
                <button className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                  ES — Español
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Mobile menu button ── */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-4 space-y-3">
          <Link href="/" className="block py-2 text-gray-700 hover:text-[#3a7667]" onClick={() => setMobileOpen(false)}>Home</Link>
          <div>
            <p className="py-2 text-gray-400 text-xs uppercase tracking-wider font-medium">Shop</p>
            {shopCategories.map((item) => (
              <Link key={item.href} href={item.href} className="block py-1.5 pl-3 text-gray-700 hover:text-[#3a7667]" onClick={() => setMobileOpen(false)}>
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/about" className="block py-2 text-gray-700 hover:text-[#3a7667]" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" className="block py-2 text-gray-700 hover:text-[#3a7667]" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/cbd-calculator" className="block py-2 text-gray-700 hover:text-[#3a7667]" onClick={() => setMobileOpen(false)}>Calculate Dose</Link>
          <Link href="/account" className="block py-2 text-gray-700 hover:text-[#3a7667]" onClick={() => setMobileOpen(false)}>My Account</Link>
          <Link href="/cart" className="block py-2 text-gray-700 hover:text-[#3a7667]" onClick={() => setMobileOpen(false)}>
            Cart ({itemCount})
          </Link>
        </div>
      )}
    </header>
  );
}
