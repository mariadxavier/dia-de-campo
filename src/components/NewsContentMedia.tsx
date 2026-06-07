import Image from './Image';

type NewsContentMediaProps = {
  contentUrl: string;
};

export default function NewsContentMedia({ contentUrl }: NewsContentMediaProps) {
  return (
    <div className="flex items-center justify-center p-5 md:p-8">
      <Image
        src={contentUrl}
        alt={'Imagem complementar'}
        width={1000}
        height={700}
        className="w-full sm:w-1/2 md:w-2/3 h-[160px] sm:h-[240px] md:h-[320px] lg:h-[480px]"
      />
    </div>
  );
}
