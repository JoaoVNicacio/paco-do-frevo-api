import SocialNetwork from "src/domain/entities/associationAggregate/social_network.entity";
import SocialNetworkDTO from "../dtos/associationDtos/social_network.dto";

 
class SocialNetworkMapper {
  static toDTO(social_network: SocialNetwork): SocialNetworkDTO {
    const social_network_DTO: SocialNetworkDTO = {
      id: social_network.id,
      addressTo: social_network.addressTo,
      email: social_network.email,
      createdAt: social_network.createdAt,
      updatedAt: social_network.updatedAt,
      createdBy: social_network.createdBy,
      updatedBy: social_network.updatedBy,
      associationId: social_network.associationId,
    };
    return social_network_DTO;
  }

  static toEntity(contactDTO: ContactDTO): Contact {
    const contact = new Contact();
    contact.id = contactDTO.id;
    contact.addressTo = contactDTO.addressTo;
    contact.email = contactDTO.email;
    contact.createdAt = contactDTO.createdAt;
    contact.updatedAt = contactDTO.updatedAt;
    contact.createdBy = contactDTO.createdBy;
    contact.updatedBy = contactDTO.updatedBy;
    contact.associationId = contactDTO.associationId;

    return contact;
  }
}

export default SocialNetworkMapper;
