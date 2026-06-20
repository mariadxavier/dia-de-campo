type ChipProps = {
  text: string;
  badgeColor?: `--color-${string}`;
  textColor?: `--color-${string}`;
};
export default function Chip({ textColor = '--color-white', badgeColor = '--color-yellow', text }: ChipProps) {
  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-full text-(${textColor}) tracking-wide bg-(${badgeColor}) w-fit flex justify-center items-center`}
    >
      {text.toLocaleUpperCase()}
    </span>
  );
}
