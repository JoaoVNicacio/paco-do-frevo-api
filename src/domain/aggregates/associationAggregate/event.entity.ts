import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  IsNotEmpty,
  IsInt,
  Min,
  ValidationError,
  validate,
} from 'class-validator';
import Association from './association.entity';
import { Type } from 'class-transformer';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';

@Entity('Events')
class Event extends UserStampedEntity<string> {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Event type is required' })
  @AutoMap()
  @ApiProperty()
  public eventType: string;

  @Column({ type: 'timestamp' })
  @Type(() => Date)
  @AutoMap()
  @ApiProperty()
  public dateOfAccomplishment: Date;

  @Column({ type: 'int' })
  @IsInt({ message: 'Participants amount must be an integer' })
  @Min(0)
  @AutoMap()
  @ApiProperty()
  public participantsAmount: number;

  @ManyToOne(() => Association, (association) => association.events, {
    onDelete: 'CASCADE',
  })
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

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default Event;
