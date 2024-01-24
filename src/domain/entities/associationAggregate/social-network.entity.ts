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
import {
  IsIn,
  IsNotEmpty,
  Matches,
  ValidationError,
  validate,
} from 'class-validator';
import SocialNetworkConstants from './constants/social-network.constants';
import { AutoMap } from '@automapper/classes';

@Entity({ name: 'SocialNetworks' })
class SocialNetwork {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Social network type is required' })
  @IsIn(SocialNetworkConstants.socialNetworkTypes)
  @AutoMap()
  public socialNetworkType: string;

  @Column('text')
  @IsNotEmpty({ message: 'URL is required' })
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, {
    message: 'Invalid URL format',
  })
  @AutoMap()
  public url: string;

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @ManyToOne(() => Association, (association) => association.socialNetworks, {
    onDelete: 'CASCADE', // Define a exclusão em cascata no banco de dados
  })
  @JoinColumn()
  public association: Association;

  public set setCreationStamps(userId: string) {
    this.createdBy = userId;
  }

  public set setUpdateStamps(userId: string) {
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

export default SocialNetwork;
