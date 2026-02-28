import { FiDownload, FiMoon, FiSun, FiShare2 } from 'react-icons/fi';

const templates = [
  { id: 'template-one', label: 'Classic' },
  { id: 'template-two', label: 'Modern' },
];

const accentSwatches = ['#2563eb', '#ea580c', '#16a34a', '#7c3aed', '#e11d48'];

export default function Navbar({
  theme,
  onToggleTheme,
  selectedTemplate,
  onTemplateChange,
  onDownload,
  onShare,
  primaryColor,
  onPrimaryColorChange,
}) {
  return (
    <header className="border-b border-slate-100 bg-slate-50/70 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:py-4">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-primary/90">
            Portfolio Project
          </p>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50 md:text-xl">
            AI Resume Builder
          </h1>
          <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
            Live preview, PDF export, templates, and smart suggestions.
          </p>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-white/80 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200 dark:bg-slate-900/80 dark:text-slate-300 dark:ring-slate-700 md:flex">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                type="button"
                onClick={() => onTemplateChange(tpl.id)}
                className={`rounded-full px-3 py-1 transition ${
                  selectedTemplate === tpl.id
                    ? 'bg-slate-900 text-slate-50 shadow-sm dark:bg-slate-50 dark:text-slate-900'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tpl.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-xs ring-1 ring-slate-200 dark:bg-slate-900/80 dark:ring-slate-700 md:flex">
            {accentSwatches.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => onPrimaryColorChange(color)}
                className={`h-5 w-5 rounded-full border border-slate-200 shadow-sm transition ${
                  primaryColor === color ? 'ring-2 ring-offset-2 ring-offset-slate-50 ring-slate-400' : ''
                }`}
                style={{ backgroundColor: color }}
                aria-label="Change accent color"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={onShare}
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100 md:inline-flex"
          >
            <FiShare2 className="h-4 w-4" />
            <span>Share (mock)</span>
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3.5 py-1.75 text-xs font-semibold text-slate-50 shadow-lg shadow-slate-900/40 transition hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-200 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 dark:shadow-slate-900/60"
          >
            <FiDownload className="h-4 w-4" />
            <span>Download PDF</span>
          </button>

          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

