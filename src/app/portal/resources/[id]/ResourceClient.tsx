"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePortal } from "@/lib/portal-context";
import PortalShell from "@/components/portal/PortalShell";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  HardDrive,
  FileText,
  Video,
  File,
  Link as LinkIcon,
  Play,
  ExternalLink,
  Download,
  Calendar,
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
  pdf: "PDF Document",
  video: "Video",
  document: "Document",
  link: "External Link",
  training: "Training Module",
};

const typeColors: Record<ResourceType, string> = {
  pdf: "bg-red-50 text-red-600",
  video: "bg-purple-50 text-purple-600",
  document: "bg-blue-50 text-blue-600",
  link: "bg-amber-50 text-amber-600",
  training: "bg-emerald-50 text-emerald-600",
};

export default function ResourceClient({ id }: { id: string }) {
  const { state, isCompleted, toggleCompletion } = usePortal();

  const resource = state.resources.find((r) => r.id === id);
  const category = resource
    ? state.categories.find((c) => c.id === resource.categoryId)
    : null;

  const relatedResources = useMemo(() => {
    if (!resource) return [];
    return state.resources
      .filter((r) => r.categoryId === resource.categoryId && r.id !== resource.id)
      .slice(0, 5);
  }, [resource, state.resources]);

  const categoryResources = useMemo(() => {
    if (!resource) return [];
    return state.resources
      .filter((r) => r.categoryId === resource.categoryId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [resource, state.resources]);

  const currentIndex = categoryResources.findIndex((r) => r.id === id);
  const prevResource = currentIndex > 0 ? categoryResources[currentIndex - 1] : null;
  const nextResource =
    currentIndex < categoryResources.length - 1 ? categoryResources[currentIndex + 1] : null;

  if (!resource) {
    return (
      <PortalShell>
        <div className="flex items-center justify-center py-20 px-4">
          <div className="text-center">
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-hydra-dark uppercase mb-4">
              Resource Not Found
            </h1>
            <p className="text-hydra-gray mb-6">
              The resource you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/portal/resources"
              className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold px-6 py-3 rounded-full transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Resources
            </Link>
          </div>
        </div>
      </PortalShell>
    );
  }

  const completed = isCompleted(resource.id);

  return (
    <PortalShell>
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          href="/portal/resources"
          className="inline-flex items-center gap-1.5 text-sm text-hydra-gray hover:text-hydra-teal transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Resources
        </Link>

        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {category && (
              <span className="px-2.5 py-0.5 rounded-full bg-hydra-light text-hydra-teal text-xs font-medium">
                {category.name}
              </span>
            )}
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[resource.type]}`}
            >
              {typeLabels[resource.type]}
            </span>
          </div>

          <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl font-bold text-hydra-dark uppercase tracking-wide mb-3">
            {resource.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-hydra-gray">
            {resource.duration && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {resource.duration}
              </span>
            )}
            {resource.fileSize && (
              <span className="flex items-center gap-1.5">
                <HardDrive className="w-4 h-4" />
                {resource.fileSize}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              Added{" "}
              {new Date(resource.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Content area based on type */}
            {(resource.type === "training" || resource.type === "video") && (
              <div className="bg-hydra-dark rounded-2xl overflow-hidden aspect-video">
                {resource.url ? (
                  <iframe
                    src={resource.url}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={resource.title}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-hydra-gray text-lg">Video coming soon</p>
                  </div>
                )}
              </div>
            )}

            {resource.type === "pdf" && (
              <div className="bg-white rounded-xl border border-hydra-gray/10 p-8 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm mb-2">
                  PDF Document
                </h3>
                <p className="text-sm text-hydra-gray mb-5">
                  {resource.fileSize && `${resource.fileSize} — `}Download or view this document.
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            )}

            {resource.type === "document" && (
              <div className="bg-white rounded-xl border border-hydra-gray/10 p-8 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <File className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm mb-2">
                  Document
                </h3>
                <p className="text-sm text-hydra-gray mb-5">
                  {resource.fileSize && `${resource.fileSize} — `}Download or view this document.
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Document
                </a>
              </div>
            )}

            {resource.type === "link" && (
              <div className="bg-white rounded-xl border border-hydra-gray/10 p-8 text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LinkIcon className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm mb-2">
                  External Resource
                </h3>
                <p className="text-sm text-hydra-gray mb-5">
                  This resource links to an external website.
                </p>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark font-semibold text-sm px-6 py-3 rounded-full transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Resource
                </a>
              </div>
            )}

            {/* Description */}
            <div className="bg-white rounded-xl border border-hydra-gray/10 p-6">
              <h2 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm mb-3">
                About This Resource
              </h2>
              <p className="text-hydra-dark/80 text-sm leading-relaxed">
                {resource.description}
              </p>
              {resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {resource.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-hydra-light rounded text-[10px] text-hydra-gray font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Training key takeaways */}
            {resource.type === "training" && (
              <div className="bg-white rounded-xl border border-hydra-gray/10 p-6">
                <h2 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-sm mb-4">
                  Key Takeaways
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-hydra-cyan/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-hydra-cyan">1</span>
                    </div>
                    <span className="text-sm text-hydra-dark/80 leading-relaxed">
                      Understand the concepts and procedures covered in this module
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-hydra-cyan/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-hydra-cyan">2</span>
                    </div>
                    <span className="text-sm text-hydra-dark/80 leading-relaxed">
                      Apply learned techniques in your daily work
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-hydra-cyan/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-hydra-cyan">3</span>
                    </div>
                    <span className="text-sm text-hydra-dark/80 leading-relaxed">
                      Follow safety protocols and company standards at all times
                    </span>
                  </li>
                </ul>
              </div>
            )}

            {/* Prev/Next navigation */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {prevResource ? (
                <Link
                  href={`/portal/resources/${prevResource.id}`}
                  className="flex items-center gap-3 p-4 bg-white rounded-xl border border-hydra-gray/10 hover:border-hydra-cyan/30 hover:shadow-md transition-all group"
                >
                  <ArrowLeft className="w-4 h-4 text-hydra-gray group-hover:text-hydra-cyan transition-colors shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-hydra-gray">
                      Previous
                    </span>
                    <p className="font-[var(--font-heading)] text-xs font-bold text-hydra-dark uppercase tracking-wide truncate">
                      {prevResource.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextResource ? (
                <Link
                  href={`/portal/resources/${nextResource.id}`}
                  className="flex items-center justify-end gap-3 p-4 bg-white rounded-xl border border-hydra-gray/10 hover:border-hydra-cyan/30 hover:shadow-md transition-all group text-right"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase tracking-wider text-hydra-gray">
                      Next
                    </span>
                    <p className="font-[var(--font-heading)] text-xs font-bold text-hydra-dark uppercase tracking-wide truncate">
                      {nextResource.title}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-hydra-gray group-hover:text-hydra-cyan transition-colors shrink-0" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Completion toggle */}
            <button
              onClick={() => toggleCompletion(resource.id)}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                completed
                  ? "bg-hydra-cyan/10 text-hydra-cyan border border-hydra-cyan/20 hover:bg-hydra-cyan/20"
                  : "bg-hydra-cyan hover:bg-hydra-teal text-hydra-dark"
              }`}
            >
              {completed ? (
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

            {/* Status card */}
            <div className="bg-white rounded-xl border border-hydra-gray/10 p-5">
              <h3 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-xs mb-3">
                Status
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-hydra-gray">Type</span>
                  <span className="font-medium text-hydra-dark">{typeLabels[resource.type]}</span>
                </div>
                {resource.duration && (
                  <div className="flex justify-between">
                    <span className="text-hydra-gray">Duration</span>
                    <span className="font-medium text-hydra-dark">{resource.duration}</span>
                  </div>
                )}
                {resource.fileSize && (
                  <div className="flex justify-between">
                    <span className="text-hydra-gray">Size</span>
                    <span className="font-medium text-hydra-dark">{resource.fileSize}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-hydra-gray">Status</span>
                  <span
                    className={`font-medium ${completed ? "text-hydra-cyan" : "text-hydra-gray"}`}
                  >
                    {completed ? "Completed" : "Not started"}
                  </span>
                </div>
                {resource.requiredForOnboarding && (
                  <div className="flex justify-between">
                    <span className="text-hydra-gray">Onboarding</span>
                    <span className="font-medium text-amber-600">Required</span>
                  </div>
                )}
              </div>
            </div>

            {/* Related resources */}
            {relatedResources.length > 0 && (
              <div className="bg-white rounded-xl border border-hydra-gray/10 p-5">
                <h3 className="font-[var(--font-heading)] font-bold text-hydra-dark uppercase tracking-wide text-xs mb-4">
                  Related in {category?.name}
                </h3>
                <div className="space-y-2">
                  {relatedResources.map((r) => {
                    const Icon = typeIcons[r.type];
                    const relCompleted = isCompleted(r.id);
                    return (
                      <Link
                        key={r.id}
                        href={`/portal/resources/${r.id}`}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-hydra-light transition-colors group"
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            relCompleted ? "text-hydra-cyan" : "text-hydra-gray"
                          }`}
                        />
                        <span className="text-xs text-hydra-dark/80 group-hover:text-hydra-dark flex-1 truncate">
                          {r.title}
                        </span>
                        {relCompleted && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-hydra-cyan shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
