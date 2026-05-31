import LinkButton from './LinkButton';

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  sectionColor?: string;
  actionHref: string;
  actionTitle: string;
};

export default function SectionTitle({
  title,
  subtitle,
  sectionColor = '--color-green',
  actionHref,
  actionTitle,
}: SectionTitleProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3">
        <span className={`bg-(${sectionColor}) w-0.75 rounded-xs`}/>
        <div className="flex flex-col gap-1">
          <h1 className={`text-(${sectionColor === '--color-yellow' ? '--color-white' : sectionColor}) text-xl font-bold`}>{title}</h1>
          {subtitle && <p className="text-xs text-(--color-gray)">{subtitle}</p>}
        </div>
      </div>
      <LinkButton
        href={actionHref}
        className={`hidden sm:block text-sm font-semibold text-(${sectionColor})`}
      >
        {`${actionTitle} →`}
      </LinkButton>
    </div>
  );
}
