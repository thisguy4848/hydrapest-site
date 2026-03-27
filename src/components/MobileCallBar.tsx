"use client";

import { Phone, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-hydra-dark/95 backdrop-blur-md border-t border-hydra-cyan/20 px-4 py-3 safe-area-inset">
      <div className="flex gap-3 max-w-lg mx-auto">
        <Link
          href="tel:8334937229"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-hydra-cyan text-hydra-dark font-bold py-3 rounded-full glow-cyan"
        >
          <Phone className="w-5 h-5" />
          Call Now
        </Link>
        <Link
          href="/#contact"
          className="flex-1 inline-flex items-center justify-center gap-2 bg-hydra-slate text-white font-semibold py-3 rounded-full border border-hydra-cyan/20"
        >
          <MessageSquare className="w-5 h-5" />
          Free Quote
        </Link>
      </div>
    </div>
  );
}
