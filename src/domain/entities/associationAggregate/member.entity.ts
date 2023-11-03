import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import ERoles from './enums/Roles';
import Association from './association.entity';

@Entity({ name: 'Members' })
class Member {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('text')
  public surName: string;

  @Column('enum')
  public role: ERoles;

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

  @Column('uuid')
  public CreatedBy: string;

  @Column('uuid')
  public UpdatedBy: string;
}

export default Member;
