import { Button } from "@/src/components";

type SectionTitleProps = {
  title: string;
  hasAction: boolean;
  action?: () => void | Promise<() => void>;
  actionTitle?: string;
};

export default function SectionTitle({
  title,
  hasAction,
  action,
  actionTitle,
}: SectionTitleProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <h1 className="text-(--color-leaf-green) text-4xl font-extrabold">{title.toLocaleUpperCase()}</h1>
        {hasAction && !!action && !!actionTitle && (
          <Button onClick={action} title={actionTitle} className="py-8 px-4 border-(--color-light-gray) text-(--color-green) " />
        )}
      </div>
      <hr />
    </>
  );
}
