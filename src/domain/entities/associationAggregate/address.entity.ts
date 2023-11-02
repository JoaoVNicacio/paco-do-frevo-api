import IAddress from '../entityInterfaces/iaddress.entity-base';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Association from './association.entity';

@Entity({ name: 'AssociationAddresses' })
class AssociationAddress implements IAddress {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public addressSite: string;

  @Column({ type: 'text' })
  public number: string;

  @Column('text')
  public complement: string;

  @Column('text')
  public district: string;

  @Column('text')
  public city: string;

  @Column('text')
  public state: string;

  @Column('text')
  public country: string;

  @Column('text')
  public zipCode: string;

  @OneToOne(() => Association, (address) => address.address)
  public association: Association;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

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

export default AssociationAddress;
