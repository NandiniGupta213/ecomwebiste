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
    <Bounded className="alternating-text-container relative bg-yellow-300 text-sky-950">
      <div>
        <div className="relative z-[100] grid">
          {/* 3D view – only visible on desktop */}
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full max-md:hidden md:block">
            <Scene />
          </View>

          {alternatingTextData.textGroup.map((item, index) => (
            <div
              key={item.heading}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-lg p-4",
                  // Solid background on mobile, blurred on desktop
                  "bg-yellow-300/90 md:bg-yellow-300/40 md:backdrop-blur-lg",
                )}
              >
                <div className="text-balance text-4xl md:text-6xl font-bold">
                  <p>{item.heading}</p>
                </div>
                <div className="mt-4 text-base md:text-xl">
                  <p>{item.body}</p>
                </div>
                <a
                  href={item.ctaLink}
                  className="inline-block mt-6 rounded-full bg-orange-600 px-4 md:px-6 py-2 text-xs md:text-sm font-bold uppercase tracking-wide text-white hover:bg-orange-700 transition"
                >
                  {item.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
}