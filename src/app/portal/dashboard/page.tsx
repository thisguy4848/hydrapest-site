"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePortal } from "@/lib/portal-context";
import PortalShell from "@/components/portal/PortalShell";
import {
  Library,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  FileText,
  Video,
  Link as LinkIcon,
  File,
  Play,
} from "lucide-react";
import type { ResourceType } from "@/lib/portal-types";

const typeIcons: Record<ResourceType, React.ElementType> = {
  pdf: FileText,
  video: Video,
  document: File,
  link: LinkIcon,
  training: Play,
};

export default function DashboardPage() {
  const { state, currentUser, getAssignedResources, getCompletedCount, isCompleted } =
    usePortal();

  const assigned = useMemo(() => getAssignedResources(), [getAssignedResources]);
  const completedCount = getCompletedCount();
  const totalCount = assigned.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const onboardingResources = useMemo(
    () => assigned.filter((r) => r.requiredForOnboarding && !isCompleted(r.id)),
    [assigned, isCompleted]
  );

  const recentlyAdded = useMemo(
    () =>
      [...assigned]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
    [assigned]
  );

  const lastIncomplete = useMemo(
    () => assigned.find((r) => !isCompleted(r.id)),
    [assigned, isCompleted]
  );

  const firstName = currentUser?.name.split(" ")[0] ?? "Team Member";

  const circumference = 2 * Math.PI * 40;
  const strokeOffset = circumference - (pct / 100) * circumference;

  return (
    <PortalShell>
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide">
            Welcome back, {firstName}
          </h1>
          <p className="text-hydra-gray text-sm mt-1">
            Here&apos;s your training and resource overview.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-hydra-gray/10 p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-hydra-cyan/10 rounded-xl flex items-center justify-center shrink-0">
              <Library className="w-5 h-5 text-hydra-cyan" />
            </div>
            <div>
              <p className="text-2xl font-bold text-hydra-dark">{totalCount}</p>
              <p className="text-xs text-hydra-gray">Assigned Resources</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-hydra-gray/10 p-5 flex items-center gap-4">
            <div className="w-11 h-11 bg-hydra-teal/10 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-hydra-teal" />
            </div>
            <div>
              <p className="text-2xl font-bold text-hydra-dark">{completedCount}</p>
              <p className="text-xs text-hydra-gray">Completed</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-hydra-gray/10 p-5 flex items-center gap-4">
            <div className="relative w-14 h-14 shrink-0">
              <svg className="w-14 h-14 -rotate-90" viewBox="0 0 90 90">
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-hydra-gray/10"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="6"
                  fill="none"
                  className="text-hydra-cyan"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-hydra-dark">
                {pct}%
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-hydra-dark">Completion</p>
              <p className="text-xs text-hydra-gray">
                {completedCount}/{totalCount} done
              </p>
            </div>
          </div>
        </div>

        {/* Onboarding alert */}
        {onboardingResources.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h2 className="font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wide mb-2">
                  Required for Onboarding
                </h2>
                <p className="text-xs text-hydra-gray mb-4">
                  Complete these {onboardingResources.length} resource
                  {onboardingResources.length !== 1 ? "s" : ""} to finish your onboarding.
                </p>
                <div className="space-y-2">
                  {onboardingResources.map((r) => {
                    const Icon = typeIcons[r.type];
                    return (
                      <Link
                        key={r.id}
                        href={`/portal/resources/${r.id}`}
                        className="flex items-center gap-3 bg-white rounded-lg px-4 py-3 border border-amber-100 hover:border-hydra-cyan/30 hover:shadow-sm transition-all group"
                      >
                        <Icon className="w-4 h-4 text-hydra-gray group-hover:text-hydra-cyan shrink-0" />
                        <span className="text-sm text-hydra-dark font-medium flex-1 truncate">
                          {r.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-hydra-gray/40 group-hover:text-hydra-cyan transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Continue where you left off */}
          {lastIncomplete && (
            <div className="bg-hydra-dark rounded-xl p-6 text-white lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-hydra-cyan" />
                <h2 className="font-[var(--font-heading)] text-xs font-bold uppercase tracking-wider text-hydra-cyan">
                  Continue Where You Left Off
                </h2>
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-bold uppercase tracking-wide mb-2">
                {lastIncomplete.title}
              </h3>
              <p className="text-sm text-hydra-gray leading-relaxed line-clamp-2 mb-4">
                {lastIncomplete.description}
              </p>
              <div className="flex items-center gap-3">
                <Link
                  href={`/portal/resources/${lastIncomplete.id}`}
                  className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {lastIncomplete.duration && (
                  <span className="flex items-center gap-1 text-xs text-hydra-gray">
                    <Clock className="w-3 h-3" />
                    {lastIncomplete.duration}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Recently Added */}
          <div className="bg-white rounded-xl border border-hydra-gray/10 p-6">
            <h2 className="font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wide mb-4">
              Recently Added
            </h2>
            <div className="space-y-2">
              {recentlyAdded.map((r) => {
                const Icon = typeIcons[r.type];
                const completed = isCompleted(r.id);
                const category = state.categories.find((c) => c.id === r.categoryId);
                return (
                  <Link
                    key={r.id}
                    href={`/portal/resources/${r.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-hydra-light transition-colors group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        completed ? "bg-hydra-cyan/10" : "bg-hydra-gray/5"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          completed ? "text-hydra-cyan" : "text-hydra-gray"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-hydra-dark truncate group-hover:text-hydra-teal transition-colors">
                        {r.title}
                      </p>
                      <p className="text-xs text-hydra-gray">{category?.name}</p>
                    </div>
                    {completed && (
                      <CheckCircle2 className="w-4 h-4 text-hydra-cyan shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
            <Link
              href="/portal/resources"
              className="flex items-center gap-1 text-xs font-semibold text-hydra-teal hover:text-hydra-cyan mt-4 transition-colors"
            >
              View all resources
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <Link
              href="/portal/resources"
              className="flex items-center gap-4 bg-white rounded-xl border border-hydra-gray/10 p-5 hover:border-hydra-cyan/30 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-hydra-cyan/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-hydra-cyan/20 transition-colors">
                <BookOpen className="w-6 h-6 text-hydra-cyan" />
              </div>
              <div className="flex-1">
                <h3 className="font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wide">
                  Browse Resources
                </h3>
                <p className="text-xs text-hydra-gray mt-0.5">
                  PDFs, videos, documents, and external links
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-hydra-gray/40 group-hover:text-hydra-cyan transition-colors" />
            </Link>

            <Link
              href="/portal/training"
              className="flex items-center gap-4 bg-white rounded-xl border border-hydra-gray/10 p-5 hover:border-hydra-cyan/30 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-hydra-teal/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-hydra-teal/20 transition-colors">
                <GraduationCap className="w-6 h-6 text-hydra-teal" />
              </div>
              <div className="flex-1">
                <h3 className="font-[var(--font-heading)] text-sm font-bold text-hydra-dark uppercase tracking-wide">
                  Training Modules
                </h3>
                <p className="text-xs text-hydra-gray mt-0.5">
                  Video training with progress tracking
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-hydra-gray/40 group-hover:text-hydra-cyan transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
