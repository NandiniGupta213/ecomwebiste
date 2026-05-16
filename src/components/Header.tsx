"use client";

import { useState } from "react";
import { FizziLogo } from "@/components/FizziLogo";
import { Link } from "react-router-dom";
import { useCartStore } from "@/stores/cartStore";
import clsx from "clsx";

const FLAVORS = [
  { name: "Black Cherry",        color: "#710523", slug: "black-cherry" },
  { name: "Grape Goodness",      color: "#572981", slug: "grape-goodness" },
  { name: "Lemon Lime",          color: "#164405", slug: "lemon-lime" },
  { name: "Strawberry Lemonade", color: "#690B3D", slug: "strawberry-lemonade" },
  { name: "Watermelon Crush",    color: "#4B7002", slug: "watermelon-crush" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getTotalItems());

  return (
    <header className="fixed top-0 z-[200] mb-0 flex h-16 items-center
                       justify-between bg-yellow-300/90 px-6 backdrop-blur-md
                       border-b border-yellow-400/30 w-full">

      {/* Logo */}
      <Link to="/" aria-label="Fizzi home">
        <FizziLogo className="h-10 cursor-pointer text-sky-800" />
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        <Link to="/" className="nav-link">Home</Link>

        {/* Flavors dropdown */}
        <div className="relative group">
          <button className="nav-link flex items-center gap-1">
            Flavors
            <svg className="w-3 h-3 transition-transform group-hover:rotate-180"
                 fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeWidth="1.5"
                    d="M1 1l4 4 4-4" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2
                          hidden group-hover:block bg-yellow-50 border border-yellow-200
                          rounded-xl p-2 min-w-[200px] shadow-sm z-50">
            {FLAVORS.map((f) => (
              <Link
                key={f.name}
                to={`/shop?flavor=${f.slug}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg
                           text-sky-900 text-sm hover:bg-yellow-100 transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: f.color }} />
                {f.name}
              </Link>
            ))}
          </div>
        </div>

        <Link to="/about" className="nav-link">About</Link>
        <Link to="/blog" className="nav-link">Blog</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link to="/cart" className="icon-btn relative">
          <CartIcon />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-600 text-white
                             text-[10px] font-bold w-4 h-4 rounded-full
                             flex items-center justify-center leading-none">
              {cartCount}
            </span>
          )}
        </Link>
        <Link to="/shop" className="hidden md:block rounded-lg bg-orange-600 px-4 py-2
                               text-sm font-bold uppercase tracking-wide text-white
                               hover:bg-orange-700 transition-colors">
          Shop Now
        </Link>

        {/* Mobile hamburger */}
        <button className="md:hidden icon-btn" onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menu">
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-yellow-300
                        border-t border-yellow-400/30 px-6 py-4
                        flex flex-col gap-2 md:hidden">
          <Link to="/" className="py-2 font-bold uppercase text-sky-800 text-sm tracking-wide border-b border-yellow-400/30">
            Home
          </Link>
          <Link to="/about" className="py-2 font-bold uppercase text-sky-800 text-sm tracking-wide border-b border-yellow-400/30">
            About
          </Link>
          <Link to="/blog" className="py-2 font-bold uppercase text-sky-800 text-sm tracking-wide border-b border-yellow-400/30">
            Blog
          </Link>
          <Link to="/contact" className="py-2 font-bold uppercase text-sky-800 text-sm tracking-wide border-b border-yellow-400/30">
            Contact
          </Link>
          <p className="pt-1 text-xs font-bold uppercase text-sky-800 tracking-wide opacity-60">
            Flavors
          </p>
          {FLAVORS.map(f => (
            <Link key={f.name} to={`/shop?flavor=${f.slug}`}
               className="flex items-center gap-3 py-1.5 text-sm text-sky-900">
              <span className="w-2.5 h-2.5 rounded-full"
                    style={{ background: f.color }} />
              {f.name}
            </Link>
          ))}
          <Link to="/shop" className="mt-2 rounded-lg bg-orange-600 px-4 py-3
                                 text-sm font-bold uppercase tracking-wide text-white
                                 text-center hover:bg-orange-700 transition-colors">
            Shop Now
          </Link>
        </div>
      )}
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round"/>
      <line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
    </svg>
  ) : (
    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
    </svg>
  );
}