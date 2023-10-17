import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  private cnpj: string;

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

  public get getCnpj(): string {
    return this.cnpj;
  }

  public set setCnpj(value: string) {
    this.cnpj = value;
  }
}

export default Association;
