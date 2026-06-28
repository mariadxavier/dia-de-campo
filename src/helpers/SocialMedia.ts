import InstagramIcon from '../assets/icons/instagram-icon.svg';
import YoutubeIcon from '../assets/icons/youtube-icon.svg';
import MailIcon from '../assets/icons/mail-icon.svg';

export default class SocialMedia {
  private static INSTAGRAM_LINK = process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM;
  private static YOUTUBE_LINK = process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE;
  private static MAIL_LINK = process.env.NEXT_PUBLIC_COMERCIAL_EMAIL_ADDRESS;

  private static socialMedia = [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      link: this.INSTAGRAM_LINK ? `${this.INSTAGRAM_LINK}` : '',
    },
    {
      name: 'Mail',
      icon: MailIcon,
      link: this.MAIL_LINK ? `mailto:${this.MAIL_LINK}` : '',
    },
    {
      name: 'YoutubeIcon',
      icon: YoutubeIcon,
      link: this.YOUTUBE_LINK ? `${this.YOUTUBE_LINK}` : '',
    },
  ];

  public static getSocialMedia() {
    return this.socialMedia;
  }
}
