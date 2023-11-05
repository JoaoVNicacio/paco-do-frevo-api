import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Contact from 'src/domain/entities/associationAggregate/contact.entity'; // Certifique-se de importar a entidade Contact corretamente
import ContactService from 'src/application/useCases/services/contact.service'; // Certifique-se de importar o serviço correto
import ContactController from '../controllers/contact.controller'; // Certifique-se de importar o controlador correto
import ContactRepository from 'src/application/useCases/services/contact.service'; // Certifique-se de importar o repositório correto
import ContactMapper from 'src/application/mappers/contact.mapper'; // Certifique-se de importar o mapper correto

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  controllers: [ContactController],
  providers: [ContactService, ContactRepository, ContactMapper],
})
export class ContactModule {}
