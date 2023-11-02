/* eslint-disable */
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
    public ESocialNetworkType: string;
  
    @Column('text')
    public url: string;

    @ManyToOne(() => Association, (association) => association.social_network)
    @JoinColumn()
    public association: Association;

  }
  
  export default SocialNetwork;
  