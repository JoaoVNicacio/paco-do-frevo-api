import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import PhoneNumber from '../../../domain/aggregates/associationAggregate/phone-number.entity';
import ContactDBSchema from './contact.schema';

@Entity({ name: 'PhoneNumbers' })
class PhoneNumberDBSchema extends PhoneNumber {
  @PrimaryGeneratedColumn('uuid')
  public override id: string;

  @Column('text')
  public override countryCode: string;

  @Column('text')
  public override areaCode: string;

  @Column('text')
  public override number: string;

  @CreateDateColumn({ type: 'timestamp' })
  public override createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public override updatedAt: Date;

  @Column('uuid', { nullable: true })
  public override createdBy: string;

  @Column('uuid', { nullable: true })
  public override updatedBy: string;

  @ManyToOne(() => ContactDBSchema, (contact) => contact.phoneNumbers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public override contact: ContactDBSchema;

  public static fromDomainEntity(entity: PhoneNumber): PhoneNumberDBSchema {
    return entity as PhoneNumberDBSchema;
  }
}

export default PhoneNumberDBSchema;
