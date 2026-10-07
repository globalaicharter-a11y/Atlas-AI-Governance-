import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, XCircle, UserCheck } from 'lucide-react';
import { GovernanceRepository, StageGate } from '../types';

interface StageGatesViewProps {
  repo: GovernanceRepository;
  onUpdateGateStatus: (gateId: string, status: StageGate['status'], comment?: string) => void;
}

export const StageGatesView: React.FC<StageGatesViewProps> = ({ repo, onUpdateGateStatus }) => {
  const [selectedGateId, setSelectedGateId] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState('');

  const approvedCount = repo.stageGates.filter(g => g.status === 'approved').length;
  const isAllApproved = approvedCount === repo.stageGates.length;

  const handleSignoff = (gateId: string, status: StageGate['status']) => {
    onUpdateGateStatus(gateId, status, reviewComment);
    setSelectedGateId(null);
    setReviewComment('');
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-6 space-y-6">
      {/* Header and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Deployment Governance Stage-Gates
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-stakeholder signoff gates required before model deployment to production environments.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Gate Quorum:</span>
          <span className="font-mono font-semibold text-slate-200 tabular-nums">
            {approvedCount} / {repo.stageGates.length} Approved
          </span>
          {isAllApproved ? (
            <span className="text-emerald-400 font-medium">· Ready for Release</span>
          ) : (
            <span className="text-amber-400 font-medium">· Approval Required</span>
          )}
        </div>
      </div>

      {/* Gates Cards */}
      <div className="space-y-4">
        {repo.stageGates.map((gate, index) => {
          const isSelected = selectedGateId === gate.id;

          let statusIcon = <Clock className="w-4 h-4 text-amber-400" />;
          let statusText = 'Pending Review';
          let statusColor = 'text-amber-400';

          if (gate.status === 'approved') {
            statusIcon = <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
            statusText = 'Approved & Attested';
            statusColor = 'text-emerald-400';
          } else if (gate.status === 'review_required') {
            statusIcon = <AlertTriangle className="w-4 h-4 text-sky-400" />;
            statusText = 'Action Required';
            statusColor = 'text-sky-400';
          } else if (gate.status === 'rejected') {
            statusIcon = <XCircle className="w-4 h-4 text-rose-400" />;
            statusText = 'Rejected / Rework';
            statusColor = 'text-rose-400';
          }

          return (
            <div
              key={gate.id}
              className="border border-slate-800 bg-slate-900/60 rounded-lg p-5 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-500">
                      0{index + 1}.
                    </span>
                    <h3 className="text-sm font-semibold text-slate-100">
                      {gate.title}
                    </h3>
                  </div>

                  {/* Zero-pill metadata */}
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="text-slate-300">{gate.role}</span>
                    <span aria-hidden="true" className="text-slate-600">·</span>
                    <span>Assignee: {gate.assignee}</span>
                    {gate.signedDate && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="font-mono text-slate-400">{gate.signedDate}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span className={`text-xs font-medium flex items-center gap-1.5 ${statusColor}`}>
                    {statusIcon}
                    {statusText}
                  </span>

                  <button
                    onClick={() => setSelectedGateId(isSelected ? null : gate.id)}
                    className="ml-2 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                  >
                    {isSelected ? 'Close' : 'Review Gate'}
                  </button>
                </div>
              </div>

              {/* Requirements Checklist */}
              <div className="bg-slate-950/60 rounded p-3 border border-slate-800/80 space-y-1.5">
                <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                  Prerequisite Governance Criteria
                </div>
                {gate.requirements.map((req, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                    <span className="text-slate-500 text-xs mt-0.5">•</span>
                    <span>{req}</span>
                  </div>
                ))}
              </div>

              {/* Comments if any */}
              {gate.comments && (
                <div className="text-xs text-slate-400 italic bg-slate-950/30 p-2.5 rounded border border-slate-800/50">
                  "{gate.comments}"
                </div>
              )}

              {/* Review / Approval Form Drawer */}
              {isSelected && (
                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Auditor / Signoff Notes:
                    </label>
                    <input
                      type="text"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Add compliance justification or evaluation reference..."
                      className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleSignoff(gate.id, 'review_required')}
                      className="px-3 py-1.5 text-xs font-medium text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-800 rounded transition-colors"
                    >
                      Request Clarification
                    </button>
                    <button
                      onClick={() => handleSignoff(gate.id, 'rejected')}
                      className="px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/60 hover:bg-rose-900/60 border border-rose-800 rounded transition-colors"
                    >
                      Reject Gate
                    </button>
                    <button
                      onClick={() => handleSignoff(gate.id, 'approved')}
                      className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded transition-colors shadow-xs"
                    >
                      Approve & Sign Gate
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
