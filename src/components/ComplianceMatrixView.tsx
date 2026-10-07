import React, { useState } from 'react';
import { CheckCircle2, Clock, AlertTriangle, Shield, Plus, FileText, Check } from 'lucide-react';
import { GovernanceRepository, ComplianceCheck } from '../types';

interface ComplianceMatrixViewProps {
  repo: GovernanceRepository;
  onUpdateCheckStatus: (checkId: string, status: ComplianceCheck['status']) => void;
  onAddCheck: (newCheck: Omit<ComplianceCheck, 'id'>) => void;
}

export const ComplianceMatrixView: React.FC<ComplianceMatrixViewProps> = ({
  repo,
  onUpdateCheckStatus,
  onAddCheck
}) => {
  const [filterFramework, setFilterFramework] = useState<string>('all');
  const [isAdding, setIsAdding] = useState(false);
  const [article, setArticle] = useState('');
  const [requirement, setRequirement] = useState('');
  const [category, setCategory] = useState<ComplianceCheck['category']>('Risk Management');
  const [framework, setFramework] = useState<ComplianceCheck['framework']>('EU AI Act');
  const [owner, setOwner] = useState('Compliance Team');

  const filteredChecks = repo.complianceChecks.filter(chk => {
    if (filterFramework === 'all') return true;
    return chk.framework === filterFramework;
  });

  const compliantCount = repo.complianceChecks.filter(c => c.status === 'compliant').length;
  const inProgressCount = repo.complianceChecks.filter(c => c.status === 'in_progress').length;
  const actionNeededCount = repo.complianceChecks.filter(c => c.status === 'action_needed').length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!article.trim() || !requirement.trim()) return;
    onAddCheck({
      framework,
      article,
      requirement,
      category,
      status: 'in_progress',
      owner
    });
    setArticle('');
    setRequirement('');
    setIsAdding(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            Regulatory Compliance & Risk Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Active conformance tracking for EU AI Act, NIST AI RMF 1.0, and ISO/IEC 42001 standards.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Requirement</span>
        </button>
      </div>

      {/* Summary Metrics Bar with tabular numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border border-slate-800 bg-slate-900/60 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-1">Conformant Controls</div>
          <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
            {compliantCount} <span className="text-xs text-slate-500 font-normal">/ {repo.complianceChecks.length}</span>
          </div>
        </div>
        <div className="border border-slate-800 bg-slate-900/60 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-1">In Progress Validations</div>
          <div className="text-xl font-bold font-mono text-amber-400 tabular-nums">
            {inProgressCount}
          </div>
        </div>
        <div className="border border-slate-800 bg-slate-900/60 rounded-lg p-4">
          <div className="text-xs text-slate-400 mb-1">Action Needed / Discrepancies</div>
          <div className="text-xl font-bold font-mono text-rose-400 tabular-nums">
            {actionNeededCount}
          </div>
        </div>
      </div>

      {/* Add Form */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="border border-indigo-500/30 bg-slate-900 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-200">Track New Compliance Clause</h3>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Framework</label>
              <select
                value={framework}
                onChange={(e) => setFramework(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
              >
                <option value="EU AI Act">EU AI Act</option>
                <option value="NIST AI RMF 1.0">NIST AI RMF 1.0</option>
                <option value="ISO/IEC 42001">ISO/IEC 42001</option>
                <option value="OWASP Top 10 for LLM">OWASP Top 10 for LLM</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Article / Clause</label>
              <input
                type="text"
                required
                placeholder="e.g. Article 13 (Transparency)"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
              >
              </input>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-[11px] font-medium text-slate-400 mb-1">Requirement Statement</label>
              <input
                type="text"
                required
                placeholder="e.g. Ensure instructions for use are comprehensible and accessible"
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
              >
              </input>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded"
            >
              Add Requirement
            </button>
          </div>
        </form>
      )}

      {/* Filter Tabs (Interactive filter tabs allowed per skill guidelines) */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg w-fit text-xs">
        {['all', 'EU AI Act', 'NIST AI RMF 1.0'].map((f) => (
          <button
            key={f}
            onClick={() => setFilterFramework(f)}
            className={`px-3 py-1 rounded-md transition-colors ${
              filterFramework === f
                ? 'bg-slate-800 text-white font-medium'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {f === 'all' ? 'All Frameworks' : f}
          </button>
        ))}
      </div>

      {/* High-Density Data Grid Table */}
      <div className="border border-slate-800 bg-slate-900/60 rounded-lg overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-medium">
              <th className="py-3 px-4">Standard & Article</th>
              <th className="py-3 px-4">Mandate Specification</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Evidence</th>
              <th className="py-3 px-4 text-right">Conformance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {filteredChecks.map((chk) => (
              <tr key={chk.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 whitespace-nowrap font-mono text-slate-200 font-medium">
                  {chk.framework} · {chk.article}
                </td>
                <td className="py-3 px-4 text-slate-300 max-w-md">
                  {chk.requirement}
                </td>
                <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                  {chk.category}
                </td>
                <td className="py-3 px-4 font-mono text-slate-400 whitespace-nowrap">
                  {chk.evidenceFile ? (
                    <span className="text-emerald-400/90 hover:underline cursor-pointer">
                      {chk.evidenceFile}
                    </span>
                  ) : (
                    <span className="text-slate-600">—</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <select
                    value={chk.status}
                    onChange={(e) => onUpdateCheckStatus(chk.id, e.target.value as any)}
                    className={`bg-slate-950 text-xs rounded border px-2 py-1 font-medium cursor-pointer ${
                      chk.status === 'compliant'
                        ? 'border-emerald-600/50 text-emerald-400'
                        : chk.status === 'in_progress'
                        ? 'border-amber-600/50 text-amber-400'
                        : 'border-rose-600/50 text-rose-400'
                    }`}
                  >
                    <option value="compliant">Compliant</option>
                    <option value="in_progress">In Progress</option>
                    <option value="action_needed">Action Needed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
