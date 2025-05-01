import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Member from '../../../domain/aggregates/associationAggregate/member.entity';
import AssociationDBSchema from './association.schema';

@Entity({ name: 'Members' })
class MemberDBSchema extends Member {
  @PrimaryGeneratedColumn('uuid')
  public override id: string;

  @Column('text')
  public override name: string;

  @Column('text')
  public override surname: string;

  @Column('text')
  public override role: string;

  @Column({ type: 'int' })
  public override actuationTimeInMonths: number;

  @Column('boolean')
  public override isFrevoTheMainRevenueIncome: boolean;

  @ManyToOne(() => AssociationDBSchema, (association) => association.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public override association: AssociationDBSchema;

  @Column('uuid')
  public override associationId: string;

  @CreateDateColumn({ type: 'timestamp' })
  public override createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public override updatedAt: Date;

  @Column('uuid', { nullable: true })
  public override createdBy: string;

  @Column('uuid', { nullable: true })
  public override updatedBy: string;

  public static fromDomainEntity(entity: Member): MemberDBSchema {
    return entity as MemberDBSchema;
  }
}

export default MemberDBSchema;
