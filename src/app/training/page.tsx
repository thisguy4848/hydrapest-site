"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Lock,
  Search,
  CheckCircle2,
  Circle,
  Clock,
  Play,
  Shield,
  Bug,
  FlaskConical,
  Wrench,
  TrendingUp,
  LogOut,
  User,
} from "lucide-react";
import { categories, type Category } from "@/lib/training-data";
import { fetchTrainingModules, getConfig } from "@/lib/supabase-store";

const categoryIcons: Record<Category, React.ElementType> = {
  Onboarding: Shield,
  "Pest Identification": Bug,
  "Treatment Procedures": FlaskConical,
  "Equipment & Products": Wrench,
  "Sales & Growth": TrendingUp,
};

const STORAGE_KEY_AUTH = "hydra-training-auth";
const STORAGE_KEY_NAME = "hydra-training-name";
const STORAGE_KEY_PROGRESS = "hydra-training-progress";

export default function TrainingPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [employeeName, setEmployeeName] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [mounted, setMounted] = useState(false);
  const [modules, setModules] = useState<Awaited<ReturnType<typeof fetchTrainingModules>>>([]);

  useEffect(() => {
    setMounted(true);
    fetchTrainingModules().then(setModules).catch(() => {});
    const auth = localStorage.getItem(STORAGE_KEY_AUTH);
    if (auth === "true") setAuthenticated(true);
    const name = localStorage.getItem(STORAGE_KEY_NAME);
    if (name) setEmployeeName(name);
    const progress = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (progress) setCompletedModules(JSON.parse(progress));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const code = await getConfig("training_access_code") ?? "hydra2026";
    if (password === code) {
      setAuthenticated(true);
      localStorage.setItem(STORAGE_KEY_AUTH, "true");
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY_AUTH);
  }

  function handleSaveName() {
    setEmployeeName(nameInput);
    localStorage.setItem(STORAGE_KEY_NAME, nameInput);
    setEditingName(false);
  }

  function toggleModule(id: string) {
    const updated = completedModules.includes(id)
      ? completedModules.filter((m) => m !== id)
      : [...completedModules, id];
    setCompletedModules(updated);
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(updated));
  }

  const filteredModules = useMemo(() => {
    return modules
      .filter((m) => {
        if (activeCategory !== "All" && m.category !== activeCategory) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            m.title.toLowerCase().includes(q) ||
            m.category.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => a.order - b.order);
  }, [modules, activeCategory, searchQuery]);

  const completedCount = completedModules.length;
  const totalCount = modules.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  if (!mounted) return null;

  // --- Login Gate ---
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
                <div>
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
                    <p className="text-red-400 text-sm mt-2">
                      Incorrect access code. Please try again.
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold py-3 rounded-xl transition-all duration-200 glow-cyan hover:scale-[1.02]"
                >
                  Access Training
                </button>
              </form>
              <p className="text-hydra-gray text-xs text-center mt-6">
                Contact your manager if you don&apos;t have an access code.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // --- Dashboard ---
  return (
    <>
      <Header />
      <main className="flex-1 bg-hydra-light min-h-screen">
        {/* Welcome Banner */}
        <div className="bg-hydra-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <p className="text-hydra-cyan text-sm font-medium uppercase tracking-wider mb-1">
                  Training Center
                </p>
                {employeeName ? (
                  <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold uppercase tracking-wide">
                    Welcome back, {employeeName}
                  </h1>
                ) : (
                  <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold uppercase tracking-wide">
                    Welcome, Team Member
                  </h1>
                )}
                {!employeeName && !editingName && (
                  <button
                    onClick={() => setEditingName(true)}
                    className="flex items-center gap-2 mt-3 text-sm text-hydra-gray hover:text-hydra-cyan transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Set your name
                  </button>
                )}
                {employeeName && !editingName && (
                  <button
                    onClick={() => {
                      setNameInput(employeeName);
                      setEditingName(true);
                    }}
                    className="text-sm text-hydra-gray hover:text-hydra-cyan transition-colors mt-1"
                  >
                    Change name
                  </button>
                )}
                {editingName && (
                  <div className="flex items-center gap-2 mt-3">
                    <input
                      type="text"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Your name"
                      className="px-3 py-2 bg-hydra-navy border border-white/10 rounded-lg text-white text-sm placeholder:text-hydra-gray focus:outline-none focus:border-hydra-cyan/50"
                      autoFocus
                      onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                    />
                    <button
                      onClick={handleSaveName}
                      className="px-4 py-2 bg-hydra-cyan text-hydra-dark text-sm font-semibold rounded-lg hover:bg-hydra-teal transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingName(false)}
                      className="px-3 py-2 text-hydra-gray text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                {/* Progress Ring */}
                <div className="flex items-center gap-4 bg-hydra-navy/60 rounded-xl px-5 py-4">
                  <div className="relative w-14 h-14">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-white/10"
                      />
                      <circle
                        cx="28"
                        cy="28"
                        r="24"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                        className="text-hydra-cyan"
                        strokeDasharray={`${progressPercent * 1.508} 150.8`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                      {progressPercent}%
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {completedCount}/{totalCount}
                    </p>
                    <p className="text-hydra-gray text-xs">Completed</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-hydra-gray hover:text-red-400 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Log out</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hydra-gray" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search modules..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-hydra-gray/20 rounded-xl text-hydra-dark text-sm placeholder:text-hydra-gray focus:outline-none focus:border-hydra-cyan/50 focus:ring-1 focus:ring-hydra-cyan/25 transition-colors"
              />
            </div>
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("All")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === "All"
                    ? "bg-hydra-dark text-white"
                    : "bg-white text-hydra-dark hover:bg-hydra-dark/5"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-hydra-dark text-white"
                      : "bg-white text-hydra-dark hover:bg-hydra-dark/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Module Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          {activeCategory === "All" && !searchQuery ? (
            // Group by category
            categories.map((cat) => {
              const catModules = filteredModules.filter((m) => m.category === cat);
              if (catModules.length === 0) return null;
              const Icon = categoryIcons[cat];
              return (
                <div key={cat} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 bg-hydra-cyan/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-hydra-cyan" />
                    </div>
                    <h2 className="font-[var(--font-heading)] text-xl font-bold text-hydra-dark uppercase tracking-wide">
                      {cat}
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catModules.map((mod) => {
                      const isComplete = completedModules.includes(mod.id);
                      return (
                        <div
                          key={mod.id}
                          className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                            isComplete
                              ? "border-hydra-cyan/30"
                              : "border-hydra-gray/10"
                          }`}
                        >
                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3 mb-3">
                              <Link
                                href={`/training/${mod.id}`}
                                className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm leading-tight hover:text-hydra-teal transition-colors flex-1"
                              >
                                {mod.title}
                              </Link>
                              <button
                                onClick={() => toggleModule(mod.id)}
                                className="shrink-0 mt-0.5"
                                title={isComplete ? "Mark incomplete" : "Mark complete"}
                              >
                                {isComplete ? (
                                  <CheckCircle2 className="w-5 h-5 text-hydra-cyan" />
                                ) : (
                                  <Circle className="w-5 h-5 text-hydra-gray/40 hover:text-hydra-cyan/60 transition-colors" />
                                )}
                              </button>
                            </div>
                            <p className="text-hydra-gray text-xs leading-relaxed line-clamp-2 mb-4">
                              {mod.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5 text-xs text-hydra-gray">
                                <Clock className="w-3.5 h-3.5" />
                                {mod.duration}
                              </span>
                              <Link
                                href={`/training/${mod.id}`}
                                className="flex items-center gap-1.5 text-xs font-semibold text-hydra-teal hover:text-hydra-cyan transition-colors"
                              >
                                <Play className="w-3.5 h-3.5" />
                                Start Module
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            // Flat list (filtered or single category)
            <>
              {filteredModules.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-hydra-gray text-sm">
                    No modules found. Try adjusting your search or filter.
                  </p>
                </div>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredModules.map((mod) => {
                  const isComplete = completedModules.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                        isComplete
                          ? "border-hydra-cyan/30"
                          : "border-hydra-gray/10"
                      }`}
                    >
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <span className="text-[10px] uppercase tracking-wider text-hydra-teal font-medium">
                            {mod.category}
                          </span>
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className="shrink-0"
                            title={isComplete ? "Mark incomplete" : "Mark complete"}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="w-5 h-5 text-hydra-cyan" />
                            ) : (
                              <Circle className="w-5 h-5 text-hydra-gray/40 hover:text-hydra-cyan/60 transition-colors" />
                            )}
                          </button>
                        </div>
                        <Link
                          href={`/training/${mod.id}`}
                          className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm leading-tight hover:text-hydra-teal transition-colors block mb-3"
                        >
                          {mod.title}
                        </Link>
                        <p className="text-hydra-gray text-xs leading-relaxed line-clamp-2 mb-4">
                          {mod.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-xs text-hydra-gray">
                            <Clock className="w-3.5 h-3.5" />
                            {mod.duration}
                          </span>
                          <Link
                            href={`/training/${mod.id}`}
                            className="flex items-center gap-1.5 text-xs font-semibold text-hydra-teal hover:text-hydra-cyan transition-colors"
                          >
                            <Play className="w-3.5 h-3.5" />
                            Start Module
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
