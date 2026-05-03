import Link from "next/link";
import LinkButton from "./LinkButton";

type SectionTitleProps = {
  title: string;
  hasAction: boolean;
  actionHref?: string;
  actionTitle?: string;
  hasDivisor?: boolean;
};

export default function SectionTitle({
  title,
  hasAction,
  actionHref,
  actionTitle,
  hasDivisor = true,
}: SectionTitleProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h1 className="text-(--color-leaf-green) text-4xl font-extrabold">
            {title.toLocaleUpperCase()}
          </h1>
          {hasAction && !!actionHref && !!actionTitle && (
            <LinkButton
              children={actionTitle.toLocaleUpperCase()}
              href={actionHref}
              className="inline-flex items-center justify-center font-bold py-2 px-4 border border-(--color-light-gray) text-(--color-green)"
            />
          )}
        </div>
        {hasDivisor && <hr />}
      </div>
    </>
  );
}
