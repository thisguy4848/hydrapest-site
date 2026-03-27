"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { usePortal } from "@/lib/portal-context";

export default function PortalLoginPage() {
  const { currentUser, login } = usePortal();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (currentUser) {
    router.replace("/portal/dashboard");
    return null;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const success = login(email, pin);
      if (success) {
        router.replace("/portal/dashboard");
      } else {
        setError("Invalid email or PIN. Please try again.");
        setLoading(false);
      }
    }, 300);
  }

  return (
    <div className="min-h-screen bg-hydra-dark flex items-center justify-center px-4">
      <div className="texture-dots absolute inset-0 pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/hydra-logo.jpg"
            alt="Hydra Pest Control"
            width={180}
            height={60}
            className="rounded-lg"
            priority
          />
        </div>

        <div className="bg-hydra-navy border border-hydra-slate/50 rounded-2xl p-8 shadow-2xl">
          <h1 className="font-[var(--font-heading)] text-2xl font-bold text-hydra-white text-center uppercase tracking-wide mb-1">
            Employee Portal
          </h1>
          <p className="text-hydra-gray text-sm text-center mb-8">
            Sign in to access resources and training
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-hydra-gray mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hydra-gray" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hydrapest.com"
                  className="w-full pl-10 pr-4 py-3 bg-hydra-dark border border-hydra-slate rounded-xl text-hydra-white placeholder:text-hydra-gray/50 focus:outline-none focus:border-hydra-cyan focus:ring-1 focus:ring-hydra-cyan/30 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-hydra-gray mb-1.5">
                PIN
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hydra-gray" />
                <input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="4-digit PIN"
                  className="w-full pl-10 pr-4 py-3 bg-hydra-dark border border-hydra-slate rounded-xl text-hydra-white placeholder:text-hydra-gray/50 focus:outline-none focus:border-hydra-cyan focus:ring-1 focus:ring-hydra-cyan/30 transition-colors text-sm tracking-[0.3em]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-hydra-cyan text-hydra-dark font-semibold rounded-full hover:bg-hydra-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-hydra-gray/60 text-xs text-center mt-6">
            Contact your administrator for access
          </p>
        </div>
      </div>
    </div>
  );
}
