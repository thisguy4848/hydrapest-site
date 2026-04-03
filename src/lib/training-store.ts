"use client";

import { TrainingModule, trainingModules } from "./training-data";

const STORAGE_KEY = "hydra-training-modules";

export function loadTrainingModules(): TrainingModule[] {
  if (typeof window === "undefined") return [...trainingModules];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as TrainingModule[];
    }
  } catch {
    // corrupted data — fall through to seed
  }
  const seed = [...trainingModules];
  saveTrainingModules(seed);
  return seed;
}

export function saveTrainingModules(modules: TrainingModule[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
  } catch {
    // storage full or unavailable
  }
}

export function addTrainingModule(module: TrainingModule): TrainingModule[] {
  const modules = loadTrainingModules();
  modules.push(module);
  saveTrainingModules(modules);
  return modules;
}

export function updateTrainingModule(
  id: string,
  updates: Partial<TrainingModule>
): TrainingModule[] {
  const modules = loadTrainingModules();
  const idx = modules.findIndex((m) => m.id === id);
  if (idx === -1) return modules;

  modules[idx] = { ...modules[idx], ...updates };
  saveTrainingModules(modules);
  return modules;
}

export function deleteTrainingModule(id: string): TrainingModule[] {
  const modules = loadTrainingModules().filter((m) => m.id !== id);
  saveTrainingModules(modules);
  return modules;
}
