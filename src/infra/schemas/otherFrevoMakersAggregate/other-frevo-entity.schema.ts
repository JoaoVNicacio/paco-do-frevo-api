import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import OtherFrevoEntity from '../../../domain/aggregates/otherFrevoMakersAggregate/other-frevo-entity.entity';
import OtherFrevoEntityAddressDBSchema from './other-frevo-entity-address.schema';

/** This class represents an Carnival Association with its various properties, relationships and behaviour. */
@Entity({ name: 'OtherFrevoEntities' })
class OtherFrevoEntityDBSchema extends OtherFrevoEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('text')
  public type: string;

  @Column('text')
  public entityHistoryNotes: string;

  @Column('int')
  public actuationTimeInMonths: number;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  @OneToOne(
    () => OtherFrevoEntityAddressDBSchema,
    (address) => address.otherFrevoEntity,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  public address: OtherFrevoEntityAddressDBSchema | null | undefined;

  public static fromDomainEntity(
    entity: OtherFrevoEntity,
  ): OtherFrevoEntityDBSchema {
    return entity as OtherFrevoEntityDBSchema;
  }
}

export default OtherFrevoEntityDBSchema;
