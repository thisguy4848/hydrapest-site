"use client";

import { useMemo } from "react";
import Link from "next/link";
import PortalShell from "@/components/portal/PortalShell";
import { usePortal } from "@/lib/portal-context";
import {
  Users,
  FolderOpen,
  TrendingUp,
  UserX,
  UserPlus,
  FilePlus,
  GraduationCap,
  Settings,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const { currentUser, state } = usePortal();

  const stats = useMemo(() => {
    const activeEmployees = state.employees.filter((e) => e.status === "active");
    const disabledEmployees = state.employees.filter((e) => e.status === "disabled");
    const totalResources = state.resources.length;

    const completionRates = activeEmployees.map((emp) => {
      const assigned = state.resources.filter((r) => {
        if (r.assignedDepartments.length === 0) return true;
        return r.assignedDepartments.includes(emp.departmentId);
      });
      if (assigned.length === 0) return 0;
      const completed = state.completions.filter(
        (c) => c.employeeId === emp.id && assigned.some((r) => r.id === c.resourceId)
      ).length;
      return (completed / assigned.length) * 100;
    });
    const avgCompletion =
      completionRates.length > 0
        ? Math.round(completionRates.reduce((a, b) => a + b, 0) / completionRates.length)
        : 0;

    const deptBreakdown = state.departments.map((dept) => {
      const emps = activeEmployees.filter((e) => e.departmentId === dept.id);
      const rates = emps.map((emp) => {
        const assigned = state.resources.filter((r) => {
          if (r.assignedDepartments.length === 0) return true;
          return r.assignedDepartments.includes(emp.departmentId);
        });
        if (assigned.length === 0) return 0;
        const completed = state.completions.filter(
          (c) => c.employeeId === emp.id && assigned.some((r) => r.id === c.resourceId)
        ).length;
        return (completed / assigned.length) * 100;
      });
      const avg = rates.length > 0 ? Math.round(rates.reduce((a, b) => a + b, 0) / rates.length) : 0;
      return { ...dept, employeeCount: emps.length, avgCompletion: avg };
    });

    const recentCompletions = [...state.completions]
      .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime())
      .slice(0, 8)
      .map((c) => ({
        ...c,
        employee: state.employees.find((e) => e.id === c.employeeId),
        resource: state.resources.find((r) => r.id === c.resourceId),
      }));

    const recentEmployees = [...state.employees]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);

    return {
      activeCount: activeEmployees.length,
      disabledCount: disabledEmployees.length,
      totalResources,
      avgCompletion,
      deptBreakdown,
      recentCompletions,
      recentEmployees,
    };
  }, [state]);

  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "manager")) {
    return (
      <PortalShell>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center p-8 bg-hydra-navy rounded-xl border border-hydra-slate/50 max-w-md">
            <UserX className="w-12 h-12 text-red-400 mx-auto mb-4" />
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
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-[var(--font-heading)] text-2xl md:text-3xl uppercase tracking-wide text-hydra-white">
            Admin Dashboard
          </h1>
          <p className="text-hydra-gray text-sm mt-1">
            Manage employees, resources, and track completion rates.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Active Employees", value: stats.activeCount, icon: Users, color: "text-hydra-cyan" },
            { label: "Total Resources", value: stats.totalResources, icon: FolderOpen, color: "text-hydra-teal" },
            { label: "Avg Completion", value: `${stats.avgCompletion}%`, icon: TrendingUp, color: "text-emerald-400" },
            { label: "Disabled Employees", value: stats.disabledCount, icon: UserX, color: "text-red-400" },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-hydra-navy rounded-xl border border-hydra-slate/50 p-4 md:p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-hydra-white">{card.value}</p>
              <p className="text-xs text-hydra-gray mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/portal/admin/employees"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-hydra-cyan text-hydra-dark rounded-lg text-sm font-semibold hover:bg-hydra-cyan/90 transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </Link>
          <Link
            href="/portal/admin/resources"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-hydra-slate text-hydra-white rounded-lg text-sm font-semibold hover:bg-hydra-slate/80 transition-colors border border-hydra-slate/50"
          >
            <FilePlus className="w-4 h-4" />
            Add Resource
          </Link>
          <Link
            href="/portal/admin/training"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-hydra-slate text-hydra-white rounded-lg text-sm font-semibold hover:bg-hydra-slate/80 transition-colors border border-hydra-slate/50"
          >
            <GraduationCap className="w-4 h-4" />
            Manage Training
          </Link>
          <Link
            href="/portal/admin/config"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-hydra-slate text-hydra-white rounded-lg text-sm font-semibold hover:bg-hydra-slate/80 transition-colors border border-hydra-slate/50"
          >
            <Settings className="w-4 h-4" />
            Configuration
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Department Breakdown */}
          <div className="bg-hydra-navy rounded-xl border border-hydra-slate/50 p-5">
            <h2 className="font-[var(--font-heading)] text-sm uppercase tracking-wider text-hydra-white mb-4">
              Department Breakdown
            </h2>
            <div className="space-y-4">
              {stats.deptBreakdown.map((dept) => (
                <div key={dept.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-hydra-white">{dept.name}</span>
                    <div className="flex items-center gap-3 text-xs text-hydra-gray">
                      <span>{dept.employeeCount} employees</span>
                      <span>{dept.avgCompletion}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-hydra-slate rounded-full overflow-hidden">
                    <div
                      className="h-full bg-hydra-cyan rounded-full transition-all duration-500"
                      style={{ width: `${dept.avgCompletion}%` }}
                    />
                  </div>
                </div>
              ))}
              {stats.deptBreakdown.length === 0 && (
                <p className="text-hydra-gray text-sm">No departments configured.</p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-hydra-navy rounded-xl border border-hydra-slate/50 p-5">
            <h2 className="font-[var(--font-heading)] text-sm uppercase tracking-wider text-hydra-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {stats.recentCompletions.map((c, i) => (
                <div
                  key={`${c.resourceId}-${c.employeeId}-${i}`}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-4 h-4 text-hydra-teal mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-hydra-white truncate">
                      <span className="font-medium">{c.employee?.name ?? "Unknown"}</span>{" "}
                      completed{" "}
                      <span className="text-hydra-cyan">{c.resource?.title ?? "Unknown"}</span>
                    </p>
                    <p className="text-xs text-hydra-gray">
                      {new Date(c.completedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {stats.recentCompletions.length === 0 && (
                <p className="text-hydra-gray text-sm">No completions yet.</p>
              )}
            </div>

            {stats.recentEmployees.length > 0 && (
              <>
                <h3 className="font-[var(--font-heading)] text-xs uppercase tracking-wider text-hydra-gray mt-6 mb-3">
                  Newest Employees
                </h3>
                <div className="space-y-2">
                  {stats.recentEmployees.map((emp) => (
                    <div key={emp.id} className="flex items-center gap-3">
                      <Clock className="w-3 h-3 text-hydra-gray shrink-0" />
                      <span className="text-sm text-hydra-white truncate">{emp.name}</span>
                      <span className="text-xs text-hydra-gray ml-auto">
                        {new Date(emp.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
