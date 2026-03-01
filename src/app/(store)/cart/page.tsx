'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  qty: number;
}

const TAX_RATE = 0.054;
const SHIPPING = 72;
const DISCOUNT_RATE = 0.15;

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Mary Jay Skin Duo',
      price: 140,
      image: '/assets/product-mary-jay-skin-duo.png',
      description:
        'Full Spectrum CBD Duo. 1000mg CBD Beauty Cream (60 ml), and 1000 mg CBD Facial Serum (60 ml)',
      qty: 1,
    },
  ]);

  const updateQty = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const netPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const taxes = netPrice * TAX_RATE;
  const discount = netPrice * DISCOUNT_RATE;
  const total = netPrice + taxes + SHIPPING - discount;

  return (
    <main className="min-h-screen bg-white py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h1
            className="font-playfair text-[40px] font-bold text-[#131414] leading-tight"
          >
            Your Cart
          </h1>
          <Link
            href="/shop"
            className="text-[#FFB298] text-sm underline-offset-2 hover:underline transition-all"
          >
            Continue Shopping
          </Link>
        </div>

        <hr className="border-gray-200 mb-6" />

        {cartItems.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty.</p>
            <Link
              href="/shop"
              className="text-[#FFB298] underline underline-offset-2 text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center mb-4 px-1">
              <span className="text-sm font-medium text-[#131414]">Product</span>
              <span className="hidden sm:block w-16" />
              <span className="text-sm font-medium text-[#131414] text-center w-32">
                Quantity
              </span>
              <span className="text-sm font-medium text-[#131414] text-right w-20">
                Total
              </span>
            </div>

            <hr className="border-gray-200 mb-6" />

            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id}>
                  <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto] gap-4 items-center px-1">
                    {/* Product Info */}
                    <div className="flex items-start gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden border border-gray-100 bg-gray-50">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22 viewBox=%220 0 80 80%22%3E%3Crect width=%2280%22 height=%2280%22 fill=%22%23f3f4f6%22/%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <p className="font-semibold text-[#131414] text-sm leading-snug">
                          {item.name}
                        </p>
                        <p className="text-[#131414] text-sm">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400 leading-snug max-w-xs">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Quantity selector — hidden on very small screens, shown inline on sm+ */}
                    <div className="hidden sm:flex items-center gap-1 w-32 justify-center">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-base leading-none"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.qty}
                        readOnly
                        className="w-10 text-center border border-gray-300 text-sm text-[#131414] py-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-base leading-none"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Total */}
                    <span className="font-bold text-[#131414] text-sm text-right w-20">
                      ${(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>

                  {/* Mobile qty selector */}
                  <div className="flex sm:hidden items-center gap-2 mt-3 px-1">
                    <span className="text-xs text-gray-500 mr-1">Qty:</span>
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-base leading-none"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.qty}
                      readOnly
                      className="w-10 text-center border border-gray-300 text-sm text-[#131414] py-1 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-base leading-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <hr className="border-gray-200 mt-6" />
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="mt-8 flex justify-end">
              <div className="w-full sm:w-[340px]">
                <div className="text-right space-y-2 text-sm text-[#131414]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Net Price:</span>
                    <span>${netPrice.toFixed(2)}</span>
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
                    <span className="text-[#FFB298] font-medium">-15%</span>
                  </div>
                </div>

                <hr className="border-gray-300 my-4" />

                <div className="flex justify-between items-center text-[#131414]">
                  <span className="font-semibold text-base">Total:</span>
                  <span className="font-bold text-xl">${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <button className="mt-6 w-full bg-[#447361] hover:bg-[#365d4e] transition-colors text-white font-bold py-5 text-base tracking-wide">
                    Check Out
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
