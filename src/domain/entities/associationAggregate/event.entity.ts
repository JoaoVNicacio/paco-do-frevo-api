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

@Entity('Events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Event type is required' })
  public eventType: string;

  @Column({ type: 'timestamp' })
  @Type(() => Date)
  public dateOfAccomplishment: Date;

  @Column({ type: 'int' })
  @IsInt({ message: 'Participants amount must be an integer' })
  @Min(0)
  public participantsAmount: number;

  @ManyToOne(() => Association, (association) => association.events)
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

export default Event;
