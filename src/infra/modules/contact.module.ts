import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contact from 'src/domain/entities/associationAggregate/contact.entity'; // Certifique-se de importar a entidade Contact corretamente
import ContactService from 'src/application/useCases/services/contact.service'; // Certifique-se de importar o serviço correto
import ContactController from '../controllers/contact.controller'; // Certifique-se de importar o controlador correto
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ContactRepository from '../repositories/contact.repository';
import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';
import { PhoneNumberModule } from './phoneNumber.module';
import ContactMapper from 'src/application/mappers/contact.mapper';
import PhoneNumberMapper from 'src/application/mappers/phoneNumber.mapper';
import AssociationRepository from '../repositories/association.repository';

@Module({
  imports: [
    PhoneNumberModule,
    TypeOrmModule.forFeature([Contact, Association, PhoneNumber]),
  ],
  controllers: [ContactController],
  providers: [
    ContactRepository,
    ContactMapper,
    ContactService,
    AssociationRepository,
    PhoneNumberMapper,
  ],
})
export class ContactModule {}
