export default function KPICard({
  value,
  description,
  className,
  cardColor = "--color-dark-green",
  textColor = "--color-yellow",
}: {
  value: string;
  description: string;
  className?: string;
  cardColor?: string;
  textColor?: string;
}) {
  return (
    <div
      className={`p-3.5 flex flex-col gap-0.5 rounded-xl bg-(${cardColor}) md:py-5 md:px-6 ${className}`}
    >
      <h1 className={`text-xl md:text-3xl font-bold text-(${textColor})`}>
        {value}
      </h1>
      <p
        className={`text-[11px] md:text-sm text-(${textColor})`}
      >
        {description}
      </p>
    </div>
  );
}
