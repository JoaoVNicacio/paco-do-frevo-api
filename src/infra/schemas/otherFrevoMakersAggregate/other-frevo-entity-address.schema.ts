import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import OtherFrevoEntityAddress from '../../../domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity-address.entity';
import OtherFrevoEntityDBSchema from './other-frevo-entity.schema';

@Entity({ name: 'OtherFrevoEntityAddresses' })
class OtherFrevoEntityAddressDBSchema extends OtherFrevoEntityAddress {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public addressSite: string;

  @Column({ type: 'text' })
  public number: string;

  @Column('text', { nullable: true })
  public complement: string | null;

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

  @OneToOne(
    () => OtherFrevoEntityDBSchema,
    (frevoEntity) => frevoEntity.address,
  )
  public otherFrevoEntity: OtherFrevoEntityDBSchema;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  public static fromDomainEntity(
    entity: OtherFrevoEntityAddress,
  ): OtherFrevoEntityAddressDBSchema {
    return entity as OtherFrevoEntityAddressDBSchema;
  }
}

export default OtherFrevoEntityAddressDBSchema;
