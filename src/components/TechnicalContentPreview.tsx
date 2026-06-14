import { TechnicalContentArticle } from '@/src/components';
import { TechnicalContentListItem } from '../types';

export default function TechnicalContentPreview({technicalContent}: {technicalContent: TechnicalContentListItem[]}) {
  return (
    <>
      <div className='flex flex-col gap-5 w-full lg:flex-row lg:gap-6'>
        {technicalContent &&
          technicalContent.map((content) => (
            <TechnicalContentArticle key={content.id} content={content} />
          ))}
      </div>
    </>
  );
}
