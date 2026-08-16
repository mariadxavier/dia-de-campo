import { EMPTY_FILTER_MESSAGE } from '@/src/helpers/EmptyMessages';

type EmptyListProps = {
  message?: string;
};

export default function EmptyList({ message = EMPTY_FILTER_MESSAGE }: EmptyListProps) {
  return (
    <h3 className="flex h-full w-full items-center justify-center text-xl font-extrabold text-(--color-gray)">
      {message}
    </h3>
  );
}
