"use client";

import { useState, useMemo } from "react";
import PortalShell from "@/components/portal/PortalShell";
import { usePortal } from "@/lib/portal-context";
import {
  addResource,
  updateResource,
  deleteResource,
} from "@/lib/portal-store";
import type { Resource, ResourceType } from "@/lib/portal-types";
import {
  FilePlus,
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  FileText,
  Video,
  File,
  Link2,
  GraduationCap,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

function generateId(): string {
  return `res-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

const typeIcons: Record<ResourceType, typeof FileText> = {
  pdf: FileText,
  video: Video,
  document: File,
  link: Link2,
  training: GraduationCap,
};

const typeLabels: Record<ResourceType, string> = {
  pdf: "PDF",
  video: "Video",
  document: "Document",
  link: "Link",
  training: "Training",
};

interface ResourceFormData {
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  categoryId: string;
  tags: string;
  assignedDepartments: string[];
  assignedPositions: string[];
  requiredForOnboarding: boolean;
  duration: string;
  fileSize: string;
}

const emptyForm: ResourceFormData = {
  title: "",
  description: "",
  type: "document",
  url: "",
  categoryId: "",
  tags: "",
  assignedDepartments: [],
  assignedPositions: [],
  requiredForOnboarding: false,
  duration: "",
  fileSize: "",
};

export default function ResourcesPage() {
  const { currentUser, state, refreshState } = usePortal();
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState<ResourceType | "">("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ResourceFormData>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  const filtered = useMemo(() => {
    let list = [...state.resources];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filterCategory) list = list.filter((r) => r.categoryId === filterCategory);
    if (filterType) list = list.filter((r) => r.type === filterType);
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [state.resources, search, filterCategory, filterType]);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setModalOpen(true);
  }

  function openEdit(res: Resource) {
    setEditingId(res.id);
    setForm({
      title: res.title,
      description: res.description,
      type: res.type,
      url: res.url,
      categoryId: res.categoryId,
      tags: res.tags.join(", "),
      assignedDepartments: [...res.assignedDepartments],
      assignedPositions: [...res.assignedPositions],
      requiredForOnboarding: res.requiredForOnboarding,
      duration: res.duration ?? "",
      fileSize: res.fileSize ?? "",
    });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.title.trim() || !form.url.trim() || !form.categoryId) return;

    const tags = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const now = new Date().toISOString();

    if (editingId) {
      updateResource(editingId, {
        title: form.title.trim(),
        description: form.description.trim(),
        type: form.type,
        url: form.url.trim(),
        categoryId: form.categoryId,
        tags,
        assignedDepartments: form.assignedDepartments,
        assignedPositions: form.assignedPositions,
        requiredForOnboarding: form.requiredForOnboarding,
        duration: form.duration || undefined,
        fileSize: form.fileSize || undefined,
        updatedAt: now,
      });
      showToast("Resource updated.");
    } else {
      const newRes: Resource = {
        id: generateId(),
        title: form.title.trim(),
        description: form.description.trim(),
        type: form.type,
        url: form.url.trim(),
        categoryId: form.categoryId,
        tags,
        assignedDepartments: form.assignedDepartments,
        assignedPositions: form.assignedPositions,
        requiredForOnboarding: form.requiredForOnboarding,
        duration: form.duration || undefined,
        fileSize: form.fileSize || undefined,
        createdAt: now,
        updatedAt: now,
      };
      addResource(newRes);
      showToast("Resource added.");
    }
    refreshState();
    setModalOpen(false);
  }

  function handleDelete(id: string) {
    deleteResource(id);
    refreshState();
    setConfirmDelete(null);
    showToast("Resource deleted.");
  }

  function toggleDept(deptId: string) {
    setForm((prev) => ({
      ...prev,
      assignedDepartments: prev.assignedDepartments.includes(deptId)
        ? prev.assignedDepartments.filter((d) => d !== deptId)
        : [...prev.assignedDepartments, deptId],
    }));
  }

  function togglePos(posId: string) {
    setForm((prev) => ({
      ...prev,
      assignedPositions: prev.assignedPositions.includes(posId)
        ? prev.assignedPositions.filter((p) => p !== posId)
        : [...prev.assignedPositions, posId],
    }));
  }

  function getAssignmentLabel(res: Resource): string {
    if (res.assignedDepartments.length === 0 && res.assignedPositions.length === 0) {
      return "All employees";
    }
    const parts: string[] = [];
    if (res.assignedDepartments.length > 0) {
      parts.push(`${res.assignedDepartments.length} dept${res.assignedDepartments.length > 1 ? "s" : ""}`);
    }
    if (res.assignedPositions.length > 0) {
      parts.push(`${res.assignedPositions.length} pos${res.assignedPositions.length > 1 ? "s" : ""}`);
    }
    return `Assigned to ${parts.join(", ")}`;
  }

  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
    return (
      <PortalShell>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-hydra-navy rounded-xl border border-hydra-slate/50 max-w-md">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="font-[var(--font-heading)] text-xl uppercase text-hydra-white mb-2">
              Access Denied
            </h1>
            <p className="text-hydra-gray text-sm">
              You do not have permission to view this page. Admin or manager access is required.
            </p>
          </div>
        </div>
      </PortalShell>
    );
  }

  const catName = (id: string) => state.categories.find((c) => c.id === id)?.name ?? "—";

  return (
    <PortalShell>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl uppercase tracking-wide text-hydra-white">
              Resources
            </h1>
            <p className="text-hydra-gray text-sm mt-1">
              {state.resources.length} total resources in the library.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors shrink-0"
          >
            <FilePlus className="w-4 h-4" />
            Add Resource
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hydra-gray" />
            <input
              type="text"
              placeholder="Search title, description, or tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-hydra-navy border border-hydra-slate/50 rounded-lg text-sm text-hydra-white placeholder:text-hydra-gray/50 focus:outline-none focus:border-hydra-cyan/50"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2.5 bg-hydra-navy border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
          >
            <option value="">All Categories</option>
            {state.categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as ResourceType | "")}
            className="px-3 py-2.5 bg-hydra-navy border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
          >
            <option value="">All Types</option>
            {(Object.keys(typeLabels) as ResourceType[]).map((t) => (
              <option key={t} value={t}>{typeLabels[t]}</option>
            ))}
          </select>
        </div>

        {/* Resource List */}
        <div className="space-y-3">
          {filtered.map((res) => {
            const TypeIcon = typeIcons[res.type];
            return (
              <div
                key={res.id}
                className="bg-hydra-navy border border-hydra-slate/50 rounded-xl p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-hydra-slate/50 flex items-center justify-center shrink-0">
                      <TypeIcon className="w-4 h-4 text-hydra-cyan" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-hydra-white truncate">{res.title}</p>
                      <p className="text-xs text-hydra-gray truncate">{res.description}</p>
                    </div>
                  </div>

                  {/* Info chips - desktop */}
                  <div className="hidden lg:flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray uppercase">
                      {typeLabels[res.type]}
                    </span>
                    <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
                      {catName(res.categoryId)}
                    </span>
                    <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
                      {getAssignmentLabel(res)}
                    </span>
                    {res.requiredForOnboarding && (
                      <span className="px-2 py-1 rounded bg-hydra-cyan/10 text-hydra-cyan">
                        Onboarding
                      </span>
                    )}
                  </div>

                  {/* Date */}
                  <span className="hidden sm:block text-xs text-hydra-gray shrink-0">
                    {new Date(res.createdAt).toLocaleDateString()}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
                      title="View resource"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => openEdit(res)}
                      className="p-2 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setConfirmDelete(res.id)}
                      className="p-2 text-hydra-gray hover:text-red-400 transition-colors rounded-lg hover:bg-hydra-slate/50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Mobile info row */}
                <div className="flex flex-wrap gap-1.5 mt-2 lg:hidden text-xs">
                  <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray uppercase">
                    {typeLabels[res.type]}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
                    {catName(res.categoryId)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
                    {getAssignmentLabel(res)}
                  </span>
                  {res.requiredForOnboarding && (
                    <span className="px-2 py-0.5 rounded bg-hydra-cyan/10 text-hydra-cyan">
                      Onboarding
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-hydra-gray text-sm">
              No resources match your filters.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[var(--font-heading)] text-lg uppercase text-hydra-white">
                {editingId ? "Edit Resource" : "Add Resource"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-hydra-gray hover:text-hydra-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="Resource title"
                />
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50 resize-none"
                  placeholder="Brief description..."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">
                    Type <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as ResourceType })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  >
                    {(Object.keys(typeLabels) as ResourceType[]).map((t) => (
                      <option key={t} value={t}>{typeLabels[t]}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  >
                    <option value="">Select category...</option>
                    {state.categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="safety, onboarding, training"
                />
              </div>

              {/* Department assignment */}
              <div>
                <label className="block text-xs text-hydra-gray mb-2">
                  Assigned Departments
                  <span className="text-hydra-gray/60 ml-1">(empty = all)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {state.departments.map((d) => (
                    <label
                      key={d.id}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        form.assignedDepartments.includes(d.id)
                          ? "border-hydra-cyan/50 bg-hydra-cyan/10 text-hydra-cyan"
                          : "border-hydra-slate/50 bg-hydra-dark text-hydra-gray hover:border-hydra-slate"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.assignedDepartments.includes(d.id)}
                        onChange={() => toggleDept(d.id)}
                        className="sr-only"
                      />
                      {d.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Position assignment */}
              <div>
                <label className="block text-xs text-hydra-gray mb-2">
                  Assigned Positions
                  <span className="text-hydra-gray/60 ml-1">(empty = all)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {state.positions.map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                        form.assignedPositions.includes(p.id)
                          ? "border-hydra-cyan/50 bg-hydra-cyan/10 text-hydra-cyan"
                          : "border-hydra-slate/50 bg-hydra-dark text-hydra-gray hover:border-hydra-slate"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.assignedPositions.includes(p.id)}
                        onChange={() => togglePos(p.id)}
                        className="sr-only"
                      />
                      {p.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Toggles + optional fields */}
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <div
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      form.requiredForOnboarding ? "bg-hydra-cyan" : "bg-hydra-slate"
                    }`}
                    onClick={() => setForm({ ...form, requiredForOnboarding: !form.requiredForOnboarding })}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                        form.requiredForOnboarding ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-hydra-gray">Required for Onboarding</span>
                </label>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">Duration (videos)</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                    placeholder="12 min"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">File Size (PDFs)</label>
                  <input
                    type="text"
                    value={form.fileSize}
                    onChange={(e) => setForm({ ...form, fileSize: e.target.value })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                    placeholder="2.4 MB"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!form.title.trim() || !form.url.trim() || !form.categoryId}
                className="w-full mt-2 py-3 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingId ? "Save Changes" : "Add Resource"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-sm p-6 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-[var(--font-heading)] text-base uppercase text-hydra-white mb-2">
              Delete Resource
            </h3>
            <p className="text-sm text-hydra-gray mb-6">
              This will permanently remove this resource and all associated completion records.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 bg-hydra-slate text-hydra-white rounded-lg text-sm font-medium hover:bg-hydra-slate/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDelete)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-hydra-cyan text-hydra-dark px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg animate-[fadeIn_0.2s_ease-out]">
          {toast}
        </div>
      )}
    </PortalShell>
  );
}
