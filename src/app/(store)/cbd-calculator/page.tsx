'use client';

import Image from 'next/image';
import { useState, useMemo } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CONDITIONS = [
  { value: 'human-mild',    label: 'Human - Mild (Insomnia, mild anxiety, lifestyle, etc.)',                              factor: 0.5 },
  { value: 'human-medium',  label: 'Human - Medium (Moderate anxiety, headaches, moderate pain, etc.)',                   factor: 1.0 },
  { value: 'human-severe',  label: 'Human - Severe (Severe insomnia, chronic pain, epilepsy, fibromyalgia, etc.)',        factor: 2.0 },
  { value: 'pet-mild',      label: 'Pet - Mild (Small pets, mild anxiety, appetite, etc.)',                               factor: 0.2 },
  { value: 'pet-medium',    label: 'Pet - Medium (Medium pets, moderate anxiety, moderate pain, etc.)',                   factor: 0.35 },
  { value: 'pet-severe',    label: 'Pet - Severe (Large pets, severe anxiety, chronic pain, epilepsy, etc.)',             factor: 0.5 },
];

const DROPPER_STRENGTHS = [100, 200, 300, 500, 750, 1000];
const DROPS_PER_ML = 20;
const DROPPER_VOLUME_ML = 1;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CbdCalculatorPage() {
  const [condition, setCondition] = useState('human-mild');
  const [weight, setWeight] = useState(62);
  const [dropperStrength, setDropperStrength] = useState(200);

  const results = useMemo(() => {
    const selectedCondition = CONDITIONS.find((c) => c.value === condition);
    if (!selectedCondition || weight <= 0) return null;

    const dailyMg = Math.round(weight * selectedCondition.factor);
    const dailyMl = Math.round((dailyMg / dropperStrength) * DROPPER_VOLUME_ML * 10) / 10;
    const dailyDrops = Math.round(dailyMl * DROPS_PER_ML);

    return { dailyMg, dailyMl, dailyDrops };
  }, [condition, weight, dropperStrength]);

  return (
    <main className="bg-[#FAF9F6]">

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/cbd-calculator-hero.jpg"
          alt="CBD Cannabis plant"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <h1
          className="relative z-10 text-center text-white font-bold px-4"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          CBD Calculator
        </h1>
      </section>

      {/* ── Calculator card ───────────────────────────────────────────────────── */}
      <section className="relative z-10 -mt-16 pb-20 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Card header */}
          <div className="px-8 pt-10 pb-6">
            <h2
              className="font-bold text-[#131414] leading-snug"
              style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.4rem, 3vw, 1.75rem)' }}
            >
              How much CBD should I take per day?
            </h2>
          </div>

          {/* Form */}
          <div className="px-8 pb-8 flex flex-col gap-6">

            {/* Condition and severity */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#131414]">Condition and severity</label>
              <div className="relative">
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full appearance-none border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#646464] bg-white focus:outline-none focus:border-[#447361] transition-colors pr-10"
                >
                  {CONDITIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="8" fill="none" viewBox="0 0 24 16" stroke="#646464" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 2l10 10L22 2" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Weight + Dropper Strength */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Weight */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#131414]">Weight (Kg)</label>
                <div className="flex items-center border border-[#CFCFCF] rounded-lg overflow-hidden">
                  <input
                    type="number"
                    min={1}
                    max={300}
                    value={weight}
                    onChange={(e) => setWeight(Math.max(1, Number(e.target.value)))}
                    className="flex-1 px-4 py-3 text-sm text-[#646464] bg-white focus:outline-none text-center"
                  />
                  <div className="flex flex-col border-l border-[#CFCFCF]">
                    <button
                      type="button"
                      onClick={() => setWeight((w) => Math.min(300, w + 1))}
                      className="px-3 py-1.5 text-[#646464] hover:bg-[#FAF9F6] hover:text-[#447361] transition-colors text-sm font-bold border-b border-[#CFCFCF]"
                      aria-label="Increase weight"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => setWeight((w) => Math.max(1, w - 1))}
                      className="px-3 py-1.5 text-[#646464] hover:bg-[#FAF9F6] hover:text-[#447361] transition-colors text-sm font-bold"
                      aria-label="Decrease weight"
                    >
                      −
                    </button>
                  </div>
                </div>
              </div>

              {/* Dropper Strength */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#131414]">Dropper Strength (Mg)</label>
                <div className="relative">
                  <select
                    value={dropperStrength}
                    onChange={(e) => setDropperStrength(Number(e.target.value))}
                    className="w-full appearance-none border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#646464] bg-white focus:outline-none focus:border-[#447361] transition-colors pr-10"
                  >
                    {DROPPER_STRENGTHS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg width="12" height="8" fill="none" viewBox="0 0 24 16" stroke="#646464" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 2l10 10L22 2" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results panel */}
          <div className="px-8 py-8 text-center" style={{ backgroundColor: '#646464' }}>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <p className="text-white/70 text-xs mb-1">Recommended Daily Dosage of CBD</p>
                  <p className="text-white font-bold text-xl">{results.dailyMg} mg/day</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Amount in ml for the desired dose</p>
                  <p className="text-white font-bold text-xl">{results.dailyMl} ml/day</p>
                </div>
                <div>
                  <p className="text-white/70 text-xs mb-1">Number of drops per desired dose</p>
                  <p className="text-white font-bold text-xl">{results.dailyDrops} drops/day</p>
                </div>
              </div>
            ) : (
              <p className="text-white/70 text-sm">Enter your weight to see results.</p>
            )}
          </div>

        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-[#646464] mt-6 max-w-xl mx-auto leading-relaxed">
          * This calculator provides general dosage guidance only. Consult a healthcare professional before
          starting any CBD regimen. Individual results may vary.
        </p>
      </section>

    </main>
  );
}
