# OrgCentral — SaaS Multi-Tenant Construction Platform
## Complete Implementation Blueprint

---

## Executive Summary

OrgCentral is being evolved from a single-company construction management tool into a **B2B SaaS platform** serving construction companies of all sizes — from small contractors to multinational EPC firms. The platform must natively support multi-tenancy, multiple timezones, currencies, and languages while deeply understanding the full lifecycle of construction projects: from pre-construction bidding through execution, close-out, and asset handover.

---

## Part 1: Current State Assessment

### What Exists (Good Foundation)
| Area | Status | Notes |
|------|--------|-------|
| Next.js 15 App Router | ✅ Strong | Turbopack, TypeScript, good structure |
| i18n infrastructure | ✅ Partial | 14 locales in `/src/i18n/` but `en.json` is empty `{}` — strings hardcoded in components |
| UI component system | ✅ Good | shadcn/ui + Radix UI, consistent |
| AI flows (Genkit) | ✅ Working | Role suggester + project issue analyser |
| 3D/CAD viewer | ✅ Unique | Three.js + DXF parser — major differentiator |
| State management | ✅ Modern | Jotai + TanStack Query |
| CI/CD pipeline | ✅ Skeleton | Jenkins + Docker — needs real registry config |
| Firebase backend | ⚠️ Single-tenant | No tenant isolation yet |
| Data layer | ❌ Mock only | All data is hardcoded in components — `localStorage` at best |
| Multi-tenancy | ❌ Missing | No tenant context, no row-level security |
| Currency/timezone | ❌ Missing | Hardcoded `$`, `USD`, no tz-aware dates |
| Authentication | ⚠️ Basic | Firebase Auth exists but no tenant-scoped roles |
| Tests | ❌ Missing | No test suite at all |

### Key Technical Debt
1. All pages use hardcoded mock data (no API integration)
2. i18n translation files are empty — strings live in JSX
3. Locale is hardcoded as `"en"` in root layout
4. `localStorage` used for budget data (breaks SSR + multi-device)
5. No tenant context in any component or API route
6. Duplicate type declarations (`InvitationStatus` defined twice)

---

## Part 2: Multi-Tenancy Architecture

### Tenant Isolation Model: **Schema-per-Tenant on Firebase / Hybrid DB**

```
Firestore Structure
├── tenants/{tenantId}/
│   ├── profile          ← company info, plan, settings
│   ├── settings/
│   │   ├── locale       ← default language, timezone, currency
│   │   ├── branding     ← logo, colors, custom domain
│   │   └── features     ← enabled modules per plan
│   ├── users/{userId}   ← tenant-scoped users
│   ├── projects/{projectId}
│   ├── employees/{employeeId}
│   ├── invoices/{invoiceId}
│   └── ...all collections scoped under tenantId
├── superadmin/          ← platform-level data (plans, billing, audit)
└── publicProfiles/      ← for white-label subdomains
```

### Tenant Resolution Strategy

```
Request → Middleware → Tenant Resolution
  ├── Subdomain:  acme.orgcentral.com  → tenantId = "acme"
  ├── Custom:     pm.acmecorp.com      → tenantId lookup in DNS map
  └── Path:       orgcentral.com/t/acme → tenantId = "acme" (fallback)
```

### Implementation: `src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const hostname = req.headers.get('host') ?? '';
  const tenantId = resolveTenantId(hostname);

  if (!tenantId) return NextResponse.redirect('/not-found');

  // Inject tenantId into headers for all downstream requests
  const response = NextResponse.next();
  response.headers.set('x-tenant-id', tenantId);
  return response;
}

function resolveTenantId(host: string): string | null {
  // Strip port
  const domain = host.split(':')[0];
  // Subdomain pattern: acme.orgcentral.com
  const parts = domain.split('.');
  if (parts.length >= 3 && parts[1] === 'orgcentral') return parts[0];
  // Custom domain: look up in tenant DNS map (cached in edge KV)
  return customDomainMap[domain] ?? null;
}
```

### Tenant Context Provider

```typescript
// src/contexts/TenantContext.tsx
interface TenantConfig {
  tenantId: string;
  name: string;
  plan: 'starter' | 'professional' | 'enterprise';
  locale: string;          // e.g. 'en-US', 'ar-SA', 'ja-JP'
  timezone: string;        // e.g. 'America/New_York', 'Asia/Dubai'
  currency: string;        // e.g. 'USD', 'AED', 'JPY'
  currencySymbol: string;  // e.g. '$', 'AED', '¥'
  dateFormat: string;      // e.g. 'MM/DD/YYYY', 'DD/MM/YYYY'
  workWeek: number[];      // e.g. [1,2,3,4,5] = Mon-Fri, [0,1,2,3,4] = Sun-Thu (Middle East)
  modules: EnabledModules;
  branding: TenantBranding;
}

export const TenantContext = createContext<TenantConfig | null>(null);
export const useTenant = () => {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenant must be used inside TenantProvider');
  return ctx;
};
```

---

## Part 3: Multi-Timezone Architecture

### The Core Problem
Construction projects span multiple timezones simultaneously:
- HQ is in London (GMT)
- Site A is in Dubai (GMT+4)
- Site B is in New York (GMT-5)
- A subcontractor logs time in Bangkok (GMT+7)

All timestamps must be stored in **UTC**, displayed in the **user's local timezone**, and scheduled relative to **site timezone**.

### Storage Rule: Always UTC
```typescript
// src/lib/time.ts
import { format, toZonedTime, fromZonedTime } from 'date-fns-tz';

// Store: convert local → UTC before saving to Firestore
export function toUTC(localDate: Date, timezone: string): Date {
  return fromZonedTime(localDate, timezone);
}

// Display: convert UTC → local for rendering
export function toLocal(utcDate: Date, timezone: string): Date {
  return toZonedTime(utcDate, timezone);
}

// Format for display
export function formatInTimezone(
  utcDate: Date,
  timezone: string,
  fmt: string = 'PPP p'
): string {
  const local = toZonedTime(utcDate, timezone);
  return format(local, fmt, { timeZone: timezone });
}
```

### Three Timezone Contexts
```typescript
interface TimezoneContext {
  userTZ: string;      // The logged-in user's preference
  tenantTZ: string;    // HQ / company default timezone
  projectTZ: string;   // The site timezone for this project
}
```

### Timezone-Aware Components
Every date/time display must use `<TZDate>` instead of raw `format()`:

```tsx
// src/components/ui/tz-date.tsx
export function TZDate({ utc, tz, format }: TZDateProps) {
  const { userTZ } = useTenant();
  const displayTZ = tz ?? userTZ;
  return <time dateTime={utc.toISOString()}>
    {formatInTimezone(utc, displayTZ, format)}
  </time>;
}
```

### Work Week Configurability
Middle Eastern markets (UAE, Saudi Arabia, Qatar) work **Sunday–Thursday**. The scheduler and attendance system must respect this:

```typescript
// src/lib/schedule.ts
export function getWorkingDays(
  startUTC: Date,
  endUTC: Date,
  projectTZ: string,
  workWeek: number[],        // 0=Sun, 1=Mon ... 6=Sat
  publicHolidays: string[]   // ISO date strings in project timezone
): number {
  // ... implementation using date-fns-tz
}
```

---

## Part 4: Multi-Currency Architecture

### Currency Model
```typescript
// src/types/money.ts
interface Money {
  amount: number;     // Always stored in minor units (cents/fils/paisa)
  currency: string;   // ISO 4217: USD, AED, INR, SAR, JPY, EUR...
}

// Display helper
export function formatMoney(money: Money, locale: string): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: money.currency,
    minimumFractionDigits: getCurrencyDecimals(money.currency), // JPY=0, USD=2, KWD=3
  }).format(money.amount / Math.pow(10, getCurrencyDecimals(money.currency)));
}
```

### Multi-Currency in Construction
Construction projects commonly have **mixed currencies**:
- Material procurement in local currency (AED for UAE site)
- Specialist equipment from Europe (EUR)
- Parent company reporting in USD
- Labour contracts in INR (if South Asian workforce)

```typescript
interface ProjectBudget {
  reportingCurrency: string;           // USD — all reports normalised here
  lineItems: BudgetLineItem[];
}

interface BudgetLineItem {
  description: string;
  amount: Money;                       // In original currency
  amountInReporting?: Money;           // Converted for reports (with exchange rate snapshot)
  exchangeRate?: number;               // Rate at time of entry
  exchangeRateDate?: string;           // When rate was captured
}
```

### Exchange Rate Integration
```typescript
// src/lib/fx.ts
// Options (in preference order):
// 1. Open Exchange Rates API (paid, reliable)
// 2. European Central Bank (free, daily)
// 3. Frankfurter.app (free, ECB mirror)

export async function getExchangeRate(from: string, to: string): Promise<number> {
  const res = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
  const data = await res.json();
  return data.rates[to];
}

// Rates must be cached (Redis/Firestore) and snapshotted at time of transaction
// Never recalculate historical transactions with current rates
```

### Fix: Update All Money Displays
Current code has: `currency: '$'` hardcoded.
Must change to:
```typescript
// Before (wrong)
budget: { allocated: 850000, currency: '$' }

// After (correct)
budget: { allocated: { amount: 85000000, currency: tenant.currency } }
// Display: formatMoney(budget.allocated, tenant.locale)
```

---

## Part 5: Multi-Language Architecture

### Fix i18n (Critical — Currently Broken)

The existing `en.json` is empty `{}` and all strings are hardcoded. Full extraction needed.

#### Step 1: Populate translation files
```json
// src/i18n/en.json (sample keys)
{
  "nav.dashboard": "Dashboard",
  "nav.projects": "Projects",
  "nav.hr": "Human Resources",
  "nav.financials": "Financials",
  "project.status.planning": "Planning",
  "project.status.inProgress": "In Progress",
  "project.status.completed": "Completed",
  "hr.employee.position": "Position",
  "invoice.total": "Total Amount",
  "safety.incident.severity.low": "Low",
  "safety.incident.severity.high": "High",
  "construction.phase.foundation": "Foundation",
  "construction.phase.structure": "Structure Works",
  "construction.phase.mepRoughIn": "MEP Rough-In",
  "construction.phase.finishing": "Finishing"
  // ... 500+ keys
}
```

#### Step 2: Fix locale resolution in root layout
```typescript
// src/app/layout.tsx — replace hardcoded "en"
import { headers } from 'next/headers';
import { getTenantConfig } from '@/lib/tenant';

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const tenantId = headersList.get('x-tenant-id') ?? 'default';
  const tenant = await getTenantConfig(tenantId);
  const locale = tenant.locale ?? 'en';
  // ...
}
```

#### Step 3: Locale-aware number/date formatting
```typescript
// src/hooks/useFormatters.ts
export function useFormatters() {
  const { locale, currency, timezone } = useTenant();
  return {
    money: (amount: number, cur?: string) =>
      new Intl.NumberFormat(locale, {
        style: 'currency', currency: cur ?? currency
      }).format(amount),
    date: (d: Date) => new Intl.DateTimeFormat(locale, { timeZone: timezone }).format(d),
    number: (n: number) => new Intl.NumberFormat(locale).format(n),
    percent: (n: number) => new Intl.NumberFormat(locale, { style: 'percent' }).format(n),
  };
}
```

#### Supported Languages (Priority Order)
| Locale | Language | Script Direction | Market |
|--------|----------|-----------------|--------|
| en | English | LTR | Global default |
| ar | Arabic | **RTL** | GCC, MENA |
| hi | Hindi | LTR | India |
| ta | Tamil | LTR | India, Sri Lanka |
| te | Telugu | LTR | India |
| ml | Malayalam | LTR | India (Kerala) |
| ur | Urdu | **RTL** | Pakistan |
| zh | Chinese (Simplified) | LTR | China |
| ja | Japanese | LTR | Japan |
| de | German | LTR | Europe |
| fr | French | LTR | Europe, Africa |
| es | Spanish | LTR | LATAM, Spain |
| ru | Russian | LTR | CIS |
| pl | Polish | LTR | Poland |

#### RTL Support (Arabic & Urdu)
```typescript
// src/app/layout.tsx — add dir attribute
<html lang={locale} dir={isRTL(locale) ? 'rtl' : 'ltr'}>

// src/lib/locale.ts
export const RTL_LOCALES = ['ar', 'ur', 'he', 'fa'];
export const isRTL = (locale: string) => RTL_LOCALES.includes(locale.split('-')[0]);
```

```css
/* tailwind.config.ts — RTL plugin */
// Use @tailwindcss/rtl or CSS logical properties
// margin-inline-start instead of margin-left
// padding-inline-end instead of padding-right
```

---

## Part 6: Deep Construction Industry Modules

### 6.1 Construction Project Lifecycle

Construction has a very specific lifecycle unlike generic projects:

```
PRECONSTRUCTION → MOBILISATION → CONSTRUCTION → COMMISSIONING → CLOSEOUT → WARRANTY
```

Each phase has distinct features:

#### Pre-Construction
- **Bidding / Tendering**: BOQ (Bill of Quantities), bid management, subcontractor bid comparison
- **Estimating**: Takeoff from drawings, unit rate library, contingency planning
- **Feasibility Studies**: Land acquisition, preliminary design, pro-forma
- **Permits & Approvals**: Building permits, environmental clearances, NOCs
- **Contract Execution**: FIDIC / NEC / JCT contract types, contract value, retention %, payment terms

#### Mobilisation
- **Site Setup**: Site office, welfare facilities, hoardings, access roads
- **Procurement Plan**: Long-lead items, material schedules, vendor pre-qualification
- **Workforce Mobilisation**: Labour deployment, accommodation, visa tracking (for international workers)
- **Method Statements & ITP**: Inspection & Test Plans per work package

#### Construction Execution
- **Daily Diaries / Site Reports**: Weather, labour count, plant on site, work done
- **Drawing Management**: Revision control, superseded drawing tracking, RFI (Request for Information)
- **Variations / Change Orders**: Instruction, valuation, approval workflow
- **Subcontractor Management**: Deployment, measurement, interim payments, defects
- **Quality Management**: Non-Conformance Reports (NCR), inspection records, material approvals
- **Safety**: Incident reports, toolbox talks, permit-to-work, safety audits

#### Financial Control
- **Progress Claims / Payment Certificates**: Monthly valuation, engineer's certificate, client payment
- **Cost Reporting**: Committed costs, accruals, cost-at-completion forecast
- **Retention Management**: Track 5%/10% retention, practical completion release, defects liability release
- **Variations Tracking**: Approved, pending, disputed variations

#### Commissioning & Closeout
- **Snagging / Punch List**: Defect tracking, category by discipline, resolution status
- **O&M Manuals**: Operation & Maintenance documentation
- **As-Built Drawings**: Revised drawings reflecting actual construction
- **Handover Certificates**: Practical Completion, Final Completion
- **Warranty Tracking**: Equipment warranties, workmanship guarantees, contractor obligations

### 6.2 Construction-Specific Data Models

#### Project Type Classification
```typescript
type ProjectType =
  | 'residential'           // Houses, apartments, villas
  | 'commercial'            // Offices, retail, hotels
  | 'industrial'            // Factories, warehouses, data centres
  | 'infrastructure'        // Roads, bridges, utilities
  | 'healthcare'            // Hospitals, clinics
  | 'education'             // Schools, universities
  | 'mixed-use'             // Combined use development
  | 'fit-out'               // Interior works only
  | 'civil'                 // Earthworks, drainage, foundations
  | 'mep'                   // Mechanical, Electrical, Plumbing only
  | 'renovation';           // Refurbishment of existing

type ContractType = 'lump-sum' | 'remeasurable' | 'cost-plus' | 'design-build' | 'epc' | 'ppp';
type ProcurementMethod = 'traditional' | 'design-and-build' | 'management-contracting' | 'construction-management';
```

#### Work Breakdown Structure (WBS)
```typescript
// Construction uses CSI MasterFormat or NRM (UK) divisions
interface WBSItem {
  id: string;
  code: string;          // e.g. "03.10.00" = Concrete Forming
  description: string;
  division: string;      // e.g. "Division 03 - Concrete"
  unit: string;          // m², m³, lm, nr, item
  quantity: number;
  unitRate: Money;
  totalBudget: Money;
  progressToDate: number;  // percentage
  earnedValue: Money;
  actualCost: Money;
  parentId?: string;
}
```

#### Bill of Quantities (BOQ)
```typescript
interface BOQ {
  id: string;
  projectId: string;
  revision: string;          // Rev A, B, C...
  status: 'draft' | 'issued' | 'tendered' | 'awarded' | 'final';
  sections: BOQSection[];
  totalBudget: Money;
  contingency: number;       // percentage
  preliminaries: Money;      // Site setup, temporary works, insurance
  overheadsAndProfit: number; // percentage
}

interface BOQSection {
  id: string;
  reference: string;         // e.g. "A", "B", "1.1"
  description: string;
  items: WBSItem[];
  sectionTotal: Money;
}
```

#### Daily Site Diary
```typescript
interface SiteDiary {
  id: string;
  projectId: string;
  tenantId: string;
  date: string;              // UTC ISO
  siteTimezone: string;      // Store the tz used when entry was made
  reportedBy: string;        // userId
  weather: {
    morning: WeatherCondition;
    afternoon: WeatherCondition;
    temperature: number;
    unit: 'C' | 'F';
    windSpeed?: number;
    rainfall?: number;       // mm
  };
  labour: LabourRecord[];    // By trade, by subcontractor
  plant: PlantRecord[];      // Equipment on site
  materials: MaterialDelivery[];
  workDescription: string;   // Narrative of work done
  delayEvents?: DelayEvent[];
  visitors?: SiteVisitor[];
  photos?: string[];         // Firebase Storage URLs
  status: 'draft' | 'submitted' | 'approved';
}

type WeatherCondition = 'Clear' | 'Cloudy' | 'Rain' | 'Sandstorm' | 'Fog' | 'Snow' | 'Extreme Heat';
```

#### RFI (Request for Information)
```typescript
interface RFI {
  id: string;
  rfiNumber: string;         // RFI-001, RFI-002...
  projectId: string;
  tenantId: string;
  subject: string;
  description: string;
  raisedBy: string;          // subcontractor/team
  raisedDate: string;
  requiredResponseDate: string;
  discipline: 'architectural' | 'structural' | 'mep' | 'civil' | 'general';
  status: 'open' | 'responded' | 'closed' | 'overdue';
  response?: string;
  respondedBy?: string;
  respondedDate?: string;
  attachments?: string[];
  drawingReferences?: string[];
  impactOnTime: boolean;
  timeImpactDays?: number;
  impactOnCost: boolean;
  costImpact?: Money;
}
```

#### Variation Order (Change Order)
```typescript
interface Variation {
  id: string;
  variationNumber: string;   // VO-001, CO-001...
  projectId: string;
  tenantId: string;
  description: string;
  instructedBy: string;      // Client, engineer, architect
  instructionDate: string;
  type: 'addition' | 'omission' | 'substitution' | 'provisional-sum-adjustment';
  status: 'pending' | 'submitted' | 'approved' | 'disputed' | 'rejected' | 'incorporated';
  quotedAmount: Money;
  approvedAmount?: Money;
  timeImpact?: number;        // calendar days
  supportingDocs: string[];
  linkedRFI?: string;         // rfiId if variation arose from RFI
  linkedDrawings?: string[];
}
```

#### Progress Claim / Payment Certificate
```typescript
interface ProgressClaim {
  id: string;
  claimNumber: string;        // PC-001...
  projectId: string;
  tenantId: string;
  claimPeriod: { from: string; to: string };
  currency: string;
  contractValue: Money;
  previouslyCertified: Money;
  thisClaimGross: Money;
  retentionRate: number;      // e.g. 0.05 = 5%
  retentionHeld: Money;
  thisClaimNet: Money;        // gross - retention
  cumulativeGross: Money;
  cumulativeRetentionHeld: Money;
  completionPercentage: number;
  variations: { id: string; amount: Money }[];
  status: 'draft' | 'submitted' | 'assessed' | 'certified' | 'paid' | 'disputed';
  engineerCertificate?: string;   // PDF URL
  paymentDate?: string;
}
```

#### Non-Conformance Report (NCR)
```typescript
interface NCR {
  id: string;
  ncrNumber: string;
  projectId: string;
  tenantId: string;
  title: string;
  description: string;
  raisedBy: string;
  raisedDate: string;
  discipline: string;
  location: string;           // Grid ref / zone / level / room
  severity: 'minor' | 'major' | 'critical';
  category: 'workmanship' | 'material' | 'design' | 'documentation' | 'process';
  proposedCorrection: string;
  correctedBy?: string;
  closedDate?: string;
  status: 'open' | 'under-correction' | 'pending-verification' | 'closed';
  linkedInspection?: string;
  photos: string[];
  linkedWBSItem?: string;
}
```

### 6.3 Construction-Specific HR Extensions

#### Labour Classification (International)
```typescript
type LabourCategory =
  | 'site-manager'          | 'project-manager'     | 'construction-manager'
  | 'site-engineer'         | 'quantity-surveyor'    | 'planning-engineer'
  | 'safety-officer'        | 'quality-engineer'     | 'mep-engineer'
  | 'site-supervisor'       | 'foreman'              | 'leading-hand'
  | 'skilled-tradesman'     | 'semi-skilled'         | 'unskilled-labourer'
  | 'driver'                | 'operator'             | 'scaffolder'
  | 'formwork-carpenter'    | 'steel-fixer'          | 'mason'
  | 'electrician'           | 'plumber'              | 'hvac-technician';

interface Employee {
  // ... existing fields +
  labourCategory: LabourCategory;
  tradeSkills: string[];
  certifications: Certification[];     // CSCS, OSHA, First Aid...
  visaStatus?: VisaRecord;             // For international workers
  accommodationBlock?: string;         // For labour camp workers
  gangId?: string;                     // Work gang assignment
  nationality: string;                 // Required for construction workforce management
  passportNumber?: string;
  passportExpiry?: string;
}

interface Certification {
  name: string;             // e.g. "CSCS Gold Card", "OSHA 30-hour"
  issuer: string;
  issueDate: string;
  expiryDate: string;
  number?: string;
  status: 'active' | 'expired' | 'pending-renewal';
}
```

#### Timesheet (Construction-Grade)
```typescript
interface Timesheet {
  id: string;
  employeeId: string;
  tenantId: string;
  projectId: string;
  weekStarting: string;      // Monday of the week
  timezone: string;          // Site timezone
  days: TimesheetDay[];
  totalOrdinaryHours: number;
  totalOvertimeHours: number;
  totalAllowances: Money;
  status: 'draft' | 'submitted' | 'supervisor-approved' | 'payroll-approved';
  approvedBy?: string;
}

interface TimesheetDay {
  date: string;
  startTime: string;         // HH:mm in site timezone
  endTime: string;
  breakMinutes: number;
  wbsItemId?: string;        // Cost code for cost allocation
  workType: 'ordinary' | 'overtime-1.5x' | 'overtime-2x' | 'public-holiday' | 'rest-day';
  allowances: Allowance[];   // Site allowance, travel, meal
}
```

### 6.4 Construction-Specific Financial Modules

#### Cost Code Structure
```typescript
// WBS-aligned cost codes following CSI MasterFormat or custom
interface CostCode {
  id: string;
  tenantId: string;
  code: string;              // e.g. "03.30" or "STRUCT-001"
  description: string;
  category: 'direct-labour' | 'direct-materials' | 'plant-equipment'
           | 'subcontract' | 'preliminaries' | 'overheads' | 'contingency';
  division?: string;         // CSI division
  isActive: boolean;
}
```

#### Earned Value Management (EVM)
```typescript
interface EVMSnapshot {
  projectId: string;
  snapshotDate: string;
  currency: string;
  // The three core EVM metrics
  budgetedCostWorkScheduled: Money;     // BCWS (Planned Value)
  budgetedCostWorkPerformed: Money;     // BCWP (Earned Value)
  actualCostWorkPerformed: Money;       // ACWP (Actual Cost)
  // Derived metrics
  scheduleVariance: Money;              // BCWP - BCWS
  costVariance: Money;                  // BCWP - ACWP
  schedulePerformanceIndex: number;     // BCWP / BCWS
  costPerformanceIndex: number;         // BCWP / ACWP
  estimateAtCompletion: Money;          // BAC / CPI
  estimateToComplete: Money;            // EAC - ACWP
  varianceAtCompletion: Money;          // BAC - EAC
}
```

---

## Part 7: SaaS Plans & Feature Gating

### Subscription Plans

| Feature | Starter | Professional | Enterprise |
|---------|---------|-------------|------------|
| Projects | 3 | 25 | Unlimited |
| Users | 10 | 100 | Unlimited |
| Storage | 5 GB | 50 GB | 1 TB |
| AI features | — | Basic | Advanced |
| CAD viewer | — | ✅ | ✅ |
| Custom domain | — | ✅ | ✅ |
| White-labelling | — | — | ✅ |
| API access | — | — | ✅ |
| SLA | 99% | 99.5% | 99.9% |
| Support | Email | Priority | Dedicated CSM |
| Modules | Core | Core + Finance | All |
| EVM | — | — | ✅ |
| Multi-currency | — | ✅ | ✅ |
| Custom work week | — | ✅ | ✅ |

### Feature Flag Implementation
```typescript
// src/lib/features.ts
export function canAccess(tenant: TenantConfig, feature: Feature): boolean {
  const plan = PLAN_FEATURES[tenant.plan];
  return plan.includes(feature);
}

// Usage in components
const { plan } = useTenant();
if (!canAccess(tenant, 'evm')) return <UpgradePrompt feature="Earned Value Management" />;
```

---

## Part 8: Implementation Roadmap

### Phase 1 — Foundation (Weeks 1–6)
**Goal: Make existing code production-ready with tenant context**

1. **Tenant infrastructure** — middleware, TenantContext, Firestore schema design
2. **Firebase security rules** — row-level security by tenantId on all collections
3. **Fix i18n** — extract all hardcoded strings to translation files, fix locale resolution
4. **Replace mock data** — connect pages to real Firestore collections (start with Projects + Users)
5. **Auth hardening** — tenant-scoped RBAC, custom claims in Firebase tokens
6. **CI/CD** — wire up Jenkins pipeline with real Docker registry and staging environment

### Phase 2 — Multi-Currency & Timezone (Weeks 7–10)
**Goal: Full internationalisation across all data**

1. **Money type** — replace all `number` amounts with `Money` type, add formatMoney()
2. **FX integration** — Frankfurter.app or Open Exchange Rates, cached in Firestore
3. **Timezone system** — `date-fns-tz` integration, `<TZDate>` component, site vs user tz
4. **RTL layouts** — test Arabic & Urdu, fix UI layout issues
5. **Work week config** — tenant-level setting, integrate into scheduler and timesheets
6. **Currency in all forms** — invoices, payroll, budget — add currency selector

### Phase 3 — Construction Depth (Weeks 11–20)
**Goal: Build construction-grade features that differentiate**

Week 11–12: **BOQ & WBS** — full Bill of Quantities with CSI codes, quantity takeoff UI
Week 13–14: **Drawing management** — revision control, superseded tracking, issue sheets
Week 15: **RFI module** — full workflow, response tracking, time/cost impact
Week 16: **Variation orders** — instruction workflow, approval chain, financial impact
Week 17–18: **Progress claims** — monthly valuation, retention tracking, payment certificates
Week 19: **Daily site diaries** — weather, labour, plant, photo upload
Week 20: **NCR & Quality** — non-conformance workflow, linked to WBS items

### Phase 4 — AI & Analytics (Weeks 21–26)
**Goal: AI-powered construction intelligence**

1. **Earned Value Analysis** — automated EVM reports with trend charts
2. **Schedule analytics** — critical path alerts, float analysis, look-ahead schedules
3. **Cost forecasting** — AI-powered cost-at-completion prediction
4. **Risk scoring** — AI analysis of delay patterns, NCR frequency, weather impact
5. **Document intelligence** — extract data from uploaded drawings and contracts
6. **Benchmarking** — compare project KPIs against industry benchmarks

### Phase 5 — Scale & Enterprise (Weeks 27–32)
**Goal: Enterprise readiness**

1. **Programme of works** — multi-project portfolio view, resource levelling
2. **Procurement module** — supplier management, PO tracking, delivery scheduling
3. **White-label** — custom logo, colours, subdomain per tenant
4. **API** — REST/GraphQL API for enterprise integrations (Primavera, Oracle, SAP)
5. **Audit trail** — full immutable event log per tenant
6. **Advanced RBAC** — custom roles, field-level permissions, project-level access

---

## Part 9: Technical Decisions & Packages

### New Dependencies to Add

```json
{
  "date-fns-tz": "^3.x",          // Timezone-aware date formatting
  "react-day-picker": "^9.x",     // Already exists — upgrade for tz support  
  "dinero.js": "^2.x",            // Type-safe money arithmetic
  "@formatjs/intl-numberformat": "^8.x",   // Number/currency formatting polyfill
  "firebase-admin": "^12.x",      // Server-side Firebase (API routes)
  "ioredis": "^5.x",              // Redis for FX rate caching
  "zod": "^3.x",                  // Already exists — expand for API validation
  "nanoid": "^5.x",               // ID generation (replace Date.now() anti-pattern)
  "@tanstack/react-table": "^8.x", // Replace custom tables with proper solution
  "react-pdf": "^7.x",            // PDF generation for invoices/certificates
  "papaparse": "^5.x",            // CSV export/import for BOQ
  "xlsx": "^0.18.x"               // Excel import/export for BOQ and reports
}
```

### Database Architecture Decision

**Recommended: Firestore + PostgreSQL (Hybrid)**

| Use | Database |
|-----|----------|
| Documents, files metadata, chat, notifications | **Firestore** (existing) |
| Financial transactions, BOQ, WBS, EVM | **PostgreSQL** (Neon/Supabase) |
| Exchange rate cache, session data | **Redis** (Upstash) |
| Files (drawings, photos, contracts) | **Firebase Storage** |
| Search across projects/docs | **Algolia** or **Typesense** |

Reason: Financial data needs ACID transactions and complex joins (EVM calculations, cost roll-ups) that Firestore handles poorly.

---

## Part 10: Security & Compliance

### Firestore Security Rules (Template)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // All tenant data is scoped
    match /tenants/{tenantId}/{document=**} {
      allow read, write: if request.auth != null
        && request.auth.token.tenantId == tenantId
        && hasRole(request.auth.token.role, document);
    }

    function hasRole(role, path) {
      // superadmin can access everything
      if (role == 'superadmin') return true;
      // tenant-admin can access all tenant data
      if (role == 'tenant-admin') return true;
      // project-manager can access their projects only
      if (role == 'project-manager') return isProjectMember(path);
      return false;
    }
  }
}
```

### Data Residency
- Offer EU, US, APAC, and GCC data regions
- Store tenant data in the region selected at signup
- Critical for GDPR (EU), PDPL (Saudi Arabia), UAE data protection law

### Compliance Certifications (Roadmap)
- **ISO 27001** — Information security management
- **SOC 2 Type II** — Security, availability, confidentiality
- **GDPR** — EU data protection
- **PDPL** — Saudi Arabia personal data protection law

---

## Part 11: Construction Industry Integrations

### Priority Integrations

| System | Use Case | Priority |
|--------|----------|----------|
| **Primavera P6** | Schedule import/export | High (enterprise) |
| **Microsoft Project** | Schedule sync | High |
| **AutoCAD / BIM 360** | Drawing management | High |
| **Procore** | Competitive integration or data migration | Medium |
| **QuickBooks / Xero** | Accounting sync | High |
| **SAP** | ERP integration for large contractors | Medium |
| **OpenWeatherMap** | Site weather for daily diaries | Low (easy win) |
| **WhatsApp Business** | Site communication | High (GCC market) |
| **DocuSign** | Digital signatures on contracts | Medium |

---

## Part 12: Quick Wins (Start This Week)

These can be done immediately to unblock progress:

1. **Add `tenantId` to all Firestore writes** — even if resolution is mock initially
2. **Fix empty `en.json`** — extract strings from top 10 most-used components
3. **Create `useMoney()` hook** — wraps `Intl.NumberFormat` with tenant currency
4. **Create `<TZDate>` component** — wraps all date displays with tenant timezone
5. **Add `nanoid` for IDs** — replace `Date.now()` anti-pattern everywhere
6. **Add `TENANT_ID` env var** — for dev environment, single-tenant mode
7. **Wire Projects page to Firestore** — replace first mock data page with real data
8. **Add ESLint rule** — `no-hardcoded-strings` to catch bypassed i18n

---

*Document version: 1.0 | Generated for OrgCentral codebase at commit HEAD*
*Repository: github.com/santhoshsvkmm/orgcentral*
