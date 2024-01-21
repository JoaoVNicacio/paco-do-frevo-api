import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contact from 'src/domain/entities/associationAggregate/contact.entity'; // Certifique-se de importar a entidade Contact corretamente
import ContactService from 'src/application/useCases/services/contact.service'; // Certifique-se de importar o serviço correto
import ContactController from '../controllers/contact.controller'; // Certifique-se de importar o controlador correto
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ContactRepository from '../repositories/contact.repository';
import PhoneNumber from 'src/domain/entities/associationAggregate/phone-number.entity';
import { PhoneNumberModule } from './phone-number.module';
import ContactMapper from 'src/application/mappers/contact.mapper';
import PhoneNumberMapper from 'src/application/mappers/phone-number.mapper';
import AssociationRepository from '../repositories/association.repository';
import IAssociationRepository from 'src/domain/repositories/iassociation.repository';
import IContactRepository from 'src/domain/repositories/icontact.repository';
import IContactService from 'src/domain/services/icontact.service';

@Module({
  imports: [
    PhoneNumberModule,
    TypeOrmModule.forFeature([Contact, Association, PhoneNumber]),
  ],
  controllers: [ContactController],
  providers: [
    // Services:
    {
      provide: IContactService,
      useClass: ContactService,
    },

    // Repositories:
    {
      provide: IContactRepository,
      useClass: ContactRepository,
    },
    {
      provide: IAssociationRepository,
      useClass: AssociationRepository,
    },

    // Mappers:
    ContactMapper,
    PhoneNumberMapper,
  ],
})
export class ContactModule {}
