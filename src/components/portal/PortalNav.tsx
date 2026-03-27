"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  GraduationCap,
  Users,
  FolderPlus,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { usePortal } from "@/lib/portal-context";

const mainNav = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/resources", label: "Resources", icon: Library },
  { href: "/portal/training", label: "Training", icon: GraduationCap },
];

const adminNav = [
  { href: "/portal/admin/employees", label: "Manage Employees", icon: Users },
  { href: "/portal/admin/resources", label: "Manage Resources", icon: FolderPlus },
];

const roleBadgeColors: Record<string, string> = {
  admin: "bg-hydra-cyan/20 text-hydra-cyan",
  manager: "bg-hydra-teal/20 text-hydra-teal",
  employee: "bg-hydra-gray/20 text-hydra-gray",
};

export default function PortalNav() {
  const { currentUser, state, logout } = usePortal();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!currentUser) return null;

  const isAdminOrManager = currentUser.role === "admin" || currentUser.role === "manager";
  const department = state.departments.find((d) => d.id === currentUser.departmentId);

  function NavLink({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }) {
    const active = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        href={href}
        onClick={() => setMobileOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          active
            ? "bg-hydra-cyan/10 text-hydra-cyan"
            : "text-hydra-gray hover:text-hydra-white hover:bg-hydra-slate/50"
        }`}
      >
        <Icon className="w-4.5 h-4.5 shrink-0" />
        {label}
      </Link>
    );
  }

  const navContent = (
    <>
      <div className="px-4 pt-6 pb-4">
        <Image
          src="/images/hydra-logo.jpg"
          alt="Hydra Pest Control"
          width={140}
          height={46}
          className="rounded-lg"
        />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {mainNav.map((item) => (
          <NavLink key={item.href} {...item} />
        ))}

        {isAdminOrManager && (
          <>
            <div className="pt-4 pb-2 px-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-hydra-gray/50">
                Admin
              </span>
            </div>
            {adminNav.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </>
        )}
      </nav>

      <div className="border-t border-hydra-slate/50 px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full bg-hydra-slate flex items-center justify-center text-sm font-semibold text-hydra-cyan">
            {currentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-hydra-white truncate">
              {currentUser.name}
            </p>
            <div className="flex items-center gap-2">
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${roleBadgeColors[currentUser.role]}`}
              >
                {currentUser.role}
              </span>
              {department && (
                <span className="text-[10px] text-hydra-gray truncate">
                  {department.name}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-hydra-gray hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-hydra-dark border-r border-hydra-slate/30">
        {navContent}
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-hydra-dark border-b border-hydra-slate/30 px-4 py-3 flex items-center justify-between">
        <Image
          src="/images/hydra-logo.jpg"
          alt="Hydra Pest Control"
          width={110}
          height={36}
          className="rounded"
        />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-hydra-gray hover:text-hydra-white transition-colors"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-hydra-dark flex flex-col shadow-2xl">
            {navContent}
          </aside>
        </>
      )}
    </>
  );
}
