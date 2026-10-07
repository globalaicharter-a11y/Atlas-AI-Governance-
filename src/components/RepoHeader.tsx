import React from 'react';
import { GovernanceRepository } from '../types';
import { Shield, GitCommit, GitBranch, Lock, Calendar, Layers, Sparkles } from 'lucide-react';

interface RepoHeaderProps {
  repo: GovernanceRepository;
  onPopulateTemplate?: () => void;
  onClearToEmpty?: () => void;
}

export const RepoHeader: React.FC<RepoHeaderProps> = ({
  repo,
  onPopulateTemplate,
  onClearToEmpty
}) => {
  return (
    <div className="border-b border-slate-800 bg-slate-900/40 px-6 py-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <h1 className="text-xl font-bold text-slate-100 font-mono tracking-tight">
              {repo.name}
            </h1>
            <span className="text-xs text-slate-400 font-normal">
              ({repo.visibility})
            </span>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed mb-3">
            {repo.description}
          </p>

          {/* Zero-Pill Metadata Line with typographic separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="text-emerald-400 font-medium">{repo.riskTier}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Framework: {repo.primaryFramework}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Owner: {repo.ownerTeam}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono tabular-nums">{repo.commits.length} commits</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono tabular-nums">{repo.branches.length} branches</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Created {repo.createdAt}</span>
          </div>
        </div>

        {/* Quick actions for state switching */}
        <div className="flex items-center gap-2 self-start md:self-center shrink-0">
          {repo.isEmpty ? (
            <button
              onClick={onPopulateTemplate}
              className="px-3 py-1.5 text-xs font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 rounded-md transition-colors whitespace-nowrap"
            >
              Populate Governance Template
            </button>
          ) : (
            <button
              onClick={onClearToEmpty}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-md transition-colors whitespace-nowrap"
            >
              Switch to Empty Repo View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
