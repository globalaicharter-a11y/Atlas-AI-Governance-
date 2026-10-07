import React, { useState } from 'react';
import { X, FolderPlus, Shield, Info } from 'lucide-react';
import { GovernanceRepository, RiskTier, ComplianceFramework } from '../types';

interface NewRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRepo: (repo: Partial<GovernanceRepository>) => void;
}

export const NewRepoModal: React.FC<NewRepoModalProps> = ({
  isOpen,
  onClose,
  onCreateRepo
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [riskTier, setRiskTier] = useState<RiskTier>('High-Risk');
  const [framework, setFramework] = useState<ComplianceFramework>('EU AI Act');
  const [isEmpty, setIsEmpty] = useState(true);
  const [visibility, setVisibility] = useState<'internal' | 'private' | 'auditor-only'>('internal');
  const [ownerTeam, setOwnerTeam] = useState('AI Safety & Governance Team');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateRepo({
      name: name.trim().toLowerCase().replace(/\s+/g, '-'),
      description: description.trim() || 'Git-governed enterprise AI model and policy repository.',
      riskTier,
      primaryFramework: framework,
      isEmpty,
      visibility,
      ownerTeam
    });

    onClose();
    setName('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderPlus className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-slate-100">
              Create New AI Governance Repository
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Repository Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. atlas-ai-governance-platform"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs font-mono text-slate-100 focus:outline-none focus:border-emerald-500"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Slug will be normalized into lowercase alphanumeric characters and hyphens.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              placeholder="Primary use case, scope, and governance lifecycle intent..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-2.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Risk Classification Tier
              </label>
              <select
                value={riskTier}
                onChange={(e) => setRiskTier(e.target.value as RiskTier)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
              >
                <option value="High-Risk">High-Risk (Annex III)</option>
                <option value="Specific Transparency">Specific Transparency (Art. 50)</option>
                <option value="Minimal Risk">Minimal Risk</option>
                <option value="Unacceptable">Unacceptable (Prohibited)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Primary Regulatory Framework
              </label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value as ComplianceFramework)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
              >
                <option value="EU AI Act">EU AI Act</option>
                <option value="NIST AI RMF 1.0">NIST AI RMF 1.0</option>
                <option value="ISO/IEC 42001">ISO/IEC 42001</option>
                <option value="OWASP Top 10 for LLM">OWASP Top 10 for LLM</option>
              </select>
            </div>
          </div>

          {/* Empty / Clean repository checkbox */}
          <div className="border border-slate-800 bg-slate-950/60 p-3 rounded-lg flex items-start gap-3">
            <input
              type="checkbox"
              id="empty-repo"
              checked={isEmpty}
              onChange={(e) => setIsEmpty(e.target.checked)}
              className="mt-1 h-3.5 w-3.5 rounded border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
            <label htmlFor="empty-repo" className="text-xs text-slate-300 cursor-pointer select-none">
              <span className="font-semibold block text-slate-200">
                Initialize with no content (Empty Git Repository)
              </span>
              <span className="text-[11px] text-slate-500 block">
                Creates a clean initialized repo ready for terminal push or custom manifest definition.
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-md transition-colors shadow-xs"
            >
              Create Repository
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
