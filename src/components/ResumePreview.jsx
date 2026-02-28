import { forwardRef } from 'react';
import TemplateOne from './TemplateOne.jsx';
import TemplateTwo from './TemplateTwo.jsx';

const ResumePreview = forwardRef(function ResumePreview(
  { resume, selectedTemplate, sectionOrder },
  ref,
) {
  return (
    <div
      ref={ref}
      className="mx-auto aspect-[210/297] max-h-[80vh] w-full max-w-[820px] overflow-hidden rounded-[1.25rem] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.35)] ring-1 ring-slate-200 dark:bg-white"
    >
      {selectedTemplate === 'template-two' ? (
        <TemplateTwo resume={resume} sectionOrder={sectionOrder} />
      ) : (
        <TemplateOne resume={resume} sectionOrder={sectionOrder} />
      )}
    </div>
  );
});

export default ResumePreview;

