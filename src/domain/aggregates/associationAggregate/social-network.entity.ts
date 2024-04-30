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
import { ApiProperty } from '@nestjs/swagger';
import { UserStampedEntity } from 'src/core/entities/user-stamped.entity';

@Entity({ name: 'SocialNetworks' })
class SocialNetwork extends UserStampedEntity<string> {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id: string;

  @Column('text')
  @IsNotEmpty({ message: 'Social network type is required' })
  @IsIn(SocialNetworkConstants.socialNetworkTypes)
  @AutoMap()
  @ApiProperty()
  public socialNetworkType: string;

  @Column('text')
  @IsNotEmpty({ message: 'URL is required' })
  @Matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/, {
    message: 'Invalid URL format',
  })
  @AutoMap()
  @ApiProperty()
  public url: string;

  @Column('uuid', { nullable: true })
  @ApiProperty()
  public createdBy: string;

  @Column('uuid', { nullable: true })
  @ApiProperty()
  public updatedBy: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty()
  public updatedAt: Date;

  @ManyToOne(() => Association, (association) => association.socialNetworks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public association: Association;

  public setCreationStamps(userId: string) {
    this.createdBy = userId;
  }

  public setUpdateStamps(userId: string) {
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
