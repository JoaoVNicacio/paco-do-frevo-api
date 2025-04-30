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
  public override id: string;

  @Column('text')
  public override socialNetworkType: string;

  @Column('text')
  public override url: string;

  @Column('uuid', { nullable: true })
  public override createdBy: string;

  @Column('uuid', { nullable: true })
  public override updatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  public override createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public override updatedAt: Date;

  @ManyToOne(
    () => AssociationDBSchema,
    (association) => association.socialNetworks,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn()
  public override association: AssociationDBSchema;

  public static fromDomainEntity(entity: SocialNetwork): SocialNetworkDBSchema {
    return entity as SocialNetworkDBSchema;
  }
}

export default SocialNetworkDBSchema;
