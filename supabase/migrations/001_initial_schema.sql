-- Hydra Pest Control — Employee Portal Schema
-- Migration 001: Initial schema

-- ─────────────────────────────────────────────
-- DEPARTMENTS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS departments (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  color       text
);

-- ─────────────────────────────────────────────
-- POSITIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS positions (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  department_id uuid REFERENCES departments(id)
);

CREATE INDEX IF NOT EXISTS idx_positions_department ON positions(department_id);

-- ─────────────────────────────────────────────
-- LOCATIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS locations (
  id      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region  text NOT NULL,
  address text,
  phone   text
);

-- ─────────────────────────────────────────────
-- EMPLOYEES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS employees (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          text NOT NULL,
  email         text NOT NULL UNIQUE,
  pin           text NOT NULL,
  role          text NOT NULL CHECK (role IN ('admin', 'manager', 'employee')),
  department_id uuid REFERENCES departments(id),
  position_id   uuid REFERENCES positions(id),
  location_id   uuid REFERENCES locations(id),
  status        text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'disabled')),
  created_at    timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_employees_email ON employees(email);
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department_id);
CREATE INDEX IF NOT EXISTS idx_employees_position ON employees(position_id);
CREATE INDEX IF NOT EXISTS idx_employees_location ON employees(location_id);
CREATE INDEX IF NOT EXISTS idx_employees_status ON employees(status);

-- ─────────────────────────────────────────────
-- RESOURCE CATEGORIES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resource_categories (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  icon       text,
  sort_order int DEFAULT 0
);

-- ─────────────────────────────────────────────
-- RESOURCES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
  id                      uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title                   text NOT NULL,
  description             text,
  type                    text NOT NULL CHECK (type IN ('pdf', 'video', 'document', 'link', 'training')),
  url                     text DEFAULT '',
  category_id             uuid REFERENCES resource_categories(id),
  tags                    text[] DEFAULT '{}',
  assigned_departments    uuid[] DEFAULT '{}',
  assigned_positions      uuid[] DEFAULT '{}',
  required_for_onboarding boolean DEFAULT false,
  duration                text,
  file_size               text,
  created_at              timestamptz DEFAULT now(),
  updated_at              timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_resources_category ON resources(category_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_onboarding ON resources(required_for_onboarding) WHERE required_for_onboarding = true;

-- ─────────────────────────────────────────────
-- TRAINING MODULES
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS training_modules (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           text NOT NULL UNIQUE,
  title          text NOT NULL,
  category       text NOT NULL,
  description    text,
  duration       text,
  video_url      text DEFAULT '',
  key_takeaways  text[] DEFAULT '{}',
  resources      jsonb DEFAULT '[]',
  sort_order     int DEFAULT 0,
  created_at     timestamptz DEFAULT now(),
  updated_at     timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_training_modules_slug ON training_modules(slug);
CREATE INDEX IF NOT EXISTS idx_training_modules_category ON training_modules(category);

-- ─────────────────────────────────────────────
-- COMPLETIONS (resource completions)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS completions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id  uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  resource_id  uuid NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, resource_id)
);

CREATE INDEX IF NOT EXISTS idx_completions_employee ON completions(employee_id);
CREATE INDEX IF NOT EXISTS idx_completions_resource ON completions(resource_id);

-- ─────────────────────────────────────────────
-- TRAINING COMPLETIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS training_completions (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id  uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  module_slug  text NOT NULL,
  completed_at timestamptz DEFAULT now(),
  UNIQUE(employee_id, module_slug)
);

CREATE INDEX IF NOT EXISTS idx_training_completions_employee ON training_completions(employee_id);
CREATE INDEX IF NOT EXISTS idx_training_completions_slug ON training_completions(module_slug);

-- ─────────────────────────────────────────────
-- CONTACT SUBMISSIONS
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  phone      text NOT NULL,
  email      text,
  zip_code   text,
  pest_type  text,
  details    text,
  created_at timestamptz DEFAULT now()
);

-- ─────────────────────────────────────────────
-- PORTAL CONFIG (key-value store)
-- ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS portal_config (
  key   text PRIMARY KEY,
  value text NOT NULL
);

-- ─────────────────────────────────────────────
-- ROW LEVEL SECURITY
-- ─────────────────────────────────────────────
ALTER TABLE departments         ENABLE ROW LEVEL SECURITY;
ALTER TABLE positions           ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations           ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees           ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources           ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_modules    ENABLE ROW LEVEL SECURITY;
ALTER TABLE completions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_config       ENABLE ROW LEVEL SECURITY;

-- Permissive policies (anon key, tighten later)
CREATE POLICY "allow_all_departments"          ON departments          FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_positions"            ON positions            FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_locations"            ON locations            FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_employees"            ON employees            FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_resource_categories"  ON resource_categories  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_resources"            ON resources            FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_training_modules"     ON training_modules     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_completions"          ON completions          FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_training_completions" ON training_completions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_contact_submissions"  ON contact_submissions  FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "allow_all_portal_config"        ON portal_config        FOR ALL USING (true) WITH CHECK (true);
