import React, { useState } from 'react';
import { 
  FolderGit2, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Terminal, 
  Search, 
  Plus, 
  ExternalLink,
  Lock,
  Layers,
  CircleDot,
  Award
} from 'lucide-react';
import { GovernanceRepository, PlatformTab } from '../types';

interface SidebarProps {
  repositories: GovernanceRepository[];
  currentRepoId: string;
  onSelectRepo: (id: string) => void;
  activeTab: PlatformTab;
  setActiveTab: (tab: PlatformTab) => void;
  onOpenNewRepo: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  repositories,
  currentRepoId,
  onSelectRepo,
  activeTab,
  setActiveTab,
  onOpenNewRepo
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRepos = repositories.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.riskTier.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 select-none">
      {/* Brand Header: Single Wordmark text element as per Top Bar contract */}
      <div className="h-14 px-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
            A
          </div>
          <span className="font-semibold text-slate-100 text-sm tracking-tight">
            Atlas AI Governance
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">v2.4</span>
      </div>

      {/* Main Navigation Views */}
      <div className="px-3 py-3 border-b border-slate-800/80">
        <div className="text-[11px] font-medium text-slate-500 px-2 mb-1.5 uppercase tracking-wider">
          Platform Views
        </div>
        <nav className="space-y-0.5 text-xs">
          <button
            onClick={() => setActiveTab('files')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'files'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FolderGit2 className="w-4 h-4 text-emerald-400" />
            <span>Repository Files</span>
          </button>

          <button
            onClick={() => setActiveTab('commits')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'commits'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <CircleDot className="w-4 h-4 text-sky-400" />
            <span>Commit History & Ledger</span>
          </button>

          <button
            onClick={() => setActiveTab('gates')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'gates'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Deployment Stage-Gates</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'compliance'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Compliance Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'certificate'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span>Certificates</span>
          </button>

          <button
            onClick={() => setActiveTab('cli')}
            className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-left transition-colors ${
              activeTab === 'cli'
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Terminal className="w-4 h-4 text-slate-400" />
            <span>Git CLI Quickstart</span>
          </button>
        </nav>
      </div>

      {/* Repositories Section */}
      <div className="flex-1 flex flex-col min-h-0 px-3 py-3">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            Repositories ({repositories.length})
          </div>
          <button
            onClick={onOpenNewRepo}
            className="p-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors"
            title="Create new governance repository"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-2">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder="Filter repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-950/80 border border-slate-800 rounded-md py-1.5 pl-8 pr-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700 font-sans"
          />
        </div>

        {/* Repositories List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
          {filteredRepos.map((repo) => {
            const isSelected = repo.id === currentRepoId;
            return (
              <button
                key={repo.id}
                onClick={() => onSelectRepo(repo.id)}
                className={`w-full text-left p-2 rounded-md transition-all border ${
                  isSelected
                    ? 'bg-slate-800/90 border-slate-700 text-slate-100 shadow-xs'
                    : 'bg-transparent border-transparent text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-medium truncate text-slate-200">
                    {repo.name}
                  </span>
                  {repo.isEmpty && (
                    <span className="text-[10px] text-amber-400/90 font-mono">
                      empty
                    </span>
                  )}
                </div>

                {/* Zero-pill metadata: clean unboxed text with typographic separators */}
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5 truncate">
                  <span>{repo.riskTier}</span>
                  <span aria-hidden="true">·</span>
                  <span>{repo.primaryFramework}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{repo.commits.length} commits</span>
                </div>
              </button>
            );
          })}

          {filteredRepos.length === 0 && (
            <div className="py-6 text-center text-xs text-slate-500">
              No matching repositories found.
            </div>
          )}
        </div>
      </div>

      {/* Footer Info: Clean, quiet system credentials */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="truncate max-w-[140px] text-slate-300">Atlas Engine EU-1</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">ISO 42001</span>
        </div>
      </div>
    </aside>
  );
};
