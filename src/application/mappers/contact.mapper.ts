import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';
import PhoneNumberMapper from './phoneNumber.mapper';

@Injectable()
class ContactMapper implements IMapper<Contact, ContactDTO> {
  constructor(private readonly _phoneNumberMapper: PhoneNumberMapper) {}

  public entityToDTO(entity: Contact): ContactDTO {
    const contactDTO: ContactDTO = {
      id: entity.id,
      addressTo: entity.addressTo,
      email: entity.email,
      phoneNumbers: entity.phoneNumbers.map((phoneNumber) =>
        this._phoneNumberMapper.entityToDTO(phoneNumber),
      ),
    };

    return contactDTO;
  }

  public dtoToEntity(dto: ContactDTO): Contact {
    const contact = new Contact();

    contact.id = dto.id;
    contact.addressTo = dto.addressTo;
    contact.email = dto.email;
    contact.phoneNumbers = dto.phoneNumbers.map((phoneNumber) =>
      this._phoneNumberMapper.dtoToEntity(phoneNumber),
    );
    return contact;
  }
}

export default ContactMapper;
