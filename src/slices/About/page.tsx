"use client";

import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import { View, Center, Environment, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import FloatingCan from "@/components/FloatingCan";
import { Bubbles } from "@/slices/Hero/Bubbles";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { Group } from "three";

gsap.registerPlugin(ScrollTrigger);

// Drifting can component (works inside a global Canvas)
function DriftingCan({ flavor, offset }: { flavor: any; offset: [number, number, number] }) {
  const groupRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = offset[1] + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
      groupRef.current.rotation.y += 0.01;
    }
  });
  return (
    <group ref={groupRef} position={offset}>
      <Center>
        <FloatingCan flavor={flavor} floatIntensity={0.2} rotationIntensity={0.5} />
      </Center>
    </group>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 80, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "back.out(1.5)", scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
    );
    gsap.fromTo(
      paragraphsRef.current,
      { opacity: 0, y: 40, filter: "blur(5px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
      }
    );
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { rotationY: -25, rotationX: 10, opacity: 0, y: 60 },
        {
          rotationY: 0,
          rotationX: 0,
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: i * 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: { trigger: card, start: "top 85%" },
        }
      );
      card.addEventListener("mouseenter", () => gsap.to(card, { scale: 1.05, duration: 0.3 }));
      card.addEventListener("mouseleave", () => gsap.to(card, { scale: 1, duration: 0.3 }));
    });
  }, []);

  return (
    <Bounded className="relative bg-yellow-300 py-16 overflow-hidden">
      {/* 3D Scene – portalled into the global Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <View className="w-full h-full">
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 10, 5]} intensity={1.2} />
          <Environment preset="dawn" environmentIntensity={0.4} />

          <DriftingCan flavor="watermelon" offset={[-5, -1, -3]} />
          <DriftingCan flavor="blackCherry" offset={[4, 2, -4]} />
          <DriftingCan flavor="lemonLime" offset={[0, -2, -5]} />
          <DriftingCan flavor="grape" offset={[-3, 3, -6]} />
          <DriftingCan flavor="strawberryLemonade" offset={[5, -1.5, -2]} />

          <Bubbles speed={1.2} count={40} />

          <Float speed={0.5} rotationIntensity={1} floatIntensity={0.5}>
            <pointLight position={[2, 3, 2]} intensity={0.8} color="#FFA500" />
          </Float>
        </View>
      </div>

      {/* Content – same as before */}
      <div ref={containerRef} className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 ref={headingRef} className="text-5xl md:text-7xl font-black uppercase text-orange-600 drop-shadow-lg">
          <TextSplitter text="Our Story" />
        </h1>
        <div className="mt-8 text-xl text-sky-900 space-y-6 bg-yellow-300/70 backdrop-blur-sm rounded-2xl p-6">
          <p ref={(el) => { if (el) paragraphsRef.current[0] = el; }}>Fizzi was born from a simple idea: create a soda that tastes amazing, uses real fruit, and has nothing artificial.</p>
          <p ref={(el) => { if (el) paragraphsRef.current[1] = el; }}>Every can is crafted with natural extracts and prebiotics to support your gut health. With only 5–10 calories, you can enjoy the fizz without the guilt.</p>
          <p ref={(el) => { if (el) paragraphsRef.current[2] = el; }}>We source ingredients responsibly and pack everything in 100% recyclable cans. Because great taste shouldn’t cost the Earth.</p>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <Button buttonLink="/shop" buttonText="Shop Flavors →" />
          <a href="/contact" className="inline-block rounded-full border-2 border-orange-600 px-8 py-3 text-sm font-bold uppercase tracking-wide text-orange-600 transition hover:bg-orange-600/10">Contact Us</a>
        </div>
      </div>

      <div className="relative z-10 mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { icon: "🍒", title: "Real Fruit", desc: "No artificial flavours or colours.", color: "#710523" },
          { icon: "💪", title: "5–10 Calories", desc: "Guilt‑free fizz, all day long.", color: "#572981" },
          { icon: "♻️", title: "Eco‑Friendly", desc: "100% recyclable cans.", color: "#4B7002" },
        ].map((card, idx) => (
          <div key={card.title} ref={(el) => { if (el) cardsRef.current[idx] = el; }} className="rounded-2xl border-2 bg-yellow-300/50 backdrop-blur-md p-6 transition-all cursor-pointer" style={{ borderColor: card.color }}>
            <div className="text-5xl mb-3">{card.icon}</div>
            <h3 className="text-xl font-bold text-sky-800">{card.title}</h3>
            <p className="text-sky-700 mt-2">{card.desc}</p>
          </div>
        ))}
      </div>
    </Bounded>
  );
}