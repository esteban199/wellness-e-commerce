import Link from 'next/link';
import Image from 'next/image';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-[#f5f2ee] text-gray-800 border-t border-gray-200">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo */}
          <div className="flex items-start">
            <Logo size={100} href="/" />
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#131414] mb-5">ABOUT</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/" className="hover:text-[#3a7667] transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-[#3a7667] transition-colors">Shop</Link></li>
              <li><Link href="/contact" className="hover:text-[#3a7667] transition-colors">Contact</Link></li>
              <li><Link href="/about" className="hover:text-[#3a7667] transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* USEFUL */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#131414] mb-5">USEFUL</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/cart" className="hover:text-[#3a7667] transition-colors">Cart</Link></li>
              <li><Link href="/checkout" className="hover:text-[#3a7667] transition-colors">Checkout</Link></li>
              <li><Link href="/cbd-calculator" className="hover:text-[#3a7667] transition-colors">Calculate Dosage</Link></li>
              <li><Link href="/account" className="hover:text-[#3a7667] transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* JOIN MAILING LIST + CONTACT INFO */}
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#131414] mb-3">JOIN OUR MAILING LIST</h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                Get 10% off your order &amp; be the first to know about new products, sales and special promotions!
              </p>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3a7667] bg-white mb-2"
              />
              <button className="w-full bg-[#3a7667] text-white py-2.5 rounded text-sm font-semibold hover:bg-[#2d6a4f] transition-colors">
                Send
              </button>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#131414] mb-3">CONTACT INFO</h4>
              <a
                href="mailto:www.coasttocosta@protonmail.com"
                className="inline-flex items-center gap-3 bg-[#3a7667] text-white px-4 py-3 rounded text-sm hover:bg-[#2d6a4f] transition-colors w-full"
              >
                <Image src="/assets/icon-email.svg" alt="Email" width={22} height={22} className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-xs">Email</p>
                  <p className="text-xs text-white/80">www.coasttocosta@protonmail.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-10 pt-5">
          <p className="text-xs text-gray-500">Coast to Costa © 2025 All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
