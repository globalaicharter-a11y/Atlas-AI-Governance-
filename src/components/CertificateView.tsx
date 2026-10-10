import React, { useState } from 'react';
import { Award, CalendarDays, FileBadge2, Info, Printer, RefreshCw, ShieldCheck } from 'lucide-react';

const todayISO = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const previewCertificateId = () => {
  const year = new Date().getFullYear();
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `AIE-PREVIEW-${year}-${suffix}`;
};

const displayDate = (date: string) => {
  if (!date) return 'Date not set';
  const parsed = new Date(`${date}T12:00:00`);
  return Number.isNaN(parsed.getTime())
    ? date
    : parsed.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export const CertificateView: React.FC = () => {
  const [learnerName, setLearnerName] = useState('Nafiul Ahmad Rafi');
  const [certificateId, setCertificateId] = useState(previewCertificateId);
  const [issueDate, setIssueDate] = useState(todayISO);
  const [preview, setPreview] = useState({
    learnerName: 'Nafiul Ahmad Rafi',
    certificateId: certificateId,
    issueDate: todayISO()
  });
  const [notice, setNotice] = useState('');

  const handlePreparePreview = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPreview({ learnerName: learnerName.trim() || 'Learner Name', certificateId: certificateId.trim() || previewCertificateId(), issueDate });
    setNotice('Certificate preview updated. This action does not issue or register a credential.');
  };

  const handleNewPreviewId = () => {
    const id = previewCertificateId();
    setCertificateId(id);
    setPreview((current) => ({ ...current, certificateId: id }));
    setNotice('A new preview ID has been created. It is not a verified certificate number.');
  };

  const handlePrint = () => {
    setNotice('Use your browser’s print dialog and choose “Save as PDF”. This preview is not digitally verified.');
    window.print();
  };

  return (
    <div className="mx-auto max-w-[1500px] space-y-6 p-5 md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <Award className="h-4 w-4" /> Certificate workspace
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 md:text-3xl">Certificate preview &amp; issue preparation</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">Prepare a branded completion-certificate preview, review the learner details, then print or save the layout as a PDF.</p>
        </div>
        <div className="no-print inline-flex w-fit items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-200">
          <ShieldCheck className="h-3.5 w-3.5" /> Preview only · no issuance backend
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="no-print rounded-xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-black/10">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/10 text-amber-300">
              <FileBadge2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">Certificate details</h2>
              <p className="text-xs text-slate-500">Edit the preview fields</p>
            </div>
          </div>

          <form onSubmit={handlePreparePreview} className="space-y-4">
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-slate-300">Learner name</span>
              <input
                value={learnerName}
                onChange={(event) => setLearnerName(event.target.value)}
                maxLength={90}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/10"
                placeholder="Enter learner name"
              />
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-slate-300">Certificate ID</span>
              <div className="flex gap-2">
                <input
                  value={certificateId}
                  onChange={(event) => setCertificateId(event.target.value)}
                  maxLength={48}
                  className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 font-mono text-xs text-slate-100 outline-none transition focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/10"
                  aria-label="Preview certificate ID"
                />
                <button
                  type="button"
                  onClick={handleNewPreviewId}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-300 transition hover:border-amber-400/40 hover:text-amber-200"
                  title="Generate a new preview ID"
                  aria-label="Generate a new preview ID"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </label>

            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-slate-300">Completion date</span>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input
                  type="date"
                  value={issueDate}
                  onChange={(event) => setIssueDate(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2.5 pl-10 pr-3 text-sm text-slate-100 outline-none transition focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/10"
                />
              </div>
            </label>

            <div className="rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs leading-5 text-slate-400">
              <span className="font-medium text-slate-300">Course</span>
              <div className="mt-1 text-slate-200">AI Governance Fundamental Course</div>
            </div>

            <button type="submit" className="w-full rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300/50">
              Update certificate preview
            </button>
          </form>

          <div className="mt-5 rounded-lg border border-sky-400/15 bg-sky-400/5 p-3 text-xs leading-5 text-sky-100/80">
            <div className="mb-1 flex items-center gap-2 font-semibold text-sky-200"><Info className="h-3.5 w-3.5" /> Prototype status</div>
            This tab renders and prints a preview only. It does not verify course completion, save an issuance record, apply a cryptographic signature, or create a public verification link.
          </div>
          {notice && <p className="mt-3 text-xs leading-5 text-emerald-300" aria-live="polite">{notice}</p>}
        </aside>

        <section className="min-w-0 space-y-3">
          <div className="no-print flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-200">Print-ready certificate</h2>
              <p className="mt-1 text-xs text-slate-500">Landscape layout · print or save as PDF</p>
            </div>
            <button onClick={handlePrint} className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300/30 bg-amber-400/10 px-4 py-2.5 text-sm font-semibold text-amber-100 transition hover:bg-amber-400/20 focus:outline-none focus:ring-2 focus:ring-amber-300/30">
              <Printer className="h-4 w-4" /> Print / Save as PDF
            </button>
          </div>

          <div className="certificate-print-area">
            <article className="certificate-sheet" aria-label="Certificate preview">
              <div className="certificate-outer-border" aria-hidden="true" />
              <img className="certificate-watermark" src="/assets/certificates/atlas-education-seal.png" alt="" aria-hidden="true" />

              <div className="certificate-content">
                <header className="certificate-header">
                  <div className="certificate-brand">ATLAS AI EDUCATION</div>
                  <div className="certificate-institute-subtitle">atlas ai Institute</div>
                  <div className="certificate-rule" />
                </header>

                <main className="certificate-main">
                  <div className="certificate-kicker">CERTIFICATE OF COMPLETION</div>
                  <p className="certificate-intro">This certificate is proudly presented to</p>
                  <h3 className="certificate-recipient">{preview.learnerName || 'Learner Name'}</h3>
                  <p className="certificate-completion">for successfully completing the</p>
                  <p className="certificate-course-title">AI Governance Fundamental Course</p>
                  <p className="certificate-date">Completed on {displayDate(preview.issueDate)}</p>
                </main>

                <footer className="certificate-footer">
                  <div className="certificate-number">
                    <span className="certificate-footer-label">Certificate ID</span>
                    <span className="certificate-id-value">{preview.certificateId}</span>
                  </div>
                  <div className="certificate-seal-wrap">
                    <img src="/assets/certificates/atlas-education-seal.png" alt="Atlas AI Education seal" className="certificate-footer-seal" />
                  </div>
                  <div className="certificate-signature-block">
                    <img src="/assets/certificates/atlas-signature.png" alt="Nafiul Ahmad Rafi signature" className="certificate-signature-image" />
                    <div className="certificate-signature-line" />
                    <div className="certificate-signature-institute">Atlas AI Institute</div>
                  </div>
                </footer>
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};
