import { ContentJson } from '../types';
import NewsContentMedia from './NewsContentMedia';
import NewsContentQuote from './NewsContentQuote';

type NewsDetailContentProps = {
  content: ContentJson;
  className?: string;
};
export default function NewsDetailContent({ content, className }: NewsDetailContentProps) {
  return (
    <section className={`w-full flex flex-col gap-4 text-(--color-dark-blue) md:gap-6 xl:max-w-[1440px] ${className}`}>
      {content &&
        content.map((elem, idx) => {
          switch (elem.type) {
            case 'image':
              return <NewsContentMedia key={idx} contentUrl={elem.content} />;
            case 'quote':
              return <NewsContentQuote key={idx} content={elem.content} />;
            case 'subtitle':
              return (
                <h3 key={idx} className="font-bold text-2xl">
                  {elem.content}
                </h3>
              );
            case 'paragraph':
            default:
              return (
                <p key={idx} className="text-lg">
                  {elem.content}
                </p>
              );
          }
        })}
    </section>
  );
}
