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
import { getInitialState } from "./portal-data";
import {
  fetchEmployees,
  fetchDepartments,
  fetchPositions,
  fetchLocations,
  fetchResources,
  fetchCategories,
  fetchCompletions,
  markComplete,
  markIncomplete,
  authenticateEmployee,
} from "./supabase-store";

interface PortalContextValue {
  state: PortalState;
  currentUser: Employee | null;
  login: (email: string, pin: string) => boolean;
  loginAsync: (email: string, pin: string) => Promise<boolean>;
  logout: () => void;
  toggleCompletion: (resourceId: string) => void;
  isCompleted: (resourceId: string) => boolean;
  getCompletedCount: () => number;
  getAssignedResources: () => PortalState["resources"];
  refreshState: () => void;
  loading: boolean;
}

const PortalContext = createContext<PortalContextValue | null>(null);

const USER_KEY = "hydra-portal-user";

export function PortalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PortalState>(getInitialState);
  const [currentUser, setCurrentUser] = useState<Employee | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from Supabase (or localStorage fallback)
  const loadData = useCallback(async () => {
    try {
      const [employees, departments, positions, locations, resources, categories, completions] =
        await Promise.all([
          fetchEmployees(),
          fetchDepartments(),
          fetchPositions(),
          fetchLocations(),
          fetchResources(),
          fetchCategories(),
          fetchCompletions(),
        ]);

      const seed = getInitialState();
      setState({
        employees: employees.length > 0 ? employees : seed.employees,
        departments: departments.length > 0 ? departments : seed.departments,
        positions: positions.length > 0 ? positions : seed.positions,
        locations: locations.length > 0 ? locations : seed.locations,
        resources: resources.length > 0 ? resources : seed.resources,
        categories: categories.length > 0 ? categories : seed.categories,
        completions: completions ?? [],
      });
    } catch {
      // On error, fall back to seed data
      setState(getInitialState());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadData();

    // Restore session
    const saved = localStorage.getItem(USER_KEY);
    if (saved) {
      try {
        const user = JSON.parse(saved) as Employee;
        setCurrentUser(user);
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
  }, [loadData]);

  // Re-validate stored user against loaded employees
  useEffect(() => {
    if (!loading && currentUser) {
      const match = state.employees.find(
        (e) => e.id === currentUser.id && e.status === "active"
      );
      if (!match) {
        setCurrentUser(null);
        localStorage.removeItem(USER_KEY);
      } else if (match !== currentUser) {
        setCurrentUser(match);
      }
    }
  }, [loading, state.employees, currentUser]);

  // Sync login (localStorage fallback — kept for backward compat)
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

  // Async login (Supabase)
  const loginAsync = useCallback(
    async (email: string, pin: string): Promise<boolean> => {
      try {
        const emp = await authenticateEmployee(email, pin);
        if (!emp) return false;
        setCurrentUser(emp);
        localStorage.setItem(USER_KEY, JSON.stringify(emp));
        return true;
      } catch {
        // Fall back to sync login
        return login(email, pin);
      }
    },
    [login]
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

      if (existing) {
        // Remove locally first, then async
        const next = state.completions.filter(
          (c) => !(c.resourceId === resourceId && c.employeeId === currentUser.id)
        );
        setState((prev) => ({ ...prev, completions: next }));
        markIncomplete(currentUser.id, resourceId).catch(() => {});
      } else {
        const record: CompletionRecord = {
          resourceId,
          employeeId: currentUser.id,
          completedAt: new Date().toISOString(),
        };
        const next = [...state.completions, record];
        setState((prev) => ({ ...prev, completions: next }));
        markComplete(currentUser.id, resourceId).catch(() => {});
      }
    },
    [state, currentUser]
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
    loadData();
  }, [loadData]);

  if (!mounted) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-hydra-dark">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-hydra-cyan border-t-transparent rounded-full animate-spin" />
          <p className="text-hydra-gray text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <PortalContext.Provider
      value={{
        state,
        currentUser,
        login,
        loginAsync,
        logout,
        toggleCompletion,
        isCompleted,
        getCompletedCount,
        getAssignedResources,
        refreshState,
        loading,
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
