"use client";

import { Bounded } from "@/components/Bounded";
import { useCartStore } from "@/stores/cartStore";
import { Link } from "react-router-dom";
import { View, Center, Environment } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { SodaCanProps } from "@/components/SodaCan";

// Type‑safe flavor map – ensures returned values match FloatingCan's expected type
const flavorMap: Record<string, SodaCanProps["flavor"]> = {
  "black-cherry": "blackCherry",
  "grape": "grape",
  "lemon-lime": "lemonLime",
  "strawberry-lemonade": "strawberryLemonade",
  "watermelon": "watermelon",
};

// Component that renders a single 3D can inside a View
function CartItemCan({ flavor }: { flavor: SodaCanProps["flavor"] }) {
  return (
    <View className="absolute inset-0 w-full h-full">
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 2]} intensity={1.5} />
      <Environment preset="city" environmentIntensity={0.6} />
      <Center>
        <FloatingCan
          flavor={flavor}
          floatIntensity={0.2}
          rotationIntensity={0.5}
          floatSpeed={1.5}
        />
      </Center>
    </View>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <Bounded className="bg-yellow-300 py-16 pt-24 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-sky-800">Your cart is empty</h1>
          <p className="mt-2 text-sky-700">Looks like you haven't added any fizzy drinks yet.</p>
          <Link
            to="/shop"
            className="inline-block mt-6 rounded-full bg-orange-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-orange-700"
          >
            Start Shopping →
          </Link>
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded className="bg-yellow-300 py-16 pt-24">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-black uppercase text-orange-500 text-center mb-8">
          Your Cart ({getTotalItems()} items)
        </h1>

        <div className="space-y-4">
          {items.map((item) => {
            const flavorKey = flavorMap[item.id];
            if (!flavorKey) return null; // safety fallback

            return (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-yellow-400/40 bg-yellow-300/20 p-4 backdrop-blur-sm"
              >
                <div className="flex items-center gap-4 min-w-[150px]">
                  <div className="relative h-16 w-16">
                    <CartItemCan flavor={flavorKey} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sky-800">{item.name}</h3>
                    <p className="text-orange-600 font-bold">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-bold text-sky-800">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700"
                  >
                    +
                  </button>
                </div>

                <div className="font-bold text-sky-800 min-w-[80px] text-right">
                  ₹{item.price * item.quantity}
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-bold uppercase"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-yellow-400/40 bg-yellow-300/20 p-6 backdrop-blur-sm">
          <div className="flex justify-between text-xl font-bold text-sky-800">
            <span>Total</span>
            <span className="text-orange-600">₹{getTotalPrice()}</span>
          </div>
          <p className="text-sm text-sky-700 mt-2">Free shipping on orders over ₹1,500</p>
          <button className="mt-4 w-full rounded-full bg-orange-600 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-orange-700 transition">
            Proceed to Checkout
          </button>
          <Link to="/shop" className="block text-center mt-3 text-orange-600 text-sm font-bold uppercase hover:underline">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </Bounded>
  );
}