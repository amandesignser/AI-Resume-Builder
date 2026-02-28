import { useEffect, useMemo, useState } from 'react';
import Home from './pages/Home.jsx';

const STORAGE_KEY = 'ai-resume-builder-data';
const THEME_KEY = 'ai-resume-builder-theme';

const defaultResume = {
  fullName: '',
  email: '',
  phone: '',
  skills: '',
  education: '',
  experience: '',
};

const defaultSectionOrder = ['skills', 'education', 'experience'];

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function parseSharedData() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const data = params.get('data');
  if (!data) return null;
  try {
    const parsed = JSON.parse(atob(data));
    return parsed;
  } catch {
    return null;
  }
}

export default function App() {
  const shared = useMemo(() => parseSharedData(), []);

  const [theme, setTheme] = useState(getInitialTheme);
  const [resume, setResume] = useState(() => {
    if (shared?.resume) return { ...defaultResume, ...shared.resume };
    if (typeof window === 'undefined') return defaultResume;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultResume;
    try {
      return { ...defaultResume, ...JSON.parse(stored).resume };
    } catch {
      return defaultResume;
    }
  });

  const [selectedTemplate, setSelectedTemplate] = useState(
    shared?.selectedTemplate || 'template-one',
  );
  const [sectionOrder, setSectionOrder] = useState(
    shared?.sectionOrder || defaultSectionOrder,
  );
  const [primaryColor, setPrimaryColor] = useState(
    shared?.primaryColor || '#2563eb',
  );

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const payload = {
      resume,
      selectedTemplate,
      sectionOrder,
      primaryColor,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [resume, selectedTemplate, sectionOrder, primaryColor]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleResumeChange = (updated) => {
    setResume((prev) => ({ ...prev, ...updated }));
  };

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleSectionOrderChange = (nextOrder) => {
    setSectionOrder(nextOrder);
  };

  const handlePrimaryColorChange = (color) => {
    setPrimaryColor(color);
  };

  return (
    <div
      className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100"
      style={{ '--primary': primaryColor }}
    >
      <Home
        theme={theme}
        resume={resume}
        onResumeChange={handleResumeChange}
        selectedTemplate={selectedTemplate}
        onTemplateChange={handleTemplateChange}
        sectionOrder={sectionOrder}
        onSectionOrderChange={handleSectionOrderChange}
        primaryColor={primaryColor}
        onPrimaryColorChange={handlePrimaryColorChange}
        onToggleTheme={handleToggleTheme}
      />
    </div>
  );
}

