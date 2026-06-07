export default function NewsContentQuote({ content }: { content: string }) {
  return (
    <div className="flex bg-(--color-light-green) text-(--color-green) text-lg font-semibold gap-2 rounded-lg">
      <div className="min-w-[5px] rounded-sm bg-(--color-green)" />
      <h3 className="p-2">{content}</h3>
    </div>
  );
}
