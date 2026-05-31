import Link from "next/link";
import { Image } from "@/src/components";
import SocialMedia from "../helpers/SocialMedia";

export default function SocialMediaLink() {
  const socialMedias = SocialMedia.getSocialMedia();

  return (
    <div className="flex flex-col gap-3 mt-6">
      <p className="text-xs text-(--color-gray)">Portal nacional de referência em hortifruti, CEASA e agronegócio</p>
      <ul className="flex gap-2">
        {socialMedias &&
          socialMedias.map((socialMedia, idx) => (
            <li key={idx}>
              <Link href={socialMedia.link}>
                <Image src={socialMedia.icon.src} width={20} height={20} alt={socialMedia.name} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
