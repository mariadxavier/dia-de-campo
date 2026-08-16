import type { LegalSection } from '@/src/content/legal/companyInfo';

type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export default function LegalDocument({ title, lastUpdated, sections }: LegalDocumentProps) {
  return (
    <article className="w-full max-w-3xl px-5 py-8 md:px-9 md:py-12 lg:px-20">
      <header className="mb-8 border-b border-(--color-light-gray) pb-6">
        <h1 className="text-2xl font-bold text-(--color-dark-blue) md:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-(--color-gray)">Última atualização: {lastUpdated}</p>
      </header>

      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-3">
            <h2 className="text-lg font-bold text-(--color-dark-green)">{section.title}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed text-(--color-dark-gray) md:text-base">
                {paragraph}
              </p>
            ))}
            {section.list && (
              <ul className="ml-5 list-disc space-y-2 text-sm leading-relaxed text-(--color-dark-gray) md:text-base">
                {section.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
