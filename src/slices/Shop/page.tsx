"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Center, Environment } from "@react-three/drei";
import { Bounded } from "@/components/Bounded";
import { useCartStore } from "@/stores/cartStore";
import FloatingCan from "@/components/FloatingCan";

const PRODUCTS = [
  { id: "black-cherry", name: "Black Cherry", price: 2499, slug: "black-cherry", flavor: "blackCherry" as const },
  { id: "grape", name: "Grape Goodness", price: 2499, slug: "grape-goodness", flavor: "grape" as const },
  { id: "lemon-lime", name: "Lemon Lime", price: 2499, slug: "lemon-lime", flavor: "lemonLime" as const },
  { id: "strawberry-lemonade", name: "Strawberry Lemonade", price: 2499, slug: "strawberry-lemonade", flavor: "strawberryLemonade" as const },
  { id: "watermelon", name: "Watermelon Crush", price: 2699, slug: "watermelon-crush", flavor: "watermelon" as const },
];

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const flavorSlug = searchParams.get("flavor");
  const addToCart = useCartStore((state) => state.addItem);
  const [message, setMessage] = useState<string | null>(null);

  const filteredProducts = flavorSlug
    ? PRODUCTS.filter(p => p.slug === flavorSlug)
    : PRODUCTS;

  const handleAddToCart = (product: typeof PRODUCTS[0]) => {
    addToCart({ id: product.id, name: product.name, price: product.price });
    setMessage(`✓ ${product.name} added to cart`);
    setTimeout(() => setMessage(null), 2000);
  };

  return (
    <Bounded className="bg-yellow-300 py-16 pt-24">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-black uppercase text-orange-500 text-center">
          Shop All Flavors
        </h1>
        {flavorSlug && (
          <p className="text-center text-sky-800 mt-2">
            Showing: {filteredProducts[0]?.name}{" "}
            <a href="/shop" className="text-orange-600 underline">(Clear)</a>
          </p>
        )}

        {message && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-5 py-2 rounded-full text-sm shadow-lg z-50">
            {message}
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center rounded-2xl border border-yellow-400/40 bg-yellow-300/20 p-6 backdrop-blur-sm transition hover:-translate-y-1"
            >
              {/* 3D Floating Can */}
              <div className="h-32 w-32">
                <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }} style={{ background: 'transparent' }}>
                  <ambientLight intensity={5} />
                  <directionalLight position={[3, 3, 2]} intensity={1.5} />
                  <Environment preset="city" environmentIntensity={0.6} />
                  <Center>
                    <FloatingCan
                      flavor={product.flavor}
                      floatIntensity={0.3}
                      rotationIntensity={0.8}
                      floatSpeed={5}
                    />
                  </Center>
                </Canvas>
              </div>

              <h3 className="mt-4 text-2xl font-bold uppercase text-sky-800">{product.name}</h3>
              <p className="mt-2 text-3xl font-black text-orange-600">₹{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 rounded-full bg-orange-600 px-6 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-orange-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
}