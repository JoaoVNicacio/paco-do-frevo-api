import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import AssociationAddress from './address.entity';
import { ValidationResult } from 'joi';
import AssociationValidation from './validations/association.validation';
import SocialNetwork from './social_network.entity';

@Entity({ name: 'Associations' })
class Association {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column('timestamp')
  public foundationDate: Date;

  @Column('uuid')
  public addressId: string;

  @Column('simple-array', { nullable: true })
  public colors: Array<string>;

  @Column('text')
  public associationType: string;

  @Column('int')
  public activeMembers: number;

  @Column('boolean')
  public isSharedWithAResidence: boolean;

  @Column('boolean')
  public hasOwnedHeadquarters: boolean;

  @Column('boolean')
  public isLegalEntity: boolean;

  @Column({ nullable: true })
  private cnpj: string | null;

  @Column('boolean')
  public canIssueOwnReceipts: boolean;

  @Column('text')
  public associationHistoryNotes: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date;

  @Column('uuid')
  public createdBy: string;

  @Column('uuid')
  public updatedBy: string;

  @OneToOne(() => AssociationAddress, (address) => address.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public address: AssociationAddress;

  @OneToMany(() => SocialNetwork, (social) => social.association)
  @JoinColumn()
  public social_network: SocialNetwork;

  public get getCnpj(): string {
    return this.cnpj;
  }

  public set setCnpj(value: string) {
    this.cnpj = value;
  }

  public isValid(): ValidationResult {
    return new AssociationValidation().validate(this);
  }
}

export default Association;
