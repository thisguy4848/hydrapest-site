"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePortal } from "@/lib/portal-context";
import PortalShell from "@/components/portal/PortalShell";
import {
  Play,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  Shield,
  Bug,
  FlaskConical,
  Wrench,
  ShieldCheck,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const categoryIconMap: Record<string, React.ElementType> = {
  Shield,
  Bug,
  FlaskConical,
  Wrench,
  ShieldCheck,
  TrendingUp,
  BookOpen,
};

export default function TrainingPage() {
  const { state, isCompleted } = usePortal();

  const trainingResources = useMemo(
    () => state.resources.filter((r) => r.type === "training"),
    [state.resources]
  );

  const categoriesWithProgress = useMemo(() => {
    return state.categories
      .sort((a, b) => a.order - b.order)
      .map((cat) => {
        const resources = trainingResources.filter((r) => r.categoryId === cat.id);
        const completed = resources.filter((r) => isCompleted(r.id)).length;
        return {
          ...cat,
          resources,
          completed,
          total: resources.length,
          pct: resources.length > 0 ? Math.round((completed / resources.length) * 100) : 0,
        };
      })
      .filter((cat) => cat.total > 0);
  }, [state.categories, trainingResources, isCompleted]);

  const totalTraining = trainingResources.length;
  const totalCompleted = trainingResources.filter((r) => isCompleted(r.id)).length;
  const overallPct =
    totalTraining > 0 ? Math.round((totalCompleted / totalTraining) * 100) : 0;

  return (
    <PortalShell>
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide">
              Training Modules
            </h1>
            <p className="text-hydra-gray text-sm mt-1">
              {totalTraining} modules &middot; {totalCompleted} completed
            </p>
          </div>

          {/* Overall progress */}
          <div className="flex items-center gap-4 bg-white rounded-xl border border-hydra-gray/10 px-5 py-3">
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-hydra-gray/10"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-hydra-cyan"
                  strokeDasharray={`${overallPct * 1.257} 125.7`}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-hydra-dark">
                {overallPct}%
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-hydra-dark">Overall Progress</p>
              <p className="text-xs text-hydra-gray">
                {totalCompleted}/{totalTraining} complete
              </p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {categoriesWithProgress.map((cat) => {
            const IconComponent = categoryIconMap[cat.icon] || BookOpen;
            return (
              <div key={cat.id}>
                {/* Category header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-hydra-cyan/10 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-hydra-cyan" />
                    </div>
                    <div>
                      <h2 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-hydra-gray">
                        {cat.completed}/{cat.total} completed
                      </p>
                    </div>
                  </div>
                  {/* Category progress bar */}
                  <div className="hidden sm:flex items-center gap-3 w-40">
                    <div className="flex-1 h-2 bg-hydra-gray/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-hydra-cyan rounded-full transition-all duration-500"
                        style={{ width: `${cat.pct}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-hydra-gray w-8 text-right">
                      {cat.pct}%
                    </span>
                  </div>
                </div>

                {/* Module cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.resources.map((r) => {
                    const completed = isCompleted(r.id);
                    return (
                      <div
                        key={r.id}
                        className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                          completed
                            ? "border-hydra-cyan/30"
                            : "border-hydra-gray/10 hover:border-hydra-cyan/30"
                        }`}
                      >
                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                                <Play className="w-4 h-4 text-emerald-600" />
                              </div>
                            </div>
                            {completed ? (
                              <CheckCircle2 className="w-5 h-5 text-hydra-cyan shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-hydra-gray/30 shrink-0" />
                            )}
                          </div>

                          <Link
                            href={`/portal/resources/${r.id}`}
                            className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm leading-tight hover:text-hydra-teal transition-colors block mb-2"
                          >
                            {r.title}
                          </Link>

                          <p className="text-hydra-gray text-xs leading-relaxed line-clamp-2 mb-4">
                            {r.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 text-xs text-hydra-gray">
                              <Clock className="w-3.5 h-3.5" />
                              {r.duration}
                            </span>
                            <Link
                              href={`/portal/resources/${r.id}`}
                              className="flex items-center gap-1.5 text-xs font-semibold text-hydra-teal hover:text-hydra-cyan transition-colors"
                            >
                              {completed ? "Review" : "Start"}
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {categoriesWithProgress.length === 0 && (
          <div className="text-center py-20">
            <h3 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide mb-2">
              No Training Modules
            </h3>
            <p className="text-sm text-hydra-gray">
              Training modules will appear here once they&apos;re added.
            </p>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
