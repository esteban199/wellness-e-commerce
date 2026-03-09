'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { FormEvent } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', comment: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="bg-[#FAF9F6]">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[360px] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/contact-hero-bg.jpg"
          alt="BC coast landscape"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 to-black/25" />
        <h1
          className="relative z-10 text-center text-white font-bold leading-tight px-4"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          How can we help you?
        </h1>
      </section>

      {/* ── Form card ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-16 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg px-8 py-12 md:px-14 md:py-14">

          <h2
            className="text-center font-bold mb-4"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#131414' }}
          >
            Leave us a message
          </h2>
          <p className="text-center text-[#646464] text-sm md:text-base leading-relaxed mb-10 max-w-xl mx-auto">
            At West Coast Wellness we are always looking to improve. If you have any questions about
            our products, or would like more information, please don&rsquo;t hesitate to contact us.
          </p>

          {sent ? (
            <div className="text-center py-10">
              <p className="text-[#447361] font-bold text-lg">Thank you! We&rsquo;ll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Row: Name / Email / Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white"
                />
              </div>

              {/* Comment */}
              <textarea
                placeholder="Comment"
                rows={5}
                value={form.comment}
                onChange={(e) => setForm({ ...form, comment: e.target.value })}
                className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white resize-none"
              />

              <div>
                <button
                  type="submit"
                  className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

    </main>
  );
}
