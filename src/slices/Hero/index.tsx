"use client";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import FloatingCan from "@/components/FloatingCan";
import { Center } from "@react-three/drei";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom"; // <-- import Link

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";

import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const heroData = {
  heading: "FIZZI SPECIAL",
  subheading: "Premium Soda",
  body: "₹2,499 for 12-pack • Free shipping over ₹1,500",
  buttonText: "SHOP NOW →",
  buttonLink: "/shop",
  priceBadge: "₹2,499 only",
};

const productMap = {
  "Black Cherry": { id: "black-cherry", price: 2499 },
  "Grape Goodness": { id: "grape", price: 2499 },
  "Watermelon Crush": { id: "watermelon", price: 2699 },
};

const BEST_SELLERS = [
  {
    name: "Black Cherry",
    flavor: "blackCherry" as const,
    price: "₹2,499",
    link: "/shop/black-cherry",
    badge: "Best Seller",
  },
  {
    name: "Grape Goodness",
    flavor: "grape" as const,
    price: "₹2,499",
    link: "/shop/grape-goodness",
  },
  {
    name: "Watermelon Crush",
    flavor: "watermelon" as const,
    price: "₹2,699",
    link: "/shop/watermelon-crush",
    badge: "Trending",
  },
];

export default function Hero() {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (productName: string) => {
    const product = productMap[productName as keyof typeof productMap];
    if (product) {
      addToCart({
        id: product.id,
        name: productName,
        price: product.price,
      });
      console.log(`Added ${productName} to cart`);
    }
  };

  useGSAP(
    () => {
      if (!ready && isDesktop) return;
      const introTL = gsap.timeline();
      introTL
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 4,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 0.8,
        })
        .from(".hero-subheading", { opacity: 0, y: 30 }, "+=.8")
        .from(".hero-body", { opacity: 0, y: 10 })
        .from(".hero-button", { opacity: 0, y: 10, duration: 0.6 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo(
          "body",
          { backgroundColor: "#FDE047" },
          { backgroundColor: "#D9F99D", overwrite: "auto" },
          1.5
        )
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", { y: 20, opacity: 0 })
        .to(".hero-scene", { x: "25%", scale: 0.6, duration: 1.5, ease: "power2.out" }, 0);
    },
    { dependencies: [ready, isDesktop] }
  );

  return (
    <Bounded className="hero opacity-0">
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles speed={2} />
        </View>
      )}

      <div className="grid">
        {/* Main hero section */}
        <div className="grid min-h-[120vh] place-content-center">
          <div className="grid auto-rows-min place-items-center text-center pt-20 md:pt-32">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <TextSplitter text={heroData.heading} wordDisplayStyle="block" className="hero-header-word" />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <p>{heroData.subheading}</p>
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <p>{heroData.body}</p>
            </div>
            <div className="mt-4 text-3xl font-black text-orange-600">{heroData.priceBadge}</div>
            <Button buttonLink={heroData.buttonLink} buttonText={heroData.buttonText} className="hero-button mt-8" />
          </div>
        </div>

        {/* Best Sellers */}
        <div className="text-side relative z-[80] grid min-h-screen items-center gap-4 py-16 md:py-0">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-side-heading text-balance text-5xl font-black uppercase text-sky-950 lg:text-7xl">
              <TextSplitter text="Trending & Best Sellers" />
            </h2>
            <p className="text-side-body mt-2 text-sky-700">Customer favourites – grab them before they're gone</p>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {BEST_SELLERS.map((item) => (
                <div
  key={item.name}
  className="group relative flex flex-col items-center rounded-2xl border border-yellow-400/40 bg-yellow-300/20 p-6 transition hover:-translate-y-2 hover:bg-yellow-300/40"
>
                  {item.badge && (
                    <span className="absolute -top-3 right-4 rounded-full bg-orange-600 px-3 py-1 text-xs font-bold uppercase text-white">
                      {item.badge}
                    </span>
                  )}

                
                  <div className="relative h-32 w-32">
                    <View className="absolute inset-0 w-full h-full">
                      <ambientLight intensity={1.5} />
                      <directionalLight position={[3, 3, 2]} intensity={1.2} />
                      <Center>
                        <FloatingCan
                          flavor={item.flavor}
                          floatIntensity={0.2}
                          rotationIntensity={0.8}
                          floatSpeed={5}
                        />
                      </Center>
                    </View>
                  </div>

                  <h3 className="mt-4 text-xl font-bold uppercase text-sky-800">{item.name}</h3>
                  <p className="mt-2 text-2xl font-black text-orange-600">{item.price}</p>
                  <button
                    onClick={() => handleAddToCart(item.name)}
                    className="mt-4 rounded-full bg-orange-600 px-6 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-700"
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link
                to="/shop"
                className="inline-block rounded-full border-2 border-orange-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-orange-600 transition hover:bg-orange-600/10"
              >
                View All Products →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}