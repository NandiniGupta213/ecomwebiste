"use client";

import { Bounded } from "@/components/Bounded";
import { TextSplitter } from "@/components/TextSplitter";
import { View, Center, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import FloatingCan from "@/components/FloatingCan";
import { useRef } from "react";
import { Group } from "three";
import { Link } from "react-router-dom";

const BLOG_POSTS = [
  {
    title: "Why We Love Watermelon Crush",
    excerpt: "Discover the inspiration behind our limited summer flavor and why it's flying off shelves.",
    date: "May 15, 2025",
    slug: "why-we-love-watermelon-crush",
  },
  {
    title: "5 Ways to Stay Hydrated This Summer",
    excerpt: "Tips to keep your energy up and your taste buds happy with low-calorie fizzy drinks.",
    date: "May 2, 2025",
    slug: "5-ways-stay-hydrated",
  },
  {
    title: "Behind the Scenes: Can Design",
    excerpt: "How we create the vibrant, eye-catching look of every Fizzi can.",
    date: "April 20, 2025",
    slug: "behind-scenes-can-design",
  },
  {
    title: "The Truth About Artificial Sweeteners",
    excerpt: "Why we choose real fruit extracts and prebiotics over chemicals.",
    date: "April 5, 2025",
    slug: "truth-about-artificial-sweeteners",
  },
];

// Drifting can – works inside the shared Canvas
function DriftingCan({ flavor, position, scale = 1.2 }: { flavor: any; position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<Group>(null);
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.1) * 0.15;
      groupRef.current.rotation.y += 0.005;
    }
  });
  return (
    <group ref={groupRef} position={position} scale={scale}>
      <Center>
        <FloatingCan flavor={flavor} floatIntensity={0.1} rotationIntensity={0.2} />
      </Center>
    </group>
  );
}

export default function BlogPage() {
  return (
    <Bounded className="relative bg-yellow-300 py-16 overflow-hidden">
      {/* 3D Scene – portalled into the global Canvas */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <View className="w-full h-full">
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <Environment preset="city" environmentIntensity={0.4} />
          <DriftingCan flavor="watermelon" position={[-7, 2.5, -2]} scale={2} />
          <DriftingCan flavor="blackCherry" position={[10, 0, -6]} scale={2.5} />
        </View>
      </div>

      {/* Content – unchanged */}
      <div className="relative z-10 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black uppercase text-orange-500 text-center drop-shadow-md">
          <TextSplitter text="Fresh Fizzi News" />
        </h1>
        <p className="text-center text-sky-800 mt-4 text-xl">
          Sips, stories, and updates from our kitchen
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-yellow-400/40 bg-orange-50/20 backdrop-blur-sm p-6 transition hover:-translate-y-1"
            >
              <h2 className="text-2xl font-bold uppercase text-sky-800">{post.title}</h2>
              <p className="text-orange-600 text-sm mt-1">{post.date}</p>
              <p className="text-sky-700 mt-3">{post.excerpt}</p>
              <Link
                to={`/blog/${post.slug}`}
                className="inline-block mt-4 text-orange-600 font-bold uppercase tracking-wide hover:text-orange-700"
              >
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Bounded>
  );
}