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
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

@Entity({ name: 'Members' })
class Member extends UserStampedEntity<string> {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Name is required' })
  @AutoMap()
  @ApiProperty()
  public name: string;

  @Column('text')
  @IsNotEmpty({ message: 'Surname is required' })
  @AutoMap()
  @ApiProperty()
  public surname: string;

  @Column('text')
  @IsNotEmpty({ message: 'Role is required' })
  @IsIn(MemberConstants.memberTypes)
  @AutoMap()
  @ApiProperty()
  public role: string;

  @Column({ type: 'int' })
  @IsInt({ message: 'Actuation time must be an integer' })
  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;

  @Column('boolean')
  @IsBoolean({ message: 'isFrevoTheMainRevenueIncome must be a boolean' })
  @AutoMap()
  @ApiProperty()
  public isFrevoTheMainRevenueIncome: boolean;

  @ManyToOne(() => Association, (association) => association.members, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public association: Association;

  @Column('uuid')
  @ApiProperty()
  public associationId: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  @ApiProperty()
  public createdBy: string;

  @Column('uuid', { nullable: true })
  @ApiProperty()
  public updatedBy: string;

  public sanitizeEntityProperties(): void {
    this.name = this.name
      ? CleanStringBuilder.fromString(this.name)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.name;

    this.surname = this.surname
      ? CleanStringBuilder.fromString(this.surname)
          .withoutUnnecessarySpaces()
          .withoutSlashes()
          .toInitCap(true)
          .build()
      : this.surname;
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }

  public setCreationStamps(userId: string): void {
    this.createdBy = userId;
  }

  public setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }
}

export default Member;
