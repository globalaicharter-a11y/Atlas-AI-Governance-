import React, { useState } from 'react';
import { Terminal, Copy, Check, Plus, FileCode, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { GovernanceRepository } from '../types';

interface EmptyRepoViewProps {
  repo: GovernanceRepository;
  onPopulateTemplate: () => void;
  onCreateFile: (fileName: string, fileContent: string) => void;
}

export const EmptyRepoView: React.FC<EmptyRepoViewProps> = ({
  repo,
  onPopulateTemplate,
  onCreateFile
}) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);
  const [customName, setCustomName] = useState('model-card.yaml');
  const [customContent, setCustomContent] = useState(`schema_version: "2.1.0"
model_metadata:
  name: "${repo.name}"
  risk_classification: "EU_AI_ACT_HIGH_RISK"
  system_description: "Enterprise governance policy for automated decision system"
  intended_purpose: "Automated business logic and risk screening"

human_oversight:
  intervention_required: true
  circuit_breaker_enabled: true
`);

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleSaveFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    onCreateFile(customName, customContent);
    setIsCreatingCustom(false);
  };

  const commandSetupNew = `# Step 1: Initialize local directory and link to Atlas AI Governance Platform
git init
git remote add origin https://governance.atlas.internal/${repo.slug}.git
git branch -M ${repo.currentBranch}

# Step 2: Create initial governance manifest
cat << 'EOF' > model-card.yaml
schema_version: "2.1.0"
model_name: "${repo.name}"
risk_tier: "${repo.riskTier}"
regulatory_framework: "${repo.primaryFramework}"
EOF

# Step 3: Stage, commit with GPG verification, and push
git add model-card.yaml
git commit -S -m "Initial model governance manifest"
git push -u origin ${repo.currentBranch}`;

  const commandPushExisting = `# Push an existing local model or policy repository:
git remote add origin https://governance.atlas.internal/${repo.slug}.git
git branch -M ${repo.currentBranch}
git push -u origin ${repo.currentBranch}`;

  const commandAtlasCli = `# Or use the Atlas AI Governance CLI:
atlas repo link ${repo.slug}
atlas policy init --framework "${repo.primaryFramework}" --tier "${repo.riskTier}"
atlas audit verify --branch ${repo.currentBranch}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
      {/* Top Banner Notice */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Empty Governance Repository Initialized
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              This repository (<span className="font-mono text-slate-300">{repo.name}</span>) is ready with clean configuration. 
              You can push code from your terminal, initialize with standard templates, or create your first file directly below.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsCreatingCustom(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First File</span>
            </button>
            <button
              onClick={onPopulateTemplate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Populate Standard Template</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive In-Browser File Creator (if active) */}
      {isCreatingCustom && (
        <form onSubmit={handleSaveFile} className="border border-emerald-500/30 bg-slate-900 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-slate-200">New Governance File</span>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingCustom(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              File Name (e.g., model-card.yaml, eu-ai-act.json, alignment-rules.yaml)
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Initial Content
            </label>
            <textarea
              rows={8}
              value={customContent}
              onChange={(e) => setCustomContent(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500 resize-y"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-md transition-colors"
            >
              Commit File to {repo.currentBranch}
            </button>
          </div>
        </form>
      )}

      {/* Terminal Quickstart Section */}
      <div className="space-y-4">
        {/* Box 1: Create a new repository on the command line */}
        <div className="border border-slate-800 bg-slate-900/90 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              …or create a new repository on the command line
            </span>
            <button
              onClick={() => handleCopy(commandSetupNew, 'setup-new')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copiedSection === 'setup-new' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-slate-950/40">
            {commandSetupNew}
          </pre>
        </div>

        {/* Box 2: Push an existing repository */}
        <div className="border border-slate-800 bg-slate-900/90 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              …or push an existing repository from the command line
            </span>
            <button
              onClick={() => handleCopy(commandPushExisting, 'push-existing')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copiedSection === 'push-existing' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-slate-950/40">
            {commandPushExisting}
          </pre>
        </div>

        {/* Box 3: Atlas AI Governance CLI */}
        <div className="border border-slate-800 bg-slate-900/90 rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">
              …or manage via Atlas Governance CLI
            </span>
            <button
              onClick={() => handleCopy(commandAtlasCli, 'atlas-cli')}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              {copiedSection === 'atlas-cli' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed bg-slate-950/40">
            {commandAtlasCli}
          </pre>
        </div>
      </div>
    </div>
  );
};
