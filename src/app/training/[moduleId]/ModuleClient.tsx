"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  FileText,
  ChevronLeft,
  Lock,
} from "lucide-react";
import { loadTrainingModules } from "@/lib/training-store";
import type { TrainingModule } from "@/lib/training-data";

const STORAGE_KEY_AUTH = "hydra-training-auth";
const STORAGE_KEY_PROGRESS = "hydra-training-progress";

export default function ModuleClient({ moduleId }: { moduleId: string }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [modules, setModules] = useState<TrainingModule[]>([]);

  useEffect(() => {
    setMounted(true);
    setModules(loadTrainingModules());
    const auth = localStorage.getItem(STORAGE_KEY_AUTH);
    if (auth === "true") setAuthenticated(true);
    const progress = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (progress) setCompletedModules(JSON.parse(progress));
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const code = localStorage.getItem("hydra-training-code") || "hydra2026";
    if (password === code) {
      setAuthenticated(true);
      localStorage.setItem(STORAGE_KEY_AUTH, "true");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function toggleComplete() {
    const updated = completedModules.includes(moduleId)
      ? completedModules.filter((m) => m !== moduleId)
      : [...completedModules, moduleId];
    setCompletedModules(updated);
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
  }

  if (!mounted) return null;

  if (!authenticated) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-hydra-dark flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md">
            <div className="bg-hydra-navy rounded-2xl p-8 shadow-2xl border border-white/5">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-hydra-cyan/10 rounded-2xl flex items-center justify-center">
                  <Lock className="w-8 h-8 text-hydra-cyan" />
                </div>
              </div>
              <h1 className="font-[var(--font-heading)] text-2xl font-bold text-white text-center uppercase tracking-wide mb-2">
                Employee Training Center
              </h1>
              <p className="text-hydra-gray text-center text-sm mb-8">
                Enter your access code to continue
              </p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  placeholder="Access code"
                  className="w-full px-4 py-3 bg-hydra-dark border border-white/10 rounded-xl text-white placeholder:text-hydra-gray focus:outline-none focus:border-hydra-cyan/50 focus:ring-1 focus:ring-hydra-cyan/25 transition-colors"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-sm">
                    Incorrect access code. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold py-3 rounded-xl transition-all duration-200 glow-cyan hover:scale-[1.02]"
                >
                  Access Training
                </button>
              </form>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const mod = modules.find((m) => m.id === moduleId);

  if (!mod) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-hydra-light flex items-center justify-center px-4 py-20">
          <div className="text-center">
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-hydra-dark uppercase mb-4">
              Module Not Found
            </h1>
            <p className="text-hydra-gray mb-6">
              The training module you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/training"
              className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Training Center
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const sorted = [...modules].sort((a, b) => a.order - b.order);
  const idx = sorted.findIndex((m) => m.id === moduleId);
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;
  const isComplete = completedModules.includes(moduleId);

  return (
    <>
      <Header />
      <main className="flex-1 bg-hydra-light min-h-screen">
        <div className="bg-hydra-dark text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
            <Link
              href="/training"
              className="inline-flex items-center gap-2 text-sm text-hydra-gray hover:text-hydra-cyan transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wider text-hydra-teal font-medium">
              {mod.category}
            </span>
            <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide mt-1 mb-2">
              {mod.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-hydra-gray">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {mod.duration}
              </span>
              <span className="flex items-center gap-1.5">
                {isComplete ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-hydra-cyan" />
                    <span className="text-hydra-cyan font-medium">Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4" />
                    In Progress
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="bg-hydra-dark rounded-2xl overflow-hidden mb-8 aspect-video">
            {mod.videoUrl ? (
              <iframe
                src={mod.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={mod.title}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-hydra-gray text-lg">Video coming soon</p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl border border-hydra-gray/10 p-6">
                <h2 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm mb-3">
                  About This Module
                </h2>
                <p className="text-hydra-dark/80 text-sm leading-relaxed">
                  {mod.description}
                </p>
              </div>

              <div className="bg-white rounded-xl border border-hydra-gray/10 p-6">
                <h2 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm mb-4">
                  Key Takeaways
                </h2>
                <ul className="space-y-3">
                  {mod.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-hydra-cyan/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-hydra-cyan">
                          {i + 1}
                        </span>
                      </div>
                      <span className="text-sm text-hydra-dark/80 leading-relaxed">
                        {takeaway}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <button
                onClick={toggleComplete}
                className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  isComplete
                    ? "bg-hydra-cyan/10 text-hydra-cyan border border-hydra-cyan/20 hover:bg-hydra-cyan/20"
                    : "bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark glow-cyan hover:scale-[1.02]"
                }`}
              >
                {isComplete ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Completed
                  </>
                ) : (
                  <>
                    <Circle className="w-5 h-5" />
                    Mark as Complete
                  </>
                )}
              </button>

              <div className="bg-white rounded-xl border border-hydra-gray/10 p-5">
                <h3 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-xs mb-4">
                  Resources
                </h3>
                <ul className="space-y-2">
                  {mod.resources.map((resource, i) => (
                    <li key={i}>
                      <a
                        href={resource.url}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-hydra-light transition-colors group"
                      >
                        <FileText className="w-4 h-4 text-hydra-gray group-hover:text-hydra-teal transition-colors shrink-0" />
                        <span className="text-sm text-hydra-dark/80 group-hover:text-hydra-dark transition-colors flex-1">
                          {resource.name}
                        </span>
                        <Download className="w-3.5 h-3.5 text-hydra-gray/50 group-hover:text-hydra-teal transition-colors shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-hydra-gray/10 grid grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/training/${prev.id}`}
                className="flex items-center gap-3 p-4 bg-white rounded-xl border border-hydra-gray/10 hover:border-hydra-cyan/30 hover:shadow-md transition-all group"
              >
                <ArrowLeft className="w-5 h-5 text-hydra-gray group-hover:text-hydra-cyan transition-colors shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-hydra-gray">
                    Previous
                  </span>
                  <p className="font-[var(--font-heading)] text-xs font-bold text-hydra-dark uppercase tracking-wide truncate">
                    {prev.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/training/${next.id}`}
                className="flex items-center justify-end gap-3 p-4 bg-white rounded-xl border border-hydra-gray/10 hover:border-hydra-cyan/30 hover:shadow-md transition-all group text-right"
              >
                <div className="min-w-0">
                  <span className="text-[10px] uppercase tracking-wider text-hydra-gray">
                    Next
                  </span>
                  <p className="font-[var(--font-heading)] text-xs font-bold text-hydra-dark uppercase tracking-wide truncate">
                    {next.title}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-hydra-gray group-hover:text-hydra-cyan transition-colors shrink-0" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
