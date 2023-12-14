import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';
import PhoneNumberMapper from './phone-number.mapper';

@Injectable()
class ContactMapper implements IMapper<Contact, ContactDTO> {
  constructor(private readonly _phoneNumberMapper: PhoneNumberMapper) {}

  public entityToDTO(entity: Contact): ContactDTO {
    if (!entity) {
      return null;
    }

    const contactDTO: ContactDTO = {
      addressTo: entity.addressTo,
      email: entity.email,
      phoneNumbers:
        entity.phoneNumbers !== null && entity.phoneNumbers.length > 0
          ? entity.phoneNumbers.map((phoneNumber) =>
              this._phoneNumberMapper.entityToDTO(phoneNumber),
            )
          : [],
    };

    return contactDTO;
  }

  public dtoToEntity(dto: ContactDTO): Contact {
    if (!dto) {
      return null;
    }

    const contact = new Contact();

    contact.addressTo = dto.addressTo;
    contact.email = dto.email;
    contact.phoneNumbers =
      dto.phoneNumbers !== null && dto.phoneNumbers.length > 0
        ? dto.phoneNumbers.map((phoneNumber) =>
            this._phoneNumberMapper.dtoToEntity(phoneNumber),
          )
        : [];

    return contact;
  }
}

export default ContactMapper;
