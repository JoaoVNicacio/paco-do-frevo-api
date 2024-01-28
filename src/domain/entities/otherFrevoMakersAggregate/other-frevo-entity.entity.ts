import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
  ValidationError,
  validate,
} from 'class-validator';
import OtherFrevoEntityAddress from './other-frevo-entity-address.entity';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

/** This class represents an Carnival Association with its various properties, relationships and behaviour. */
@Entity({ name: 'OtherFrevoEntities' })
class OtherFrevoEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @AutoMap()
  @ApiProperty()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @AutoMap()
  @ApiProperty()
  public type: string;

  @IsNotEmpty()
  @IsString()
  @Column('text')
  @AutoMap()
  @ApiProperty()
  public entityHistoryNotes: string;

  @IsInt()
  @Column('int')
  @AutoMap()
  @ApiProperty()
  public actuationTimeInMonths: number;

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

  @OneToOne(
    () => OtherFrevoEntityAddress,
    (address) => address.otherFrevoEntity,
    { cascade: true, onDelete: 'CASCADE' },
  )
  @JoinColumn()
  @ValidateNested()
  @AutoMap()
  @ApiProperty()
  public address: OtherFrevoEntityAddress;

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

export default OtherFrevoEntity;
