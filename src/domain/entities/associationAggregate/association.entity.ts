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
import Event from './event.entity';
import Member from './member.entity';
import { ValidationResult } from 'joi';
import AssociationValidation from './validations/association.validation';

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

  @Column('uuid', { nullable: true })
  public createdBy: string;

  @Column('uuid', { nullable: true })
  public updatedBy: string;

  @OneToOne(() => AssociationAddress, (address) => address.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public address: AssociationAddress;

  @OneToMany(() => Event, (event) => event.association, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  public events: Array<Event>;

  @OneToMany(() => Member, (member) => member.association)
  public members: Array<Member>;

  public get getCnpj(): string {
    return this.cnpj;
  }

  public set setCnpj(value: string) {
    this.cnpj = value;
  }
  public setCreationStamps(userId: string): void {
    this.createdBy = userId;
  }

  public setUpdateStamps(userId: string): void {
    this.updatedBy = userId;
  }

  public isValid(): boolean {
    return this.validateCreation().error.details.length === 0;
  }

  public validateCreation(): ValidationResult {
    return new AssociationValidation().validate(this);
  }
}

export default Association;
