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
  IsNotEmpty,
  Matches,
  ValidationError,
  validate,
} from 'class-validator';

@Entity({ name: 'SocialNetworks' })
class SocialNetwork {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Social network type is required' })
  public socialNetworkType: string;

  @Column('text')
  @IsNotEmpty({ message: 'URL is required' })
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, {
    message: 'Invalid URL format',
  })
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

  public async isValid(): Promise<boolean> {
    const errors = await this.validateCreation();

    return errors.length === 0;
  }

  public async validateCreation(): Promise<Array<ValidationError>> {
    return await validate(this);
  }
}

export default SocialNetwork;
