import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Association from './association.entity';

@Entity({ name: 'SocialNetworks' })
class SocialNetwork {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public socialNetworkType: string;

  @Column('text')
  public url: string;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToOne(() => Association, (association) => association.socialNetworks)
  @JoinColumn()
  public association: Association;

  setCreationStamps(userId: string): void {
    this.createdBy = userId;
  }

  setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }
}

export default SocialNetwork;
