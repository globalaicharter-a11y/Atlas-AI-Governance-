/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { initialRepositories, standardStarterTemplates } from './data/governanceData';
import { GovernanceRepository, GovernanceFile, StageGate, ComplianceCheck, GitCommit, PlatformTab } from './types';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { RepoHeader } from './components/RepoHeader';
import { EmptyRepoView } from './components/EmptyRepoView';
import { RepoFileExplorer } from './components/RepoFileExplorer';
import { CommitHistory } from './components/CommitHistory';
import { StageGatesView } from './components/StageGatesView';
import { ComplianceMatrixView } from './components/ComplianceMatrixView';
import { GitCliView } from './components/GitCliView';
import { NewRepoModal } from './components/NewRepoModal';
import { CloneModal } from './components/CloneModal';
import { CertificateView } from './components/CertificateView';

export default function App() {
  const [repositories, setRepositories] = useState<GovernanceRepository[]>(initialRepositories);
  const [currentRepoId, setCurrentRepoId] = useState<string>('repo-atlas-governance');
  const [activeTab, setActiveTab] = useState<PlatformTab>('files');
  const [isNewRepoModalOpen, setIsNewRepoModalOpen] = useState(false);
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);

  const currentRepo = repositories.find(r => r.id === currentRepoId) || repositories[0];

  // Switch repository
  const handleSelectRepo = (id: string) => {
    setCurrentRepoId(id);
  };

  // Switch branch
  const handleToggleBranch = (branch: string) => {
    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return { ...r, currentBranch: branch };
      }
      return r;
    }));
  };

  // Populate template files into an empty repository
  const handlePopulateTemplate = () => {
    const template = standardStarterTemplates[0]; // EU high-risk template
    const newFiles: GovernanceFile[] = template.files.map((tf, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: tf.name,
      path: `/${tf.name}`,
      type: tf.name.endsWith('.json') ? 'json' : 'yaml',
      size: `${(tf.content.length / 1024).toFixed(1)} KB`,
      lastCommitMessage: `Initialize ${tf.name} from EU AI Act high-risk template`,
      lastCommitHash: 'b12e87a',
      lastUpdated: 'Just now',
      content: tf.content
    }));

    const templateCommit: GitCommit = {
      hash: 'b12e87a6d890123456789abcdef0123456789abcd',
      shortHash: 'b12e87a',
      author: 'Compliance Lead',
      email: 'lead@governance.atlas.ai',
      date: 'Just now',
      message: 'Populate EU AI Act High-Risk governance bundle and model card',
      isVerified: true,
      complianceSignoff: 'EU-AI-Act-Template-v2',
      filesChanged: newFiles.length
    };

    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          isEmpty: false,
          files: newFiles,
          commits: [templateCommit, ...r.commits]
        };
      }
      return r;
    }));
  };

  // Clear back to empty repo state ("no content")
  const handleClearToEmpty = () => {
    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          isEmpty: true,
          files: []
        };
      }
      return r;
    }));
  };

  // Create first file in empty repo
  const handleCreateFileInEmptyRepo = (fileName: string, fileContent: string) => {
    const newFile: GovernanceFile = {
      id: `file-${Date.now()}`,
      name: fileName,
      path: `/${fileName}`,
      type: fileName.endsWith('.json') ? 'json' : fileName.endsWith('.yaml') || fileName.endsWith('.yml') ? 'yaml' : 'markdown',
      size: `${(fileContent.length / 1024).toFixed(1)} KB`,
      lastCommitMessage: `Create initial ${fileName}`,
      lastCommitHash: 'a789ef1',
      lastUpdated: 'Just now',
      content: fileContent
    };

    const newCommit: GitCommit = {
      hash: 'a789ef16d890123456789abcdef0123456789abcd',
      shortHash: 'a789ef1',
      author: 'Atlas Auditor',
      email: 'auditor@atlas.ai',
      date: 'Just now',
      message: `Initial commit: create ${fileName}`,
      isVerified: true,
      complianceSignoff: 'ISO-42001-Sec-4',
      filesChanged: 1
    };

    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          isEmpty: false,
          files: [newFile],
          commits: [newCommit, ...r.commits]
        };
      }
      return r;
    }));
  };

  // Save file edits and create commit
  const handleCommitFileChange = (fileId: string, newContent: string, commitMsg: string) => {
    const shortHash = Math.random().toString(16).substring(2, 9);
    const fullHash = `${shortHash}${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;

    const newCommit: GitCommit = {
      hash: fullHash,
      shortHash,
      author: 'Compliance Officer',
      email: 'officer@governance.atlas.ai',
      date: 'Just now',
      message: commitMsg,
      isVerified: true,
      complianceSignoff: 'ISO-42001-Sec-6',
      filesChanged: 1
    };

    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          files: r.files.map(f => {
            if (f.id === fileId) {
              return {
                ...f,
                content: newContent,
                size: `${(newContent.length / 1024).toFixed(1)} KB`,
                lastCommitMessage: commitMsg,
                lastCommitHash: shortHash,
                lastUpdated: 'Just now'
              };
            }
            return f;
          }),
          commits: [newCommit, ...r.commits]
        };
      }
      return r;
    }));
  };

  // Add new file to populated repo
  const handleAddNewFile = (name: string, content: string, commitMsg: string) => {
    const shortHash = Math.random().toString(16).substring(2, 9);
    const fullHash = `${shortHash}${Math.random().toString(16).substring(2, 10)}`;

    const newFile: GovernanceFile = {
      id: `file-${Date.now()}`,
      name,
      path: `/${name}`,
      type: name.endsWith('.json') ? 'json' : name.endsWith('.yaml') || name.endsWith('.yml') ? 'yaml' : 'markdown',
      size: `${(content.length / 1024).toFixed(1)} KB`,
      lastCommitMessage: commitMsg,
      lastCommitHash: shortHash,
      lastUpdated: 'Just now',
      content
    };

    const newCommit: GitCommit = {
      hash: fullHash,
      shortHash,
      author: 'Compliance Officer',
      email: 'officer@governance.atlas.ai',
      date: 'Just now',
      message: commitMsg,
      isVerified: true,
      complianceSignoff: 'EU-AI-Act-Art-11',
      filesChanged: 1
    };

    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          isEmpty: false,
          files: [...r.files, newFile],
          commits: [newCommit, ...r.commits]
        };
      }
      return r;
    }));
  };

  // Delete file
  const handleDeleteFile = (fileId: string, commitMsg: string) => {
    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        const remaining = r.files.filter(f => f.id !== fileId);
        return {
          ...r,
          isEmpty: remaining.length === 0,
          files: remaining
        };
      }
      return r;
    }));
  };

  // Add manual signed commit
  const handleAddManualCommit = (message: string, signoff: string) => {
    const shortHash = Math.random().toString(16).substring(2, 9);
    const fullHash = `${shortHash}${Math.random().toString(16).substring(2, 14)}`;

    const newCommit: GitCommit = {
      hash: fullHash,
      shortHash,
      author: 'Certified Lead Auditor',
      email: 'auditor@atlas.ai',
      date: 'Just now',
      message,
      isVerified: true,
      complianceSignoff: signoff,
      filesChanged: 1
    };

    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          commits: [newCommit, ...r.commits]
        };
      }
      return r;
    }));
  };

  // Update stage gate status
  const handleUpdateGateStatus = (gateId: string, status: StageGate['status'], comment?: string) => {
    const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16) + ' UTC';

    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          stageGates: r.stageGates.map(g => {
            if (g.id === gateId) {
              return {
                ...g,
                status,
                signedDate: status === 'approved' ? nowStr : g.signedDate,
                comments: comment || g.comments
              };
            }
            return g;
          })
        };
      }
      return r;
    }));
  };

  // Update compliance check status
  const handleUpdateCheckStatus = (checkId: string, status: ComplianceCheck['status']) => {
    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          complianceChecks: r.complianceChecks.map(c => {
            if (c.id === checkId) {
              return { ...c, status };
            }
            return c;
          })
        };
      }
      return r;
    }));
  };

  // Add new compliance requirement
  const handleAddCheck = (newCheck: Omit<ComplianceCheck, 'id'>) => {
    const createdCheck: ComplianceCheck = {
      id: `chk-${Date.now()}`,
      ...newCheck
    };

    setRepositories(prev => prev.map(r => {
      if (r.id === currentRepo.id) {
        return {
          ...r,
          complianceChecks: [...r.complianceChecks, createdCheck]
        };
      }
      return r;
    }));
  };

  // Create brand new repo
  const handleCreateRepo = (newRepoData: Partial<GovernanceRepository>) => {
    const id = `repo-${Date.now()}`;
    const name = newRepoData.name || 'new-governance-repo';
    const newRepo: GovernanceRepository = {
      id,
      name,
      slug: `org/${name}`,
      description: newRepoData.description || 'Enterprise AI governance repository.',
      visibility: newRepoData.visibility || 'internal',
      riskTier: newRepoData.riskTier || 'High-Risk',
      primaryFramework: newRepoData.primaryFramework || 'EU AI Act',
      currentBranch: 'main',
      branches: ['main', 'staging-compliance'],
      isEmpty: newRepoData.isEmpty ?? true,
      modelType: 'Custom AI Architecture',
      ownerTeam: newRepoData.ownerTeam || 'AI Ethics & Governance',
      createdAt: 'Just now',
      files: [],
      commits: [
        {
          hash: `${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
          shortHash: Math.random().toString(16).substring(2, 9),
          author: 'Atlas Platform Admin',
          email: 'admin@atlas.ai',
          date: 'Just now',
          message: `Initial empty repository creation for ${name}`,
          isVerified: true,
          complianceSignoff: 'ISO-42001',
          filesChanged: 1
        }
      ],
      stageGates: [
        {
          id: `gate-1-${Date.now()}`,
          title: 'Ethics & Fundamental Rights Review',
          role: 'Ethics Officer',
          assignee: 'Ethics Board',
          status: 'pending',
          requirements: ['Non-discrimination impact assessment', 'Fairness metrics signoff']
        },
        {
          id: `gate-2-${Date.now()}`,
          title: 'Safety & Robustness Red-Teaming',
          role: 'Safety Lead',
          assignee: 'AI Safety Lab',
          status: 'pending',
          requirements: ['Adversarial perturbation testing', 'Jailbreak resistance']
        }
      ],
      complianceChecks: [
        {
          id: `chk-1-${Date.now()}`,
          framework: newRepoData.primaryFramework || 'EU AI Act',
          article: 'Article 9',
          requirement: 'Comprehensive continuous risk management system',
          category: 'Risk Management',
          status: 'in_progress',
          owner: 'Risk Committee'
        }
      ]
    };

    setRepositories(prev => [newRepo, ...prev]);
    setCurrentRepoId(id);
    setActiveTab('files');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans">
      {/* Enterprise Left Sidebar */}
      <Sidebar
        repositories={repositories}
        currentRepoId={currentRepo.id}
        onSelectRepo={handleSelectRepo}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewRepo={() => setIsNewRepoModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar with 3-zone contract */}
        <TopBar
          currentRepo={currentRepo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenNewRepo={() => setIsNewRepoModalOpen(true)}
          onOpenCloneModal={() => setIsCloneModalOpen(true)}
          onToggleBranch={handleToggleBranch}
        />

        {/* Repository Header with zero-pill metadata */}
        <RepoHeader
          repo={currentRepo}
          onPopulateTemplate={handlePopulateTemplate}
          onClearToEmpty={handleClearToEmpty}
        />

        {/* Viewport content */}
        <main className="flex-1 overflow-y-auto bg-slate-950/60 custom-scrollbar">
          {activeTab === 'files' && (
            currentRepo.isEmpty ? (
              <EmptyRepoView
                repo={currentRepo}
                onPopulateTemplate={handlePopulateTemplate}
                onCreateFile={handleCreateFileInEmptyRepo}
              />
            ) : (
              <RepoFileExplorer
                repo={currentRepo}
                onCommitFileChange={handleCommitFileChange}
                onAddNewFile={handleAddNewFile}
                onDeleteFile={handleDeleteFile}
              />
            )
          )}

          {activeTab === 'commits' && (
            <CommitHistory
              repo={currentRepo}
              onAddManualCommit={handleAddManualCommit}
            />
          )}

          {activeTab === 'gates' && (
            <StageGatesView
              repo={currentRepo}
              onUpdateGateStatus={handleUpdateGateStatus}
            />
          )}

          {activeTab === 'compliance' && (
            <ComplianceMatrixView
              repo={currentRepo}
              onUpdateCheckStatus={handleUpdateCheckStatus}
              onAddCheck={handleAddCheck}
            />
          )}

          {activeTab === 'cli' && (
            <GitCliView repo={currentRepo} />
          )}
          {activeTab === 'certificate' && <CertificateView />}
        </main>
      </div>

      {/* Modals */}
      <NewRepoModal
        isOpen={isNewRepoModalOpen}
        onClose={() => setIsNewRepoModalOpen(false)}
        onCreateRepo={handleCreateRepo}
      />

      <CloneModal
        isOpen={isCloneModalOpen}
        onClose={() => setIsCloneModalOpen(false)}
        repo={currentRepo}
      />
    </div>
  );
}
