import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Association from './association.entity';

@Entity('Events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public eventType: string;

  @Column({ type: 'timestamp' })
  public dateOfAccomplishment: Date;

  @Column({ type: 'int' })
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
}

export default Event;
