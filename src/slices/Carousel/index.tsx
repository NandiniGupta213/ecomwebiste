"use client";

import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";
import { Center, Environment, View } from "@react-three/drei";
import { useRef, useState } from "react";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { WavyCircles } from "./WavyCircles";
import { Group } from "three";
import gsap from "gsap";
import { useCartStore } from "@/stores/cartStore"; // <-- import cart store

const SPINS_ON_CHANGE = 8;

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
  price: string;
  numericPrice: number;
  id: string;
}[] = [
  { flavor: "blackCherry", color: "#710523", name: "Black Cherry", price: "₹2,499", numericPrice: 2499, id: "black-cherry" },
  { flavor: "grape", color: "#572981", name: "Grape Goodness", price: "₹2,499", numericPrice: 2499, id: "grape" },
  { flavor: "lemonLime", color: "#164405", name: "Lemon Lime", price: "₹2,499", numericPrice: 2499, id: "lemon-lime" },
  { flavor: "strawberryLemonade", color: "#690B3D", name: "Strawberry Lemonade", price: "₹2,499", numericPrice: 2499, id: "strawberry-lemonade" },
  { flavor: "watermelon", color: "#4B7002", name: "Watermelon Crush", price: "₹2,499", numericPrice: 2499, id: "watermelon" },
];

const carouselData = {
  heading: "Shop by Flavor",
  priceCopy: "12-pack case • Free shipping over ₹1,500",
  buttonText: "Add to Cart",
  shopLink: "/shop",
};

export default function Carousel() {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
  const sodaCanRef = useRef<Group>(null);
  const addToCart = useCartStore((state) => state.addItem);

  function changeFlavor(index: number) {
    if (!sodaCanRef.current) return;
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();
    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavorIndex
            ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0
    )
      .to(
        ".background, .wavy-circles-outer, .-wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0
      )
      .to(
        ".text-wrapper",
        { duration: 0.2, y: -10, opacity: 0 },
        0
      )
      .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
      .to(
        ".text-wrapper",
        { duration: 0.2, y: 0, opacity: 1 },
        0.7
      );
  }

  const handleAddToCart = () => {
    const flavor = FLAVORS[currentFlavorIndex];
    addToCart({
      id: flavor.id,
      name: flavor.name,
      price: flavor.numericPrice,
    });
    console.log(`Added ${flavor.name} to cart`);
  };

  return (
    <section className="carousel grid-rows-[auto, 4fr, auto] relative grid min-h-[120vh] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />
      <WavyCircles className="absolute left-1/2 top-1/2 h-[120vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523]" />

      <h2 className="relative text-center text-5xl font-bold">{carouselData.heading}</h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <ArrowButton onClick={() => changeFlavor(currentFlavorIndex - 1)} direction="left" label="Previous Flavor" />
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              floatIntensity={0.3}
              rotationIntensity={1}
              flavor={FLAVORS[currentFlavorIndex].flavor}
              ref={sodaCanRef}
            />
          </Center>
          <Environment files="/hdr/lobby.hdr" environmentIntensity={0.6} environmentRotation={[0, 3, 0]} />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        <ArrowButton onClick={() => changeFlavor(currentFlavorIndex + 1)} direction="right" label="Next Flavor" />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">
          <p>{FLAVORS[currentFlavorIndex].price} | {carouselData.priceCopy}</p>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-orange-600 px-6 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-orange-700 transition"
          >
            {carouselData.buttonText}
          </button>
          <a href={carouselData.shopLink} className="rounded-full border-2 border-white px-6 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-white/10 transition">
            Shop Now
          </a>
        </div>
      </div>
    </section>
  );
}

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({ label, direction = "right", onClick }: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}