"use client";

import { Bounded } from "@/components/Bounded";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";

const alternatingTextData = {
  textGroup: [
    {
      heading: "Why Choose Fizzi?",
      body: "Real fruit extracts, only 5‑10 calories per can, no artificial sweeteners, no high fructose corn syrup, prebiotics for gut health, and 100% recyclable cans. Enjoy guilt‑free fizz with fast, free shipping over ₹1,500. Taste the difference of natural refreshment.",
      ctaLink: "/about",
      ctaText: "Our Story →",
    },
    {
      heading: "🔥 Summer Fizz Fest 🔥",
      body: "Free shipping on all orders over ₹1,500. For a limited time, grab our Summer Trio Pack (Watermelon, Lemon Lime, Strawberry Lemonade) at just ₹6,999 (regular ₹8,997). Use code SUMMER20 for an additional 20% off on any variety pack. Hurry, stocks are flying fast! Delivery within 2‑3 business days across India. Stay refreshed, stay fizzy.",
      ctaLink: "/",
      ctaText: "Grab Summer Offer →",
    },
    {
      heading: "Join the Fizzi Club",
      body: "Subscribe and save 10% on every order. Cancel anytime. Get early access to limited‑edition flavors.",
      ctaLink: "/",
      ctaText: "Subscribe Now →",
    },
  ],
};

export default function AlternatingText() {
  return (
    <Bounded className="alternating-text-container relative bg-yellow-300 text-sky-950 overflow-hidden">
      {/* 3D scene – now confined to section, not full viewport */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <View className="w-full h-full">
          <Scene />
        </View>
      </div>

      <div className="relative z-10">
        {alternatingTextData.textGroup.map((item, index) => (
          <div
            key={item.heading}
            className={clsx(
              "alternating-section grid py-16 md:py-24 px-4 md:px-8",
              "gap-y-8 gap-x-12",
              "md:grid-cols-2 md:place-items-center",
              "min-h-[70vh] md:min-h-screen" // shorter on mobile
            )}
          >
            <div
              className={clsx(
                index % 2 === 0 ? "md:col-start-1" : "md:col-start-2",
                "rounded-2xl p-6 backdrop-blur-lg bg-yellow-300/40",
                "max-w-2xl mx-auto md:mx-0"
              )}
            >
              <div className="text-3xl sm:text-4xl md:text-6xl font-bold text-balance">
                {item.heading}
              </div>
              <div className="mt-4 text-base sm:text-lg md:text-xl text-balance">
                {item.body}
              </div>
              <a
                href={item.ctaLink}
                className="inline-block mt-6 rounded-full bg-orange-600 px-6 py-2 text-sm md:text-base font-bold uppercase tracking-wide text-white hover:bg-orange-700 transition"
              >
                {item.ctaText}
              </a>
            </div>
          </div>
        ))}
      </div>
    </Bounded>
  );
}