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
import Association from '../../../domain/aggregates/associationAggregate/association.entity';
import AssociationAddressSchema from './address.schema';
import ContactDBSchema from './contact.schema';
import EventDBSchema from './event.schema';
import MemberDBSchema from './member.schema';
import SocialNetworkDBSchema from './social-network.schema';

@Entity({ name: 'Associations' })
class AssociationDBSchema extends Association {
  @PrimaryGeneratedColumn('uuid')
  public override id: string;

  @Column('text')
  public override name: string;

  @Column('timestamp')
  public override foundationDate: Date;

  @Column('simple-array', { nullable: true })
  public override colors: Array<string>;

  @Column('text')
  public override associationType: string;

  @Column('int')
  public override activeMembers: number;

  @Column('boolean')
  public override isSharedWithAResidence: boolean;

  @Column('boolean')
  public override hasOwnedHeadquarters: boolean;

  @Column('boolean')
  public override isLegalEntity: boolean;

  @Column({ nullable: true, default: null })
  protected cnpj: string | null | undefined;

  @Column('boolean')
  public override canIssueOwnReceipts: boolean;

  @Column('text')
  public override associationHistoryNotes: string;

  @CreateDateColumn({ type: 'timestamp' })
  public override createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public override updatedAt: Date;

  @Column('uuid', { nullable: true })
  public override createdBy: string;

  @Column('uuid', { nullable: true })
  public override updatedBy: string;

  @OneToOne(() => AssociationAddressSchema, (address) => address.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public override address: AssociationAddressSchema | null | undefined;

  @OneToMany(() => SocialNetworkDBSchema, (social) => social.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public override socialNetworks: Array<SocialNetworkDBSchema>;

  @OneToMany(() => EventDBSchema, (event) => event.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public override events: Array<EventDBSchema>;

  @OneToMany(() => MemberDBSchema, (member) => member.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public override members: Array<MemberDBSchema>;

  @OneToMany(() => ContactDBSchema, (contact) => contact.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public override contacts: Array<ContactDBSchema>;

  public static fromDomainEntity(entity: Association): AssociationDBSchema {
    return entity as AssociationDBSchema;
  }
}

export default AssociationDBSchema;
