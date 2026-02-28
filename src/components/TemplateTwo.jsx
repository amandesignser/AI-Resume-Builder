const SectionHeading = ({ children }) => (
  <h2 className="mb-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.26em] text-slate-400">
    {children}
  </h2>
);

export default function TemplateTwo({ resume, sectionOrder }) {
  const { fullName, email, phone, headline, skills, education, experience } = resume;

  const renderSection = (id) => {
    switch (id) {
      case 'skills':
        if (!skills?.trim()) return null;
        return (
          <section className="mb-3 last:mb-0">
            <SectionHeading>Skills</SectionHeading>
            <p className="whitespace-pre-wrap text-[0.7rem] leading-relaxed text-slate-600">
              {skills}
            </p>
          </section>
        );
      case 'education':
        if (!education?.trim()) return null;
        return (
          <section className="mb-3 last:mb-0">
            <SectionHeading>Education</SectionHeading>
            <p className="whitespace-pre-wrap text-[0.7rem] leading-relaxed text-slate-600">
              {education}
            </p>
          </section>
        );
      case 'experience':
        if (!experience?.trim()) return null;
        return (
          <section className="mb-3 last:mb-0">
            <SectionHeading>Experience & Projects</SectionHeading>
            <p className="whitespace-pre-wrap text-[0.7rem] leading-relaxed text-slate-600">
              {experience}
            </p>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-slate-50">
      <aside className="flex w-[32%] flex-col justify-between bg-slate-900 px-7 pb-7 pt-8 text-slate-100">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {fullName || 'Your Name'}
          </h1>
          <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-slate-400">
            {headline || 'Your Role'}
          </p>
          <div className="mt-4 h-[2px] w-14 rounded-full bg-[var(--primary)]" />

          <div className="mt-5 space-y-1 text-[0.7rem] text-slate-200">
            {email && <p>{email}</p>}
            {phone && <p>{phone}</p>}
          </div>
        </div>

        <div className="mt-6 space-y-2 text-[0.68rem] text-slate-300">
          <p>Designed and generated with an AI-powered resume builder.</p>
          <p>Keep content concise, impact-focused, and scannable.</p>
        </div>
      </aside>

      <main className="flex-1 px-8 pb-9 pt-7">
        {sectionOrder.map((id) => (
          <div key={id}>{renderSection(id)}</div>
        ))}
      </main>
    </div>
  );
}

