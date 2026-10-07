import React, { useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck, GitBranch, ArrowRight, Play } from 'lucide-react';
import { GovernanceRepository } from '../types';

interface GitCliViewProps {
  repo: GovernanceRepository;
}

export const GitCliView: React.FC<GitCliViewProps> = ({ repo }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (code: string, key: string) => {
    navigator.clipboard.writeText(code);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gitCloneHttps = `git clone https://governance.atlas.internal/${repo.slug}.git
cd ${repo.name}
git checkout ${repo.currentBranch}`;

  const atlasCliCommands = `# 1. Install Atlas Governance CLI
npm install -g @atlas/governance-cli

# 2. Authenticate with enterprise token
atlas auth login --enterprise-domain atlas.internal

# 3. Pull repository schema & policy definitions
atlas repo clone ${repo.slug}

# 4. Run automated pre-commit EU AI Act & NIST compliance test
atlas policy verify --branch ${repo.currentBranch} --strict

# 5. Sign governance manifest with hardware token or GPG
atlas audit sign --model-card ./model-card.yaml --role "Safety Officer"`;

  const githubActionsCi = `name: Atlas AI Governance Conformance Gate

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]

jobs:
  governance-gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Verify Model Card & Risk Tier
        uses: atlas-ai-governance/action-verify@v2
        with:
          repository: '${repo.slug}'
          framework: '${repo.primaryFramework}'
          enforce_stage_gates: true
          fail_on_unmitigated_risk: true`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
      <div>
        <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          Git & Developer CLI Integration
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Seamlessly integrate Atlas AI Governance with local terminal workflows and automated CI/CD deployment pipelines.
        </p>
      </div>

      {/* Box 1: Git Clone */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-lg overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Git Repository Clone
          </span>
          <button
            onClick={() => handleCopy(gitCloneHttps, 'clone')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
          >
            {copiedKey === 'clone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'clone' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto bg-slate-950/40 leading-relaxed">
          {gitCloneHttps}
        </pre>
      </div>

      {/* Box 2: Atlas Governance CLI */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-lg overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            Atlas Governance CLI Pipeline
          </span>
          <button
            onClick={() => handleCopy(atlasCliCommands, 'cli')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
          >
            {copiedKey === 'cli' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'cli' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto bg-slate-950/40 leading-relaxed">
          {atlasCliCommands}
        </pre>
      </div>

      {/* Box 3: CI/CD Pipeline Automation */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-lg overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">
            GitHub Actions / GitLab CI Workflow Integration
          </span>
          <button
            onClick={() => handleCopy(githubActionsCi, 'ci')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200"
          >
            {copiedKey === 'ci' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey === 'ci' ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
        <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto bg-slate-950/40 leading-relaxed">
          {githubActionsCi}
        </pre>
      </div>
    </div>
  );
};
