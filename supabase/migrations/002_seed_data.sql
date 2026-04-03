-- Hydra Pest Control — Employee Portal Seed Data
-- Migration 002: Seed data from portal-data.ts and training-data.ts

-- ─────────────────────────────────────────────
-- UUID SCHEME
-- ─────────────────────────────────────────────
-- Departments:  00000000-0000-0000-0001-00000000000X
-- Positions:    00000000-0000-0000-0002-00000000000X
-- Locations:    00000000-0000-0000-0003-00000000000X
-- Categories:   00000000-0000-0000-0004-00000000000X
-- Resources:    00000000-0000-0000-0005-0000000000XX
-- Employees:    00000000-0000-0000-0006-00000000000X
-- Training:     00000000-0000-0000-0007-0000000000XX

-- ─────────────────────────────────────────────
-- DEPARTMENTS
-- ─────────────────────────────────────────────
INSERT INTO departments (id, name, description, color) VALUES
  ('00000000-0000-0000-0001-000000000001', 'Operations',     'Field operations and service delivery', 'hydra-teal'),
  ('00000000-0000-0000-0001-000000000002', 'Sales',          'Sales and customer acquisition',        'hydra-cyan'),
  ('00000000-0000-0000-0001-000000000003', 'Administration', 'Office and administrative support',     'hydra-gray');

-- ─────────────────────────────────────────────
-- POSITIONS
-- ─────────────────────────────────────────────
INSERT INTO positions (id, name, department_id) VALUES
  ('00000000-0000-0000-0002-000000000001', 'General Manager', '00000000-0000-0000-0001-000000000001'),
  ('00000000-0000-0000-0002-000000000002', 'Technician',      '00000000-0000-0000-0001-000000000001'),
  ('00000000-0000-0000-0002-000000000003', 'Sales Rep',       '00000000-0000-0000-0001-000000000002');

-- ─────────────────────────────────────────────
-- LOCATIONS
-- ─────────────────────────────────────────────
INSERT INTO locations (id, region, address, phone) VALUES
  ('00000000-0000-0000-0003-000000000001', 'Gila Valley',      '2158 N Reay Ln Suite 1, Thatcher, AZ 85552',          '833-493-7229'),
  ('00000000-0000-0000-0003-000000000002', 'White Mountains',  '1080 N 16th St Suite 300, Show Low, AZ 85901',        '833-493-7229'),
  ('00000000-0000-0000-0003-000000000003', 'Sierra Vista',     '4148 Industry Dr Suite 1111, Sierra Vista, AZ 85650', '833-493-7229');

-- ─────────────────────────────────────────────
-- RESOURCE CATEGORIES
-- ─────────────────────────────────────────────
INSERT INTO resource_categories (id, name, icon, sort_order) VALUES
  ('00000000-0000-0000-0004-000000000001', 'Company Policies',     'BookOpen',      1),
  ('00000000-0000-0000-0004-000000000002', 'Safety & Compliance',  'ShieldCheck',   2),
  ('00000000-0000-0000-0004-000000000003', 'Field Operations',     'Compass',       3),
  ('00000000-0000-0000-0004-000000000004', 'Equipment & Products', 'Wrench',        4),
  ('00000000-0000-0000-0004-000000000005', 'Treatment Protocols',  'FlaskConical',  5),
  ('00000000-0000-0000-0004-000000000006', 'Sales Tools',          'TrendingUp',    6),
  ('00000000-0000-0000-0004-000000000007', 'Operations',           'Settings',      7);

-- ─────────────────────────────────────────────
-- SHORTHAND ALIASES (for readability in resource inserts)
-- ─────────────────────────────────────────────
-- dept-ops   = 00000000-0000-0000-0001-000000000001
-- dept-sales = 00000000-0000-0000-0001-000000000002

-- ─────────────────────────────────────────────
-- RESOURCES (25 total)
-- ─────────────────────────────────────────────

-- Company Policies (3)
INSERT INTO resources (id, title, description, type, url, category_id, tags, assigned_departments, assigned_positions, required_for_onboarding, file_size, created_at, updated_at) VALUES
(
  '00000000-0000-0000-0005-000000000001',
  'Employee Handbook 2026',
  'Complete handbook: policies, benefits, time-off procedures, code of conduct, and everything you need to know as a team member.',
  'pdf',
  'https://docs.google.com/document/d/1vJg5gG58pcnGE6D3M_TcT65BRab6Urtx/edit?usp=sharing&ouid=117890417828874472382&rtpof=true&sd=true',
  '00000000-0000-0000-0004-000000000001',
  ARRAY['handbook','policies','hr'],
  '{}',
  '{}',
  true,
  '~4 MB',
  '2026-01-15T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000002',
  'Company Org Chart',
  'Organizational structure and reporting chain.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000001',
  ARRAY['org-chart','structure'],
  '{}',
  '{}',
  true,
  '~500 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000003',
  'Brand Guidelines',
  'Logo usage, colors, uniform standards, and vehicle branding.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000001',
  ARRAY['brand','guidelines','logo'],
  '{}',
  '{}',
  false,
  '~2 MB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
);

-- Safety & Compliance (4)
INSERT INTO resources (id, title, description, type, url, category_id, tags, assigned_departments, assigned_positions, required_for_onboarding, file_size, created_at, updated_at) VALUES
(
  '00000000-0000-0000-0005-000000000004',
  'PPE Checklist',
  'Required personal protective equipment by service type.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000002',
  ARRAY['ppe','safety','checklist'],
  '{}',
  '{}',
  true,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000005',
  'Emergency Contact Card',
  'Printable card: poison control, hospital, and manager contacts.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000002',
  ARRAY['emergency','contacts','safety'],
  '{}',
  '{}',
  true,
  '~200 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000006',
  'Safety Data Sheet Binder',
  'Complete SDS for every product in the Hydra lineup. Required on every vehicle.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000002',
  ARRAY['sds','safety','compliance'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  true,
  '~12 MB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000007',
  'Arizona Pest Control Regulations',
  'AZ Dept of Agriculture Pest Management Division regulations. All technicians must be familiar with state licensing and compliance requirements.',
  'link',
  'https://agriculture.az.gov/pestspest-control/pest-management-division',
  '00000000-0000-0000-0004-000000000002',
  ARRAY['regulations','compliance','arizona'],
  '{}',
  '{}',
  false,
  NULL,
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
);

-- Field Operations (3)
INSERT INTO resources (id, title, description, type, url, category_id, tags, assigned_departments, assigned_positions, required_for_onboarding, file_size, created_at, updated_at) VALUES
(
  '00000000-0000-0000-0005-000000000008',
  'Service Visit Checklist',
  'Standard checklist for every residential and commercial visit.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000003',
  ARRAY['checklist','service','field'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000009',
  'Pest Identification Field Card',
  'Printable quick-reference: top 20 AZ pests with photos and treatment approach.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000003',
  ARRAY['field-card','identification','reference'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~2 MB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000010',
  'Seasonal Pest Calendar',
  'Month-by-month pest activity chart for all 3 service regions.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000003',
  ARRAY['seasonal','calendar','pests'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~500 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
);

-- Equipment & Products (3)
INSERT INTO resources (id, title, description, type, url, category_id, tags, assigned_departments, assigned_positions, required_for_onboarding, file_size, created_at, updated_at) VALUES
(
  '00000000-0000-0000-0005-000000000011',
  'Product Mixing Chart',
  'Mixing ratios for every product in the Hydra lineup.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000004',
  ARRAY['mixing','products','ratios'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~400 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000012',
  'Daily Equipment Checklist',
  'Pre-route check for sprayers, backpacks, vehicle rig, and tools.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000004',
  ARRAY['equipment','checklist','daily'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000013',
  'Vehicle Inspection Form',
  'Weekly vehicle condition and inventory form.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000004',
  ARRAY['vehicle','inspection','form'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
);

-- Treatment Protocols (4)
INSERT INTO resources (id, title, description, type, url, category_id, tags, assigned_departments, assigned_positions, required_for_onboarding, file_size, created_at, updated_at) VALUES
(
  '00000000-0000-0000-0005-000000000014',
  'Hydra-Guard Barrier Application SOP',
  'Step-by-step barrier application: spray patterns, mixing, and coverage.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000005',
  ARRAY['hydra-guard','barrier','sop'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~1 MB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000015',
  'iCap Product Label & Rates',
  'Product label with application rate chart.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000005',
  ARRAY['icap','product','rates'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~500 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000016',
  'Termite Pre-Construction Protocol',
  'Pre-treatment procedure: soil prep, chemical zones, and documentation.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000005',
  ARRAY['termite','pre-construction','protocol'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~1 MB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000017',
  'WDIIR Form Template',
  'Wood Destroying Insect Inspection Report template.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000005',
  ARRAY['wdiir','termite','inspection'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~400 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
);

-- Sales Tools (5)
INSERT INTO resources (id, title, description, type, url, category_id, tags, assigned_departments, assigned_positions, required_for_onboarding, file_size, created_at, updated_at) VALUES
(
  '00000000-0000-0000-0005-000000000018',
  'Service Pricing & Packages Guide',
  'Current pricing, bundles, and seasonal promotions. Updated monthly.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000006',
  ARRAY['pricing','sales','packages'],
  ARRAY['00000000-0000-0000-0001-000000000002']::uuid[],
  '{}',
  false,
  '~2 MB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000019',
  'Upsell Opportunity Guide',
  'How to spot and present add-on services during visits.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000006',
  ARRAY['upsell','sales','opportunities'],
  ARRAY['00000000-0000-0000-0001-000000000001','00000000-0000-0000-0001-000000000002']::uuid[],
  '{}',
  false,
  '~500 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000020',
  'Referral Program Overview',
  'Referral program details, cards, tracking, and bonus eligibility.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000006',
  ARRAY['referrals','program','bonus'],
  ARRAY['00000000-0000-0000-0001-000000000001','00000000-0000-0000-0001-000000000002']::uuid[],
  '{}',
  false,
  '~400 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000021',
  'Customer Communication Scripts',
  'Greeting, walkthrough, objection handling, and close scripts.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000006',
  ARRAY['scripts','customer','communication'],
  ARRAY['00000000-0000-0000-0001-000000000002']::uuid[],
  '{}',
  false,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000022',
  'Complaint Resolution Flowchart',
  'Step-by-step guide to handling customer concerns.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000006',
  ARRAY['complaints','resolution','customer-service'],
  ARRAY['00000000-0000-0000-0001-000000000002']::uuid[],
  '{}',
  false,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
);

-- Operations / Admin (3)
INSERT INTO resources (id, title, description, type, url, category_id, tags, assigned_departments, assigned_positions, required_for_onboarding, file_size, created_at, updated_at) VALUES
(
  '00000000-0000-0000-0005-000000000023',
  'Route Optimization Best Practices',
  'Tips for planning efficient daily routes and minimizing windshield time.',
  'document',
  '',
  '00000000-0000-0000-0004-000000000007',
  ARRAY['routes','efficiency','operations'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~500 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000024',
  'Warranty Documentation Template',
  'Template for treatment warranty paperwork.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000007',
  ARRAY['warranty','documentation','template'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
),
(
  '00000000-0000-0000-0005-000000000025',
  'Builder Coordination Checklist',
  'Pre-con treatment coordination with GCs and builders.',
  'pdf',
  '',
  '00000000-0000-0000-0004-000000000007',
  ARRAY['builder','coordination','pre-construction'],
  ARRAY['00000000-0000-0000-0001-000000000001']::uuid[],
  '{}',
  false,
  '~300 KB',
  '2026-04-03T00:00:00Z',
  '2026-04-03T00:00:00Z'
);

-- ─────────────────────────────────────────────
-- TRAINING MODULES (14 total)
-- ─────────────────────────────────────────────
INSERT INTO training_modules (id, slug, title, category, description, duration, video_url, key_takeaways, resources, sort_order) VALUES
(
  '00000000-0000-0000-0007-000000000001',
  'welcome-to-hydra',
  'Welcome to Hydra Pest Control',
  'Onboarding',
  'Get to know Hydra Pest Control — our mission, values, and what makes us different. This module covers company history, organizational structure, and the standards we hold ourselves to every day in the field.',
  '15 min',
  '',
  ARRAY['Understand Hydra''s mission and core values','Know the organizational structure and your reporting chain','Recognize what sets Hydra apart from competitors','Understand our commitment to customer satisfaction'],
  '[{"name":"Employee Handbook (PDF)","url":""},{"name":"Company Org Chart","url":""},{"name":"Brand Guidelines","url":""}]'::jsonb,
  1
),
(
  '00000000-0000-0000-0007-000000000002',
  'safety-protocols-ppe',
  'Safety Protocols & PPE Requirements',
  'Onboarding',
  'Your safety is non-negotiable. Learn the required personal protective equipment for every job type, proper chemical handling procedures, emergency protocols, and OSHA compliance standards.',
  '20 min',
  '',
  ARRAY['Identify required PPE for each service type','Understand chemical handling and storage procedures','Know emergency response protocols for exposure incidents','Stay compliant with OSHA and Arizona state regulations'],
  '[{"name":"PPE Checklist (PDF)","url":""},{"name":"Chemical Handling Guide","url":""},{"name":"Emergency Contact Card","url":""},{"name":"OSHA Quick Reference","url":""}]'::jsonb,
  2
),
(
  '00000000-0000-0000-0007-000000000003',
  'customer-service-standards',
  'Customer Service Standards',
  'Onboarding',
  'Every interaction is a chance to build trust. Learn Hydra''s communication guidelines, how to handle complaints professionally, and the small touches that turn one-time customers into lifelong advocates.',
  '12 min',
  '',
  ARRAY['Master the Hydra greeting and service walkthrough','Handle customer concerns with confidence and empathy','Document service visits properly for follow-up','Turn every job into a five-star experience'],
  '[{"name":"Customer Communication Scripts","url":""},{"name":"Service Visit Checklist","url":""},{"name":"Complaint Resolution Flowchart","url":""}]'::jsonb,
  3
),
(
  '00000000-0000-0000-0007-000000000004',
  'arizona-scorpions',
  'Arizona Scorpions: Identification & Treatment',
  'Pest Identification',
  'Arizona is home to over 40 scorpion species, including the bark scorpion — the most venomous in North America. Learn to identify common species, understand their behavior patterns, and apply the correct treatment protocols.',
  '18 min',
  '',
  ARRAY['Identify the Arizona bark scorpion and other common species','Understand scorpion harborage and entry points','Apply UV detection techniques during inspections','Execute the Hydra scorpion treatment protocol'],
  '[{"name":"Scorpion ID Field Card (PDF)","url":""},{"name":"UV Inspection Guide","url":""},{"name":"Treatment Protocol Sheet","url":""}]'::jsonb,
  4
),
(
  '00000000-0000-0000-0007-000000000005',
  'termite-identification-inspection',
  'Termite Identification & Inspection Procedures',
  'Pest Identification',
  'Termites cause billions in damage annually. Master the differences between subterranean and drywood termites, learn to spot evidence of infestation, and understand the WDIIR (Wood Destroying Insect Inspection Report) process.',
  '25 min',
  '',
  ARRAY['Distinguish subterranean from drywood termite damage','Identify mud tubes, frass, and swarm evidence','Conduct a thorough WDIIR inspection','Communicate findings clearly to homeowners and realtors'],
  '[{"name":"Termite ID Guide (PDF)","url":""},{"name":"WDIIR Form Template","url":""},{"name":"Inspection Walkthrough Checklist","url":""},{"name":"Damage Photo Reference Library","url":""}]'::jsonb,
  5
),
(
  '00000000-0000-0000-0007-000000000006',
  'common-arizona-pests',
  'Common Arizona Pests: Field Guide',
  'Pest Identification',
  'Quick-reference training on the most common pests you''ll encounter in the field — from black widows and brown recluses to roof rats, pigeons, bed bugs, and kissing bugs. Know what you''re looking at and how to respond.',
  '22 min',
  '',
  ARRAY['Identify the top 15 pests encountered in Arizona','Understand seasonal activity patterns for each pest','Know the correct initial treatment approach for each species','Recognize signs that require specialist escalation'],
  '[{"name":"Arizona Pest Field Guide (PDF)","url":""},{"name":"Seasonal Pest Calendar","url":""},{"name":"Quick ID Flashcards","url":""}]'::jsonb,
  6
),
(
  '00000000-0000-0000-0007-000000000007',
  'hydra-guard-barrier',
  'Hydra-Guard Barrier Application',
  'Treatment Procedures',
  'The Hydra-Guard barrier is our signature perimeter treatment. Learn the step-by-step application process, proper spray patterns, product mixing ratios, and how to communicate the value of ongoing barrier protection to customers.',
  '16 min',
  '',
  ARRAY['Execute the full Hydra-Guard barrier application process','Maintain proper spray distance and pattern coverage','Mix products at the correct ratios for each application','Explain the barrier protection value to customers'],
  '[{"name":"Hydra-Guard Application SOP","url":""},{"name":"Mixing Ratio Quick Sheet","url":""},{"name":"Coverage Map Template","url":""}]'::jsonb,
  7
),
(
  '00000000-0000-0000-0007-000000000008',
  'icap-technology-application',
  'iCap Technology: Proper Application',
  'Treatment Procedures',
  'iCap microencapsulated formulation requires specific handling and application techniques for maximum effectiveness. Learn proper storage, mixing, application methods, and the science behind why microcap technology outperforms traditional sprays.',
  '14 min',
  '',
  ARRAY['Understand how microencapsulation technology works','Store and handle iCap products correctly','Apply iCap at the proper dilution rates and pressures','Explain the long-lasting benefits to customers'],
  '[{"name":"iCap Product Label (PDF)","url":""},{"name":"Application Rate Chart","url":""},{"name":"Safety Data Sheet","url":""}]'::jsonb,
  8
),
(
  '00000000-0000-0000-0007-000000000009',
  'termite-pre-construction',
  'Termite Pre-Construction Treatment',
  'Treatment Procedures',
  'Pre-construction termite treatment is a critical revenue stream and requires precise execution. Learn the complete protocol for new-build treatments, including soil preparation, chemical application zones, and builder coordination.',
  '20 min',
  '',
  ARRAY['Understand Arizona pre-treatment code requirements','Apply termiticide to all required zones pre-pour','Document treatments for warranty compliance','Coordinate effectively with builders and general contractors'],
  '[{"name":"Pre-Treatment Protocol (PDF)","url":""},{"name":"Builder Coordination Checklist","url":""},{"name":"Warranty Documentation Template","url":""},{"name":"Arizona Code Reference","url":""}]'::jsonb,
  9
),
(
  '00000000-0000-0000-0007-000000000010',
  'equipment-maintenance',
  'Equipment Maintenance & Care',
  'Equipment & Products',
  'Well-maintained equipment means reliable service and fewer callbacks. Learn daily, weekly, and monthly maintenance routines for sprayers, backpacks, vehicle rigs, and handheld tools.',
  '12 min',
  '',
  ARRAY['Perform daily pre-route equipment checks','Maintain sprayer pumps, hoses, and nozzles','Keep service vehicles organized and inspection-ready','Report equipment issues before they become failures'],
  '[{"name":"Daily Equipment Checklist (PDF)","url":""},{"name":"Sprayer Maintenance Guide","url":""},{"name":"Vehicle Inspection Form","url":""}]'::jsonb,
  10
),
(
  '00000000-0000-0000-0007-000000000011',
  'product-mixing-sds',
  'Product Mixing & Safety Data Sheets',
  'Equipment & Products',
  'Accurate product mixing protects your health, the customer''s property, and Hydra''s reputation. Learn proper mixing ratios for every product in our lineup and how to read and reference Safety Data Sheets.',
  '15 min',
  '',
  ARRAY['Mix all Hydra products at the correct ratios','Read and interpret Safety Data Sheets (SDS)','Store mixed and unmixed products safely','Handle spills and accidental exposure correctly'],
  '[{"name":"Product Mixing Chart (PDF)","url":""},{"name":"SDS Binder Index","url":""},{"name":"Spill Response Procedure","url":""}]'::jsonb,
  11
),
(
  '00000000-0000-0000-0007-000000000012',
  'upselling-services',
  'Upselling Services the Right Way',
  'Sales & Growth',
  'Great technicians solve problems customers didn''t know they had — without being pushy. Learn how to identify upsell opportunities during service visits and present them as genuine value rather than a hard sell.',
  '10 min',
  '',
  ARRAY['Spot natural upsell opportunities during inspections','Present additional services as solutions, not sales pitches','Use the ''show, don''t tell'' approach for add-on services','Track upsell conversions and learn from what works'],
  '[{"name":"Upsell Opportunity Guide (PDF)","url":""},{"name":"Service Add-On Pricing Sheet","url":""},{"name":"Conversation Scripts","url":""}]'::jsonb,
  12
),
(
  '00000000-0000-0000-0007-000000000013',
  'generating-referrals',
  'Generating Referrals',
  'Sales & Growth',
  'Happy customers are your best marketing channel. Learn how to ask for referrals at the right time, make it easy for customers to spread the word, and track referral sources for bonus eligibility.',
  '8 min',
  '',
  ARRAY['Ask for referrals at the peak moment of satisfaction','Use referral cards and digital tools to make sharing easy','Follow up with referred leads within 24 hours','Track your referral numbers for monthly bonus eligibility'],
  '[{"name":"Referral Program Overview (PDF)","url":""},{"name":"Referral Card Templates","url":""},{"name":"Referral Tracking Sheet","url":""}]'::jsonb,
  13
),
(
  '00000000-0000-0000-0007-000000000014',
  'd2d-pest-control-basics',
  'Basics of the Pest Control Industry',
  'Sales & Growth',
  'Introduction to the pest control industry for door-to-door sales reps. Covers industry fundamentals, common services, how the business works, and what customers care about.',
  '20 min',
  'https://drive.google.com/file/d/1FE3ySQ6XojkZXrxPEloy7CC0skTJuI_P/preview',
  ARRAY['Understand how the pest control industry works','Know the core services Hydra offers and why they matter','Speak confidently about common pests and treatment approaches','Build credibility at the door with real industry knowledge'],
  '[]'::jsonb,
  14
);

-- ─────────────────────────────────────────────
-- ADMIN EMPLOYEE
-- ─────────────────────────────────────────────
INSERT INTO employees (id, name, email, pin, role, department_id, position_id, location_id, status, created_at) VALUES
(
  '00000000-0000-0000-0006-000000000001',
  'Admin',
  'admin@hydrapest.com',
  '0000',
  'admin',
  '00000000-0000-0000-0001-000000000001',
  '00000000-0000-0000-0002-000000000001',
  '00000000-0000-0000-0003-000000000001',
  'active',
  '2026-01-01T00:00:00Z'
);

-- ─────────────────────────────────────────────
-- PORTAL CONFIG
-- ─────────────────────────────────────────────
INSERT INTO portal_config (key, value) VALUES
  ('training_access_code', 'hydra2026');
