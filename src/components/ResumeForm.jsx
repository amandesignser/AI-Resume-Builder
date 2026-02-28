import { useMemo } from 'react';
import { skillSuggestions } from '../data/dummySuggestions.js';

function getSuggestion(skills) {
  if (!skills?.trim()) return null;
  const lower = skills.toLowerCase();
  for (const entry of skillSuggestions) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.suggestion;
    }
  }
  return skillSuggestions[0]?.suggestion ?? null;
}

const SECTION_LABELS = {
  skills: 'Skills',
  education: 'Education',
  experience: 'Experience',
};

export default function ResumeForm({ resume, onChange, sectionOrder, onSectionOrderChange }) {
  const suggestion = useMemo(() => getSuggestion(resume.skills), [resume.skills]);

  const handleChange = (field) => (e) => {
    onChange({ [field]: e.target.value });
  };

  const moveSection = (index, direction) => {
    const next = [...sectionOrder];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= next.length) return;
    const [removed] = next.splice(index, 1);
    next.splice(targetIndex, 0, removed);
    onSectionOrderChange(next);
  };

  return (
    <form className="flex flex-col gap-4 text-sm text-slate-800 dark:text-slate-100">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Full name
          </label>
          <input
            type="text"
            value={resume.fullName}
            onChange={handleChange('fullName')}
            placeholder="Aman Sharma"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner shadow-slate-100 outline-none ring-primary/20 transition focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:focus:bg-slate-950"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Email
          </label>
          <input
            type="email"
            value={resume.email}
            onChange={handleChange('email')}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner shadow-slate-100 outline-none ring-primary/20 transition focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:focus:bg-slate-950"
          />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.2fr,0.9fr]">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Phone
          </label>
          <input
            type="tel"
            value={resume.phone}
            onChange={handleChange('phone')}
            placeholder="+91 98765 43210"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner shadow-slate-100 outline-none ring-primary/20 transition focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:focus:bg-slate-950"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Role / Headline
          </label>
          <input
            type="text"
            value={resume.headline || ''}
            onChange={handleChange('headline')}
            placeholder="Frontend Developer • React"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner shadow-slate-100 outline-none ring-primary/20 transition focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:focus:bg-slate-950"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Skills
          </label>
          {suggestion && (
            <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
              <span className="font-semibold text-primary">AI Suggestion:</span> {suggestion}
            </p>
          )}
        </div>
        <textarea
          rows={3}
          value={resume.skills}
          onChange={handleChange('skills')}
          placeholder="React, JavaScript, TypeScript, Tailwind CSS, REST APIs..."
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner shadow-slate-100 outline-none ring-primary/20 transition focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:focus:bg-slate-950"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Education
          </label>
          <textarea
            rows={4}
            value={resume.education}
            onChange={handleChange('education')}
            placeholder={`B.Tech in Computer Science\nCollege name • 2020 – 2024\nCGPA / Percentage`}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner shadow-slate-100 outline-none ring-primary/20 transition focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:focus:bg-slate-950"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Experience / Projects
          </label>
          <textarea
            rows={4}
            value={resume.experience}
            onChange={handleChange('experience')}
            placeholder={`AI Resume Builder • Personal project\n- Built with React, Tailwind, html2pdf.js\n- Live preview, templates, and dark mode`}
            className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-inner shadow-slate-100 outline-none ring-primary/20 transition focus:bg-white focus:ring-2 dark:border-slate-700 dark:bg-slate-900 dark:shadow-none dark:focus:bg-slate-950"
          />
        </div>
      </div>

      <div className="mt-2 space-y-2 rounded-2xl bg-slate-50 px-3.5 py-3 text-[0.72rem] text-slate-500 ring-1 ring-dashed ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-700">
        <div className="mb-1 flex items-center justify-between">
          <p className="font-semibold tracking-[0.18em] text-slate-600 dark:text-slate-200">
            SECTION ORDER
          </p>
          <p className="text-[0.65rem] text-slate-400 dark:text-slate-500">Reorder on resume</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {sectionOrder.map((id, index) => (
            <div
              key={id}
              className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-[0.7rem] font-medium text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:ring-slate-600"
            >
              <span>{SECTION_LABELS[id]}</span>
              <div className="flex">
                <button
                  type="button"
                  onClick={() => moveSection(index, -1)}
                  className="px-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 dark:hover:text-slate-50"
                  disabled={index === 0}
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveSection(index, 1)}
                  className="px-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 dark:hover:text-slate-50"
                  disabled={index === sectionOrder.length - 1}
                >
                  ↓
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}

