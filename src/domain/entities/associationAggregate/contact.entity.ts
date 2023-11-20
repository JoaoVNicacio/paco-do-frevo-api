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
import PhoneNumber from './phoneNumber.entity';
import Association from './association.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  ValidationError,
  validate,
} from 'class-validator';

@Entity({ name: 'Contacts' })
class Contact {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Address To is required' })
  public addressTo: string;

  @Column('text')
  @IsEmail({}, { message: 'Invalid email format' })
  public email: string;

  @OneToMany(
    () => PhoneNumber,
    (phoneNumber: PhoneNumber) => phoneNumber.contact,
  )
  @ValidateNested({ each: true })
  public phoneNumbers: Array<PhoneNumber>;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid', { nullable: true })
  @IsOptional()
  public createdBy: string;

  @Column('uuid', { nullable: true })
  @IsOptional()
  public updatedBy: string;

  @OneToOne(() => Association)
  @JoinColumn()
  @IsNotEmpty({ message: 'Association is required' })
  public association: Association;

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

export default Contact;
