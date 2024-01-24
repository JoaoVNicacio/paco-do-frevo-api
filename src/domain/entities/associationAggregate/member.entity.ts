import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {
  IsNotEmpty,
  IsInt,
  IsBoolean,
  validate,
  ValidationError,
  IsIn,
} from 'class-validator';
import Association from './association.entity';
import MemberConstants from './constants/member.constants';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'Members' })
class Member {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Name is required' })
  @AutoMap()
  public name: string;

  @Column('text')
  @IsNotEmpty({ message: 'Surname is required' })
  @AutoMap()
  public surname: string;

  @Column('text')
  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(MemberConstants.memberTypes)
  @AutoMap()
  public role: string;

  @Column({ type: 'int' })
  @IsInt({ message: 'Actuation time must be an integer' })
  @AutoMap()
  public actuationTimeInMonths: number;

  @Column('boolean')
  @IsBoolean({ message: 'isFrevoTheMainRevenueIncome must be a boolean' })
  @AutoMap()
  public isFrevoTheMainRevenueIncome: boolean;

  @ManyToOne(() => Association, (association) => association.members, {
    onDelete: 'CASCADE', // Define a exclusão em cascata no banco de dados
  })
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

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default Member;
