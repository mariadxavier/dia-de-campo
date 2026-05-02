type AdBannerProps = {
  bgColor:string;
};
export default function AdBanner({bgColor}: AdBannerProps) {
  return (
    <div className={`flex justify-center bg-(${bgColor}) p-6`}>
      <div className="bg-(--color-white) w-[728px] h-[90px] border border-solid border-yellow-300 text-yellow-300">
        banner de publicidade 728x90
      </div>
    </div>
  );
}
