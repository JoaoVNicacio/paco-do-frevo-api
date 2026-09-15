import ESocialNetworkType from '../enums/esocial-network-type.enum';

class SocialNetworkConstants {
  public static readonly SOCIAL_NETWORK_TYPES: Array<string> = [
    ESocialNetworkType.facebook,
    ESocialNetworkType.instagram,
    ESocialNetworkType.twitter,
    ESocialNetworkType.tiktok,
    ESocialNetworkType.linkedin,
  ];
}

export default SocialNetworkConstants;
