import React from 'react';
import { GitBranch, GitFork, Download, Plus, Terminal } from 'lucide-react';
import { GovernanceRepository } from '../types';

interface TopBarProps {
  currentRepo: GovernanceRepository;
  activeTab: 'files' | 'commits' | 'gates' | 'compliance' | 'cli';
  setActiveTab: (tab: 'files' | 'commits' | 'gates' | 'compliance' | 'cli') => void;
  onOpenNewRepo: () => void;
  onOpenCloneModal: () => void;
  onToggleBranch: (branch: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentRepo,
  activeTab,
  setActiveTab,
  onOpenNewRepo,
  onOpenCloneModal,
  onToggleBranch
}) => {
  return (
    <header className="h-14 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
      {/* Zone 1: Contextual Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <span className="font-semibold text-slate-200">Atlas</span>
        <span className="text-slate-600">/</span>
        <span className="text-slate-400">repositories</span>
        <span className="text-slate-600">/</span>
        <span className="font-mono text-slate-100 font-medium truncate max-w-[200px] md:max-w-[320px]">
          {currentRepo.name}
        </span>
      </div>

      {/* Zone 2: Navigation Views / Tabs */}
      <nav className="hidden lg:flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
        <button
          onClick={() => setActiveTab('files')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'files'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Repository Files
        </button>
        <button
          onClick={() => setActiveTab('commits')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'commits'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Commits ({currentRepo.commits.length})
        </button>
        <button
          onClick={() => setActiveTab('gates')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'gates'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Stage-Gates
        </button>
        <button
          onClick={() => setActiveTab('compliance')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'compliance'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Compliance Matrix
        </button>
        <button
          onClick={() => setActiveTab('cli')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'cli'
              ? 'bg-slate-800 text-white shadow-xs'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Git & CLI
        </button>
      </nav>

      {/* Zone 3: Actions */}
      <div className="flex items-center gap-2">
        {/* Branch selector */}
        <div className="relative inline-flex items-center">
          <label htmlFor="branch-select" className="sr-only">Select Branch</label>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono bg-slate-950/80 border border-slate-800 rounded-md text-slate-300">
            <GitBranch className="w-3.5 h-3.5 text-slate-400" />
            <select
              id="branch-select"
              aria-label="Repository branch"
              value={currentRepo.currentBranch}
              onChange={(e) => onToggleBranch(e.target.value)}
              className="bg-transparent text-slate-200 text-xs focus:outline-none cursor-pointer"
            >
              {currentRepo.branches.map((b) => (
                <option key={b} value={b} className="bg-slate-900 text-slate-200">
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Clone button */}
        <button
          onClick={onOpenCloneModal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-md transition-colors whitespace-nowrap"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Clone</span>
        </button>

        {/* New Repo button */}
        <button
          onClick={onOpenNewRepo}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap font-semibold shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Repository</span>
        </button>
      </div>
    </header>
  );
};
