import mapper from 'src/application/mappers/mapper';
import generateAddressProfile from '../address.profile';
import generateAssociationProfile from '../association.profile';
import generateContactProfile from '../contact.profile';
import generateEventProfile from '../event.profile';
import generateMemberProfile from '../member.profile';
import generateOtherFrevoEntityProfile from '../other-frevo-entity.profile';
import generatePhoneNumberProfile from '../phone-number.profile';
import generateSocialNetworkProfile from '../social-network.profile';

/**
 * The function `injectProfiles` imports and calls functions to generate profiles,
 * being an entrypoint to AutoMapper profiles.
 */
function injectProfiles() {
  generatePhoneNumberProfile(mapper);
  generateContactProfile(mapper);
  generateAddressProfile(mapper);
  generateEventProfile(mapper);
  generateSocialNetworkProfile(mapper);
  generateMemberProfile(mapper);
  generateAssociationProfile(mapper);
  generateOtherFrevoEntityProfile(mapper);
}

export default injectProfiles;
