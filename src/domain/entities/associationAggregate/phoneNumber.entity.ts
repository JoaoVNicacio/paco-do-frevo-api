import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Contact from './contact.entity';

@Entity({ name: 'PhoneNumbers' })
class PhoneNumber {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public countryCode: string;

  @Column('text')
  public areaCode: string;

  @Column('text')
  public number: string;

  @Column('uuid')
  public contactId: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid')
  public createdBy: string;

  @Column('uuid')
  public updatedBy: string;

  @ManyToOne(() => Contact, (contact) => contact.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public contact: Contact;

  setCreationStamps(userId: string): void {
    this.createdBy = userId;
  }

  setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }

  isValid(): boolean {
    throw new Error('Method not implemented.');
  }
}

export default PhoneNumber;
