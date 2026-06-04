export default function KPICard({
  metricValue,
  metricDescription,
}: {
  metricValue: string;
  metricDescription: string;
}) {
  return (
    <div className="p-3.5 flex flex-col gap-0.5 rounded-xl bg-(--color-dark-green) md:py-5 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold text-(--color-yellow)">{metricValue}</h1>
      <p className="text-xs md:text-sm text-(--color-light-green)">{metricDescription}</p>
    </div>
  );
}
