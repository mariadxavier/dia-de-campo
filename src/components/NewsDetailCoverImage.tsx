import Image from './Image';

type NewsDetailCoverImageProps = {
  imgAlt: string;
  imgUrl: string;
};

export default function NewsDetailCoverImage({ imgUrl, imgAlt }: NewsDetailCoverImageProps) {
  return (
    <div className="flex item justify-center p-5 md:p-8">
      <Image
        src={imgUrl}
        alt={imgAlt}
        width={1000}
        height={700}
        className="w-full xl:w-2/3 h-[188px] sm:h-[300px] md:h-[500px] lg:h-[640px]"
      />
    </div>
  );
}
