"use client";

import { useState, useEffect } from "react";
import PortalShell from "@/components/portal/PortalShell";
import { usePortal } from "@/lib/portal-context";
import {
  updateDepartments,
  updatePositions,
  updateLocations,
} from "@/lib/portal-store";
import type { Department, Position, Location } from "@/lib/portal-types";
import {
  ShieldAlert,
  Settings,
  Key,
  Building2,
  Briefcase,
  MapPin,
  Plus,
  Edit2,
  Trash2,
  X,
  AlertTriangle,
  Save,
} from "lucide-react";

function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function ConfigPage() {
  const { currentUser, state, refreshState } = usePortal();
  const [toast, setToast] = useState("");

  // Training access code
  const [trainingCode, setTrainingCode] = useState("hydra2026");
  const [editingCode, setEditingCode] = useState(false);
  const [codeInput, setCodeInput] = useState("");

  // Department modal
  const [deptModalOpen, setDeptModalOpen] = useState(false);
  const [editingDeptId, setEditingDeptId] = useState<string | null>(null);
  const [deptForm, setDeptForm] = useState({ name: "", description: "", color: "bg-blue-500" });

  // Position modal
  const [posModalOpen, setPosModalOpen] = useState(false);
  const [editingPosId, setEditingPosId] = useState<string | null>(null);
  const [posForm, setPosForm] = useState({ name: "", departmentId: "" });

  // Location modal
  const [locModalOpen, setLocModalOpen] = useState(false);
  const [editingLocId, setEditingLocId] = useState<string | null>(null);
  const [locForm, setLocForm] = useState({ region: "", address: "", phone: "" });

  // Delete confirmations
  const [confirmDeleteDept, setConfirmDeleteDept] = useState<string | null>(null);
  const [confirmDeletePos, setConfirmDeletePos] = useState<string | null>(null);
  const [confirmDeleteLoc, setConfirmDeleteLoc] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("hydra-training-code");
    if (stored) setTrainingCode(stored);
  }, []);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  // --- Training Code ---
  function handleSaveCode() {
    if (!codeInput.trim()) return;
    localStorage.setItem("hydra-training-code", codeInput.trim());
    setTrainingCode(codeInput.trim());
    setEditingCode(false);
    showToast("Access code updated.");
  }

  // --- Departments ---
  function openAddDept() {
    setEditingDeptId(null);
    setDeptForm({ name: "", description: "", color: "bg-blue-500" });
    setDeptModalOpen(true);
  }

  function openEditDept(dept: Department) {
    setEditingDeptId(dept.id);
    setDeptForm({ name: dept.name, description: dept.description, color: dept.color });
    setDeptModalOpen(true);
  }

  function handleSaveDept() {
    if (!deptForm.name.trim()) return;
    const depts = [...state.departments];
    if (editingDeptId) {
      const idx = depts.findIndex((d) => d.id === editingDeptId);
      if (idx !== -1) {
        depts[idx] = { ...depts[idx], name: deptForm.name.trim(), description: deptForm.description.trim(), color: deptForm.color };
      }
    } else {
      depts.push({
        id: generateId("dept"),
        name: deptForm.name.trim(),
        description: deptForm.description.trim(),
        color: deptForm.color,
      });
    }
    updateDepartments(depts);
    refreshState();
    setDeptModalOpen(false);
    showToast(editingDeptId ? "Department updated." : "Department added.");
  }

  function handleDeleteDept(id: string) {
    const hasEmployees = state.employees.some((e) => e.departmentId === id && e.status === "active");
    if (hasEmployees) {
      showToast("Cannot delete: department has assigned employees.");
      setConfirmDeleteDept(null);
      return;
    }
    const depts = state.departments.filter((d) => d.id !== id);
    updateDepartments(depts);
    refreshState();
    setConfirmDeleteDept(null);
    showToast("Department deleted.");
  }

  // --- Positions ---
  function openAddPos() {
    setEditingPosId(null);
    setPosForm({ name: "", departmentId: state.departments[0]?.id ?? "" });
    setPosModalOpen(true);
  }

  function openEditPos(pos: Position) {
    setEditingPosId(pos.id);
    setPosForm({ name: pos.name, departmentId: pos.departmentId });
    setPosModalOpen(true);
  }

  function handleSavePos() {
    if (!posForm.name.trim() || !posForm.departmentId) return;
    const positions = [...state.positions];
    if (editingPosId) {
      const idx = positions.findIndex((p) => p.id === editingPosId);
      if (idx !== -1) {
        positions[idx] = { ...positions[idx], name: posForm.name.trim(), departmentId: posForm.departmentId };
      }
    } else {
      positions.push({
        id: generateId("pos"),
        name: posForm.name.trim(),
        departmentId: posForm.departmentId,
      });
    }
    updatePositions(positions);
    refreshState();
    setPosModalOpen(false);
    showToast(editingPosId ? "Position updated." : "Position added.");
  }

  function handleDeletePos(id: string) {
    const hasEmployees = state.employees.some((e) => e.positionId === id && e.status === "active");
    if (hasEmployees) {
      showToast("Cannot delete: position has assigned employees.");
      setConfirmDeletePos(null);
      return;
    }
    const positions = state.positions.filter((p) => p.id !== id);
    updatePositions(positions);
    refreshState();
    setConfirmDeletePos(null);
    showToast("Position deleted.");
  }

  // --- Locations ---
  function openAddLoc() {
    setEditingLocId(null);
    setLocForm({ region: "", address: "", phone: "" });
    setLocModalOpen(true);
  }

  function openEditLoc(loc: Location) {
    setEditingLocId(loc.id);
    setLocForm({ region: loc.region, address: loc.address, phone: loc.phone });
    setLocModalOpen(true);
  }

  function handleSaveLoc() {
    if (!locForm.region.trim() || !locForm.address.trim()) return;
    const locations = [...state.locations];
    if (editingLocId) {
      const idx = locations.findIndex((l) => l.id === editingLocId);
      if (idx !== -1) {
        locations[idx] = { ...locations[idx], region: locForm.region.trim(), address: locForm.address.trim(), phone: locForm.phone.trim() };
      }
    } else {
      locations.push({
        id: generateId("loc"),
        region: locForm.region.trim(),
        address: locForm.address.trim(),
        phone: locForm.phone.trim(),
      });
    }
    updateLocations(locations);
    refreshState();
    setLocModalOpen(false);
    showToast(editingLocId ? "Location updated." : "Location added.");
  }

  function handleDeleteLoc(id: string) {
    const hasEmployees = state.employees.some((e) => e.locationId === id && e.status === "active");
    if (hasEmployees) {
      showToast("Cannot delete: location has assigned employees.");
      setConfirmDeleteLoc(null);
      return;
    }
    const locations = state.locations.filter((l) => l.id !== id);
    updateLocations(locations);
    refreshState();
    setConfirmDeleteLoc(null);
    showToast("Location deleted.");
  }

  const deptColors = [
    "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-amber-500",
    "bg-red-500", "bg-cyan-500", "bg-pink-500", "bg-indigo-500",
  ];

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <PortalShell>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-hydra-navy rounded-xl border border-hydra-slate/50 max-w-md">
            <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h1 className="font-[var(--font-heading)] text-xl uppercase text-hydra-white mb-2">
              Access Denied
            </h1>
            <p className="text-hydra-gray text-sm">
              Admin access is required to view this page.
            </p>
          </div>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell>
      <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-hydra-cyan" />
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl uppercase tracking-wide text-hydra-white">
              Configuration
            </h1>
            <p className="text-hydra-gray text-sm mt-1">
              Manage portal settings, departments, positions, and locations.
            </p>
          </div>
        </div>

        {/* Training Access Code */}
        <div className="bg-hydra-navy rounded-xl border border-hydra-slate/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Key className="w-4 h-4 text-hydra-cyan" />
            <h2 className="font-[var(--font-heading)] text-sm uppercase tracking-wider text-hydra-white">
              Training Access Code
            </h2>
          </div>
          <p className="text-xs text-hydra-gray mb-4">
            Employees use this code to access the public training center at /training.
          </p>
          {editingCode ? (
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                className="flex-1 max-w-xs px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                placeholder="Enter new code"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSaveCode()}
              />
              <button
                onClick={handleSaveCode}
                disabled={!codeInput.trim()}
                className="px-4 py-2.5 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors disabled:opacity-40"
              >
                Save
              </button>
              <button
                onClick={() => setEditingCode(false)}
                className="px-4 py-2.5 text-hydra-gray text-sm hover:text-hydra-white transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <code className="px-3 py-2 bg-hydra-dark rounded-lg text-sm text-hydra-cyan font-mono border border-hydra-slate/50">
                {trainingCode}
              </code>
              <button
                onClick={() => {
                  setCodeInput(trainingCode);
                  setEditingCode(true);
                }}
                className="inline-flex items-center gap-1.5 text-sm text-hydra-gray hover:text-hydra-cyan transition-colors"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Change
              </button>
            </div>
          )}
        </div>

        {/* Departments */}
        <div className="bg-hydra-navy rounded-xl border border-hydra-slate/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-hydra-cyan" />
              <h2 className="font-[var(--font-heading)] text-sm uppercase tracking-wider text-hydra-white">
                Departments
              </h2>
              <span className="text-xs text-hydra-gray">({state.departments.length})</span>
            </div>
            <button
              onClick={openAddDept}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-hydra-cyan text-hydra-dark rounded-lg text-xs font-semibold hover:bg-hydra-cyan/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
          <div className="space-y-2">
            {state.departments.map((dept) => {
              const empCount = state.employees.filter((e) => e.departmentId === dept.id && e.status === "active").length;
              return (
                <div
                  key={dept.id}
                  className="flex items-center gap-3 px-4 py-3 bg-hydra-dark rounded-lg border border-hydra-slate/30"
                >
                  <div className={`w-3 h-3 rounded-full ${dept.color} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-hydra-white">{dept.name}</p>
                    <p className="text-xs text-hydra-gray truncate">{dept.description}</p>
                  </div>
                  <span className="text-xs text-hydra-gray shrink-0">{empCount} emp</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEditDept(dept)}
                      className="p-1.5 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteDept(dept.id)}
                      className="p-1.5 text-hydra-gray hover:text-red-400 transition-colors rounded-lg hover:bg-hydra-slate/50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            {state.departments.length === 0 && (
              <p className="text-hydra-gray text-sm text-center py-4">No departments configured.</p>
            )}
          </div>
        </div>

        {/* Positions */}
        <div className="bg-hydra-navy rounded-xl border border-hydra-slate/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-hydra-cyan" />
              <h2 className="font-[var(--font-heading)] text-sm uppercase tracking-wider text-hydra-white">
                Positions
              </h2>
              <span className="text-xs text-hydra-gray">({state.positions.length})</span>
            </div>
            <button
              onClick={openAddPos}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-hydra-cyan text-hydra-dark rounded-lg text-xs font-semibold hover:bg-hydra-cyan/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
          <div className="space-y-2">
            {state.positions.map((pos) => {
              const dept = state.departments.find((d) => d.id === pos.departmentId);
              const empCount = state.employees.filter((e) => e.positionId === pos.id && e.status === "active").length;
              return (
                <div
                  key={pos.id}
                  className="flex items-center gap-3 px-4 py-3 bg-hydra-dark rounded-lg border border-hydra-slate/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-hydra-white">{pos.name}</p>
                    <p className="text-xs text-hydra-gray">{dept?.name ?? "No department"}</p>
                  </div>
                  <span className="text-xs text-hydra-gray shrink-0">{empCount} emp</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEditPos(pos)}
                      className="p-1.5 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDeletePos(pos.id)}
                      className="p-1.5 text-hydra-gray hover:text-red-400 transition-colors rounded-lg hover:bg-hydra-slate/50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            {state.positions.length === 0 && (
              <p className="text-hydra-gray text-sm text-center py-4">No positions configured.</p>
            )}
          </div>
        </div>

        {/* Locations */}
        <div className="bg-hydra-navy rounded-xl border border-hydra-slate/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-hydra-cyan" />
              <h2 className="font-[var(--font-heading)] text-sm uppercase tracking-wider text-hydra-white">
                Locations
              </h2>
              <span className="text-xs text-hydra-gray">({state.locations.length})</span>
            </div>
            <button
              onClick={openAddLoc}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-hydra-cyan text-hydra-dark rounded-lg text-xs font-semibold hover:bg-hydra-cyan/90 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
          <div className="space-y-2">
            {state.locations.map((loc) => {
              const empCount = state.employees.filter((e) => e.locationId === loc.id && e.status === "active").length;
              return (
                <div
                  key={loc.id}
                  className="flex items-center gap-3 px-4 py-3 bg-hydra-dark rounded-lg border border-hydra-slate/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-hydra-white">{loc.region}</p>
                    <p className="text-xs text-hydra-gray truncate">{loc.address}</p>
                  </div>
                  <span className="hidden sm:block text-xs text-hydra-gray shrink-0">{loc.phone}</span>
                  <span className="text-xs text-hydra-gray shrink-0">{empCount} emp</span>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => openEditLoc(loc)}
                      className="p-1.5 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setConfirmDeleteLoc(loc.id)}
                      className="p-1.5 text-hydra-gray hover:text-red-400 transition-colors rounded-lg hover:bg-hydra-slate/50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
            {state.locations.length === 0 && (
              <p className="text-hydra-gray text-sm text-center py-4">No locations configured.</p>
            )}
          </div>
        </div>
      </div>

      {/* Department Modal */}
      {deptModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeptModalOpen(false)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[var(--font-heading)] text-lg uppercase text-hydra-white">
                {editingDeptId ? "Edit Department" : "Add Department"}
              </h2>
              <button onClick={() => setDeptModalOpen(false)} className="text-hydra-gray hover:text-hydra-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={deptForm.name}
                  onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="Department name"
                />
              </div>
              <div>
                <label className="block text-xs text-hydra-gray mb-1">Description</label>
                <textarea
                  value={deptForm.description}
                  onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50 resize-none"
                  placeholder="Brief description..."
                />
              </div>
              <div>
                <label className="block text-xs text-hydra-gray mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                  {deptColors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setDeptForm({ ...deptForm, color: c })}
                      className={`w-8 h-8 rounded-lg ${c} transition-all ${
                        deptForm.color === c ? "ring-2 ring-hydra-cyan ring-offset-2 ring-offset-hydra-navy scale-110" : "hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={handleSaveDept}
                disabled={!deptForm.name.trim()}
                className="w-full mt-2 py-3 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingDeptId ? "Save Changes" : "Add Department"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Position Modal */}
      {posModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPosModalOpen(false)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[var(--font-heading)] text-lg uppercase text-hydra-white">
                {editingPosId ? "Edit Position" : "Add Position"}
              </h2>
              <button onClick={() => setPosModalOpen(false)} className="text-hydra-gray hover:text-hydra-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={posForm.name}
                  onChange={(e) => setPosForm({ ...posForm, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="Position name"
                />
              </div>
              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Department <span className="text-red-400">*</span>
                </label>
                <select
                  value={posForm.departmentId}
                  onChange={(e) => setPosForm({ ...posForm, departmentId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                >
                  <option value="">Select department...</option>
                  {state.departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSavePos}
                disabled={!posForm.name.trim() || !posForm.departmentId}
                className="w-full mt-2 py-3 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingPosId ? "Save Changes" : "Add Position"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {locModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLocModalOpen(false)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[var(--font-heading)] text-lg uppercase text-hydra-white">
                {editingLocId ? "Edit Location" : "Add Location"}
              </h2>
              <button onClick={() => setLocModalOpen(false)} className="text-hydra-gray hover:text-hydra-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Region <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={locForm.region}
                  onChange={(e) => setLocForm({ ...locForm, region: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="e.g., East Valley"
                />
              </div>
              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={locForm.address}
                  onChange={(e) => setLocForm({ ...locForm, address: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="Full address"
                />
              </div>
              <div>
                <label className="block text-xs text-hydra-gray mb-1">Phone</label>
                <input
                  type="text"
                  value={locForm.phone}
                  onChange={(e) => setLocForm({ ...locForm, phone: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="(480) 555-0100"
                />
              </div>
              <button
                onClick={handleSaveLoc}
                disabled={!locForm.region.trim() || !locForm.address.trim()}
                className="w-full mt-2 py-3 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingLocId ? "Save Changes" : "Add Location"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation — Department */}
      {confirmDeleteDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDeleteDept(null)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-sm p-6 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-[var(--font-heading)] text-base uppercase text-hydra-white mb-2">
              Delete Department
            </h3>
            <p className="text-sm text-hydra-gray mb-6">
              This will permanently remove this department. Departments with assigned employees cannot be deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteDept(null)}
                className="flex-1 py-2.5 bg-hydra-slate text-hydra-white rounded-lg text-sm font-medium hover:bg-hydra-slate/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteDept(confirmDeleteDept)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation — Position */}
      {confirmDeletePos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDeletePos(null)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-sm p-6 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-[var(--font-heading)] text-base uppercase text-hydra-white mb-2">
              Delete Position
            </h3>
            <p className="text-sm text-hydra-gray mb-6">
              This will permanently remove this position. Positions with assigned employees cannot be deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeletePos(null)}
                className="flex-1 py-2.5 bg-hydra-slate text-hydra-white rounded-lg text-sm font-medium hover:bg-hydra-slate/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeletePos(confirmDeletePos)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation — Location */}
      {confirmDeleteLoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setConfirmDeleteLoc(null)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-sm p-6 text-center">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h3 className="font-[var(--font-heading)] text-base uppercase text-hydra-white mb-2">
              Delete Location
            </h3>
            <p className="text-sm text-hydra-gray mb-6">
              This will permanently remove this location. Locations with assigned employees cannot be deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDeleteLoc(null)}
                className="flex-1 py-2.5 bg-hydra-slate text-hydra-white rounded-lg text-sm font-medium hover:bg-hydra-slate/80 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteLoc(confirmDeleteLoc)}
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
