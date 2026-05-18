"use client";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 80, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".about-paragraph",
        { opacity: 0, y: 40, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.25,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        }
      );

      gsap.fromTo(
        ".value-card",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
          },
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <Bounded className="relative bg-yellow-300 py-16 overflow-hidden">
      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 ref={headingRef} className="text-5xl md:text-7xl font-black uppercase text-orange-600 drop-shadow-lg">
          <TextSplitter text="Our Story" />
        </h1>
        <div className="mt-8 text-xl text-sky-900 space-y-6 bg-yellow-300/70 backdrop-blur-sm rounded-2xl p-6">
          <p className="about-paragraph leading-relaxed">
            Fizzi was born from a simple idea: create a soda that tastes amazing,
            uses real fruit, and has nothing artificial.
          </p>
          <p className="about-paragraph leading-relaxed">
            Every can is crafted with natural extracts and prebiotics to support
            your gut health. With only 5–10 calories, you can enjoy the fizz without
            the guilt.
          </p>
          <p className="about-paragraph leading-relaxed">
            We source ingredients responsibly and pack everything in 100% recyclable
            cans. Because great taste shouldn’t cost the Earth.
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <Button buttonLink="/shop" buttonText="Shop Flavors →" />
          <a
            href="/contact"
            className="inline-block rounded-full border-2 border-orange-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-orange-600 transition hover:bg-orange-600/10"
          >
            Contact Us
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { icon: "🍒", title: "Real Fruit", desc: "No artificial flavours or colours.", color: "#710523" },
          { icon: "💪", title: "5–10 Calories", desc: "Guilt‑free fizz, all day long.", color: "#572981" },
          { icon: "♻️", title: "Eco‑Friendly", desc: "100% recyclable cans.", color: "#4B7002" },
        ].map((card, idx) => (
          <div
            key={card.title}
            className="value-card rounded-2xl border-2 bg-yellow-300/50 backdrop-blur-md p-6 transition-all hover:scale-105 cursor-pointer"
            style={{ borderColor: card.color }}
          >
            <div className="text-5xl mb-3">{card.icon}</div>
            <h3 className="text-xl font-bold text-sky-800">{card.title}</h3>
            <p className="text-sky-700 mt-2">{card.desc}</p>
          </div>
        ))}
      </div>
    </Bounded>
  );
}