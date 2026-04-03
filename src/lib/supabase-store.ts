"use client";

import { supabase, isSupabaseConfigured } from "./supabase";
import type {
  Employee,
  Department,
  Position,
  Location,
  Resource,
  ResourceCategory,
  CompletionRecord,
} from "./portal-types";
import type { TrainingModule } from "./training-data";
import * as portalStore from "./portal-store";
import * as trainingStore from "./training-store";

// ─── Helpers: snake_case <-> camelCase mapping ───

function employeeFromRow(row: Record<string, unknown>): Employee {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    pin: row.pin as string,
    role: row.role as Employee["role"],
    departmentId: row.department_id as string,
    positionId: row.position_id as string,
    locationId: row.location_id as string,
    status: row.status as Employee["status"],
    avatar: (row.avatar as string) ?? undefined,
    createdAt: row.created_at as string,
  };
}

function resourceFromRow(row: Record<string, unknown>): Resource {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string,
    type: row.type as Resource["type"],
    url: row.url as string,
    thumbnailUrl: (row.thumbnail_url as string) ?? undefined,
    categoryId: row.category_id as string,
    tags: (row.tags as string[]) ?? [],
    assignedDepartments: (row.assigned_departments as string[]) ?? [],
    assignedPositions: (row.assigned_positions as string[]) ?? [],
    requiredForOnboarding: row.required_for_onboarding as boolean,
    duration: (row.duration as string) ?? undefined,
    fileSize: (row.file_size as string) ?? undefined,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

function categoryFromRow(row: Record<string, unknown>): ResourceCategory {
  return {
    id: row.id as string,
    name: row.name as string,
    icon: row.icon as string,
    order: row.display_order as number,
  };
}

function completionFromRow(row: Record<string, unknown>): CompletionRecord {
  return {
    resourceId: row.resource_id as string,
    employeeId: row.employee_id as string,
    completedAt: row.completed_at as string,
  };
}

function departmentFromRow(row: Record<string, unknown>): Department {
  return {
    id: row.id as string,
    name: row.name as string,
    description: row.description as string,
    color: row.color as string,
  };
}

function positionFromRow(row: Record<string, unknown>): Position {
  return {
    id: row.id as string,
    name: row.name as string,
    departmentId: row.department_id as string,
  };
}

function locationFromRow(row: Record<string, unknown>): Location {
  return {
    id: row.id as string,
    region: row.region as string,
    address: row.address as string,
    phone: row.phone as string,
  };
}

function trainingModuleFromRow(row: Record<string, unknown>): TrainingModule {
  return {
    id: row.slug as string,
    title: row.title as string,
    category: row.category as string,
    description: row.description as string,
    duration: row.duration as string,
    videoUrl: row.video_url as string,
    keyTakeaways: (row.key_takeaways as string[]) ?? [],
    resources: (row.resources as { name: string; url: string }[]) ?? [],
    order: row.display_order as number,
  };
}

// ─── Employees ───

export async function fetchEmployees(): Promise<Employee[]> {
  if (!isSupabaseConfigured()) return portalStore.loadState().employees;

  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(employeeFromRow);
}

export async function addEmployee(
  emp: Omit<Employee, "id" | "createdAt">
): Promise<Employee> {
  if (!isSupabaseConfigured()) {
    const newEmp: Employee = {
      ...emp,
      id: `emp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    portalStore.addEmployee(newEmp);
    return newEmp;
  }

  const { data, error } = await supabase
    .from("employees")
    .insert({
      name: emp.name,
      email: emp.email,
      pin: emp.pin,
      role: emp.role,
      department_id: emp.departmentId,
      position_id: emp.positionId,
      location_id: emp.locationId,
      status: emp.status,
      avatar: emp.avatar ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return employeeFromRow(data);
}

export async function updateEmployee(
  id: string,
  updates: Partial<Employee>
): Promise<Employee> {
  if (!isSupabaseConfigured()) {
    const state = portalStore.updateEmployee(id, updates);
    return state.employees.find((e) => e.id === id)!;
  }

  const mapped: Record<string, unknown> = {};
  if (updates.name !== undefined) mapped.name = updates.name;
  if (updates.email !== undefined) mapped.email = updates.email;
  if (updates.pin !== undefined) mapped.pin = updates.pin;
  if (updates.role !== undefined) mapped.role = updates.role;
  if (updates.departmentId !== undefined) mapped.department_id = updates.departmentId;
  if (updates.positionId !== undefined) mapped.position_id = updates.positionId;
  if (updates.locationId !== undefined) mapped.location_id = updates.locationId;
  if (updates.status !== undefined) mapped.status = updates.status;
  if (updates.avatar !== undefined) mapped.avatar = updates.avatar;

  const { data, error } = await supabase
    .from("employees")
    .update(mapped)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return employeeFromRow(data);
}

export async function disableEmployee(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    portalStore.disableEmployee(id);
    return;
  }

  const { error } = await supabase
    .from("employees")
    .update({ status: "disabled" })
    .eq("id", id);

  if (error) throw error;
}

// ─── Departments, Positions, Locations ───

export async function fetchDepartments(): Promise<Department[]> {
  if (!isSupabaseConfigured()) return portalStore.loadState().departments;

  const { data, error } = await supabase
    .from("departments")
    .select("*")
    .order("name");

  if (error) throw error;
  return (data ?? []).map(departmentFromRow);
}

export async function fetchPositions(): Promise<Position[]> {
  if (!isSupabaseConfigured()) return portalStore.loadState().positions;

  const { data, error } = await supabase
    .from("positions")
    .select("*")
    .order("name");

  if (error) throw error;
  return (data ?? []).map(positionFromRow);
}

export async function fetchLocations(): Promise<Location[]> {
  if (!isSupabaseConfigured()) return portalStore.loadState().locations;

  const { data, error } = await supabase
    .from("locations")
    .select("*")
    .order("region");

  if (error) throw error;
  return (data ?? []).map(locationFromRow);
}

export async function updateDepartments(departments: Department[]): Promise<void> {
  if (!isSupabaseConfigured()) {
    portalStore.updateDepartments(departments);
    return;
  }

  // Upsert all departments
  const rows = departments.map((d) => ({
    id: d.id,
    name: d.name,
    description: d.description,
    color: d.color,
  }));

  const { error } = await supabase.from("departments").upsert(rows);
  if (error) throw error;
}

export async function deleteDepartment(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    const state = portalStore.loadState();
    portalStore.updateDepartments(state.departments.filter((d) => d.id !== id));
    return;
  }

  const { error } = await supabase.from("departments").delete().eq("id", id);
  if (error) throw error;
}

export async function updatePositions(positions: Position[]): Promise<void> {
  if (!isSupabaseConfigured()) {
    portalStore.updatePositions(positions);
    return;
  }

  const rows = positions.map((p) => ({
    id: p.id,
    name: p.name,
    department_id: p.departmentId,
  }));

  const { error } = await supabase.from("positions").upsert(rows);
  if (error) throw error;
}

export async function deletePosition(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    const state = portalStore.loadState();
    portalStore.updatePositions(state.positions.filter((p) => p.id !== id));
    return;
  }

  const { error } = await supabase.from("positions").delete().eq("id", id);
  if (error) throw error;
}

export async function updateLocations(locations: Location[]): Promise<void> {
  if (!isSupabaseConfigured()) {
    portalStore.updateLocations(locations);
    return;
  }

  const rows = locations.map((l) => ({
    id: l.id,
    region: l.region,
    address: l.address,
    phone: l.phone,
  }));

  const { error } = await supabase.from("locations").upsert(rows);
  if (error) throw error;
}

export async function deleteLocation(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    const state = portalStore.loadState();
    portalStore.updateLocations(state.locations.filter((l) => l.id !== id));
    return;
  }

  const { error } = await supabase.from("locations").delete().eq("id", id);
  if (error) throw error;
}

// ─── Resources + Categories ───

export async function fetchResources(): Promise<Resource[]> {
  if (!isSupabaseConfigured()) return portalStore.loadState().resources;

  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(resourceFromRow);
}

export async function fetchCategories(): Promise<ResourceCategory[]> {
  if (!isSupabaseConfigured()) return portalStore.loadState().categories;

  const { data, error } = await supabase
    .from("resource_categories")
    .select("*")
    .order("display_order");

  if (error) throw error;
  return (data ?? []).map(categoryFromRow);
}

export async function addResource(
  res: Omit<Resource, "id">
): Promise<Resource> {
  if (!isSupabaseConfigured()) {
    const newRes: Resource = {
      ...res,
      id: `res-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    portalStore.addResource(newRes);
    return newRes;
  }

  const { data, error } = await supabase
    .from("resources")
    .insert({
      title: res.title,
      description: res.description,
      type: res.type,
      url: res.url,
      thumbnail_url: res.thumbnailUrl ?? null,
      category_id: res.categoryId,
      tags: res.tags,
      assigned_departments: res.assignedDepartments,
      assigned_positions: res.assignedPositions,
      required_for_onboarding: res.requiredForOnboarding,
      duration: res.duration ?? null,
      file_size: res.fileSize ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return resourceFromRow(data);
}

export async function updateResource(
  id: string,
  updates: Partial<Resource>
): Promise<Resource> {
  if (!isSupabaseConfigured()) {
    const state = portalStore.updateResource(id, updates);
    return state.resources.find((r) => r.id === id)!;
  }

  const mapped: Record<string, unknown> = {};
  if (updates.title !== undefined) mapped.title = updates.title;
  if (updates.description !== undefined) mapped.description = updates.description;
  if (updates.type !== undefined) mapped.type = updates.type;
  if (updates.url !== undefined) mapped.url = updates.url;
  if (updates.thumbnailUrl !== undefined) mapped.thumbnail_url = updates.thumbnailUrl;
  if (updates.categoryId !== undefined) mapped.category_id = updates.categoryId;
  if (updates.tags !== undefined) mapped.tags = updates.tags;
  if (updates.assignedDepartments !== undefined) mapped.assigned_departments = updates.assignedDepartments;
  if (updates.assignedPositions !== undefined) mapped.assigned_positions = updates.assignedPositions;
  if (updates.requiredForOnboarding !== undefined) mapped.required_for_onboarding = updates.requiredForOnboarding;
  if (updates.duration !== undefined) mapped.duration = updates.duration;
  if (updates.fileSize !== undefined) mapped.file_size = updates.fileSize;
  if (updates.updatedAt !== undefined) mapped.updated_at = updates.updatedAt;

  const { data, error } = await supabase
    .from("resources")
    .update(mapped)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return resourceFromRow(data);
}

export async function deleteResource(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    portalStore.deleteResource(id);
    return;
  }

  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw error;
}

// ─── Completions ───

export async function fetchCompletions(
  employeeId?: string
): Promise<CompletionRecord[]> {
  if (!isSupabaseConfigured()) {
    const completions = portalStore.loadState().completions;
    if (employeeId) return completions.filter((c) => c.employeeId === employeeId);
    return completions;
  }

  let query = supabase.from("completions").select("*");
  if (employeeId) query = query.eq("employee_id", employeeId);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map(completionFromRow);
}

export async function markComplete(
  employeeId: string,
  resourceId: string
): Promise<void> {
  if (!isSupabaseConfigured()) {
    portalStore.markComplete(employeeId, resourceId);
    return;
  }

  const { error } = await supabase.from("completions").upsert(
    {
      employee_id: employeeId,
      resource_id: resourceId,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "employee_id,resource_id" }
  );
  if (error) throw error;
}

export async function markIncomplete(
  employeeId: string,
  resourceId: string
): Promise<void> {
  if (!isSupabaseConfigured()) {
    portalStore.markIncomplete(employeeId, resourceId);
    return;
  }

  const { error } = await supabase
    .from("completions")
    .delete()
    .eq("employee_id", employeeId)
    .eq("resource_id", resourceId);
  if (error) throw error;
}

// ─── Training Modules ───

export async function fetchTrainingModules(): Promise<TrainingModule[]> {
  if (!isSupabaseConfigured()) return trainingStore.loadTrainingModules();

  const { data, error } = await supabase
    .from("training_modules")
    .select("*")
    .order("display_order");

  if (error) throw error;
  return (data ?? []).map(trainingModuleFromRow);
}

export async function addTrainingModule(
  mod: Omit<TrainingModule, "id">
): Promise<TrainingModule> {
  if (!isSupabaseConfigured()) {
    const newMod: TrainingModule = {
      ...mod,
      id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    trainingStore.addTrainingModule(newMod);
    return newMod;
  }

  const slug = mod.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { data, error } = await supabase
    .from("training_modules")
    .insert({
      slug,
      title: mod.title,
      category: mod.category,
      description: mod.description,
      duration: mod.duration,
      video_url: mod.videoUrl,
      key_takeaways: mod.keyTakeaways,
      resources: mod.resources,
      display_order: mod.order,
    })
    .select()
    .single();

  if (error) throw error;
  return trainingModuleFromRow(data);
}

export async function updateTrainingModule(
  id: string,
  updates: Partial<TrainingModule>
): Promise<TrainingModule> {
  if (!isSupabaseConfigured()) {
    const mods = trainingStore.updateTrainingModule(id, updates);
    return mods.find((m) => m.id === id)!;
  }

  const mapped: Record<string, unknown> = {};
  if (updates.title !== undefined) mapped.title = updates.title;
  if (updates.category !== undefined) mapped.category = updates.category;
  if (updates.description !== undefined) mapped.description = updates.description;
  if (updates.duration !== undefined) mapped.duration = updates.duration;
  if (updates.videoUrl !== undefined) mapped.video_url = updates.videoUrl;
  if (updates.keyTakeaways !== undefined) mapped.key_takeaways = updates.keyTakeaways;
  if (updates.resources !== undefined) mapped.resources = updates.resources;
  if (updates.order !== undefined) mapped.display_order = updates.order;

  const { data, error } = await supabase
    .from("training_modules")
    .update(mapped)
    .eq("slug", id)
    .select()
    .single();

  if (error) throw error;
  return trainingModuleFromRow(data);
}

export async function deleteTrainingModule(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    trainingStore.deleteTrainingModule(id);
    return;
  }

  const { error } = await supabase
    .from("training_modules")
    .delete()
    .eq("slug", id);
  if (error) throw error;
}

// ─── Training Completions ───

export async function fetchTrainingCompletions(
  employeeId?: string
): Promise<{ module_slug: string; completed_at: string }[]> {
  if (!isSupabaseConfigured()) {
    // localStorage fallback — use the training progress key
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("hydra-training-progress");
    if (!stored) return [];
    const slugs = JSON.parse(stored) as string[];
    return slugs.map((s) => ({ module_slug: s, completed_at: new Date().toISOString() }));
  }

  let query = supabase.from("training_completions").select("*");
  if (employeeId) query = query.eq("employee_id", employeeId);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row: Record<string, unknown>) => ({
    module_slug: row.module_slug as string,
    completed_at: row.completed_at as string,
  }));
}

export async function toggleTrainingCompletion(
  employeeId: string,
  moduleSlug: string
): Promise<void> {
  if (!isSupabaseConfigured()) {
    // localStorage fallback
    if (typeof window === "undefined") return;
    const key = "hydra-training-progress";
    const stored = localStorage.getItem(key);
    const slugs: string[] = stored ? JSON.parse(stored) : [];
    if (slugs.includes(moduleSlug)) {
      localStorage.setItem(key, JSON.stringify(slugs.filter((s) => s !== moduleSlug)));
    } else {
      localStorage.setItem(key, JSON.stringify([...slugs, moduleSlug]));
    }
    return;
  }

  // Check if already completed
  const { data } = await supabase
    .from("training_completions")
    .select("id")
    .eq("employee_id", employeeId)
    .eq("module_slug", moduleSlug)
    .maybeSingle();

  if (data) {
    const { error } = await supabase
      .from("training_completions")
      .delete()
      .eq("employee_id", employeeId)
      .eq("module_slug", moduleSlug);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("training_completions").insert({
      employee_id: employeeId,
      module_slug: moduleSlug,
      completed_at: new Date().toISOString(),
    });
    if (error) throw error;
  }
}

// ─── Config ───

export async function getConfig(key: string): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    if (typeof window === "undefined") return null;
    if (key === "training_access_code") {
      return localStorage.getItem("hydra-training-code") || "hydra2026";
    }
    return localStorage.getItem(`hydra-config-${key}`);
  }

  const { data, error } = await supabase
    .from("config")
    .select("value")
    .eq("key", key)
    .maybeSingle();

  if (error) throw error;
  return data?.value ?? null;
}

export async function setConfig(key: string, value: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    if (typeof window === "undefined") return;
    if (key === "training_access_code") {
      localStorage.setItem("hydra-training-code", value);
      return;
    }
    localStorage.setItem(`hydra-config-${key}`, value);
    return;
  }

  const { error } = await supabase
    .from("config")
    .upsert({ key, value }, { onConflict: "key" });
  if (error) throw error;
}

// ─── Contact Form ───

export async function submitContactForm(data: {
  name: string;
  phone: string;
  email?: string;
  zip_code?: string;
  pest_type?: string;
  details?: string;
}): Promise<void> {
  if (!isSupabaseConfigured()) {
    // No-op fallback — just succeeds silently
    return;
  }

  const { error } = await supabase.from("contact_submissions").insert({
    name: data.name,
    phone: data.phone,
    email: data.email ?? null,
    zip_code: data.zip_code ?? null,
    pest_type: data.pest_type ?? null,
    details: data.details ?? null,
  });
  if (error) throw error;
}

// ─── Auth ───

export async function authenticateEmployee(
  email: string,
  pin: string
): Promise<Employee | null> {
  if (!isSupabaseConfigured()) {
    return portalStore.authenticate(email, pin);
  }

  const { data, error } = await supabase
    .from("employees")
    .select("*")
    .ilike("email", email)
    .eq("pin", pin)
    .eq("status", "active")
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return employeeFromRow(data);
}
