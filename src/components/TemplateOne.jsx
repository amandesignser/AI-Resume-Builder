const SectionHeading = ({ children }) => (
  <h2 className="mb-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
    {children}
  </h2>
);

export default function TemplateOne({ resume, sectionOrder }) {
  const { fullName, email, phone, headline, skills, education, experience } = resume;

  const renderSection = (id) => {
    switch (id) {
      case 'skills':
        if (!skills?.trim()) return null;
        return (
          <section className="mb-3 last:mb-0">
            <SectionHeading>Skills</SectionHeading>
            <p className="whitespace-pre-wrap text-[0.74rem] leading-relaxed text-slate-700">
              {skills}
            </p>
          </section>
        );
      case 'education':
        if (!education?.trim()) return null;
        return (
          <section className="mb-3 last:mb-0">
            <SectionHeading>Education</SectionHeading>
            <p className="whitespace-pre-wrap text-[0.74rem] leading-relaxed text-slate-700">
              {education}
            </p>
          </section>
        );
      case 'experience':
        if (!experience?.trim()) return null;
        return (
          <section className="mb-3 last:mb-0">
            <SectionHeading>Experience & Projects</SectionHeading>
            <p className="whitespace-pre-wrap text-[0.74rem] leading-relaxed text-slate-700">
              {experience}
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <header className="border-b border-slate-200 bg-slate-50/80 px-9 py-7">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {fullName || 'Your Name'}
            </h1>
            <p className="mt-1 text-[0.8rem] font-medium uppercase tracking-[0.22em] text-slate-500">
              {headline || 'Your Role / Headline'}
            </p>
          </div>
          <div className="text-right text-[0.72rem] leading-relaxed text-slate-600">
            {email && <p>{email}</p>}
            {phone && <p>{phone}</p>}
          </div>
        </div>
        <div className="mt-4 h-1 w-16 rounded-full bg-[var(--primary)]" />
      </header>

      <main className="flex-1 px-9 pb-9 pt-7">
        {sectionOrder.map((id) => (
          <div key={id}>{renderSection(id)}</div>
        ))}
      </main>
    </div>
  );
}

