'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const TAX_RATE = 0.054;
const SHIPPING = 72;
const DISCOUNT_RATE = 0.15;
const NET_PRICE = 140;
const taxes = NET_PRICE * TAX_RATE;
const discount = NET_PRICE * DISCOUNT_RATE;
const total = NET_PRICE + taxes + SHIPPING - discount;

type PaymentMethod = 'bank' | 'credit';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank');
  const [discountCode, setDiscountCode] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    province: '',
    city: '',
    postalCode: '',
    phone: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClass =
    'w-full bg-white border border-gray-300 px-3 py-2.5 text-sm text-[#131414] focus:border-[#447361] focus:outline-none transition-colors placeholder:text-gray-400';

  const labelClass = 'block text-xs text-gray-500 mb-1';

  return (
    <main className="min-h-screen bg-[#FAF9F6] py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">

        {/* Page title */}
        <h1 className="font-playfair text-[40px] font-bold text-[#131414] mb-10 leading-tight">
          Check Out
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* ── LEFT COLUMN: Form ── */}
          <div className="flex-[3] min-w-0 space-y-10">

            {/* Contact */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#131414]">Contact</h2>
                <Link
                  href="/login"
                  className="text-sm text-[#FFB298] hover:underline underline-offset-2 transition-all"
                >
                  Sign In
                </Link>
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={inputClass}
                  autoComplete="email"
                />
              </div>
            </section>

            {/* Delivery Information */}
            <section>
              <h2 className="text-lg font-semibold text-[#131414] mb-4">
                Delivery Information
              </h2>
              <div className="space-y-3">

                {/* First / Last name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className={inputClass}
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className={inputClass}
                      autoComplete="family-name"
                    />
                  </div>
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className={labelClass}>
                    Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Optional"
                    className={inputClass}
                    autoComplete="organization"
                  />
                </div>

                {/* Address */}
                <div>
                  <label htmlFor="address" className={labelClass}>
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className={inputClass}
                    autoComplete="street-address"
                  />
                </div>

                {/* Province / City / Postal */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="w-full sm:w-[140px] flex-shrink-0">
                    <label htmlFor="province" className={labelClass}>
                      Province
                    </label>
                    <select
                      id="province"
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer`}
                      autoComplete="address-level1"
                    >
                      <option value="">Select</option>
                      <option value="AB">Alberta</option>
                      <option value="BC">British Columbia</option>
                      <option value="MB">Manitoba</option>
                      <option value="NB">New Brunswick</option>
                      <option value="NL">Newfoundland</option>
                      <option value="NS">Nova Scotia</option>
                      <option value="ON">Ontario</option>
                      <option value="PE">PEI</option>
                      <option value="QC">Quebec</option>
                      <option value="SK">Saskatchewan</option>
                      <option value="NT">Northwest Territories</option>
                      <option value="NU">Nunavut</option>
                      <option value="YT">Yukon</option>
                    </select>
                  </div>
                  <div className="flex-1 min-w-0">
                    <label htmlFor="city" className={labelClass}>
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Vancouver"
                      className={inputClass}
                      autoComplete="address-level2"
                    />
                  </div>
                  <div className="w-full sm:w-[150px] flex-shrink-0">
                    <label htmlFor="postalCode" className={labelClass}>
                      Postal Code{' '}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      id="postalCode"
                      name="postalCode"
                      type="text"
                      value={form.postalCode}
                      onChange={handleChange}
                      placeholder="V6B 1A1"
                      className={inputClass}
                      autoComplete="postal-code"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+1 (604) 000-0000"
                    className={inputClass}
                    autoComplete="tel"
                  />
                </div>

                {/* Save info checkbox */}
                <label className="flex items-center gap-2.5 cursor-pointer select-none mt-1">
                  <input
                    type="checkbox"
                    checked={saveInfo}
                    onChange={(e) => setSaveInfo(e.target.checked)}
                    className="w-4 h-4 accent-[#447361] cursor-pointer"
                  />
                  <span className="text-sm text-[#131414]">
                    Save this information for the next time
                  </span>
                </label>
              </div>
            </section>

            {/* Payment Method */}
            <section>
              <h2 className="text-lg font-semibold text-[#131414] mb-4">
                Payment Method
              </h2>
              <div className="space-y-3">

                {/* Bank Deposit */}
                <label
                  className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors ${
                    paymentMethod === 'bank'
                      ? 'border-[#447361] bg-[#447361]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      paymentMethod === 'bank'
                        ? 'border-[#447361]'
                        : 'border-gray-400'
                    }`}
                  >
                    {paymentMethod === 'bank' && (
                      <span className="w-2 h-2 rounded-full bg-[#447361] block" />
                    )}
                  </span>
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={() => setPaymentMethod('bank')}
                    className="sr-only"
                  />
                  <span className="text-sm text-[#131414]">
                    Bank Deposit or Transfer
                  </span>
                </label>

                {/* Credit Card */}
                <label
                  className={`flex items-center gap-3 border px-4 py-3 cursor-pointer transition-colors ${
                    paymentMethod === 'credit'
                      ? 'border-[#447361] bg-[#447361]/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      paymentMethod === 'credit'
                        ? 'border-[#447361]'
                        : 'border-gray-400'
                    }`}
                  >
                    {paymentMethod === 'credit' && (
                      <span className="w-2 h-2 rounded-full bg-[#447361] block" />
                    )}
                  </span>
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                    className="sr-only"
                  />
                  <span className="text-sm text-[#131414]">Credit Card</span>
                </label>
              </div>
            </section>

            {/* Complete Order */}
            <button className="w-full bg-[#447361] hover:bg-[#365d4e] transition-colors text-white font-bold py-4 text-base tracking-wide">
              Complete Order
            </button>
          </div>

          {/* ── RIGHT COLUMN: Order Summary ── */}
          <div className="lg:w-[38%] flex-shrink-0">
            <div className="bg-white border border-gray-200 p-6 space-y-5 sticky top-8">

              <h2 className="text-lg font-semibold text-[#131414]">
                Order Summary
              </h2>

              {/* Product row */}
              <div className="flex items-center gap-3">
                <div className="relative w-[50px] h-[50px] flex-shrink-0 rounded overflow-hidden border border-gray-100 bg-gray-50">
                  <Image
                    src="/assets/product-mary-jay-skin-duo.png"
                    alt="Mary Jay Skin Duo"
                    fill
                    className="object-cover"
                    sizes="50px"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2250%22 height=%2250%22 viewBox=%220 0 50 50%22%3E%3Crect width=%2250%22 height=%2250%22 fill=%22%23f3f4f6%22/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#131414] leading-snug">
                    Mary Jay Skin Duo
                  </p>
                  <p className="text-xs text-gray-400">Qty: 1</p>
                </div>
                <span className="text-sm font-bold text-[#131414] flex-shrink-0">
                  $140.00
                </span>
              </div>

              <hr className="border-gray-200" />

              {/* Discount code */}
              <div>
                <label className="block text-xs text-gray-500 mb-2">
                  Apply a Discount Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 min-w-0 bg-white border border-gray-300 px-3 py-2 text-sm focus:border-[#447361] focus:outline-none transition-colors placeholder:text-gray-400"
                  />
                  <button className="px-4 py-2 bg-[#447361] hover:bg-[#365d4e] transition-colors text-white text-sm font-semibold whitespace-nowrap">
                    Apply
                  </button>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Price breakdown */}
              <div className="space-y-2 text-sm text-[#131414]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Net Price:</span>
                  <span>${NET_PRICE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Taxes (5.4%):</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping:</span>
                  <span>${SHIPPING.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Discount:</span>
                  <span className="text-[#FFB298] font-medium">-15% OFF</span>
                </div>
              </div>

              <hr className="border-gray-200" />

              <div className="flex justify-between items-center text-[#131414]">
                <span className="font-semibold text-sm">Total:</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
