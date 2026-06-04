import FeaturedContent from '../helpers/FeaturedContent';
import ClassifiedsArticle from './ClassifiedsArticle';
import LinkButton from './LinkButton';

export default function ClassifiedsPreview() {
  const featuredClassifieds = FeaturedContent.getClassifieds();
  return (
    <div className="flex flex-col w-full gap-5 md:gap-6 px-0.5">
      <div className="flex flex-col md:flex-row w-full gap-5 md:gap-6">
        {featuredClassifieds &&
          featuredClassifieds.map((classified, idx) => (
            <ClassifiedsArticle key={idx} classified={classified} />
          ))}
      </div>
      <LinkButton
        href="/contato"
        className="p-3.5 md:px-7 max-w-[190px] flex items-center justify-center rounded-full bg-(--color-green) text-(--color-white)"
      >
        <p>Publicar anúncio</p>
      </LinkButton>
    </div>
  );
}
