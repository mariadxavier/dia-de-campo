export default function NewsContentQuote({ content }: { content: string }) {
  return (
    <div className="flex bg-(--color-light-green) text-(--color-green) text-lg font-semibold gap-2 rounded-lg">
      <div className="min-w-[5px] rounded-sm bg-(--color-green)" />
      {content.includes("•") ? (
        <ul className="ml-4 p-2" style={{ listStyleType: "disc" }}>
          {content
            .trim()
            .split("•")
            .filter((item) => item.trim() !== "")
            .map((item, index) => (
              <li key={index}>{item.trim()}</li>
            ))}
        </ul>
      ) : (
        <h3 className="p-2">{content}</h3>
      )}
    </div>
  );
}
