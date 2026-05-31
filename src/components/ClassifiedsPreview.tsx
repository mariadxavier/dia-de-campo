import FeaturedContent from '../helpers/FeaturedContent';
import ClassifiedsArticle from './ClassifiedsArticle';
import LinkButton from './LinkButton';

export default function ClassifiedsPreview() {
  const featuredClassifieds = FeaturedContent.getClassifieds();
  return (
    <>
      {featuredClassifieds &&
        featuredClassifieds.map((classified, idx) => (
          <ClassifiedsArticle key={idx} classified={classified} />
        ))}
      <LinkButton
        href="/contato"
        className="p-3.5 flex items-center justify-center rounded-full bg-(--color-green) text-(--color-white)"
      >
        <p>Publicar anúncio</p>
      </LinkButton>
      <LinkButton
        href="/classificados"
        className="bg-(--color-white-shell) text-(--color-dark-green) p-3.5 flex items-center justify-center rounded-full"
      >
        <p>Ver todos os classificados →</p>
      </LinkButton>
    </>
  );
}
