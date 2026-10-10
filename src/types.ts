export type RiskTier = 'Unacceptable' | 'High-Risk' | 'Specific Transparency' | 'Minimal Risk';

export type ComplianceFramework = 'EU AI Act' | 'NIST AI RMF 1.0' | 'ISO/IEC 42001' | 'OWASP Top 10 for LLM';

export type PlatformTab = 'files' | 'commits' | 'gates' | 'compliance' | 'cli' | 'certificate';

export interface GovernanceFile {
  id: string;
  name: string;
  path: string;
  type: 'yaml' | 'json' | 'markdown' | 'python' | 'text';
  size: string;
  lastCommitMessage: string;
  lastCommitHash: string;
  lastUpdated: string;
  content: string;
}

export interface GitCommit {
  hash: string;
  shortHash: string;
  author: string;
  email: string;
  date: string;
  message: string;
  isVerified: boolean;
  complianceSignoff?: string;
  filesChanged: number;
}

export interface StageGate {
  id: string;
  title: string;
  role: string;
  assignee: string;
  status: 'approved' | 'pending' | 'review_required' | 'rejected';
  signedDate?: string;
  comments?: string;
  requirements: string[];
}

export interface ComplianceCheck {
  id: string;
  framework: ComplianceFramework;
  article: string;
  requirement: string;
  category: 'Risk Management' | 'Data Governance' | 'Technical Documentation' | 'Human Oversight' | 'Cybersecurity';
  status: 'compliant' | 'in_progress' | 'action_needed';
  evidenceFile?: string;
  owner: string;
}

export interface GovernanceRepository {
  id: string;
  name: string;
  slug: string;
  description: string;
  visibility: 'internal' | 'private' | 'auditor-only';
  riskTier: RiskTier;
  primaryFramework: ComplianceFramework;
  currentBranch: string;
  branches: string[];
  isEmpty: boolean;
  modelType: string;
  ownerTeam: string;
  createdAt: string;
  files: GovernanceFile[];
  commits: GitCommit[];
  stageGates: StageGate[];
  complianceChecks: ComplianceCheck[];
}
