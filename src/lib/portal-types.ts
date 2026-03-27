export type UserRole = "admin" | "manager" | "employee";
export type ResourceType = "pdf" | "video" | "document" | "link" | "training";
export type EmployeeStatus = "active" | "disabled";

export interface Employee {
  id: string;
  name: string;
  email: string;
  pin: string; // 4-digit PIN for simple auth
  role: UserRole;
  departmentId: string;
  positionId: string;
  locationId: string;
  status: EmployeeStatus;
  avatar?: string; // initials-based
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  color: string; // tailwind color for badges
}

export interface Position {
  id: string;
  name: string;
  departmentId: string;
}

export interface Location {
  id: string;
  region: string;
  address: string;
  phone: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string; // file URL, embed URL, or external link
  thumbnailUrl?: string;
  categoryId: string;
  tags: string[];
  assignedDepartments: string[]; // department IDs, empty = all
  assignedPositions: string[]; // position IDs, empty = all
  requiredForOnboarding: boolean;
  duration?: string; // "12 min" for videos
  fileSize?: string; // "2.4 MB" for PDFs
  createdAt: string;
  updatedAt: string;
}

export interface ResourceCategory {
  id: string;
  name: string;
  icon: string; // lucide icon name
  order: number;
}

export interface CompletionRecord {
  resourceId: string;
  employeeId: string;
  completedAt: string;
}

export interface PortalState {
  employees: Employee[];
  departments: Department[];
  positions: Position[];
  locations: Location[];
  resources: Resource[];
  categories: ResourceCategory[];
  completions: CompletionRecord[];
}
