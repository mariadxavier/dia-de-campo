import FeaturedContent from '../helpers/FeaturedContent';
import { TechnicalContentArticle } from '@/src/components';

export default function TechnicalContentPreview() {
  const featuredContent = FeaturedContent.getTechnicalContent();
  return (
    <>
      <div className='flex flex-col gap-5 w-full lg:flex-row lg:gap-6'>
        {featuredContent &&
          featuredContent.map((content) => (
            <TechnicalContentArticle key={content.id} content={content} />
          ))}
      </div>
    </>
  );
}
