"use client";

import {
  PortalState,
  Employee,
  Resource,
  CompletionRecord,
} from "./portal-types";
import { getInitialState } from "./portal-data";

const STORAGE_KEY = "hydra-portal";

export function loadState(): PortalState {
  if (typeof window === "undefined") return getInitialState();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as PortalState;
    }
  } catch {
    // corrupted data — fall through to initial state
  }
  const initial = getInitialState();
  saveState(initial);
  return initial;
}

export function saveState(state: PortalState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

export function addEmployee(employee: Employee): PortalState {
  const state = loadState();
  state.employees.push(employee);
  saveState(state);
  return state;
}

export function updateEmployee(
  id: string,
  updates: Partial<Employee>
): PortalState {
  const state = loadState();
  const idx = state.employees.findIndex((e) => e.id === id);
  if (idx === -1) return state;

  state.employees[idx] = { ...state.employees[idx], ...updates };
  saveState(state);
  return state;
}

export function disableEmployee(id: string): PortalState {
  return updateEmployee(id, { status: "disabled" });
}

export function addResource(resource: Resource): PortalState {
  const state = loadState();
  state.resources.push(resource);
  saveState(state);
  return state;
}

export function updateResource(
  id: string,
  updates: Partial<Resource>
): PortalState {
  const state = loadState();
  const idx = state.resources.findIndex((r) => r.id === id);
  if (idx === -1) return state;

  state.resources[idx] = { ...state.resources[idx], ...updates };
  saveState(state);
  return state;
}

export function deleteResource(id: string): PortalState {
  const state = loadState();
  state.resources = state.resources.filter((r) => r.id !== id);
  state.completions = state.completions.filter((c) => c.resourceId !== id);
  saveState(state);
  return state;
}

export function markComplete(
  employeeId: string,
  resourceId: string
): PortalState {
  const state = loadState();

  const alreadyComplete = state.completions.some(
    (c) => c.employeeId === employeeId && c.resourceId === resourceId
  );
  if (alreadyComplete) return state;

  const record: CompletionRecord = {
    resourceId,
    employeeId,
    completedAt: new Date().toISOString(),
  };
  state.completions.push(record);
  saveState(state);
  return state;
}

export function markIncomplete(
  employeeId: string,
  resourceId: string
): PortalState {
  const state = loadState();
  state.completions = state.completions.filter(
    (c) => !(c.employeeId === employeeId && c.resourceId === resourceId)
  );
  saveState(state);
  return state;
}

export function authenticate(
  stateOrEmail: PortalState | string,
  emailOrPin: string,
  pin?: string
): Employee | null {
  let state: PortalState;
  let email: string;
  let actualPin: string;

  if (typeof stateOrEmail === "string") {
    // New signature: authenticate(email, pin)
    state = loadState();
    email = stateOrEmail;
    actualPin = emailOrPin;
  } else {
    // Legacy signature: authenticate(state, email, pin)
    state = stateOrEmail;
    email = emailOrPin;
    actualPin = pin!;
  }

  const employee = state.employees.find(
    (e) => e.email.toLowerCase() === email.toLowerCase() && e.pin === actualPin
  );
  if (!employee) return null;
  if (employee.status === "disabled") return null;
  return employee;
}

export function resetState(): PortalState {
  const initial = getInitialState();
  saveState(initial);
  return initial;
}
