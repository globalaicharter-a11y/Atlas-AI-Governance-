import React, { useState } from 'react';
import { X, Copy, Check, Terminal, Download, Shield } from 'lucide-react';
import { GovernanceRepository } from '../types';

interface CloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  repo: GovernanceRepository;
}

export const CloneModal: React.FC<CloneModalProps> = ({ isOpen, onClose, repo }) => {
  const [protocol, setProtocol] = useState<'https' | 'ssh' | 'cli'>('https');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  let cloneText = `https://governance.atlas.internal/${repo.slug}.git`;
  if (protocol === 'ssh') {
    cloneText = `git@governance.atlas.internal:${repo.slug}.git`;
  } else if (protocol === 'cli') {
    cloneText = `atlas repo clone ${repo.slug}`;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-semibold text-slate-100">
              Clone or Access Governance Repository
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Protocol Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-lg text-xs">
            <button
              onClick={() => setProtocol('https')}
              className={`flex-1 py-1 rounded-md transition-colors ${
                protocol === 'https' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              HTTPS
            </button>
            <button
              onClick={() => setProtocol('ssh')}
              className={`flex-1 py-1 rounded-md transition-colors ${
                protocol === 'ssh' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              SSH
            </button>
            <button
              onClick={() => setProtocol('cli')}
              className={`flex-1 py-1 rounded-md transition-colors ${
                protocol === 'cli' ? 'bg-slate-800 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Atlas CLI
            </button>
          </div>

          {/* Command copy box */}
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-md px-3 py-2 text-xs font-mono text-slate-200 truncate select-all">
              {cloneText}
            </div>
            <button
              onClick={handleCopy}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          <div className="text-[11px] text-slate-400 bg-slate-950/40 p-3 rounded-lg border border-slate-800 space-y-1">
            <p className="font-semibold text-slate-300">Access Permissions:</p>
            <p>
              Branch protection is enforced on <span className="font-mono text-slate-200">{repo.currentBranch}</span>. 
              Direct pushes require verified cryptographic signatures matching accredited audit roles.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
