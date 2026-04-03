"use client";

import { useState, useMemo, useEffect } from "react";
import PortalShell from "@/components/portal/PortalShell";
import { usePortal } from "@/lib/portal-context";
import {
  fetchTrainingModules,
  addTrainingModule as addModuleAsync,
  updateTrainingModule as updateModuleAsync,
  deleteTrainingModule as deleteModuleAsync,
} from "@/lib/supabase-store";
import type { TrainingModule, TrainingResource } from "@/lib/training-data";
import { categories } from "@/lib/training-data";
import {
  GraduationCap,
  Search,
  Edit2,
  Trash2,
  X,
  Plus,
  Minus,
  ShieldAlert,
  AlertTriangle,
} from "lucide-react";

interface ModuleFormData {
  title: string;
  category: string;
  description: string;
  duration: string;
  videoUrl: string;
  order: number;
  keyTakeaways: string;
  resources: TrainingResource[];
}

const emptyForm: ModuleFormData = {
  title: "",
  category: "Onboarding",
  description: "",
  duration: "",
  videoUrl: "",
  order: 0,
  keyTakeaways: "",
  resources: [],
};

export default function TrainingAdminPage() {
  const { currentUser } = usePortal();
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ModuleFormData>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    fetchTrainingModules().then(setModules).catch(() => {});
  }, []);

  function refreshModules() {
    fetchTrainingModules().then(setModules).catch(() => {});
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  const filtered = useMemo(() => {
    let list = [...modules];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      );
    }
    if (filterCategory) list = list.filter((m) => m.category === filterCategory);
    return list.sort((a, b) => a.order - b.order);
  }, [modules, search, filterCategory]);

  function openAdd() {
    setEditingId(null);
    const maxOrder = modules.reduce((max, m) => Math.max(max, m.order), 0);
    setForm({ ...emptyForm, order: maxOrder + 1 });
    setModalOpen(true);
  }

  function openEdit(mod: TrainingModule) {
    setEditingId(mod.id);
    setForm({
      title: mod.title,
      category: mod.category,
      description: mod.description,
      duration: mod.duration,
      videoUrl: mod.videoUrl,
      order: mod.order,
      keyTakeaways: mod.keyTakeaways.join("\n"),
      resources: [...mod.resources],
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!form.title.trim()) return;

    const takeaways = form.keyTakeaways
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean);
    const resources = form.resources.filter((r) => r.name.trim());

    try {
      if (editingId) {
        await updateModuleAsync(editingId, {
          title: form.title.trim(),
          category: form.category,
          description: form.description.trim(),
          duration: form.duration.trim(),
          videoUrl: form.videoUrl.trim(),
          order: form.order,
          keyTakeaways: takeaways,
          resources,
        });
        showToast("Training module updated.");
      } else {
        await addModuleAsync({
          title: form.title.trim(),
          category: form.category,
          description: form.description.trim(),
          duration: form.duration.trim(),
          videoUrl: form.videoUrl.trim(),
          order: form.order,
          keyTakeaways: takeaways,
          resources,
        });
        showToast("Training module added.");
      }
    } catch {
      showToast("Error saving module.");
    }
    refreshModules();
    setModalOpen(false);
  }

  async function handleDelete(id: string) {
    try {
      await deleteModuleAsync(id);
      showToast("Training module deleted.");
    } catch {
      showToast("Error deleting module.");
    }
    refreshModules();
    setConfirmDelete(null);
  }

  function addResource() {
    setForm((prev) => ({
      ...prev,
      resources: [...prev.resources, { name: "", url: "" }],
    }));
  }

  function removeResource(index: number) {
    setForm((prev) => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index),
    }));
  }

  function updateResourceField(index: number, field: keyof TrainingResource, value: string) {
    setForm((prev) => ({
      ...prev,
      resources: prev.resources.map((r, i) =>
        i === index ? { ...r, [field]: value } : r
      ),
    }));
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

  return (
    <PortalShell>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl uppercase tracking-wide text-hydra-white">
              Training Modules
            </h1>
            <p className="text-hydra-gray text-sm mt-1">
              {modules.length} total training modules.
            </p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add Module
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hydra-gray" />
            <input
              type="text"
              placeholder="Search title, description, or category..."
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
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Module List */}
        <div className="space-y-3">
          {filtered.map((mod) => (
            <div
              key={mod.id}
              className="bg-hydra-navy border border-hydra-slate/50 rounded-xl p-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-hydra-slate/50 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4 text-hydra-cyan" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-hydra-white truncate">{mod.title}</p>
                    <p className="text-xs text-hydra-gray truncate">{mod.description}</p>
                  </div>
                </div>

                {/* Info chips - desktop */}
                <div className="hidden lg:flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
                    {mod.category}
                  </span>
                  <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
                    {mod.duration}
                  </span>
                  <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
                    #{mod.order}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openEdit(mod)}
                    className="p-2 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDelete(mod.id)}
                    className="p-2 text-hydra-gray hover:text-red-400 transition-colors rounded-lg hover:bg-hydra-slate/50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile info row */}
              <div className="flex flex-wrap gap-1.5 mt-2 lg:hidden text-xs">
                <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
                  {mod.category}
                </span>
                <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
                  {mod.duration}
                </span>
                <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
                  #{mod.order}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-hydra-gray text-sm">
              No training modules match your filters.
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
                {editingId ? "Edit Module" : "Add Module"}
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
                  placeholder="Module title"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                    placeholder="1"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50 resize-none"
                  placeholder="Brief description of this module..."
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">Duration</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                    placeholder="15 min"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">Video URL</label>
                  <input
                    type="text"
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                    placeholder="YouTube embed or Drive preview URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Key Takeaways <span className="text-hydra-gray/60">(one per line)</span>
                </label>
                <textarea
                  value={form.keyTakeaways}
                  onChange={(e) => setForm({ ...form, keyTakeaways: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50 resize-none"
                  placeholder={"Understand the process\nApply the technique\nRecognize key patterns"}
                />
              </div>

              {/* Resources */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs text-hydra-gray">Resources</label>
                  <button
                    type="button"
                    onClick={addResource}
                    className="inline-flex items-center gap-1 text-xs text-hydra-cyan hover:text-hydra-cyan/80 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {form.resources.map((res, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={res.name}
                        onChange={(e) => updateResourceField(i, "name", e.target.value)}
                        className="flex-1 px-3 py-2 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                        placeholder="Resource name"
                      />
                      <input
                        type="text"
                        value={res.url}
                        onChange={(e) => updateResourceField(i, "url", e.target.value)}
                        className="flex-1 px-3 py-2 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                        placeholder="URL"
                      />
                      <button
                        type="button"
                        onClick={() => removeResource(i)}
                        className="p-2 text-hydra-gray hover:text-red-400 transition-colors rounded-lg hover:bg-hydra-slate/50 shrink-0"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {form.resources.length === 0 && (
                    <p className="text-xs text-hydra-gray/50 py-2">No resources added yet.</p>
                  )}
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={!form.title.trim()}
                className="w-full mt-2 py-3 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingId ? "Save Changes" : "Add Module"}
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
              Delete Module
            </h3>
            <p className="text-sm text-hydra-gray mb-6">
              This will permanently remove this training module.
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
