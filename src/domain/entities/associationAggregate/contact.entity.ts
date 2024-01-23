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
import PhoneNumber from './phone-number.entity';
import Association from './association.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  ValidationError,
  validate,
} from 'class-validator';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'Contacts' })
class Contact {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'The person to be addressed is required' })
  @AutoMap()
  public addressTo: string;

  @Column('text')
  @IsEmail({}, { message: 'Invalid email format' })
  @AutoMap()
  public email: string;

  @OneToMany(
    () => PhoneNumber,
    (phoneNumber: PhoneNumber) => phoneNumber.contact,
    {
      cascade: true,
      onDelete: 'CASCADE',
    },
  )
  @ValidateNested({ each: true })
  @AutoMap()
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

  @OneToOne(() => Association, (association) => association.address, {
    onDelete: 'CASCADE', // Define a exclusão em cascata no banco de dados
  })
  @JoinColumn()
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
