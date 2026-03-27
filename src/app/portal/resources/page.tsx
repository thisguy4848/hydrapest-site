"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePortal } from "@/lib/portal-context";
import PortalShell from "@/components/portal/PortalShell";
import {
  Search,
  FileText,
  Video,
  File,
  Link as LinkIcon,
  Play,
  CheckCircle2,
  Circle,
  Clock,
  HardDrive,
  LayoutGrid,
  List,
  ArrowRight,
  Filter,
  X,
} from "lucide-react";
import type { ResourceType } from "@/lib/portal-types";

const typeIcons: Record<ResourceType, React.ElementType> = {
  pdf: FileText,
  video: Video,
  document: File,
  link: LinkIcon,
  training: Play,
};

const typeLabels: Record<ResourceType, string> = {
  pdf: "PDF",
  video: "Video",
  document: "Document",
  link: "Link",
  training: "Training",
};

const typeColors: Record<ResourceType, string> = {
  pdf: "bg-red-50 text-red-600",
  video: "bg-purple-50 text-purple-600",
  document: "bg-blue-50 text-blue-600",
  link: "bg-amber-50 text-amber-600",
  training: "bg-emerald-50 text-emerald-600",
};

export default function ResourcesPage() {
  const { state, getAssignedResources, isCompleted, toggleCompletion } = usePortal();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState<ResourceType | "all">("all");
  const [activeDept, setActiveDept] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const assigned = useMemo(() => getAssignedResources(), [getAssignedResources]);

  const filtered = useMemo(() => {
    return assigned.filter((r) => {
      if (activeCategory !== "all" && r.categoryId !== activeCategory) return false;
      if (activeType !== "all" && r.type !== activeType) return false;
      if (activeDept !== "all") {
        if (r.assignedDepartments.length > 0 && !r.assignedDepartments.includes(activeDept))
          return false;
      }
      if (search) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [assigned, activeCategory, activeType, activeDept, search]);

  const hasFilters =
    activeCategory !== "all" || activeType !== "all" || activeDept !== "all" || search !== "";

  function clearFilters() {
    setActiveCategory("all");
    setActiveType("all");
    setActiveDept("all");
    setSearch("");
  }

  return (
    <PortalShell>
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide">
              Resource Library
            </h1>
            <p className="text-hydra-gray text-sm mt-1">
              {assigned.length} resources available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "grid"
                  ? "bg-hydra-dark text-white"
                  : "bg-white text-hydra-gray hover:text-hydra-dark border border-hydra-gray/10"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === "list"
                  ? "bg-hydra-dark text-white"
                  : "bg-white text-hydra-gray hover:text-hydra-dark border border-hydra-gray/10"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-hydra-gray" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-hydra-gray/15 rounded-xl text-hydra-dark text-sm placeholder:text-hydra-gray focus:outline-none focus:border-hydra-cyan/50 focus:ring-1 focus:ring-hydra-cyan/25 transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Category pills */}
          <div className="flex flex-wrap gap-1.5 flex-1">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeCategory === "all"
                  ? "bg-hydra-dark text-white"
                  : "bg-white text-hydra-dark border border-hydra-gray/15 hover:border-hydra-cyan/30"
              }`}
            >
              All Categories
            </button>
            {state.categories
              .sort((a, b) => a.order - b.order)
              .map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-hydra-dark text-white"
                      : "bg-white text-hydra-dark border border-hydra-gray/15 hover:border-hydra-cyan/30"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
          </div>

          {/* Type filter */}
          <select
            value={activeType}
            onChange={(e) => setActiveType(e.target.value as ResourceType | "all")}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-hydra-gray/15 text-hydra-dark focus:outline-none focus:border-hydra-cyan/50"
          >
            <option value="all">All Types</option>
            <option value="training">Training</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
            <option value="link">Link</option>
          </select>

          {/* Department filter */}
          <select
            value={activeDept}
            onChange={(e) => setActiveDept(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white border border-hydra-gray/15 text-hydra-dark focus:outline-none focus:border-hydra-cyan/50"
          >
            <option value="all">All Departments</option>
            {state.departments.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {/* Active filter indicator */}
        {hasFilters && (
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-3.5 h-3.5 text-hydra-gray" />
            <span className="text-xs text-hydra-gray">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs text-hydra-teal hover:text-hydra-cyan transition-colors ml-2"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          </div>
        )}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-hydra-gray/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-hydra-gray/40" />
            </div>
            <h3 className="font-[var(--font-heading)] text-lg font-bold text-hydra-dark uppercase tracking-wide mb-2">
              No resources found
            </h3>
            <p className="text-sm text-hydra-gray mb-4">
              Try adjusting your search or filters.
            </p>
            <button
              onClick={clearFilters}
              className="text-sm font-semibold text-hydra-teal hover:text-hydra-cyan transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Grid view */}
        {filtered.length > 0 && viewMode === "grid" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r) => {
              const Icon = typeIcons[r.type];
              const completed = isCompleted(r.id);
              const category = state.categories.find((c) => c.id === r.categoryId);
              return (
                <div
                  key={r.id}
                  className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 group ${
                    completed
                      ? "border-hydra-cyan/30"
                      : "border-hydra-gray/10 hover:border-hydra-cyan/30"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeColors[r.type]}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${typeColors[r.type]}`}
                        >
                          {typeLabels[r.type]}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleCompletion(r.id);
                        }}
                        className="shrink-0"
                        title={completed ? "Mark incomplete" : "Mark complete"}
                      >
                        {completed ? (
                          <CheckCircle2 className="w-5 h-5 text-hydra-cyan" />
                        ) : (
                          <Circle className="w-5 h-5 text-hydra-gray/30 hover:text-hydra-cyan/60 transition-colors" />
                        )}
                      </button>
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
                      <div className="flex items-center gap-3">
                        {category && (
                          <span className="px-2 py-0.5 rounded-full bg-hydra-light text-hydra-teal text-[10px] font-medium">
                            {category.name}
                          </span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-[10px] text-hydra-gray">
                        {r.duration && (
                          <>
                            <Clock className="w-3 h-3" />
                            {r.duration}
                          </>
                        )}
                        {r.fileSize && (
                          <>
                            <HardDrive className="w-3 h-3" />
                            {r.fileSize}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* List view */}
        {filtered.length > 0 && viewMode === "list" && (
          <div className="space-y-2">
            {filtered.map((r) => {
              const Icon = typeIcons[r.type];
              const completed = isCompleted(r.id);
              const category = state.categories.find((c) => c.id === r.categoryId);
              return (
                <div
                  key={r.id}
                  className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-sm group ${
                    completed
                      ? "border-hydra-cyan/30"
                      : "border-hydra-gray/10 hover:border-hydra-cyan/30"
                  }`}
                >
                  <div className="flex items-center gap-4 px-4 py-3.5">
                    <button
                      onClick={() => toggleCompletion(r.id)}
                      className="shrink-0"
                    >
                      {completed ? (
                        <CheckCircle2 className="w-5 h-5 text-hydra-cyan" />
                      ) : (
                        <Circle className="w-5 h-5 text-hydra-gray/30 hover:text-hydra-cyan/60 transition-colors" />
                      )}
                    </button>

                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeColors[r.type]}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <Link
                      href={`/portal/resources/${r.id}`}
                      className="flex-1 min-w-0"
                    >
                      <p className="text-sm font-medium text-hydra-dark truncate group-hover:text-hydra-teal transition-colors">
                        {r.title}
                      </p>
                      <p className="text-xs text-hydra-gray truncate mt-0.5">
                        {r.description}
                      </p>
                    </Link>

                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                      {category && (
                        <span className="px-2 py-0.5 rounded-full bg-hydra-light text-hydra-teal text-[10px] font-medium whitespace-nowrap">
                          {category.name}
                        </span>
                      )}
                      <span className="text-[10px] text-hydra-gray whitespace-nowrap">
                        {r.duration || r.fileSize}
                      </span>
                    </div>

                    <Link href={`/portal/resources/${r.id}`} className="shrink-0">
                      <ArrowRight className="w-4 h-4 text-hydra-gray/30 group-hover:text-hydra-cyan transition-colors" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PortalShell>
  );
}
