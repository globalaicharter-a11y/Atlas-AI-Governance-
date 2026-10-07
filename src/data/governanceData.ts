import { GovernanceRepository } from '../types';

export const initialRepositories: GovernanceRepository[] = [
  {
    id: 'repo-atlas-governance',
    name: 'atlas-ai-governance-platform',
    slug: 'org/atlas-ai-governance-platform',
    description: 'Central git-governed repository for enterprise AI model governance, risk taxonomy, and regulatory compliance lifecycle.',
    visibility: 'internal',
    riskTier: 'High-Risk',
    primaryFramework: 'EU AI Act',
    currentBranch: 'main',
    branches: ['main', 'staging-audit', 'dev-safety-eval'],
    isEmpty: true,
    modelType: 'Enterprise AI Governance System',
    ownerTeam: 'AI Safety & Ethics Committee',
    createdAt: 'October 2026',
    files: [],
    commits: [
      {
        hash: 'e89c10f8923a12b4d567890ef123456789abcdef',
        shortHash: 'e89c10f',
        author: 'Atlas Governance Bot',
        email: 'governance@atlas.ai',
        date: 'Just now',
        message: 'Initial empty repository creation for Atlas AI Governance Platform',
        isVerified: true,
        complianceSignoff: 'ISO-42001-Sec-4',
        filesChanged: 1
      }
    ],
    stageGates: [
      {
        id: 'gate-1',
        title: 'Fundamental Rights & Ethics Assessment',
        role: 'Ethics Review Board',
        assignee: 'Dr. Elena Vance (Head of AI Ethics)',
        status: 'pending',
        requirements: [
          'Direct impact assessment on protected demographic classes',
          'Human-in-the-loop escalation criteria defined',
          'Explainability interface conformance verification'
        ]
      },
      {
        id: 'gate-2',
        title: 'Safety Red-Teaming & Adversarial Robustness',
        role: 'Safety Engineering',
        assignee: 'Marcus Chen (Staff AI Security)',
        status: 'pending',
        requirements: [
          'Jailbreak mitigation benchmarks < 0.2% attack success rate',
          'Prompt injection guardrails verified on 10,000 synthetic adversarial probes',
          'Automated toxic content suppression threshold testing'
        ]
      },
      {
        id: 'gate-3',
        title: 'Data Governance & GDPR/EU AI Act Compliance',
        role: 'Data Protection Officer',
        assignee: 'Sarah Al-Mansoor (Global DPO)',
        status: 'pending',
        requirements: [
          'Training dataset copyright and lineage provenance ledger verified',
          'Biometric and PII sanitization pipeline signed off',
          'Right to erasure / unlearning capability attested'
        ]
      },
      {
        id: 'gate-4',
        title: 'Executive Deployment Authority',
        role: 'Chief AI Officer',
        assignee: 'Vikram Malhotra (VP Enterprise AI)',
        status: 'pending',
        requirements: [
          'All preceding risk mitigation stage-gates signed',
          'Production canary monitoring and emergency kill-switch verified',
          'EU AI Act Article 49 Declaration of Conformity issued'
        ]
      }
    ],
    complianceChecks: [
      {
        id: 'chk-1',
        framework: 'EU AI Act',
        article: 'Article 9',
        requirement: 'Risk management system throughout entire lifecycle',
        category: 'Risk Management',
        status: 'in_progress',
        owner: 'Risk Committee'
      },
      {
        id: 'chk-2',
        framework: 'EU AI Act',
        article: 'Article 10',
        requirement: 'Data and data governance criteria for training & validation sets',
        category: 'Data Governance',
        status: 'action_needed',
        owner: 'Data Engineering'
      },
      {
        id: 'chk-3',
        framework: 'EU AI Act',
        article: 'Article 11',
        requirement: 'Comprehensive technical documentation before placing on market',
        category: 'Technical Documentation',
        status: 'in_progress',
        owner: 'Documentation Lead'
      },
      {
        id: 'chk-4',
        framework: 'EU AI Act',
        article: 'Article 14',
        requirement: 'Human oversight design and operational controls',
        category: 'Human Oversight',
        status: 'compliant',
        owner: 'Product Operations'
      },
      {
        id: 'chk-5',
        framework: 'NIST AI RMF 1.0',
        article: 'GOVERN 1.1',
        requirement: 'Legal and regulatory requirements regarding AI are understood',
        category: 'Risk Management',
        status: 'compliant',
        owner: 'Legal Affairs'
      }
    ]
  },
  {
    id: 'repo-clinical-triage',
    name: 'clinical-triage-multimodal-v3',
    slug: 'health-systems/clinical-triage-multimodal-v3',
    description: 'High-risk diagnostic assistive model deployed in emergency triage wards with stringent human oversight verification.',
    visibility: 'auditor-only',
    riskTier: 'High-Risk',
    primaryFramework: 'EU AI Act',
    currentBranch: 'main',
    branches: ['main', 'validation-eu-mdr', 'canary-shadow-audit'],
    isEmpty: false,
    modelType: 'Multimodal Vision-Language (14B)',
    ownerTeam: 'Clinical AI Safety Lab',
    createdAt: 'August 2026',
    files: [
      {
        id: 'file-1',
        name: 'model-card.yaml',
        path: '/model-card.yaml',
        type: 'yaml',
        size: '3.4 KB',
        lastCommitMessage: 'Update demographic fairness parity metrics across age cohorts',
        lastCommitHash: '4a91b2c',
        lastUpdated: '2 hours ago',
        content: `schema_version: "2.1.0"
model_metadata:
  name: "Clinical-Triage-Multimodal-v3"
  identifier: "urn:atlas:model:clin-v3-902"
  release_date: "2026-09-18"
  classification: "EU_AI_ACT_ANNEX_III_HIGH_RISK"
  intended_use:
    primary: "Emergency department patient symptom ranking assistance"
    out_of_scope:
      - "Autonomous prescription or dosage recommendation"
      - "Direct communication with patients without physician review"
    target_users:
      - "Board-certified triage registered nurses"
      - "Attending emergency physicians"

performance_benchmarks:
  auc_roc: 0.941
  sensitivity_high_acuity: 0.982
  false_negative_rate_critical: 0.008
  demographic_parity_ratio: 0.984
  max_drift_tolerance_pct: 3.5

human_oversight:
  intervention_protocol: "MANDATORY_OVERRIDE_ENABLED"
  minimum_clinician_dwell_seconds: 15
  override_telemetry_logged: true
  concurrence_rate: 0.923`
      },
      {
        id: 'file-2',
        name: 'eu-ai-act-conformity.json',
        path: '/eu-ai-act-conformity.json',
        type: 'json',
        size: '5.1 KB',
        lastCommitMessage: 'Add Notified Body assessment certificate reference',
        lastCommitHash: '3f77a89',
        lastUpdated: 'Yesterday',
        content: `{
  "$schema": "https://standards.atlas.ai/schemas/eu-ai-act-v1.json",
  "conformityAssessment": {
    "systemClassification": "HIGH_RISK_ANNEX_III_POINT_5",
    "article9_RiskManagement": {
      "status": "CONFORMANT",
      "residualRiskAcceptance": "SIGNOFF_BY_CHIEF_MEDICAL_OFFICER",
      "continuousMonitoringEnabled": true
    },
    "article10_DataGovernance": {
      "status": "CONFORMANT",
      "biasAuditingFramework": "AIF360_DISPARATE_IMPACT",
      "trainingDataProvenance": "DEIDENTIFIED_CLINICAL_COHORT_2021_2025"
    },
    "article14_HumanOversight": {
      "status": "CONFORMANT",
      "killSwitchMechanism": "CLINICAL_CIRCUIT_BREAKER_HARDWARE_KEY"
    },
    "article15_AccuracyAndRobustness": {
      "status": "CONFORMANT",
      "adversarialRobustnessScore": 0.976
    }
  }
}`
      },
      {
        id: 'file-3',
        name: 'alignment-guardrails.yaml',
        path: '/alignment-guardrails.yaml',
        type: 'yaml',
        size: '2.8 KB',
        lastCommitMessage: 'Enforce clinical uncertainty threshold refusal trigger',
        lastCommitHash: '9d21e05',
        lastUpdated: '3 days ago',
        content: `policy_name: "Clinical-Triage-Safety-Boundary"
version: "3.2.0"
enforcement_mode: "STRICT_INTERCEPT"

guardrail_rules:
  - id: "RULE_MED_UNCERTAINTY"
    description: "Refuse high confidence claim when semantic entropy exceeds 0.28"
    action: "ESCALATE_TO_SENIOR_CLINICIAN"
    fallback_message: "Uncertain clinical indicator. Manual physical examination required."

  - id: "RULE_NO_PHARMA_DOSAGE"
    description: "Block quantitative drug milligram dosing calculation"
    action: "BLOCK_AND_AUDIT"
    penalty_score: 1.0

  - id: "RULE_PROTECTED_ATTRIBUTES"
    description: "Mask racial, gender, and socio-economic markers before diagnostic triage"
    action: "PRE_PROCESSING_SCRUB"`
      },
      {
        id: 'file-4',
        name: 'audit-log-signatures.md',
        path: '/audit-log-signatures.md',
        type: 'markdown',
        size: '1.9 KB',
        lastCommitMessage: 'Record cryptographic verification hashes for Q3 safety audit',
        lastCommitHash: '8b3c411',
        lastUpdated: 'Oct 04, 2026',
        content: `# Cryptographic Governance Ledger
All commits to this model branch require dual-key digital signatures from verified AI Safety Reviewers.

| Signer | Public Key ID | Role | Timestamp (UTC) | Status |
| :--- | :--- | :--- | :--- | :--- |
| Dr. E. Vance | \`0x94F2...8831\` | Ethics Lead | 2026-10-04 14:12 | VERIFIED |
| M. Chen | \`0x12A9...BC44\` | Red Team Lead | 2026-10-04 16:30 | VERIFIED |
| S. Al-Mansoor | \`0x55B1...902E\` | Data Protection Officer | 2026-10-05 09:18 | VERIFIED |`
      }
    ],
    commits: [
      {
        hash: '4a91b2c890123456789abcdef0123456789abcde',
        shortHash: '4a91b2c',
        author: 'Marcus Chen',
        email: 'marcus.chen@safety.atlas.ai',
        date: '2 hours ago',
        message: 'Update demographic fairness parity metrics across age cohorts',
        isVerified: true,
        complianceSignoff: 'EU-AI-Act-Art-10',
        filesChanged: 1
      },
      {
        hash: '3f77a89bcdef0123456789abcdef0123456789ab',
        shortHash: '3f77a89',
        author: 'Sarah Al-Mansoor',
        email: 'sarah.mansoor@legal.atlas.ai',
        date: 'Yesterday',
        message: 'Add Notified Body assessment certificate reference',
        isVerified: true,
        complianceSignoff: 'EU-AI-Act-Art-11',
        filesChanged: 1
      },
      {
        hash: '9d21e05cdef0123456789abcdef0123456789abc',
        shortHash: '9d21e05',
        author: 'Dr. Elena Vance',
        email: 'elena.vance@ethics.atlas.ai',
        date: '3 days ago',
        message: 'Enforce clinical uncertainty threshold refusal trigger',
        isVerified: true,
        complianceSignoff: 'EU-AI-Act-Art-14',
        filesChanged: 2
      }
    ],
    stageGates: [
      {
        id: 'gate-clin-1',
        title: 'Fundamental Rights & Ethics Assessment',
        role: 'Ethics Review Board',
        assignee: 'Dr. Elena Vance (Head of AI Ethics)',
        status: 'approved',
        signedDate: '2026-10-04 14:12 UTC',
        comments: 'Fairness bounds satisfy IEEE 7000 and EU fundamental rights thresholds.',
        requirements: [
          'Direct impact assessment on protected demographic classes',
          'Human-in-the-loop escalation criteria defined',
          'Explainability interface conformance verification'
        ]
      },
      {
        id: 'gate-clin-2',
        title: 'Safety Red-Teaming & Adversarial Robustness',
        role: 'Safety Engineering',
        assignee: 'Marcus Chen (Staff AI Security)',
        status: 'approved',
        signedDate: '2026-10-04 16:30 UTC',
        comments: 'Adversarial perturbation attacks withstood up to SNR 18dB.',
        requirements: [
          'Jailbreak mitigation benchmarks < 0.2% attack success rate',
          'Prompt injection guardrails verified on 10,000 synthetic adversarial probes',
          'Automated toxic content suppression threshold testing'
        ]
      },
      {
        id: 'gate-clin-3',
        title: 'Data Governance & GDPR/EU AI Act Compliance',
        role: 'Data Protection Officer',
        assignee: 'Sarah Al-Mansoor (Global DPO)',
        status: 'approved',
        signedDate: '2026-10-05 09:18 UTC',
        comments: 'Zero raw health identifiers retained in weights; unlearning pipeline validated.',
        requirements: [
          'Training dataset copyright and lineage provenance ledger verified',
          'Biometric and PII sanitization pipeline signed off',
          'Right to erasure / unlearning capability attested'
        ]
      },
      {
        id: 'gate-clin-4',
        title: 'Executive Deployment Authority',
        role: 'Chief Medical & AI Officer',
        assignee: 'Vikram Malhotra (VP Enterprise AI)',
        status: 'review_required',
        comments: 'Pending final board oversight committee sign-off scheduled for tomorrow morning.',
        requirements: [
          'All preceding risk mitigation stage-gates signed',
          'Production canary monitoring and emergency kill-switch verified',
          'EU AI Act Article 49 Declaration of Conformity issued'
        ]
      }
    ],
    complianceChecks: [
      {
        id: 'chk-c1',
        framework: 'EU AI Act',
        article: 'Article 9',
        requirement: 'Continuous Risk Management System for whole lifecycle',
        category: 'Risk Management',
        status: 'compliant',
        evidenceFile: '/eu-ai-act-conformity.json',
        owner: 'Risk Committee'
      },
      {
        id: 'chk-c2',
        framework: 'EU AI Act',
        article: 'Article 10',
        requirement: 'Data quality, statistical representation, and bias audits',
        category: 'Data Governance',
        status: 'compliant',
        evidenceFile: '/model-card.yaml',
        owner: 'Data Engineering'
      },
      {
        id: 'chk-c3',
        framework: 'EU AI Act',
        article: 'Article 14',
        requirement: 'Oversight tooling allowing humans to override decisions',
        category: 'Human Oversight',
        status: 'compliant',
        evidenceFile: '/alignment-guardrails.yaml',
        owner: 'Clinical Operations'
      },
      {
        id: 'chk-c4',
        framework: 'EU AI Act',
        article: 'Article 15',
        requirement: 'Cybersecurity robustness and resistance to feedback loops',
        category: 'Cybersecurity',
        status: 'compliant',
        evidenceFile: '/audit-log-signatures.md',
        owner: 'SecOps'
      }
    ]
  },
  {
    id: 'repo-rag-support',
    name: 'enterprise-rag-support-agent',
    slug: 'customer-ops/enterprise-rag-support-agent',
    description: 'Generative conversational AI agent interacting with external customers under EU AI Act Article 50 transparency requirements.',
    visibility: 'internal',
    riskTier: 'Specific Transparency',
    primaryFramework: 'EU AI Act',
    currentBranch: 'main',
    branches: ['main', 'guardrails-v2'],
    isEmpty: false,
    modelType: 'Fine-tuned LLM + Hybrid Vector Search',
    ownerTeam: 'Customer Intelligence Platform',
    createdAt: 'September 2026',
    files: [
      {
        id: 'file-rag-1',
        name: 'model-card.yaml',
        path: '/model-card.yaml',
        type: 'yaml',
        size: '2.1 KB',
        lastCommitMessage: 'Enforce AI watermark and disclosure banner for end users',
        lastCommitHash: '1a73e99',
        lastUpdated: '1 day ago',
        content: `system_name: "Customer-Support-RAG-v2"
risk_classification: "SPECIFIC_TRANSPARENCY_ARTICLE_50"
transparency_obligations:
  ai_disclosure_banner_required: true
  watermarking_enabled: true
  opt_out_to_human_agent_enabled: true
  hallucination_refusal_rate: 0.96`
      }
    ],
    commits: [
      {
        hash: '1a73e990b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6',
        shortHash: '1a73e99',
        author: 'Leila Kassam',
        email: 'leila@atlas.ai',
        date: '1 day ago',
        message: 'Enforce AI watermark and disclosure banner for end users',
        isVerified: true,
        complianceSignoff: 'EU-AI-Act-Art-50',
        filesChanged: 1
      }
    ],
    stageGates: [
      {
        id: 'gate-rag-1',
        title: 'Transparency & User Disclosure Audit',
        role: 'Compliance Lead',
        assignee: 'Leila Kassam',
        status: 'approved',
        signedDate: '2026-10-06 11:20 UTC',
        requirements: [
          'Visible declaration notifying user they are interacting with an AI system',
          'Seamless fallback route to human agent on user request'
        ]
      }
    ],
    complianceChecks: [
      {
        id: 'chk-rag-1',
        framework: 'EU AI Act',
        article: 'Article 50',
        requirement: 'Transparency obligations for systems interacting with natural persons',
        category: 'Human Oversight',
        status: 'compliant',
        owner: 'Product Operations'
      }
    ]
  }
];

export const standardStarterTemplates = [
  {
    id: 'tpl-eu-high-risk',
    title: 'EU AI Act High-Risk Model Card & Governance Bundle',
    description: 'Includes model-card.yaml, eu-ai-act-conformity.json, and alignment-guardrails.yaml pre-configured.',
    files: [
      {
        name: 'model-card.yaml',
        type: 'yaml',
        content: `schema_version: "2.1.0"
model_metadata:
  name: "New-Enterprise-Model"
  classification: "EU_AI_ACT_HIGH_RISK"
  intended_use: "Enterprise automated reasoning"
performance_benchmarks:
  target_accuracy: 0.95
  max_drift_pct: 3.0`
      },
      {
        name: 'eu-ai-act-conformity.json',
        type: 'json',
        content: `{
  "systemClassification": "HIGH_RISK_ANNEX_III",
  "article9_RiskManagement": "IN_PROGRESS",
  "article10_DataGovernance": "PENDING_AUDIT",
  "article14_HumanOversight": "REQUIRED"
}`
      },
      {
        name: 'governance-policy.yaml',
        type: 'yaml',
        content: `policy_version: "1.0.0"
enforcement: "BLOCK_ON_NON_COMPLIANT_COMMIT"
signoff_quorum: 3`
      }
    ]
  },
  {
    id: 'tpl-nist-rmf',
    title: 'NIST AI RMF 1.0 Trustworthy System Profile',
    description: 'Maps governance lifecycle to GOVERN, MAP, MEASURE, and MANAGE functions with compliance checklists.',
    files: [
      {
        name: 'nist-ai-rmf-profile.yaml',
        type: 'yaml',
        content: `framework: "NIST_AI_RMF_1.0"
functions:
  govern:
    status: "ESTABLISHED"
    policies_documented: true
  map:
    context_categorized: true
    stakeholders_consulted: true
  measure:
    metrics_benchmarked: false
  manage:
    incident_response_plan_ready: true`
      }
    ]
  }
];
