import Image from './Image';

type NewsDetailCoverImageProps = {
  imgAlt: string;
  imgUrl: string;
  imgCredits: string | null;
  imgIsAi: boolean | null;
};

export default function NewsDetailCoverImage({ imgUrl, imgAlt, imgCredits, imgIsAi }: NewsDetailCoverImageProps) {
  return (
    <div className="flex justify-center p-5 md:p-8">
      <div className="relative w-full xl:w-2/3 h-[188px] sm:h-[300px] md:h-[500px] lg:h-[640px]">
        <Image
          src={imgUrl}
          alt={imgAlt}
          width={1000}
          height={700}
          className="w-full h-full object-cover"
        />
        {(imgIsAi && !imgCredits) && (
          <span className="absolute bottom-0 right-0 bg-primary-600/80 text-white text-xs px-2 py-1 rounded-tl-lg backdrop-blur-sm">
            Imagem gerada por IA.
          </span>
        )}

        {imgCredits && (
          <span className="absolute z-10 bottom-0 right-0 bg-primary-600/80 text-white text-xs px-2 py-1 rounded-tl-lg backdrop-blur-sm">
            {imgCredits}
          </span>
        )}
      </div>
    </div>
  );
}
