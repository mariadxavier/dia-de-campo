type RefSection = "top" | "footer" | "mid-content" | "sidebar";

type AdBannerProps = {
  bgColor?: string;
  refSection: RefSection;
};

export default function AdBanner({ bgColor = '--color-white', refSection }: AdBannerProps) {
  const sizeBySectionMap = new Map<RefSection, string>([
    ["top", "w-[728px] h-[90px]"],
    ["footer", "w-[728px] h-[90px]"],
    ["mid-content", "w-[970px] h-[250px]"],
    ["sidebar", "w-[300px] h-[250px]"],
  ]);

  return (
    <div className={`flex justify-center bg-(${bgColor}) p-6`}>
      <div
        className={`bg-(--color-white) ${sizeBySectionMap.get(refSection)} border border-solid border-yellow-300 text-yellow-300`}
      >
        banner de publicidade
      </div>
    </div>
  );
}
