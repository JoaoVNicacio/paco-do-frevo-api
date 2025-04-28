import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Event from '../../../domain/aggregates/associationAggregate/event.entity';
import AssociationDBSchema from './association.schema';

@Entity('Events')
class EventDBSchema extends Event {
  @PrimaryGeneratedColumn('uuid')
  public override id: string;

  @Column('text')
  public override eventType: string;

  @Column({ type: 'timestamp' })
  public override dateOfAccomplishment: Date;

  @Column({ type: 'int' })
  public override participantsAmount: number;

  @ManyToOne(() => AssociationDBSchema, (association) => association.events, {
    onDelete: 'CASCADE',
  })
  public override association: AssociationDBSchema;

  @Column('uuid')
  public override associationId: string;

  @CreateDateColumn({ type: 'timestamp' })
  public override createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public override updatedAt: Date;

  @Column('uuid', { nullable: true })
  public override createdBy: string;

  @Column('uuid', { nullable: true })
  public override updatedBy: string;

  public static fromDomainEntity(entity: Event): EventDBSchema {
    return entity as EventDBSchema;
  }
}

export default EventDBSchema;
