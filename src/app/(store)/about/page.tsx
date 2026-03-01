import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | WestCoast Wellness',
  description:
    'WestCoast Wellness is a family-owned Canadian business born from a simple belief: nature holds the key to true balance. Learn our story.',
};

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">

      {/* ── 1. Hero Banner ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/about-welcome-bg.png"
          alt="BC lake and forest landscape"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/35" />
        <h1
          className="relative z-10 text-center text-white font-bold leading-tight px-4"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
        >
          Welcome!
        </h1>
      </section>

      {/* ── 2. "We're so glad you found us" ─────────────────────────────────── */}
      {/*
        Figma layout (left column):
          Left sub-col: CBD Gel Caps (landscape, top) + Mary Jay Duo (portrait, bottom)
          Right sub-col: Full Spectrum Tincture (tall portrait, spans full height)
      */}
      <section className="py-16" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-start">

            {/* Left: 3-image collage — 2 stacked left + 1 tall right */}
            <div className="w-full md:w-[45%] flex-shrink-0">
              <div className="grid grid-cols-2 gap-3 h-full">
                {/* Left sub-column: CBD Gel Caps (top) + Mary Jay Duo (bottom) */}
                <div className="flex flex-col gap-3">
                  <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '4/3' }}>
                    <Image
                      src="/assets/about-glad-gelcaps.jpg"
                      alt="CBD Gel Caps"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 22vw"
                    />
                  </div>
                  <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '3/4' }}>
                    <Image
                      src="/assets/about-glad-maryjay.jpg"
                      alt="Mary Jay Skin Care Duo"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 22vw"
                    />
                  </div>
                </div>
                {/* Right sub-column: Full Spectrum Tincture (tall, spans both rows) */}
                <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '2/3' }}>
                  <Image
                    src="/assets/about-glad-tincture.jpg"
                    alt="Sacred Medicinals Full Spectrum Tincture 60ml"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 22vw"
                  />
                </div>
              </div>
            </div>

            {/* Right: copy */}
            <div className="w-full md:w-[55%] flex flex-col justify-center gap-5">
              <h2
                className="font-bold leading-snug"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  color: '#131414',
                }}
              >
                We&rsquo;re so glad you found us
              </h2>
              <p className="font-sans text-base leading-relaxed" style={{ color: '#646464' }}>
                WestCoast Wellness is a family-owned Canadian business born from a simple belief:
                nature holds the key to true balance. With over 15 years of experience, our journey
                began in the lush landscapes of British Columbia, where we saw firsthand how
                high-quality, plant-based care could transform lives. We aren&rsquo;t just a brand;
                we are a community built on integrity, transparency, and a deep respect for the
                healing power of alternative products.
              </p>
              <p className="font-sans text-base leading-relaxed" style={{ color: '#646464' }}>
                Over the years, we have helped thousands of Canadians find relief from chronic pain,
                inflammation, and daily stress. By combining rigorous botanical research with
                premium, locally sourced ingredients, we ensure that every bottle we produce meets
                the highest standards of purity. No fillers, no shortcuts&mdash;just the honest
                power of the West Coast spirit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Quote Block ───────────────────────────────────────────────────── */}
      {/* Figma: ornaments on LEFT and RIGHT side of the quote text */}
      <section className="py-14" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-6 md:gap-10">
            {/* Left ornament */}
            <Image
              src="/assets/ornament-plant-left.svg"
              alt=""
              width={100}
              height={40}
              className="hidden sm:block flex-shrink-0 select-none"
              aria-hidden="true"
              unoptimized
            />
            <blockquote
              className="italic font-bold leading-relaxed text-center max-w-xl"
              style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: 'clamp(1.05rem, 2vw, 1.4rem)',
                color: '#646464',
              }}
            >
              &ldquo;Bringing premium, BC-made solutions to those who seek a more natural path to
              wellness.&rdquo;
            </blockquote>
            {/* Right ornament */}
            <Image
              src="/assets/ornament-plant-right.svg"
              alt=""
              width={100}
              height={40}
              className="hidden sm:block flex-shrink-0 select-none"
              aria-hidden="true"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── 4. "Our Mission is Simple" ───────────────────────────────────────── */}
      {/* Figma: text left, Sacred Medicinals product line image right */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-10 lg:gap-16 items-center">

            {/* Left: copy */}
            <div className="w-full md:w-[55%] flex flex-col gap-5">
              <h2
                className="font-bold leading-snug"
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  color: '#131414',
                }}
              >
                Our Mission is Simple
              </h2>
              <p className="font-sans text-base leading-relaxed" style={{ color: '#646464' }}>
                Help people find relief from pain, nourish their bodies, and embrace self-care. We
                prioritize quality over everything, investing in the best ingredients rather than
                flashy marketing. Chances are, someone told you about us, and we&rsquo;re honored
                to share our passion for wellness with you. We&rsquo;re trusted by our local island
                community and customers around the world, and we hope you&rsquo;ll find something
                here that helps you on your healing journey.
              </p>
            </div>

            {/* Right: Sacred Medicinals product line (landscape/wide) */}
            <div className="w-full md:w-[45%]">
              <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '3/2' }}>
                <Image
                  src="/assets/about-glad-product-line.jpg"
                  alt="Sacred Medicinals product line"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. "Rooted in the West Coast Way of Living" ──────────────────────── */}
      {/*
        Figma layout (3-column photo grid):
          Left (tall portrait):   Mary Jay Duo Skin Care Picture 2
          Center-top (square):    Lemon Body Buda product
          Center-bottom (land.):  Canada West Coast BC
          Right (tall portrait):  Hand Crafted Tropical Cream
        Autumn leaves decorate the section edges.
      */}
      <section className="relative py-20 overflow-hidden" style={{ backgroundColor: '#FDDDCF' }}>

        {/* Autumn leaf decorations (left and right edges) */}
        <div className="absolute left-0 bottom-0 pointer-events-none select-none hidden md:block" style={{ zIndex: 0 }}>
          <Image src="/assets/about-leaf-orange.png" alt="" width={240} height={280} className="object-contain" />
        </div>
        <div className="absolute right-0 top-0 pointer-events-none select-none hidden md:block" style={{ zIndex: 0 }}>
          <Image src="/assets/about-leaf-yellow.png" alt="" width={220} height={260} className="object-contain" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          {/* Eyebrow + body text */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p
              className="font-bold uppercase tracking-widest text-sm mb-5"
              style={{ color: '#447361' }}
            >
              Rooted in the West Coast Way of Living
            </p>
            <p className="font-sans text-base leading-relaxed mb-4" style={{ color: '#131414' }}>
              On the rugged coast of Canada, wellness isn&rsquo;t a trend &mdash; it&rsquo;s a way
              of life. We were raised in a culture that values nature, craftsmanship, and locally
              made goods crafted with integrity.
            </p>
            <p className="font-sans text-base leading-relaxed" style={{ color: '#131414' }}>
              Every product we offer is thoughtfully formulated and handcrafted in small batches
              with intention and care. We believe in slow production, clean ingredients, and
              honoring the natural elements that inspire us daily.
            </p>
          </div>

          {/* 3-column photo grid */}
          <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto items-start">

            {/* Left: Mary Jay Duo — tall portrait */}
            <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '2/3' }}>
              <Image
                src="/assets/about-glad-maryjay2.png"
                alt="Mary Jay Duo Skin Care"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 280px"
              />
            </div>

            {/* Center: Lemon Body Buda (top) + Canada BC (bottom) */}
            <div className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '1/1' }}>
                <Image
                  src="/assets/about-rooted-bodybuda.png"
                  alt="Lemon Cream Whipped Body Buda"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 280px"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '3/2' }}>
                <Image
                  src="/assets/about-rooted-bccoast.jpg"
                  alt="Canada West Coast BC"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 280px"
                />
              </div>
            </div>

            {/* Right: Hand Crafted Tropical Cream — tall */}
            <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: '2/3' }}>
              <Image
                src="/assets/about-rooted-cream.png"
                alt="Hand Crafted Tropical Cream"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 280px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Brand Statement ───────────────────────────────────────────────── */}
      <section className="py-12" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="font-sans text-base leading-relaxed" style={{ color: '#646464' }}>
            WestCoast Wellness is the retail home of our signature brands,{' '}
            <strong style={{ color: '#131414' }}>Sacred Medicinals</strong> and{' '}
            <strong style={{ color: '#131414' }}>Mary Jay Skincare</strong>. We are a family-owned
            company rooted on the West Coast of British Columbia, built on the belief that nature
            holds the key to true balance.
          </p>
        </div>
      </section>

      {/* ── 7. "Welcome to WestCoast Wellness" CTA ───────────────────────────── */}
      {/* Figma bottom image: Emerald Lake BC Canada (panoramic) */}
      <section className="py-16" style={{ backgroundColor: '#FAF9F6' }}>
        <div className="container mx-auto px-4 text-center">
          <h2
            className="font-bold leading-snug mb-2"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: '#131414',
            }}
          >
            Welcome to WestCoast Wellness.
          </h2>
          <p
            className="font-bold mb-10"
            style={{
              fontFamily: 'var(--font-playfair)',
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              color: '#131414',
            }}
          >
            We&rsquo;re so happy you&rsquo;re here!
          </p>

          <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: '3/1' }}>
            <Image
              src="/assets/about-rooted-lake.jpg"
              alt="Emerald Lake, British Columbia Canada"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </div>
      </section>

    </main>
  );
}
