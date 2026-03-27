import { Phone, Search, SprayCan, ShieldCheck } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Phone,
    title: "Call or Request a Quote",
    text: "Reach us at 833-493-7229 or fill out our form. We respond same-day.",
  },
  {
    num: "02",
    icon: Search,
    title: "Free Inspection",
    text: "A licensed technician inspects your property and identifies the problem.",
  },
  {
    num: "03",
    icon: SprayCan,
    title: "Custom Treatment",
    text: "We design a treatment plan tailored to your home using iCap Technology.",
  },
  {
    num: "04",
    icon: ShieldCheck,
    title: "Ongoing Protection",
    text: "Regular service keeps pests out. If they return between visits, so do we — free.",
  },
];

export default function Process() {
  return (
    <section className="py-20 sm:py-28 bg-hydra-light texture-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-hydra-teal font-semibold text-sm uppercase tracking-widest">
            How It Works
          </span>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-hydra-dark mt-3">
            4 Steps to a Pest-Free Home
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-hydra-cyan/20" />
                )}
                <div className="text-center">
                  <div className="relative inline-flex">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-lg shadow-hydra-dark/5 flex items-center justify-center mx-auto">
                      <Icon className="w-9 h-9 text-hydra-teal" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-hydra-dark text-hydra-cyan text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="font-[var(--font-heading)] text-lg font-bold uppercase text-hydra-dark mt-5">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-hydra-gray max-w-xs mx-auto">
                    {step.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
