import React, { useState } from 'react';
import { 
  FileCode, 
  FileText, 
  Folder, 
  GitCommit, 
  Clock, 
  Copy, 
  Check, 
  Edit3, 
  ArrowLeft, 
  Plus, 
  Save, 
  Trash2,
  Download
} from 'lucide-react';
import { GovernanceFile, GovernanceRepository } from '../types';

interface RepoFileExplorerProps {
  repo: GovernanceRepository;
  onCommitFileChange: (fileId: string, newContent: string, commitMessage: string) => void;
  onAddNewFile: (name: string, content: string, commitMessage: string) => void;
  onDeleteFile: (fileId: string, commitMessage: string) => void;
}

export const RepoFileExplorer: React.FC<RepoFileExplorerProps> = ({
  repo,
  onCommitFileChange,
  onAddNewFile,
  onDeleteFile
}) => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(
    repo.files.length > 0 ? repo.files[0].id : null
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newFileContent, setNewFileContent] = useState('');

  const currentFile = repo.files.find(f => f.id === selectedFileId);

  const handleSelectFile = (file: GovernanceFile) => {
    setSelectedFileId(file.id);
    setIsEditing(false);
    setEditedContent(file.content);
  };

  const handleStartEdit = () => {
    if (!currentFile) return;
    setEditedContent(currentFile.content);
    setCommitMessage(`Update ${currentFile.name} governance specifications`);
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFile || !commitMessage.trim()) return;
    onCommitFileChange(currentFile.id, editedContent, commitMessage);
    setIsEditing(false);
  };

  const handleCopyContent = () => {
    if (!currentFile) return;
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!currentFile) return;
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCreateNewFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;
    onAddNewFile(
      newFileName,
      newFileContent || `# ${newFileName}\n# Created via Atlas AI Governance Platform\n`,
      `Add ${newFileName} governance specification`
    );
    setIsAddingNew(false);
    setNewFileName('');
    setNewFileContent('');
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
      {/* Top File Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Folder className="w-4 h-4 text-emerald-400" />
          <span>{repo.name}</span>
          <span>/</span>
          <span className="text-slate-400">{repo.currentBranch}</span>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-400" />
          <span>Add file</span>
        </button>
      </div>

      {/* Add New File Form Modal/Drawer */}
      {isAddingNew && (
        <form onSubmit={handleCreateNewFile} className="border border-slate-700 bg-slate-900 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200">Add New Governance Specification</h3>
            <button
              type="button"
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              File Name (e.g., bias-evaluation-report.json, alignment-rules.yaml)
            </label>
            <input
              type="text"
              required
              placeholder="e.g. system-prompt-audit.yaml"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-md px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              File Contents
            </label>
            <textarea
              rows={6}
              value={newFileContent}
              onChange={(e) => setNewFileContent(e.target.value)}
              placeholder="# Enter specification, schema, or YAML configuration..."
              className="w-full bg-slate-950 border border-slate-800 rounded-md p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-md transition-colors"
            >
              Commit File to {repo.currentBranch}
            </button>
          </div>
        </form>
      )}

      {/* Grid: Left Column Files List, Right Column File Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* File List Table (4 columns on lg) */}
        <div className="lg:col-span-4 border border-slate-800 bg-slate-900/60 rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 text-xs font-medium text-slate-400">
            Files ({repo.files.length})
          </div>

          <div className="divide-y divide-slate-800/80 max-h-[560px] overflow-y-auto">
            {repo.files.map((file) => {
              const isSelected = file.id === selectedFileId;
              return (
                <button
                  key={file.id}
                  onClick={() => handleSelectFile(file)}
                  className={`w-full text-left p-3 transition-colors flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 text-white'
                      : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                  }`}
                >
                  <FileCode className={`w-4 h-4 mt-0.5 shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-medium text-slate-200 truncate">
                        {file.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 ml-2 shrink-0">
                        {file.size}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mb-1">
                      {file.lastCommitMessage}
                    </p>
                    <div className="text-[10px] text-slate-500 flex items-center gap-2">
                      <span className="font-mono">{file.lastCommitHash}</span>
                      <span>·</span>
                      <span>{file.lastUpdated}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* File Detail / Editor View (8 columns on lg) */}
        <div className="lg:col-span-8 border border-slate-800 bg-slate-900/60 rounded-lg overflow-hidden flex flex-col">
          {currentFile ? (
            <>
              {/* Header of File Viewer */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-slate-200">
                    {currentFile.path}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    ({currentFile.size})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyContent}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 transition-colors"
                    title="Download file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  {!isEditing ? (
                    <button
                      onClick={handleStartEdit}
                      className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-emerald-300 hover:text-emerald-200 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/80 rounded transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit File</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>

              {/* Body: Viewer or Editor */}
              {isEditing ? (
                <form onSubmit={handleSaveEdit} className="p-4 space-y-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-400 mb-1">
                      Edit File Content:
                    </label>
                    <textarea
                      rows={14}
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full font-mono text-xs bg-slate-950 text-slate-200 p-3 rounded-md border border-slate-800 focus:outline-none focus:border-emerald-500 resize-y"
                    />
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-md border border-slate-800 space-y-2">
                    <label className="block text-xs font-medium text-slate-300">
                      Commit Message:
                    </label>
                    <input
                      type="text"
                      required
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      placeholder="e.g. Update fairness evaluation parameters"
                      className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-md transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Commit Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto max-h-[520px]">
                  <pre className="leading-relaxed">
                    {currentFile.content.split('\n').map((line, idx) => (
                      <div key={idx} className="table-row">
                        <span className="table-cell select-none pr-4 text-right text-slate-600 tabular-nums">
                          {idx + 1}
                        </span>
                        <span className="table-cell whitespace-pre text-slate-300">
                          {line || ' '}
                        </span>
                      </div>
                    ))}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-xs text-slate-500">
              Select a file from the list to preview its governance specifications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
