import Link from "next/link";
import { Image } from "@/src/components";
import SocialMedia from "../helpers/SocialMedia";
import Logo from '../assets/images/logo.svg';

export default function SocialMediaLink() {
  const socialMedias = SocialMedia.getSocialMedia();

  return (
    <div className="flex flex-col gap-3 mt-6">
      <Image src={Logo.src} alt="Dia de Campo" width={120} height={160} />
      <p className="text-xs text-(--color-gray)">Portal nacional de referência em hortifruti, CEASA e agronegócio</p>
      <ul className="flex gap-2">
        {socialMedias &&
          socialMedias.map((socialMedia, idx) => (
            <li key={idx} className="flex items-center justify-center rounded-full bg-(--color-dark-blue) w-9 h-9 md:w-9 md:h-9">
              <Link href={socialMedia.link} >
                <Image src={socialMedia.icon.src} width={20} height={20} alt={socialMedia.name} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
