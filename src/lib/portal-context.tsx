"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Employee, PortalState, CompletionRecord } from "./portal-types";
import { loadState, saveState } from "./portal-store";
import { getInitialState } from "./portal-data";

interface PortalContextValue {
  state: PortalState;
  currentUser: Employee | null;
  login: (email: string, pin: string) => boolean;
  logout: () => void;
  toggleCompletion: (resourceId: string) => void;
  isCompleted: (resourceId: string) => boolean;
  getCompletedCount: () => number;
  getAssignedResources: () => PortalState["resources"];
  refreshState: () => void;
}

const PortalContext = createContext<PortalContextValue | null>(null);

const USER_KEY = "hydra-portal-user";

export function PortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(() => {
    const stored = loadState();
    // Merge stored completions/employees with seed data resources/categories
    const seed = getInitialState();
    return {
      ...seed,
      employees: stored.employees.length > 1 ? stored.employees : seed.employees,
      completions: stored.completions ?? [],
    };
  });
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        const user = JSON.parse(saved) as Employee;
        const match = state.employees.find((e) => e.id === user.id && e.status === "active");
        if (match) setCurrentUser(match);
        else localStorage.removeItem(USER_KEY);
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
  }, []);

  const persist = useCallback((next: PortalState) => {
    setState(next);
    saveState(next);
  }, []);

  const login = useCallback(
    (email: string, pin: string): boolean => {
      const emp = state.employees.find(
        (e) =>
          e.email.toLowerCase() === email.toLowerCase() &&
          e.pin === pin &&
          e.status === "active"
      );
      if (!emp) return false;
      setCurrentUser(emp);
      localStorage.setItem(USER_KEY, JSON.stringify(emp));
      return true;
    },
    [state.employees]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const toggleCompletion = useCallback(
    (resourceId: string) => {
      if (!currentUser) return;
      const existing = state.completions.find(
        (c) => c.resourceId === resourceId && c.employeeId === currentUser.id
      );
      let next: CompletionRecord[];
      if (existing) {
        next = state.completions.filter(
          (c) => !(c.resourceId === resourceId && c.employeeId === currentUser.id)
        );
      } else {
        next = [
          ...state.completions,
          {
            resourceId,
            employeeId: currentUser.id,
            completedAt: new Date().toISOString(),
          },
        ];
      }
      persist({ ...state, completions: next });
    },
    [state, currentUser, persist]
  );

  const isCompleted = useCallback(
    (resourceId: string): boolean => {
      if (!currentUser) return false;
      return state.completions.some(
        (c) => c.resourceId === resourceId && c.employeeId === currentUser.id
      );
    },
    [state.completions, currentUser]
  );

  const getCompletedCount = useCallback((): number => {
    if (!currentUser) return 0;
    return state.completions.filter((c) => c.employeeId === currentUser.id).length;
  }, [state.completions, currentUser]);

  const getAssignedResources = useCallback(() => {
    if (!currentUser) return state.resources;
    if (currentUser.role === "admin" || currentUser.role === "manager") return state.resources;
    return state.resources.filter((r) => {
      if (r.assignedDepartments.length === 0) return true;
      return r.assignedDepartments.includes(currentUser.departmentId);
    });
  }, [state.resources, currentUser]);

  const refreshState = useCallback(() => {
    const fresh = loadState();
    const seed = getInitialState();
    const merged = {
      ...seed,
      employees: fresh.employees.length > 1 ? fresh.employees : seed.employees,
      completions: fresh.completions ?? [],
      resources: fresh.resources.length > 0 ? fresh.resources : seed.resources,
      departments: fresh.departments.length > 0 ? fresh.departments : seed.departments,
      positions: fresh.positions.length > 0 ? fresh.positions : seed.positions,
      locations: fresh.locations.length > 0 ? fresh.locations : seed.locations,
    };
    setState(merged);
    if (currentUser) {
      const updated = merged.employees.find((e) => e.id === currentUser.id);
      if (updated && updated.status === "active") {
        setCurrentUser(updated);
      } else {
        logout();
      }
    }
  }, [currentUser, logout]);

  if (!mounted) return null;

  return (
    <PortalContext.Provider
      value={{
        state,
        currentUser,
        login,
        logout,
        toggleCompletion,
        isCompleted,
        getCompletedCount,
        getAssignedResources,
        refreshState,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal(): PortalContextValue {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error("usePortal must be used within a PortalProvider");
  return ctx;
}
