import { FizziLogo } from "./FizziLogo";
import CircleText from "./CircleText";

const FLAVORS = [
  { name: "Black Cherry", color: "#710523" },
  { name: "Grape Goodness", color: "#572981" },
  { name: "Lemon Lime", color: "#164405" },
  { name: "Strawberry Lemonade", color: "#690B3D" },
  { name: "Watermelon Crush", color: "#4B7002" },
];

export default function Footer() {
  return (
    <footer className="bg-yellow-300 border-t-4 border-yellow-400/50">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-block">
              <FizziLogo className="h-12 text-sky-800" />
            </a>
            <p className="mt-4 text-[15px] text-sky-800/80 leading-relaxed md:text-base">
              Sparkling refreshment with bold, natural flavors. Crafted to 
              elevate every moment.
            </p>
            <div className="mt-6 flex gap-5">
              <SocialIcon href="#" type="facebook" />
              <SocialIcon href="#" type="instagram" />
              <SocialIcon href="#" type="twitter" />
              <SocialIcon href="#" type="tiktok" />
            </div>
          </div>

          {/* Shop column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-orange-600 md:text-base">
              Shop
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li><FooterLink href="#">All Flavors</FooterLink></li>
              <li><FooterLink href="#">Bundles & Saves</FooterLink></li>
              <li><FooterLink href="#">Limited Edition</FooterLink></li>
              <li><FooterLink href="#">Merchandise</FooterLink></li>
              <li><FooterLink href="#">Gift Cards</FooterLink></li>
            </ul>
          </div>

          {/* Flavors column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-orange-600 md:text-base">
              Flavors
            </h3>
            <ul className="mt-4 space-y-2.5">
              {FLAVORS.map((flavor) => (
                <li key={flavor.name}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[15px] text-sky-800 transition-colors hover:text-orange-600 md:text-base"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: flavor.color }}
                    />
                    {flavor.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-orange-600 md:text-base">
              Support
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li><FooterLink href="#">Help Center</FooterLink></li>
              <li><FooterLink href="#">Shipping Info</FooterLink></li>
              <li><FooterLink href="#">Returns Policy</FooterLink></li>
              <li><FooterLink href="#">Track Order</FooterLink></li>
              <li><FooterLink href="#">Contact Us</FooterLink></li>
            </ul>
          </div>

          {/* Newsletter column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-orange-600 md:text-base">
              Get Fizzy Updates
            </h3>
            <p className="mt-4 text-[15px] text-sky-800/80 md:text-base">
              Subscribe for exclusive offers, new flavors, and 10% off your 
              first order.
            </p>
            <form className="mt-4 flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="rounded-lg border border-yellow-400 bg-yellow-50 px-4 py-3 text-[15px] 
                         text-sky-900 placeholder:text-sky-800/40 focus:border-orange-400 
                         focus:outline-none focus:ring-1 focus:ring-orange-400 md:text-base"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-orange-600 px-4 py-3 text-sm font-bold uppercase 
                         tracking-wide text-white transition-colors hover:bg-orange-700 
                         active:scale-95 md:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar with copyright and payment icons */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t 
                      border-yellow-400/40 pt-8 md:flex-row">
          <p className="text-xs text-sky-800/70 md:text-sm">
            © {new Date().getFullYear()} Fizzi Beverages. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-sky-800/70 md:text-sm">We Accept:</span>
            <div className="flex gap-2">
              <PaymentIcon type="visa" />
              <PaymentIcon type="mastercard" />
              <PaymentIcon type="amex" />
              <PaymentIcon type="paypal" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative CircleText - repositioned to bottom right for balance */}
      <div className="pointer-events-none absolute right-4 bottom-4 size-20 opacity-70 
                     md:right-8 md:bottom-8 md:size-28 lg:size-36">
        <CircleText />
      </div>
    </footer>
  );
}

// Helper components
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block text-[15px] text-sky-800 transition-colors hover:text-orange-600 md:text-base"
    >
      {children}
    </a>
  );
}

function SocialIcon({ href, type }: { href: string; type: 'facebook' | 'instagram' | 'twitter' | 'tiktok' }) {
  const icons = {
    facebook: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
    instagram: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
    twitter: (
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    ),
    tiktok: (
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v4a9 9 0 0 1-4-1v6a6 6 0 1 1-6-6z" />
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-700 transition-colors hover:text-orange-600"
      aria-label={`Follow us on ${type}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icons[type]}
      </svg>
    </a>
  );
}

function PaymentIcon({ type }: { type: 'visa' | 'mastercard' | 'amex' | 'paypal' }) {
  const icons = {
    visa: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 6.5H6.5L4.5 14H6L8 6.5ZM10 6.5H8.5L6.5 14H8L10 6.5ZM15.5 6.5H14L12 14H13.5L15.5 6.5ZM20 6.5H17L16 9.5H15L13.5 14H15L16 9.5H17.5L16.5 14H18L20 6.5Z"
        fill="currentColor"
      />
    ),
    mastercard: (
      <>
        <circle cx="9" cy="12" r="4" fill="currentColor" fillOpacity="0.7" />
        <circle cx="15" cy="12" r="4" fill="currentColor" fillOpacity="0.7" />
      </>
    ),
    amex: (
      <rect x="3" y="7" width="18" height="10" rx="1.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
    ),
    paypal: (
      <path d="M7.5 6.5h6a2.5 2.5 0 0 1 0 5h-6v-5zm0 5h8a2.5 2.5 0 0 1 0 5h-8v-5z" fill="currentColor" />
    ),
  };

  return (
    <span className="inline-block h-5 w-9 text-sky-600/80" aria-label={`Payment: ${type}`}>
      <svg viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="0.5">
        {icons[type]}
      </svg>
    </span>
  );
}