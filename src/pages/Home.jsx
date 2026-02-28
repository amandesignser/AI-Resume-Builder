import { useRef, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import ResumeForm from '../components/ResumeForm.jsx';
import ResumePreview from '../components/ResumePreview.jsx';

export default function Home({
  theme,
  resume,
  onResumeChange,
  selectedTemplate,
  onTemplateChange,
  sectionOrder,
  onSectionOrderChange,
  primaryColor,
  onPrimaryColorChange,
  onToggleTheme,
}) {
  const previewRef = useRef(null);
  const [shareMessage, setShareMessage] = useState('');

  const handleDownload = async () => {
    if (!previewRef.current) return;
    const html2pdf = (await import('html2pdf.js')).default;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${resume.fullName || 'resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().set(opt).from(previewRef.current).save();
  };

  const handleShare = async () => {
    try {
      const payload = {
        resume,
        selectedTemplate,
        sectionOrder,
        primaryColor,
      };
      const encoded = btoa(JSON.stringify(payload));
      const url = `${window.location.origin}${window.location.pathname}?data=${encodeURIComponent(
        encoded,
      )}`;
      await navigator.clipboard.writeText(url);
      setShareMessage('Mock share link copied to clipboard!');
      setTimeout(() => setShareMessage(''), 3000);
    } catch {
      setShareMessage('Unable to copy link, but this is just a mock.');
      setTimeout(() => setShareMessage(''), 3000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        selectedTemplate={selectedTemplate}
        onTemplateChange={onTemplateChange}
        onDownload={handleDownload}
        onShare={handleShare}
        primaryColor={primaryColor}
        onPrimaryColorChange={onPrimaryColorChange}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 pb-10 pt-6 md:flex-row md:items-start md:gap-8 lg:pt-10">
        <section className="md:w-[46%]">
          <div className="rounded-3xl bg-white/80 p-5 shadow-soft ring-1 ring-slate-100 backdrop-blur dark:bg-slate-900/80 dark:ring-slate-800">
            <h2 className="mb-1 text-sm font-semibold uppercase tracking-[0.2em] text-primary/80 dark:text-primary/90">
              AI Resume Builder
            </h2>
            <p className="mb-5 text-xl font-semibold text-slate-900 dark:text-slate-50">
              Fill your details. Watch your resume come alive.
            </p>
            <ResumeForm
              resume={resume}
              onChange={onResumeChange}
              sectionOrder={sectionOrder}
              onSectionOrderChange={onSectionOrderChange}
            />
          </div>
        </section>

        <section className="md:w-[54%]">
          <div className="flex h-full flex-col gap-3">
            <div className="rounded-3xl bg-gradient-to-br from-primary/15 via-slate-50 to-slate-100 p-[1px] dark:from-primary/40 dark:via-slate-900 dark:to-slate-950">
              <div className="h-full rounded-[1.38rem] bg-white/90 p-4 shadow-soft backdrop-blur-sm dark:bg-slate-900/95">
                <ResumePreview
                  ref={previewRef}
                  resume={resume}
                  selectedTemplate={selectedTemplate}
                  sectionOrder={sectionOrder}
                />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Best viewed on desktop when exporting to PDF. Your data stays in your browser only.
            </p>
            {shareMessage && (
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-100 dark:ring-emerald-800/80">
                {shareMessage}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

