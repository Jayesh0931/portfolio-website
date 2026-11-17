// NEXUS — Enterprise Knowledge & Procurement Operations Sample Data
// Independent UX Concept · Fictional Enterprise Knowledge Environment

export interface KnowledgeSource {
  id: string;
  citationId: number;
  code: string;
  title: string;
  type: "Policy" | "SOP" | "Checklist" | "Guideline" | "Handbook" | "Case Study" | "Framework";
  section: string;
  page: number;
  lastUpdated: string;
  department: string;
  relevanceScore: number;
  trustState: "verified" | "multi-source" | "conflict" | "requires-human";
  trustLabel: string;
  excerpt: string;
  fullSnippet: string;
  jurisdiction: string;
}

export const KNOWLEDGE_SOURCES: Record<string, KnowledgeSource> = {
  "1": {
    id: "source-1",
    citationId: 1,
    code: "POL-IV-2026",
    title: "International Vendor Onboarding Policy — 2026",
    type: "Policy",
    section: "Section 4.2: Mandatory Pre-Engagement Protocols",
    page: 14,
    lastUpdated: "October 12, 2026",
    department: "Global Procurement Operations",
    relevanceScore: 98,
    trustState: "verified",
    trustLabel: "Verified from primary policy",
    excerpt: "All international suppliers engaging with entity entities outside their tax domicile must undergo unified tier-1 screening, dual-officer sanction verification, and execute our Standard Terms of Procurement prior to issuing purchase orders.",
    fullSnippet: "Section 4.2 (Mandatory Pre-Engagement Protocols): International entities are categorized into Tier-1 (Standard), Tier-2 (Elevated Compliance), and Tier-3 (High-Risk Jurisdiction). Formal onboarding cannot commence until the business sponsor submits an Approved Purchase Intent and the supplier completes verified digital identity attestation. Vendor Master records remain locked in read-only status until both Procurement Operations and Finance Treasury grant clearance.",
    jurisdiction: "Global (All Non-Domestic Entities)",
  },
  "2": {
    id: "source-2",
    citationId: 2,
    code: "SOP-PR-04",
    title: "Procurement Standard Operating Procedure",
    type: "SOP",
    section: "Section 2.1: Workflow Lifecycle & SLA Deadlines",
    page: 6,
    lastUpdated: "September 28, 2026",
    department: "Enterprise Procurement Services",
    relevanceScore: 95,
    trustState: "conflict",
    trustLabel: "Conflict with Finance SLA",
    excerpt: "Standard international supplier onboarding SLA is established at 10 business days from complete submission of documentation. Review passes sequentially from Intake → Sanctions → Security → Tax Review.",
    fullSnippet: "Section 2.1: Lifecycle workflow follows a strict 4-stage gate: (1) Vendor portal profile creation (vendor, 48h SLA); (2) Compliance, AML and sanctions clearance (Compliance Lead, 3-day SLA); (3) Bank credential verification and international wire testing (Finance, 3-day SLA); (4) ERP Master Record activation (Operations, 2-day SLA). Total cumulative SLA is 10 business days for complete submissions.",
    jurisdiction: "Global Enterprise",
  },
  "3": {
    id: "source-3",
    citationId: 3,
    code: "VCC-2026-v2",
    title: "Vendor Compliance Checklist",
    type: "Checklist",
    section: "Section B: Cross-Border Verification Artifacts",
    page: 3,
    lastUpdated: "August 15, 2026",
    department: "Risk & Regulatory Affairs",
    relevanceScore: 94,
    trustState: "multi-source",
    trustLabel: "Multi-source verified (Aligned with SOP-PR-04)",
    excerpt: "Mandatory documentation: W-8BEN-E or Certificate of Tax Residence, Certificate of Incorporation, Bank Ownership Verification Letter (dated ≤ 90 days), and Certificate of Insurance ($2M minimum).",
    fullSnippet: "Section B (Documentation Gate): Mandatory artifacts include: (1) Form W-8BEN-E or local equivalent Certificate of Tax Residency authenticated by local tax authority; (2) Certificate of Incorporation or commercial business registry extract; (3) Official Bank Verification Letter on bank letterhead confirming account holder name, IBAN/SWIFT, and currency, issued within 90 days; (4) Certificate of Insurance (COI) naming enterprise as additional insured ($2M general aggregate). Non-English documents require certified translations.",
    jurisdiction: "International Cross-Border",
  },
  "4": {
    id: "source-4",
    citationId: 4,
    code: "FIN-POL-108",
    title: "Finance Approval Guidelines",
    type: "Guideline",
    section: "Section 7.3: Authority Matrix & Wire Sanctions Screening",
    page: 22,
    lastUpdated: "November 02, 2026",
    department: "Treasury & Financial Controllership",
    relevanceScore: 91,
    trustState: "conflict",
    trustLabel: "Conflict with SOP SLA (Mandates 14 Days)",
    excerpt: "Cross-border suppliers with projected annual spend > $100,000 USD require Finance Director sign-off. Cross-border banking validations require 14 business days due to dual-clearing and OFAC screening.",
    fullSnippet: "Section 7.3 (Financial Authority Limits): Level 1 ($0 - $50k): Sourcing Manager sign-off. Level 2 ($50k - $100k): Category Lead approval. Level 3 ($100k - $500k): Finance Director and Corporate Controller sign-off. Level 4 (>$500k): CFO signature. Note on Turnaround Time: While Procurement targets 10 days, international wire escrow testing, intermediary correspondent routing verification, and cross-border currency clearance routinely take up to 14 business days.",
    jurisdiction: "Global Treasury",
  },
  "5": {
    id: "source-5",
    citationId: 5,
    code: "RPH-APAC-09",
    title: "Regional Procurement Handbook (APAC & EMEA Addenda)",
    type: "Handbook",
    section: "Section 3.4: Singapore & Southeast Asia Addendum",
    page: 18,
    lastUpdated: "October 05, 2026",
    department: "APAC Regional Headquarters (Singapore)",
    relevanceScore: 89,
    trustState: "requires-human",
    trustLabel: "Requires tax residency confirmation",
    excerpt: "Vendors incorporated in Singapore require IRAS Certificate of Residence for Double Taxation Agreement (DTA) withholding relief. Standard 15% withholding tax applies if unverified.",
    fullSnippet: "Section 3.4 (Singapore Local Addendum): For entities invoicing from Singapore: (1) Goods and Services Tax (GST) registration number must be validated against the ACRA registry; (2) In accordance with IRAS guidelines, if the Singapore entity seeks relief under the Double Taxation Agreement, a valid Certificate of Residence (COR) issued by IRAS must be uploaded before invoice processing; (3) Payments will default to FAST/GIRO in SGD unless contract explicitly stipulates USD telegraphic transfer.",
    jurisdiction: "APAC / Singapore / ASEAN",
  },
  "6": {
    id: "source-6",
    citationId: 6,
    code: "CASE-HIST-884",
    title: "Historical Vendor Support Cases & SLAs",
    type: "Case Study",
    section: "Section Metrics: FY2026 International Onboarding Benchmarks",
    page: 8,
    lastUpdated: "October 30, 2026",
    department: "Procurement Analytics",
    relevanceScore: 84,
    trustState: "verified",
    trustLabel: "Empirical historical benchmark",
    excerpt: "Analysis of 342 international onboardings in 2026 reveals a median completion time of 12.4 business days. Bank verification delays accounted for 68% of turnaround extensions.",
    fullSnippet: "Section Metrics (FY2026 Cohort): Out of 342 international vendors onboarded across Q1-Q3 2026: 22% completed within the 10-day target; 64% completed between 11 and 14 days; 14% exceeded 15 days due to missing certified tax translations or incorrect bank intermediary SWIFT routing codes. Median total turnaround across all jurisdictions was 12.4 business days.",
    jurisdiction: "Historical Enterprise Operations",
  },
  "7": {
    id: "source-7",
    citationId: 7,
    code: "VRAF-Q3",
    title: "Vendor Risk Assessment Framework",
    type: "Framework",
    section: "Section 5.1: Third-Party Cybersecurity & ESG Due Diligence",
    page: 11,
    lastUpdated: "July 20, 2026",
    department: "Chief Information Security Office (CISO)",
    relevanceScore: 87,
    trustState: "multi-source",
    trustLabel: "Verified across CISO & Legal",
    excerpt: "Any international software or managed services vendor accessing enterprise data must submit a verified SOC 2 Type II or ISO 27001 certificate and execute our Data Processing Addendum (DPA).",
    fullSnippet: "Section 5.1 (Cyber & Data Protection Tiering): If vendor hosts, processes, or transmits confidential or PII data, vendor must provide: (1) SOC 2 Type II report with unqualified opinion within past 12 months, OR ISO/IEC 27001:2022 certified scope; (2) Standard Contractual Clauses (SCCs) for cross-border data transfer; (3) Business Continuity & Disaster Recovery summary tested within 18 months.",
    jurisdiction: "Global Security & Compliance",
  },
};

// Sub-intent decomposition for the primary procurement query
export interface SubIntent {
  id: string;
  title: string;
  description: string;
  agentRole: "Policy Researcher" | "Compliance Researcher" | "Process Analyst";
  targetSources: string[];
  isActive: boolean;
}

export const INITIAL_SUB_INTENTS: SubIntent[] = [
  {
    id: "intent-1",
    title: "Approved Onboarding Procedure",
    description: "Map official 4-stage procurement workflow from intake to ERP activation",
    agentRole: "Policy Researcher",
    targetSources: ["POL-IV-2026", "SOP-PR-04"],
    isActive: true,
  },
  {
    id: "intent-2",
    title: "Mandatory Documentation",
    description: "Identify mandatory tax, corporate registry, banking, and insurance artifacts",
    agentRole: "Compliance Researcher",
    targetSources: ["VCC-2026-v2", "POL-IV-2026"],
    isActive: true,
  },
  {
    id: "intent-3",
    title: "Compliance & Sanctions Checks",
    description: "Cross-check AML, OFAC sanctions, and CISO cybersecurity validation rules",
    agentRole: "Compliance Researcher",
    targetSources: ["VRAF-Q3", "VCC-2026-v2"],
    isActive: true,
  },
  {
    id: "intent-4",
    title: "Approval Ownership & Authority Matrix",
    description: "Determine sign-off thresholds by contract spend and risk classification",
    agentRole: "Process Analyst",
    targetSources: ["FIN-POL-108"],
    isActive: true,
  },
  {
    id: "intent-5",
    title: "Approval Timeline & SLA Analysis",
    description: "Reconcile official target SLA with treasury wire delays and empirical historical benchmarks",
    agentRole: "Process Analyst",
    targetSources: ["SOP-PR-04", "FIN-POL-108", "CASE-HIST-884"],
    isActive: true,
  },
  {
    id: "intent-6",
    title: "Regional Exceptions (APAC & EMEA)",
    description: "Surface withholding tax agreements, local ACRA validations, and DTA exemptions",
    agentRole: "Policy Researcher",
    targetSources: ["RPH-APAC-09"],
    isActive: true,
  },
];

// Agentic Research Steps
export interface ResearchStep {
  id: number;
  label: string;
  detail: string;
  agentRole: "Policy Researcher" | "Compliance Researcher" | "Process Analyst";
  sourceId: string;
  sourceCode: string;
  status: "pending" | "running" | "completed";
}

export const RESEARCH_STEPS: ResearchStep[] = [
  {
    id: 1,
    label: "Searching procurement policy repository",
    detail: "Querying POL-IV-2026 Section 4.2 for pre-engagement mandates",
    agentRole: "Policy Researcher",
    sourceId: "1",
    sourceCode: "POL-IV-2026",
    status: "pending",
  },
  {
    id: 2,
    label: "Retrieving vendor onboarding SOP",
    detail: "Extracting 4-stage lifecycle milestones & 10-day SLA from SOP-PR-04",
    agentRole: "Policy Researcher",
    sourceId: "2",
    sourceCode: "SOP-PR-04",
    status: "pending",
  },
  {
    id: 3,
    label: "Checking compliance & documentation gate",
    detail: "Verifying W-8BEN-E, COI $2M requirement & Bank Letter specs in VCC-2026-v2",
    agentRole: "Compliance Researcher",
    sourceId: "3",
    sourceCode: "VCC-2026-v2",
    status: "pending",
  },
  {
    id: 4,
    label: "Reviewing finance approval rules",
    detail: "Checking threshold limits >$100k & 14-day wire test clause in FIN-POL-108",
    agentRole: "Process Analyst",
    sourceId: "4",
    sourceCode: "FIN-POL-108",
    status: "pending",
  },
  {
    id: 5,
    label: "Comparing regional requirements",
    detail: "Examining IRAS Certificate of Residence & withholding tax rules in RPH-APAC-09",
    agentRole: "Policy Researcher",
    sourceId: "5",
    sourceCode: "RPH-APAC-09",
    status: "pending",
  },
  {
    id: 6,
    label: "Synthesising evidence & benchmark turnaround",
    detail: "Reconciling policy SLA with 12.4-day historical completion data from CASE-HIST-884",
    agentRole: "Process Analyst",
    sourceId: "6",
    sourceCode: "CASE-HIST-884",
    status: "pending",
  },
];

// Interactive Engagement Quiz Module
export interface KnowledgeQuiz {
  question: string;
  scenario: string;
  options: { id: string; label: string; isCorrect: boolean }[];
  explanation: string;
}

export const KNOWLEDGE_QUIZ: KnowledgeQuiz = {
  question: "What does international vendor due diligence usually verify?",
  scenario: "While NEXUS synthesises policies across 7 enterprise sources, test your procurement knowledge:",
  options: [
    { id: "opt-1", label: "Financial viability, sanctions (OFAC/AML), and tax residency", isCorrect: true },
    { id: "opt-2", label: "Vendor employee daily attendance logs and marketing spend", isCorrect: false },
    { id: "opt-3", label: "Executive personal social media activity and travel records", isCorrect: false },
  ],
  explanation: "Correct! Due diligence prioritises financial solvency, global sanctions list checks (OFAC/EU/UN), tax treaty qualification (e.g. W-8BEN-E), and cyber risk. Operational vendor management takes over only post-onboarding.",
};

// Traditional Search Mock Documents
export interface TraditionalDoc {
  id: string;
  title: string;
  code: string;
  type: string;
  matchScore: number;
  highlightSnippet: string;
  date: string;
  size: string;
  department: string;
}

export const TRADITIONAL_DOCS: TraditionalDoc[] = [
  {
    id: "trad-1",
    title: "International Vendor Onboarding Policy — 2026",
    code: "POL-IV-2026",
    type: "PDF Policy",
    matchScore: 98,
    highlightSnippet: "...All <strong>international suppliers</strong> engaging with corporate entities must undergo unified <strong>onboarding</strong>, dual-officer sanction verification, and execute our Standard Terms...",
    date: "Oct 12, 2026",
    size: "1.4 MB",
    department: "Global Procurement",
  },
  {
    id: "trad-2",
    title: "Procurement Standard Operating Procedure: Cross-Border",
    code: "SOP-PR-04",
    type: "DOCX SOP",
    matchScore: 95,
    highlightSnippet: "...Standard <strong>international vendor onboarding SLA</strong> is established at <strong>10 business days</strong> from complete submission of documentation. Review passes through 4 sequential stages...",
    date: "Sep 28, 2026",
    size: "820 KB",
    department: "Procurement Ops",
  },
  {
    id: "trad-3",
    title: "Vendor Compliance Checklist & Requirements Guide",
    code: "VCC-2026-v2",
    type: "PDF Checklist",
    matchScore: 94,
    highlightSnippet: "...Mandatory <strong>onboarding documents</strong>: Form <strong>W-8BEN-E</strong>, Certificate of Incorporation, <strong>Bank Account Ownership Letter</strong> (≤ 90 days), and COI ($2M minimum)...",
    date: "Aug 15, 2026",
    size: "460 KB",
    department: "Risk & Compliance",
  },
  {
    id: "trad-4",
    title: "Finance Approval Guidelines & Delegation of Authority",
    code: "FIN-POL-108",
    type: "PDF Policy",
    matchScore: 91,
    highlightSnippet: "...Cross-border payments require Finance Director sign-off. Cross-border banking validations require <strong>14 business days</strong> due to wire escrow and sanctions screening...",
    date: "Nov 02, 2026",
    size: "2.1 MB",
    department: "Treasury",
  },
  {
    id: "trad-5",
    title: "Regional Procurement Handbook — APAC & EMEA Addenda",
    code: "RPH-APAC-09",
    type: "PDF Handbook",
    matchScore: 89,
    highlightSnippet: "...Vendors incorporated in <strong>Singapore</strong> require <strong>IRAS Certificate of Residence</strong> for Double Taxation Agreement withholding relief; otherwise standard 15% rate applies...",
    date: "Oct 05, 2026",
    size: "1.8 MB",
    department: "APAC Procurement",
  },
  {
    id: "trad-6",
    title: "Historical Vendor Case Turnaround Analytics FY2026",
    code: "CASE-HIST-884",
    type: "XLSX Report",
    matchScore: 84,
    highlightSnippet: "...Median <strong>onboarding turnaround</strong> across 342 international cases was <strong>12.4 business days</strong>. Bank letter re-submissions caused 68% of turnaround extensions...",
    date: "Oct 30, 2026",
    size: "3.2 MB",
    department: "Analytics",
  },
];

// Deliverable Checklist Initial Rows
export interface DeliverableItem {
  id: string;
  step: number;
  stage: string;
  requirement: string;
  owner: string;
  sourceCode: string;
  sourceCitationId: number;
  status: "Mandatory" | "Conditional" | "Recommended";
  isDone: boolean;
}

export const INITIAL_DELIVERABLE_ITEMS: DeliverableItem[] = [
  {
    id: "item-1",
    step: 1,
    stage: "Intake",
    requirement: "Submit Business Sponsor Purchase Intent & Vendor Profile Registration",
    owner: "Sponsoring Business Unit",
    sourceCode: "POL-IV-2026",
    sourceCitationId: 1,
    status: "Mandatory",
    isDone: true,
  },
  {
    id: "item-2",
    step: 2,
    stage: "Tax & Legal",
    requirement: "Upload Form W-8BEN-E or Local Tax Residency Certificate",
    owner: "International Vendor",
    sourceCode: "VCC-2026-v2",
    sourceCitationId: 3,
    status: "Mandatory",
    isDone: true,
  },
  {
    id: "item-3",
    step: 3,
    stage: "Banking",
    requirement: "Official Bank Verification Letter on bank letterhead (dated ≤ 90 days)",
    owner: "Vendor Treasury / Bank",
    sourceCode: "VCC-2026-v2",
    sourceCitationId: 3,
    status: "Mandatory",
    isDone: false,
  },
  {
    id: "item-4",
    step: 4,
    stage: "Compliance",
    requirement: "Global OFAC/AML Sanctions Screening & Anti-Bribery Attestation",
    owner: "Compliance Lead",
    sourceCode: "POL-IV-2026",
    sourceCitationId: 1,
    status: "Mandatory",
    isDone: false,
  },
  {
    id: "item-5",
    step: 5,
    stage: "InfoSec",
    requirement: "SOC 2 Type II or ISO 27001 Review (Required if handling corporate data)",
    owner: "CISO Risk Team",
    sourceCode: "VRAF-Q3",
    sourceCitationId: 7,
    status: "Conditional",
    isDone: false,
  },
  {
    id: "item-6",
    step: 6,
    stage: "Finance",
    requirement: "Finance Director Sign-Off (Contracts > $100k) & Intermediary Wire Test",
    owner: "Finance Director",
    sourceCode: "FIN-POL-108",
    sourceCitationId: 4,
    status: "Mandatory",
    isDone: false,
  },
  {
    id: "item-7",
    step: 7,
    stage: "Regional",
    requirement: "Singapore Vendors: IRAS Certificate of Residence for Withholding Exemption",
    owner: "APAC Tax Specialist",
    sourceCode: "RPH-APAC-09",
    sourceCitationId: 5,
    status: "Conditional",
    isDone: false,
  },
  {
    id: "item-8",
    step: 8,
    stage: "Activation",
    requirement: "ERP Vendor Master Record Unlocked and Purchase Order Released",
    owner: "Procurement Operations",
    sourceCode: "SOP-PR-04",
    sourceCitationId: 2,
    status: "Mandatory",
    isDone: false,
  },
];
