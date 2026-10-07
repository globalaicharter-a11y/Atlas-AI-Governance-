import React, { useState } from 'react';
import { GitCommit, CheckCircle2, Shield, Copy, Check, Search, Calendar, User } from 'lucide-react';
import { GovernanceRepository } from '../types';

interface CommitHistoryProps {
  repo: GovernanceRepository;
  onAddManualCommit: (message: string, signoff: string) => void;
}

export const CommitHistory: React.FC<CommitHistoryProps> = ({ repo, onAddManualCommit }) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [isCreatingCommit, setIsCreatingCommit] = useState(false);
  const [newMsg, setNewMsg] = useState('');
  const [newSignoff, setNewSignoff] = useState('EU-AI-Act-Art-9');

  const filteredCommits = repo.commits.filter(c => 
    c.message.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.author.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.shortHash.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleSubmitCommit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    onAddManualCommit(newMsg, newSignoff);
    setNewMsg('');
    setIsCreatingCommit(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-sky-400" />
            Cryptographic Commit Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable audit record of all policy amendments, benchmark calibrations, and regulatory signoffs on branch <span className="font-mono text-slate-300">{repo.currentBranch}</span>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreatingCommit(true)}
            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors whitespace-nowrap shadow-xs"
          >
            Record Signed Audit Commit
          </button>
        </div>
      </div>

      {/* Manual Signed Commit Form */}
      {isCreatingCommit && (
        <form onSubmit={handleSubmitCommit} className="border border-sky-500/40 bg-slate-900 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-200">New Signed Audit Commit</h3>
            <button
              type="button"
              onClick={() => setIsCreatingCommit(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Commit Audit Description
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Attest demographic parity metrics for Q4 external audit"
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              Compliance Standard Signoff Tag
            </label>
            <select
              value={newSignoff}
              onChange={(e) => setNewSignoff(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
            >
              <option value="EU-AI-Act-Art-9">EU AI Act · Article 9 (Risk Management)</option>
              <option value="EU-AI-Act-Art-10">EU AI Act · Article 10 (Data Quality)</option>
              <option value="EU-AI-Act-Art-14">EU AI Act · Article 14 (Human Oversight)</option>
              <option value="NIST-AI-RMF-GOVERN">NIST AI RMF · GOVERN 1.1</option>
              <option value="ISO-42001-Sec-6">ISO/IEC 42001 · Clause 6.1 (Risk Planning)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-sky-400 hover:bg-sky-300 text-slate-950 rounded transition-colors"
            >
              Sign & Record Commit
            </button>
          </div>
        </form>
      )}

      {/* Filter */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search commits by message, author, or SHA hash..."
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-md py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-slate-700"
        />
      </div>

      {/* Commit List */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-lg divide-y divide-slate-800/80 overflow-hidden">
        {filteredCommits.map((commit) => (
          <div key={commit.hash} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30 transition-colors">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-200 text-xs">
                  {commit.message}
                </span>
                {commit.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                    <Shield className="w-3 h-3" />
                    Verified GPG
                  </span>
                )}
              </div>

              {/* Zero-pill metadata */}
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span className="text-slate-300">{commit.author}</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
                <span>{commit.date}</span>
                {commit.complianceSignoff && (
                  <>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span className="text-sky-400/90 font-mono text-[10px]">{commit.complianceSignoff}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="font-mono text-xs text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 tabular-nums">
                {commit.shortHash}
              </span>
              <button
                onClick={() => handleCopy(commit.hash)}
                className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-950 hover:bg-slate-800 rounded border border-slate-800 transition-colors"
                title="Copy full commit SHA"
              >
                {copiedHash === commit.hash ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        ))}

        {filteredCommits.length === 0 && (
          <div className="py-12 text-center text-xs text-slate-500">
            No matching commits found.
          </div>
        )}
      </div>
    </div>
  );
};
