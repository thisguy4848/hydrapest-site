# Hydra Pest Control — Database Schema Reference

## Tables

### departments
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| name | text | NOT NULL |
| description | text | |
| color | text | Tailwind color token |

### positions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| name | text | NOT NULL |
| department_id | uuid | FK → departments |

### locations
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| region | text | NOT NULL |
| address | text | |
| phone | text | |

### employees
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| name | text | NOT NULL |
| email | text | NOT NULL, UNIQUE |
| pin | text | NOT NULL, 4-digit |
| role | text | NOT NULL, check: admin/manager/employee |
| department_id | uuid | FK → departments |
| position_id | uuid | FK → positions |
| location_id | uuid | FK → locations |
| status | text | NOT NULL, default 'active', check: active/disabled |
| created_at | timestamptz | default now() |

### resource_categories
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| name | text | NOT NULL |
| icon | text | Lucide icon name |
| sort_order | int | default 0 |

### resources
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| title | text | NOT NULL |
| description | text | |
| type | text | NOT NULL, check: pdf/video/document/link/training |
| url | text | default '' |
| category_id | uuid | FK → resource_categories |
| tags | text[] | default '{}' |
| assigned_departments | uuid[] | department IDs; empty = all |
| assigned_positions | uuid[] | position IDs; empty = all |
| required_for_onboarding | boolean | default false |
| duration | text | for videos |
| file_size | text | for PDFs |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### training_modules
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| slug | text | NOT NULL, UNIQUE |
| title | text | NOT NULL |
| category | text | NOT NULL |
| description | text | |
| duration | text | |
| video_url | text | default '' |
| key_takeaways | text[] | default '{}' |
| resources | jsonb | default '[]', array of {name, url} |
| sort_order | int | default 0 |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |

### completions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| employee_id | uuid | FK → employees (cascade delete) |
| resource_id | uuid | FK → resources (cascade delete) |
| completed_at | timestamptz | default now() |
| | | UNIQUE(employee_id, resource_id) |

### training_completions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| employee_id | uuid | FK → employees (cascade delete) |
| module_slug | text | NOT NULL |
| completed_at | timestamptz | default now() |
| | | UNIQUE(employee_id, module_slug) |

### contact_submissions
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, auto-generated |
| name | text | NOT NULL |
| phone | text | NOT NULL |
| email | text | |
| zip_code | text | |
| pest_type | text | |
| details | text | |
| created_at | timestamptz | default now() |

### portal_config
| Column | Type | Notes |
|--------|------|-------|
| key | text | PK |
| value | text | NOT NULL |

## Relationships

```
departments 1──* positions
departments 1──* employees
positions   1──* employees
locations   1──* employees
resource_categories 1──* resources
employees   1──* completions
resources   1──* completions
employees   1──* training_completions
```

## RLS

All tables have RLS enabled with permissive allow-all policies (anon key). Tighten before production.

## Seed Data UUID Scheme

| Entity | Pattern |
|--------|---------|
| Departments | `00000000-0000-0000-0001-00000000000X` |
| Positions | `00000000-0000-0000-0002-00000000000X` |
| Locations | `00000000-0000-0000-0003-00000000000X` |
| Categories | `00000000-0000-0000-0004-00000000000X` |
| Resources | `00000000-0000-0000-0005-0000000000XX` |
| Employees | `00000000-0000-0000-0006-00000000000X` |
| Training | `00000000-0000-0000-0007-0000000000XX` |
