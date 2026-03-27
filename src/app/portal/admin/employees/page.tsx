"use client";

import { useState, useMemo } from "react";
import PortalShell from "@/components/portal/PortalShell";
import { usePortal } from "@/lib/portal-context";
import {
  addEmployee,
  updateEmployee,
  disableEmployee,
} from "@/lib/portal-store";
import type { Employee, UserRole } from "@/lib/portal-types";
import {
  UserPlus,
  Search,
  Edit2,
  UserX,
  UserCheck,
  Eye,
  X,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

function generatePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function generateId(): string {
  return `emp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
}

interface EmployeeFormData {
  name: string;
  email: string;
  pin: string;
  role: UserRole;
  departmentId: string;
  positionId: string;
  locationId: string;
}

const emptyForm: EmployeeFormData = {
  name: "",
  email: "",
  pin: generatePin(),
  role: "employee",
  departmentId: "",
  positionId: "",
  locationId: "",
};

export default function EmployeesPage() {
  const { currentUser, state, refreshState } = usePortal();
  const [search, setSearch] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterStatus, setFilterStatus] = useState<"" | "active" | "disabled">("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EmployeeFormData>(emptyForm);
  const [detailEmployee, setDetailEmployee] = useState<Employee | null>(null);
  const [toast, setToast] = useState("");

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  const filtered = useMemo(() => {
    let list = [...state.employees];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.email.toLowerCase().includes(q)
      );
    }
    if (filterDept) list = list.filter((e) => e.departmentId === filterDept);
    if (filterLocation) list = list.filter((e) => e.locationId === filterLocation);
    if (filterStatus) list = list.filter((e) => e.status === filterStatus);

    const active = list.filter((e) => e.status === "active");
    const disabled = list.filter((e) => e.status === "disabled");
    return { active, disabled };
  }, [state.employees, search, filterDept, filterLocation, filterStatus]);

  function getCompletionRate(emp: Employee): number {
    const assigned = state.resources.filter((r) => {
      if (r.assignedDepartments.length === 0) return true;
      return r.assignedDepartments.includes(emp.departmentId);
    });
    if (assigned.length === 0) return 0;
    const completed = state.completions.filter(
      (c) => c.employeeId === emp.id && assigned.some((r) => r.id === c.resourceId)
    ).length;
    return Math.round((completed / assigned.length) * 100);
  }

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, pin: generatePin() });
    setModalOpen(true);
  }

  function openEdit(emp: Employee) {
    setEditingId(emp.id);
    setForm({
      name: emp.name,
      email: emp.email,
      pin: emp.pin,
      role: emp.role,
      departmentId: emp.departmentId,
      positionId: emp.positionId,
      locationId: emp.locationId,
    });
    setModalOpen(true);
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim() || !form.departmentId || !form.positionId || !form.locationId) return;

    if (editingId) {
      updateEmployee(editingId, {
        name: form.name.trim(),
        email: form.email.trim(),
        pin: form.pin,
        role: form.role,
        departmentId: form.departmentId,
        positionId: form.positionId,
        locationId: form.locationId,
      });
      showToast("Employee updated.");
    } else {
      const newEmp: Employee = {
        id: generateId(),
        name: form.name.trim(),
        email: form.email.trim(),
        pin: form.pin,
        role: form.role,
        departmentId: form.departmentId,
        positionId: form.positionId,
        locationId: form.locationId,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      addEmployee(newEmp);
      showToast("Employee added.");
    }
    refreshState();
    setModalOpen(false);
  }

  function handleToggleStatus(emp: Employee) {
    if (emp.status === "active") {
      disableEmployee(emp.id);
      showToast(`${emp.name} disabled.`);
    } else {
      updateEmployee(emp.id, { status: "active" });
      showToast(`${emp.name} re-enabled.`);
    }
    refreshState();
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

  const deptName = (id: string) => state.departments.find((d) => d.id === id)?.name ?? "—";
  const posName = (id: string) => state.positions.find((p) => p.id === id)?.name ?? "—";
  const locName = (id: string) => state.locations.find((l) => l.id === id)?.region ?? "—";

  const filteredPositions = form.departmentId
    ? state.positions.filter((p) => p.departmentId === form.departmentId)
    : state.positions;

  function renderEmployeeRow(emp: Employee) {
    const rate = getCompletionRate(emp);
    const isDisabled = emp.status === "disabled";
    return (
      <div
        key={emp.id}
        className={`bg-hydra-navy border border-hydra-slate/50 rounded-xl p-4 ${
          isDisabled ? "opacity-50" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Avatar + Name */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-full bg-hydra-cyan/20 flex items-center justify-center text-hydra-cyan text-xs font-bold shrink-0">
              {emp.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div className="min-w-0">
              <p className={`text-sm font-medium text-hydra-white ${isDisabled ? "line-through" : ""}`}>
                {emp.name}
              </p>
              <p className="text-xs text-hydra-gray truncate">{emp.email}</p>
            </div>
          </div>

          {/* Info chips - desktop */}
          <div className="hidden lg:flex items-center gap-2 text-xs">
            <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
              {deptName(emp.departmentId)}
            </span>
            <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
              {posName(emp.positionId)}
            </span>
            <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray">
              {locName(emp.locationId)}
            </span>
            <span className="px-2 py-1 rounded bg-hydra-slate/50 text-hydra-gray capitalize">
              {emp.role}
            </span>
          </div>

          {/* Status + Rate */}
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                isDisabled
                  ? "bg-red-500/10 text-red-400"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}
            >
              {isDisabled ? "Disabled" : "Active"}
            </span>
            {!isDisabled && (
              <span className="text-xs text-hydra-gray">{rate}%</span>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setDetailEmployee(emp)}
              className="p-2 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
              title="View details"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={() => openEdit(emp)}
              className="p-2 text-hydra-gray hover:text-hydra-cyan transition-colors rounded-lg hover:bg-hydra-slate/50"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleToggleStatus(emp)}
              className={`p-2 transition-colors rounded-lg hover:bg-hydra-slate/50 ${
                isDisabled
                  ? "text-hydra-gray hover:text-emerald-400"
                  : "text-hydra-gray hover:text-red-400"
              }`}
              title={isDisabled ? "Enable" : "Disable"}
            >
              {isDisabled ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile info row */}
        <div className="flex flex-wrap gap-1.5 mt-2 lg:hidden text-xs">
          <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
            {deptName(emp.departmentId)}
          </span>
          <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
            {posName(emp.positionId)}
          </span>
          <span className="px-2 py-0.5 rounded bg-hydra-slate/50 text-hydra-gray">
            {locName(emp.locationId)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <PortalShell>
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl uppercase tracking-wide text-hydra-white">
              Employees
            </h1>
            <p className="text-hydra-gray text-sm mt-1">
              {state.employees.length} total &middot;{" "}
              {state.employees.filter((e) => e.status === "active").length} active
            </p>
          </div>
          <button
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-hydra-gray" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-hydra-navy border border-hydra-slate/50 rounded-lg text-sm text-hydra-white placeholder:text-hydra-gray/50 focus:outline-none focus:border-hydra-cyan/50"
            />
          </div>
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="px-3 py-2.5 bg-hydra-navy border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
          >
            <option value="">All Departments</option>
            {state.departments.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
          <select
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
            className="px-3 py-2.5 bg-hydra-navy border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
          >
            <option value="">All Locations</option>
            {state.locations.map((l) => (
              <option key={l.id} value={l.id}>{l.region}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as "" | "active" | "disabled")}
            className="px-3 py-2.5 bg-hydra-navy border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        {/* Employee List */}
        <div className="space-y-3">
          {filtered.active.map(renderEmployeeRow)}
          {filtered.disabled.length > 0 && (
            <>
              <div className="flex items-center gap-3 pt-4">
                <div className="h-px flex-1 bg-hydra-slate/50" />
                <span className="text-xs text-hydra-gray uppercase tracking-wider">
                  Disabled ({filtered.disabled.length})
                </span>
                <div className="h-px flex-1 bg-hydra-slate/50" />
              </div>
              {filtered.disabled.map(renderEmployeeRow)}
            </>
          )}
          {filtered.active.length === 0 && filtered.disabled.length === 0 && (
            <div className="text-center py-12 text-hydra-gray text-sm">
              No employees match your filters.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[var(--font-heading)] text-lg uppercase text-hydra-white">
                {editingId ? "Edit Employee" : "Add Employee"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-hydra-gray hover:text-hydra-white">
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
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="John Smith"
                />
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  placeholder="john@hydrapest.com"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">
                    PIN <span className="text-red-400">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.pin}
                      onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                      maxLength={4}
                      className="flex-1 px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white font-mono tracking-widest focus:outline-none focus:border-hydra-cyan/50"
                    />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, pin: generatePin() })}
                      className="p-2.5 bg-hydra-slate rounded-lg text-hydra-gray hover:text-hydra-white transition-colors"
                      title="Generate new PIN"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-hydra-gray mb-1">Role</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Department <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.departmentId}
                  onChange={(e) => setForm({ ...form, departmentId: e.target.value, positionId: "" })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                >
                  <option value="">Select department...</option>
                  {state.departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Position <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.positionId}
                  onChange={(e) => setForm({ ...form, positionId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                >
                  <option value="">Select position...</option>
                  {filteredPositions.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-hydra-gray mb-1">
                  Location <span className="text-red-400">*</span>
                </label>
                <select
                  value={form.locationId}
                  onChange={(e) => setForm({ ...form, locationId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-hydra-dark border border-hydra-slate/50 rounded-lg text-sm text-hydra-white focus:outline-none focus:border-hydra-cyan/50"
                >
                  <option value="">Select location...</option>
                  {state.locations.map((l) => (
                    <option key={l.id} value={l.id}>{l.region}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                disabled={!form.name.trim() || !form.email.trim() || !form.departmentId || !form.positionId || !form.locationId || form.pin.length !== 4}
                className="w-full mt-2 py-3 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editingId ? "Save Changes" : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDetailEmployee(null)} />
          <div className="relative bg-hydra-navy border border-hydra-slate/50 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-[var(--font-heading)] text-lg uppercase text-hydra-white">
                Employee Details
              </h2>
              <button onClick={() => setDetailEmployee(null)} className="text-hydra-gray hover:text-hydra-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-hydra-cyan/20 flex items-center justify-center text-hydra-cyan text-lg font-bold">
                  {detailEmployee.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-lg font-medium text-hydra-white">{detailEmployee.name}</p>
                  <p className="text-sm text-hydra-gray">{detailEmployee.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-hydra-dark rounded-lg p-3">
                  <p className="text-xs text-hydra-gray mb-1">Department</p>
                  <p className="text-hydra-white">{deptName(detailEmployee.departmentId)}</p>
                </div>
                <div className="bg-hydra-dark rounded-lg p-3">
                  <p className="text-xs text-hydra-gray mb-1">Position</p>
                  <p className="text-hydra-white">{posName(detailEmployee.positionId)}</p>
                </div>
                <div className="bg-hydra-dark rounded-lg p-3">
                  <p className="text-xs text-hydra-gray mb-1">Location</p>
                  <p className="text-hydra-white">{locName(detailEmployee.locationId)}</p>
                </div>
                <div className="bg-hydra-dark rounded-lg p-3">
                  <p className="text-xs text-hydra-gray mb-1">Role</p>
                  <p className="text-hydra-white capitalize">{detailEmployee.role}</p>
                </div>
                <div className="bg-hydra-dark rounded-lg p-3">
                  <p className="text-xs text-hydra-gray mb-1">Status</p>
                  <p className={detailEmployee.status === "active" ? "text-emerald-400" : "text-red-400"}>
                    {detailEmployee.status === "active" ? "Active" : "Disabled"}
                  </p>
                </div>
                <div className="bg-hydra-dark rounded-lg p-3">
                  <p className="text-xs text-hydra-gray mb-1">Completion</p>
                  <p className="text-hydra-white">{getCompletionRate(detailEmployee)}%</p>
                </div>
              </div>

              {/* Completion details */}
              <div>
                <p className="text-xs text-hydra-gray mb-2 uppercase tracking-wider">Resource Completions</p>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {state.resources
                    .filter((r) => {
                      if (r.assignedDepartments.length === 0) return true;
                      return r.assignedDepartments.includes(detailEmployee.departmentId);
                    })
                    .map((r) => {
                      const done = state.completions.some(
                        (c) => c.employeeId === detailEmployee.id && c.resourceId === r.id
                      );
                      return (
                        <div
                          key={r.id}
                          className="flex items-center gap-2 text-sm py-1.5 px-2 rounded bg-hydra-dark"
                        >
                          <div
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              done ? "bg-emerald-400" : "bg-hydra-slate"
                            }`}
                          />
                          <span className={done ? "text-hydra-white" : "text-hydra-gray"}>
                            {r.title}
                          </span>
                        </div>
                      );
                    })}
                  {state.resources.length === 0 && (
                    <p className="text-hydra-gray text-xs">No resources assigned yet.</p>
                  )}
                </div>
              </div>
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
