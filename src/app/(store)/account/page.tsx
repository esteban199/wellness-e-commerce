'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';

// ─── Mock user data ───────────────────────────────────────────────────────────

const mockUser = {
  email: 'eliot_7732@mail.com',
  username: 'ElliotS_77',
};

const mockBilling = {
  cardNumber: '**** **** **** 7634',
  expiration: '07/27',
  cardName: 'ELLIOT SAVANNAH',
};

const mockDelivery = {
  firstName: 'Elliot',
  lastName: 'Savannah',
  company: 'ARA Motors',
  address: '9040 Broadway Downtown Plaza, Apt 227.',
  province: 'Oregon',
  city: 'Portland',
  postalCode: '43779',
  phone: '+1 657 916 2374',
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function PencilIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#447361" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414a2 2 0 01.586-1.414z" />
    </svg>
  );
}

function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="text-[#131414] hover:text-[#447361] transition-colors"
      aria-label="Close"
    >
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

function FieldInput({
  label, value, onChange, type = 'text', placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div className="relative border-2 border-[#646464] rounded-2xl bg-[#FAF9F6] px-4 pt-5 pb-3">
      <label className="absolute top-2 left-4 text-[11px] text-[#646464] leading-none">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder ?? label}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-[#646464] text-sm focus:outline-none pt-1"
      />
    </div>
  );
}

function ModalOverlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {children}
    </div>
  );
}

// ─── Modals ───────────────────────────────────────────────────────────────────

function EditUserModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ username: mockUser.username, email: mockUser.email });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onClose();
  }

  return (
    <ModalOverlay>
      <div className="bg-[#FAF9F6] rounded-[30px] shadow-2xl w-full max-w-lg p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#131414]" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem' }}>
            Edit User Information
          </h2>
          <CloseButton onClose={onClose} />
        </div>
        <hr className="border-[#CFCFCF] mb-5" />
        <p className="font-bold text-[#131414] text-base mb-4">User Profile Information</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldInput label="Username" value={form.username} onChange={(v) => setForm({ ...form, username: v })} />
          <FieldInput label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <div className="flex justify-end mt-2">
            <button type="submit" className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

function EditBillingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    cardNumber: '4211 9775 4853 7634',
    expiration: '07/27',
    cvc: '',
    cardName: 'ELLIOT SAVANNAH',
  });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onClose();
  }

  return (
    <ModalOverlay>
      <div className="bg-[#FAF9F6] rounded-[30px] shadow-2xl w-full max-w-2xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#131414]" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem' }}>
            Edit Billing Information
          </h2>
          <CloseButton onClose={onClose} />
        </div>
        <hr className="border-[#CFCFCF] mb-5" />
        <p className="font-bold text-[#131414] text-base mb-4">Credit Card Information</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Card number with MasterCard icon */}
          <div className="relative border-2 border-[#646464] rounded-2xl bg-[#FAF9F6] px-4 pt-5 pb-3">
            <label className="absolute top-2 left-4 text-[11px] text-[#646464] leading-none">Card Number</label>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={form.cardNumber}
                onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                className="flex-1 bg-transparent text-[#646464] text-sm focus:outline-none"
              />
              {/* MasterCard icon */}
              <div className="flex items-center flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-[#EB001B] -mr-2 opacity-90" />
                <div className="w-5 h-5 rounded-full bg-[#F79E1B] opacity-90" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Expiration Date" value={form.expiration} onChange={(v) => setForm({ ...form, expiration: v })} placeholder="MM/YY" />
            {/* CVC with icon */}
            <div className="relative border-2 border-[#646464] rounded-2xl bg-[#FAF9F6] px-4 pt-5 pb-3">
              <label className="absolute top-2 left-4 text-[11px] text-[#646464] leading-none">CVC Code</label>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="password"
                  maxLength={4}
                  value={form.cvc}
                  placeholder="***"
                  onChange={(e) => setForm({ ...form, cvc: e.target.value })}
                  className="flex-1 bg-transparent text-[#646464] text-sm focus:outline-none"
                />
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none" className="flex-shrink-0">
                  <rect x="0.5" y="0.5" width="27" height="19" rx="3.5" stroke="#CFCFCF" />
                  <rect x="0" y="5" width="28" height="5" fill="#CFCFCF" />
                  <rect x="16" y="12" width="8" height="3" rx="1" fill="#CFCFCF" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Card Name" value={form.cardName} onChange={(v) => setForm({ ...form, cardName: v })} />
          </div>

          <div className="flex justify-end mt-2">
            <button type="submit" className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

function EditDeliveryModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ ...mockDelivery });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onClose();
  }

  return (
    <ModalOverlay>
      <div className="bg-[#FAF9F6] rounded-[30px] shadow-2xl w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#131414]" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.6rem' }}>
            Edit Delivery Information
          </h2>
          <CloseButton onClose={onClose} />
        </div>
        <hr className="border-[#CFCFCF] mb-5" />
        <p className="font-bold text-[#131414] text-base mb-4">Delivery Information</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <FieldInput label="Name" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
            <FieldInput label="Last Name" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
          </div>
          <FieldInput label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
          <FieldInput label="Address" value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          <div className="grid grid-cols-3 gap-4">
            {/* Province dropdown */}
            <div className="relative border-2 border-[#646464] rounded-2xl bg-[#FAF9F6] px-4 pt-5 pb-3">
              <label className="absolute top-2 left-4 text-[11px] text-[#646464] leading-none">Province</label>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#646464] text-sm">{form.province}</span>
                <svg width="12" height="8" fill="none" viewBox="0 0 24 16" stroke="#646464" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M2 2l10 10L22 2" /></svg>
              </div>
            </div>
            <FieldInput label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <FieldInput label="Postal Code" value={form.postalCode} onChange={(v) => setForm({ ...form, postalCode: v })} />
          </div>
          <FieldInput label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <div className="flex justify-end mt-2">
            <button type="submit" className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </ModalOverlay>
  );
}

// ─── Info card ────────────────────────────────────────────────────────────────

function InfoCard({
  title, onEdit, children,
}: {
  title: string; onEdit: () => void; children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#CFCFCF] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-[#131414] text-lg">{title}</h3>
        <button onClick={onEdit} className="hover:opacity-70 transition-opacity" aria-label={`Edit ${title}`}>
          <PencilIcon />
        </button>
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs font-bold text-[#131414]">{label}</p>
      <p className="text-sm text-[#646464]">{value}</p>
    </div>
  );
}

// ─── Logged-in view ───────────────────────────────────────────────────────────

function ProfileView() {
  const [modal, setModal] = useState<'user' | 'billing' | 'delivery' | null>(null);

  return (
    <>
      <main className="min-h-screen py-12 px-4" style={{ backgroundColor: '#F2F2F2' }}>
        <div className="max-w-3xl mx-auto">
          <h1
            className="font-bold text-[#131414] mb-8"
            style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}
          >
            Profile
          </h1>

          <div className="flex flex-col gap-5">

            {/* User Information */}
            <InfoCard title="User Information" onEdit={() => setModal('user')}>
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Email" value={mockUser.email} />
                <InfoRow label="User name" value={mockUser.username} />
              </div>
            </InfoCard>

            {/* Billing Information */}
            <InfoCard title="Billing Information" onEdit={() => setModal('billing')}>
              <div className="grid grid-cols-3 gap-4">
                <InfoRow label="Card Number" value={mockBilling.cardNumber} />
                <InfoRow label="Expiration time" value={mockBilling.expiration} />
                <InfoRow label="Card Name" value={mockBilling.cardName} />
              </div>
            </InfoCard>

            {/* Delivery Information */}
            <InfoCard title="Delivery Information" onEdit={() => setModal('delivery')}>
              <div className="grid grid-cols-3 gap-4">
                <InfoRow label="First Name" value={mockDelivery.firstName} />
                <InfoRow label="Last name" value={mockDelivery.lastName} />
                <InfoRow label="Company Name" value={mockDelivery.company} />
                <InfoRow label="Address" value={mockDelivery.address} />
                <InfoRow label="Province" value={mockDelivery.province} />
                <InfoRow label="City" value={mockDelivery.city} />
                <InfoRow label="Postal Code" value={mockDelivery.postalCode} />
                <InfoRow label="Phone number" value={mockDelivery.phone} />
              </div>
            </InfoCard>

          </div>

          {/* Delete Account */}
          <div className="flex justify-end mt-8">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </main>

      {modal === 'user' && <EditUserModal onClose={() => setModal(null)} />}
      {modal === 'billing' && <EditBillingModal onClose={() => setModal(null)} />}
      {modal === 'delivery' && <EditDeliveryModal onClose={() => setModal(null)} />}
    </>
  );
}

// ─── Login / Register view ────────────────────────────────────────────────────

function AuthView() {
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegisterPw, setShowRegisterPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [login, setLogin] = useState({ username: '', password: '' });
  const [register, setRegister] = useState({ username: '', email: '', phone: '', password: '' });

  function handleLogin(e: FormEvent) { e.preventDefault(); }
  function handleRegister(e: FormEvent) { e.preventDefault(); }

  return (
    <main className="bg-[#FAF9F6]">
      {/* Hero */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden">
        <Image src="/assets/account-hero-bg.jpg" alt="BC forest with Canadian flag" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30" />
        <h1
          className="relative z-10 text-center text-white font-bold leading-tight px-4"
          style={{ fontFamily: 'var(--font-playfair)', fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
        >
          My Account
        </h1>
      </section>

      {/* Auth card */}
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
            {/* Log In */}
            <div>
              <p className="font-bold text-[#131414] text-base mb-5">Log In</p>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <input type="text" placeholder="Username or email address *" required value={login.username} onChange={(e) => setLogin({ ...login, username: e.target.value })} className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white" />
                <div className="relative">
                  <input type={showLoginPw ? 'text' : 'password'} placeholder="Password *" required value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} className="w-full border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white pr-12" />
                  <button type="button" onClick={() => setShowLoginPw(!showLoginPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CFCFCF] hover:text-[#447361] transition-colors" aria-label="Toggle password">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 accent-[#447361]" />
                  <label htmlFor="remember" className="text-sm text-[#646464]">Remember me</label>
                </div>
                <Link href="/forgot-password" className="text-sm font-medium" style={{ color: '#2F6EB7' }}>Did you lost your password?</Link>
                <button type="submit" className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors w-fit">Log In</button>
              </form>
            </div>

            <div className="hidden md:block w-px bg-[#CFCFCF] self-stretch mx-auto" />
            <div className="block md:hidden h-px bg-[#CFCFCF] w-full" />

            {/* Register */}
            <div className="md:col-start-2 md:row-start-1">
              <p className="font-bold text-[#131414] text-base mb-5">Register</p>
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <input type="text" placeholder="Username *" required value={register.username} onChange={(e) => setRegister({ ...register, username: e.target.value })} className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white" />
                <input type="email" placeholder="Email Address *" required value={register.email} onChange={(e) => setRegister({ ...register, email: e.target.value })} className="border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white" />
                <div className="flex gap-2">
                  <div className="flex items-center gap-1 border border-[#CFCFCF] rounded-lg px-3 py-3 bg-white shrink-0">
                    <span className="text-sm text-[#131414]">+1</span>
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#646464" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                  <input type="tel" placeholder="Phone Number" value={register.phone} onChange={(e) => setRegister({ ...register, phone: e.target.value })} className="flex-1 border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white" />
                </div>
                <div className="relative">
                  <input type={showRegisterPw ? 'text' : 'password'} placeholder="Password *" required value={register.password} onChange={(e) => setRegister({ ...register, password: e.target.value })} className="w-full border border-[#CFCFCF] rounded-lg px-4 py-3 text-sm text-[#131414] placeholder-[#CFCFCF] focus:outline-none focus:border-[#447361] transition-colors bg-white pr-12" />
                  <button type="button" onClick={() => setShowRegisterPw(!showRegisterPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CFCFCF] hover:text-[#447361] transition-colors" aria-label="Toggle password">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  </button>
                </div>
                <p className="text-xs text-[#646464] leading-relaxed">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <Link href="/privacy-policy" className="underline" style={{ color: '#447361' }}>privacy policy</Link>.</p>
                <button type="submit" className="bg-[#447361] hover:bg-[#3a6657] text-white font-bold px-8 py-3 rounded-lg text-sm transition-colors w-fit">Register</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Page — toggle between auth and profile for demo ─────────────────────────

export default function AccountPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Render nothing on the server to prevent hydration mismatches
  // caused by browser extensions (password managers) injecting DOM nodes
  if (!mounted) {
    return <div className="min-h-screen bg-[#FAF9F6]" />;
  }

  return (
    <div>
      {isLoggedIn ? <ProfileView /> : <AuthView />}

      {/* Demo toggle — remove in production when real auth is connected */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="bg-[#131414] text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-[#333] transition-colors"
        >
          {isLoggedIn ? 'View Login' : 'View Profile (demo)'}
        </button>
      </div>
    </div>
  );
}
