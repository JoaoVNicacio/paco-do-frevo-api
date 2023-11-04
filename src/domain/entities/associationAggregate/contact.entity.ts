import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PhoneNumber from './phoneNumber.entity'; // Importe a entidade PhoneNumber
import Association from './association.entity';

@Entity({ name: 'Contacts' })
class Contact {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public addressTo: string;

  @Column('text')
  public email: string;

  @OneToMany(
    () => PhoneNumber,
    (phoneNumber: PhoneNumber) => phoneNumber.contact,
  )
  public phoneNumbers: PhoneNumber[];

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  @OneToOne(() => Association)
  @JoinColumn()
  public association: Association;

  @Column('uuid')
  public associationId: string;

  public setCreationStamps(userId: string): void {
    this.createdBy = userId;
  }

  public setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }

  public isValid(): boolean {
    throw new Error('Method not implemented.');
  }
}

export default Contact;
