'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function AccountPage() {
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegisterPw, setShowRegisterPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [login, setLogin] = useState({ username: '', password: '' });
  const [register, setRegister] = useState({ username: '', email: '', phone: '', password: '' });

  function handleLogin(e: FormEvent) { e.preventDefault(); }
  function handleRegister(e: FormEvent) { e.preventDefault(); }

  return (
    <main className="bg-[#FAF9F6]">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/account-hero-bg.jpg"
          alt="BC forest with Canadian flag"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <h1
          className="relative z-10 text-center text-white font-bold leading-tight px-4"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          My Account
        </h1>
      </section>

      {/* ── Card ──────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-16 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg px-8 py-12 md:px-14 md:py-14">

          <h2
            className="text-center font-bold mb-3"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#131414' }}
          >
            Log In or Create an Account
          </h2>
          <p className="text-center text-[#646464] text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            We have an easy system so you can receive the miracle of CBD at your doorstep.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">

            {/* ── Log In ── */}
            <div>
              <p className="font-bold text-[#131414] text-base mb-5">Log In</p>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Username or email address *"
                  required
                  value={login.username}
                  onChange={(e) => setLogin({ ...login, username: e.target.value })}
                  className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white"
                />
                <div className="relative">
                  <input
                    type={showLoginPw ? 'text' : 'password'}
                    placeholder="Password *"
                    required
                    value={login.password}
                    onChange={(e) => setLogin({ ...login, password: e.target.value })}
                    className="w-full border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPw(!showLoginPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CFCFCF] hover:text-[#447361] transition-colors"
                    aria-label={showLoginPw ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPw ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0013.5 13.5M6.5 6.5A9.77 9.77 0 003 12c1.636 3.938 5.487 6.5 9 6.5a9.77 9.77 0 004.5-1.085M9 9a3 3 0 014.243 4.243" /></svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 accent-[#447361]"
                  />
                  <label htmlFor="remember" className="text-sm text-[#646464]">Remember me</label>
                </div>

                <Link href="/forgot-password" className="text-sm font-medium" style={{ color: '#2F6EB7' }}>
                  Did you lost your password?
                </Link>

                <button
                  type="submit"
                  className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors w-fit"
                >
                  Log In
                </button>
              </form>
            </div>

            {/* Divider (mobile: horizontal, desktop: vertical) */}
            <div className="hidden md:block w-px bg-[#CFCFCF] self-stretch mx-auto" />
            <div className="block md:hidden h-px bg-[#CFCFCF] w-full" />

            {/* ── Register ── */}
            <div className="md:col-start-2 md:row-start-1">
              <p className="font-bold text-[#131414] text-base mb-5">Register</p>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Username *"
                  required
                  value={register.username}
                  onChange={(e) => setRegister({ ...register, username: e.target.value })}
                  className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={register.email}
                  onChange={(e) => setRegister({ ...register, email: e.target.value })}
                  className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white"
                />
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 border border-[#CFCFCF] rounded-lg px-3 py-3 bg-white shrink-0">
                    <span className="text-sm text-[#131414]">+1</span>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#646464" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={register.phone}
                    onChange={(e) => setRegister({ ...register, phone: e.target.value })}
                    className="flex-1 border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white"
                  />
                </div>
                <div className="relative">
                  <input
                    type={showRegisterPw ? 'text' : 'password'}
                    placeholder="Password *"
                    required
                    value={register.password}
                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                    className="w-full border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegisterPw(!showRegisterPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CFCFCF] hover:text-[#447361] transition-colors"
                    aria-label={showRegisterPw ? 'Hide password' : 'Show password'}
                  >
                    {showRegisterPw ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.477A3 3 0 0013.5 13.5M6.5 6.5A9.77 9.77 0 003 12c1.636 3.938 5.487 6.5 9 6.5a9.77 9.77 0 004.5-1.085M9 9a3 3 0 014.243 4.243" /></svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-[#646464] leading-relaxed">
                  Your personal data will be used to support your experience throughout this website,
                  to manage access to your account, and for other purposes described in our{' '}
                  <Link href="/privacy-policy" className="underline" style={{ color: '#447361' }}>privacy policy</Link>.
                </p>
                <button
                  type="submit"
                  className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors w-fit"
                >
                  Register
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
