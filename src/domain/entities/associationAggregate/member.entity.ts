import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import Association from './association.entity';

@Entity({ name: 'Members' })
class Member {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('text')
  public surName: string;

  @Column('text')
  public role: string;

  @Column('text')
  public actuationTimeInMonths: string;

  @Column('boolean')
  public isFrevoTheMainRevenueIncome: boolean;

  @ManyToOne(() => Association, (association) => association.members)
  @JoinColumn()
  public association: Association;

  @Column('uuid')
  public associationId: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;
}

export default Member;
