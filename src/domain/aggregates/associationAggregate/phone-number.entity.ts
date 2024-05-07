import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Contact from './contact.entity';
import {
  IsNotEmpty,
  IsNumberString,
  Length,
  Matches,
  ValidationError,
  validate,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';
import CleanStringBuilder from 'src/shared/utils/clean-string.builder';

@Entity({ name: 'PhoneNumbers' })
class PhoneNumber extends UserStampedEntity<string> {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Country code is required' })
  @Length(2, 2, { message: 'Country code must contain exactly 2 numbers' })
  @IsNumberString()
  @AutoMap()
  @ApiProperty()
  public countryCode: string;

  @Column('text')
  @IsNotEmpty({ message: 'Area code is required' })
  @Length(2, 2, { message: 'Area code must contain exactly 2 numbers' })
  @IsNumberString()
  @AutoMap()
  @ApiProperty()
  public areaCode: string;

  @Column('text')
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^[2-5]\d{7}$|^9[7-9]\d{7}$/)
  @AutoMap()
  @ApiProperty()
  public number: string;

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

  @ManyToOne(() => Contact, (contact) => contact.phoneNumbers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public contact: Contact;

  public sanitizeEntityProperties(): void {
    if (this.number) {
      this.number = CleanStringBuilder.fromString(this.number)
        .withoutSpaces()
        .withoutDashes()
        .build();

      this.number = /^[789]/.test(this.number)
        ? this.number.padStart(9, '9')
        : this.number;
    }

    this.countryCode = this.countryCode
      ? CleanStringBuilder.fromString(this.countryCode).withoutSpaces().build()
      : this.countryCode;

    this.areaCode = this.areaCode
      ? CleanStringBuilder.fromString(this.areaCode).withoutSpaces().build()
      : this.areaCode;
  }

  public setCreationStamps(userId: string): void {
    this.createdBy = userId;
  }

  public setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default PhoneNumber;
