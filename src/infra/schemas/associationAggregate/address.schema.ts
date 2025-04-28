import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import AssociationAddress from '../../../domain/aggregates/associationAggregate/address.entity';
import AssociationDBSchema from './association.schema';

@Entity({ name: 'AssociationAddresses' })
class AssociationAddressDBSchema extends AssociationAddress {
  @PrimaryGeneratedColumn('uuid')
  public override id: string;

  @Column('text')
  public override addressSite: string;

  @Column({ type: 'text' })
  public override number: string;

  @Column('text', { nullable: true })
  public override complement: string;

  @Column('text')
  public override district: string;

  @Column('text')
  public override city: string;

  @Column('text')
  public override state: string;

  @Column('text')
  public override country: string;

  @Column('text')
  public override zipCode: string;

  @OneToOne(() => AssociationDBSchema, (address) => address.address, {
    onDelete: 'CASCADE',
  })
  public override association: AssociationDBSchema;

  @CreateDateColumn({ type: 'timestamp' })
  public override createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public override updatedAt: Date;

  @Column('uuid', { nullable: true })
  public override createdBy: string;

  @Column('uuid', { nullable: true })
  public override updatedBy: string;
}

export default AssociationAddressDBSchema;
