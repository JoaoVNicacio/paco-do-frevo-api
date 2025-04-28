import Contact from '../../../domain/aggregates/associationAggregate/contact.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import AssociationDBSchema from './association.schema';
import PhoneNumberDBSchema from './phone-number.schema';

@Entity('Contacts')
class ContactDBSchema extends Contact {
  @PrimaryGeneratedColumn('uuid')
  public override id: string;

  @Column('text')
  public override addressTo: string;

  @Column('text')
  public override email: string;

  @OneToMany(
    () => PhoneNumberDBSchema,
    (phoneNumber: PhoneNumberDBSchema) => phoneNumber.contact,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  public override phoneNumbers: Array<PhoneNumberDBSchema>;

  @CreateDateColumn({ type: 'timestamp' })
  public override createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public override updatedAt: Date;

  @Column('uuid', { nullable: true })
  public override createdBy: string;

  @Column('uuid', { nullable: true })
  public override updatedBy: string;

  @ManyToOne(() => AssociationDBSchema, (association) => association.contacts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public override association: AssociationDBSchema;

  public static fromDomainEntity(entity: Contact): ContactDBSchema {
    return entity as ContactDBSchema;
  }
}

export default ContactDBSchema;
