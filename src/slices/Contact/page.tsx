"use client";

import { Bounded } from "@/components/Bounded";
import { TextSplitter } from "@/components/TextSplitter";
import { useState } from "react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <Bounded
      className="relative py-16 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FDE047 0%, #FEF9C3 40%, #BFDBFE 100%)",
      }}
    >
      {/* Optional subtle sky pattern – you can add a few floating circles if you want, but no 3D cans */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/30 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-yellow-200/40 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-sky-200/30 blur-3xl" />
      </div>

      {/* Content overlay – semi‑transparent white/yellow for readability */}
      <div className="relative z-10 max-w-4xl mx-auto bg-yellow-300/70 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg">
        <h1 className="text-5xl md:text-7xl font-black uppercase text-orange-600 text-center drop-shadow-md">
          <TextSplitter text="Get in Touch" />
        </h1>

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-sky-900">Email us</h2>
              <p className="text-sky-800 mt-1">
                <a href="mailto:hello@fizzi.com" className="hover:text-orange-600 transition">
                  hello@fizzi.com
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-sky-900">Call us</h2>
              <p className="text-sky-800 mt-1">
                <a href="tel:+911234567890" className="hover:text-orange-600 transition">
                  +91 12345 67890
                </a>
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-sky-900">Social</h2>
              <div className="flex gap-4 mt-2">
                <a href="#" className="text-sky-800 hover:text-orange-600 transition">Instagram</a>
                <a href="#" className="text-sky-800 hover:text-orange-600 transition">Twitter</a>
                <a href="#" className="text-sky-800 hover:text-orange-600 transition">Facebook</a>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-sky-900">Visit us</h2>
              <p className="text-sky-800 mt-1">
                123 Fizzi Lane, Bengaluru<br />
                Karnataka, 560001, India
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-2xl border border-yellow-400/40 bg-yellow-300/40 backdrop-blur-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sky-900 font-bold mb-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-full border border-yellow-400 bg-yellow-300/60 px-4 py-2 text-sky-900 placeholder:text-sky-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sky-900 font-bold mb-1">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-full border border-yellow-400 bg-yellow-300/60 px-4 py-2 text-sky-900 placeholder:text-sky-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <div>
                <label className="block text-sky-900 font-bold mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  className="w-full rounded-2xl border border-yellow-400 bg-yellow-300/60 px-4 py-2 text-sky-900 placeholder:text-sky-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="w-full rounded-full bg-orange-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-700 disabled:opacity-50"
              >
                {formStatus === "sending" ? "Sending..." : "Send Message"}
              </button>
              {formStatus === "success" && <p className="text-green-700 text-center mt-2 font-semibold">Thanks! We'll get back soon.</p>}
              {formStatus === "error" && <p className="text-red-600 text-center mt-2 font-semibold">Something went wrong. Please try again.</p>}
            </form>
          </div>
        </div>
      </div>
    </Bounded>
  );
}