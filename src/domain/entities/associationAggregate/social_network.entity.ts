import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
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

  @Column('uuid')
  public createdBy: string;

  @Column('uuid')
  public updatedBy: string;

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
