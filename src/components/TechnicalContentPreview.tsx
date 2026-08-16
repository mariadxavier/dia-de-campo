import { TechnicalContentArticle } from '@/src/components';
import EmptyList from './EmptyList';
import { EMPTY_CONTENT_MESSAGE } from '@/src/helpers/EmptyMessages';
import { TechnicalContentListItem } from '../types';

export default function TechnicalContentPreview({ technicalContent }: { technicalContent: TechnicalContentListItem[] }) {
  if (!technicalContent || technicalContent.length === 0) {
    return <EmptyList message={EMPTY_CONTENT_MESSAGE} />;
  }

  return (
    <>
      <div className='flex flex-col gap-5 w-full lg:flex-row lg:gap-6'>
        {technicalContent.map((content) => (
          <TechnicalContentArticle key={content.id} content={content} />
        ))}
      </div>
    </>
  );
}
