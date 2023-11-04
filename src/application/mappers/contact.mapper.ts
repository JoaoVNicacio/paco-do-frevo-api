import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
class ContactMapper {
  static toDTO(contact: Contact): ContactDTO {
    const contactDTO: ContactDTO = {
      id: contact.id,
      addressTo: contact.addressTo,
      email: contact.email,
      createdAt: contact.createdAt,
      updatedAt: contact.updatedAt,
      createdBy: contact.createdBy,
      updatedBy: contact.updatedBy,
      associationId: contact.associationId,
    };
    return contactDTO;
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

export default ContactMapper;
