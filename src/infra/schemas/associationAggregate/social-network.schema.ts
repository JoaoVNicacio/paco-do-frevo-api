import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import SocialNetwork from '../../../domain/aggregates/associationAggregate/social-network.entity';
import AssociationDBSchema from './association.schema';

@Entity({ name: 'SocialNetworks' })
class SocialNetworkDBSchema extends SocialNetwork {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public socialNetworkType: string;

  @Column('text')
  public url: string;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToOne(
    () => AssociationDBSchema,
    (association) => association.socialNetworks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  public association: AssociationDBSchema;

  public static fromDomainEntity(entity: SocialNetwork): SocialNetworkDBSchema {
    return entity as SocialNetworkDBSchema;
  }
}

export default SocialNetworkDBSchema;
