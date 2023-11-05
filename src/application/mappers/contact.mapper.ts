import Contact from 'src/domain/entities/associationAggregate/contact.entity';
import ContactDTO from 'src/application/dtos/associationDtos/contact.dto';
import IMapper from './ientity.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
class ContactMapper implements IMapper<Contact, ContactDTO> {
  public entityToDTO(entity: Contact): ContactDTO {
    const contactDTO: ContactDTO = {
      id: entity.id,
      addressTo: entity.addressTo,
      email: entity.email,
    };

    return contactDTO;
  }

  public dtoToEntity(dto: ContactDTO): Contact {
    const contact = new Contact();
    contact.id = dto.id;
    contact.addressTo = dto.addressTo;
    contact.email = dto.email;

    return contact;
  }
}

export default ContactMapper;
