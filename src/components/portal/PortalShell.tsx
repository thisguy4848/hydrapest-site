"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { usePortal } from "@/lib/portal-context";
import Image from "next/image";
import {
  LayoutDashboard,
  Library,
  GraduationCap,
  LogOut,
  Menu,
  X,
  ChevronRight,
  User,
  ArrowUpRight,
} from "lucide-react";

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/resources", label: "Resources", icon: Library },
  { href: "/portal/training", label: "Training", icon: GraduationCap },
];

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const { currentUser, logout } = usePortal();
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!currentUser) {
    router.push("/portal");
    return null;
  }

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function handleLogout() {
    logout();
    router.push("/portal");
  }

  return (
    <div className="min-h-screen bg-hydra-light flex">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 shrink-0 bg-hydra-dark flex flex-col transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo area */}
        <div className="px-5 py-5 border-b border-white/5">
          <div className="flex items-center justify-between">
            <Link href="/portal/dashboard" className="flex items-center gap-2.5">
              <Image
                src="/images/hydra-icon.png"
                alt="Hydra"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="font-[var(--font-heading)] text-white text-sm font-bold uppercase tracking-wider">
                Hydra Portal
              </span>
            </Link>
            <button
              className="lg:hidden text-hydra-gray hover:text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? "bg-hydra-cyan/10 text-hydra-cyan"
                    : "text-hydra-gray hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-4.5 h-4.5 shrink-0" />
                {item.label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
          <Link href="/" className="flex items-center gap-2 px-3 py-2 text-xs text-hydra-gray hover:text-hydra-cyan transition-colors mt-2">
            <ArrowUpRight className="w-3.5 h-3.5" />
            Back to Website
          </Link>
        </nav>

        {/* User area */}
        <div className="px-3 py-4 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 bg-hydra-slate rounded-full flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-hydra-cyan">{initials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-hydra-gray truncate">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-3 mt-1 text-sm text-hydra-gray hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Top bar (mobile) */}
        <header className="lg:hidden bg-hydra-dark border-b border-white/5 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-hydra-gray hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="font-[var(--font-heading)] text-white text-sm font-bold uppercase tracking-wider">
            Hydra Portal
          </span>
          <div className="w-8 h-8 bg-hydra-slate rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-hydra-cyan" />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
