import Link from "next/link";
import InstagramIcon from "../assets/icons/instagram-icon.svg";
import YoutubeIcon from "../assets/icons/youtube-icon.svg";
import TwitchIcon from "../assets/icons/twitch-icon.svg";
import MailIcon from "../assets/icons/mail-icon.svg";
import { Image } from "@/src/components";
export default function SocialMediaLink() {
  const socialMedias = [
    {
      name: "Instagram",
      icon: InstagramIcon,
      link: "",
    },
    {
      name: "YoutubeIcon",
      icon: YoutubeIcon,
      link: "",
    },
    {
      name: "Twitch",
      icon: TwitchIcon,
      link: "",
    },
    {
      name: "Mail",
      icon: MailIcon,
      link: "",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-(--color-white) font-bold text-sm">SIGA-NOS</h3>
      <ul className="flex gap-4">
        {socialMedias &&
          socialMedias.map((socialMedia, idx) => (
            <li key={idx}>
              <Link href={socialMedia.link}>
                <Image src={socialMedia.icon.src} width={'20px'} height={'20px'} alt={socialMedia.name} />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
