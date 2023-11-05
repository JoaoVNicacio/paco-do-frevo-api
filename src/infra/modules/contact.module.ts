import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contact from 'src/domain/entities/associationAggregate/contact.entity'; // Certifique-se de importar a entidade Contact corretamente
import ContactService from 'src/application/useCases/services/contact.service'; // Certifique-se de importar o serviço correto
import ContactController from '../controllers/contact.controller'; // Certifique-se de importar o controlador correto
import ContactMapper from 'src/application/mappers/contact.mapper'; // Certifique-se de importar o mapper correto
import Association from 'src/domain/entities/associationAggregate/association.entity';
import ContactRepository from '../repositories/contact.repository';
import PhoneNumber from 'src/domain/entities/associationAggregate/phoneNumber.entity';
import { PhoneNumberModule } from './phoneNumber.module';

@Module({
  imports: [
    PhoneNumberModule,
    TypeOrmModule.forFeature([Contact, Association, PhoneNumber]),
  ],
  controllers: [ContactController],
  providers: [ContactRepository, ContactMapper, ContactService],
})
export class ContactModule {}
