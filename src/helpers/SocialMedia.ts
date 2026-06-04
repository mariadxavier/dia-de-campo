import InstagramIcon from '../assets/icons/instagram-icon.svg';
import YoutubeIcon from '../assets/icons/youtube-icon.svg';
import MailIcon from '../assets/icons/mail-icon.svg';

export default class SocialMedia {
  private static socialMedia = [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      link: '',
    },
    {
      name: 'Mail',
      icon: MailIcon,
      link: '',
    },
    {
      name: 'YoutubeIcon',
      icon: YoutubeIcon,
      link: '',
    },
  ];

  public static getSocialMedia() {
    return this.socialMedia;
  }
}
