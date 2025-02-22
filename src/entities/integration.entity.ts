import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('integration')
export class Integration {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  accountName: string;

  @Column('text')
  chatwootUrl: string;

  @Column('varchar')
  chatwootToken: string;

  @Column('text')
  wppConnectUrl: string;

  @Column('varchar')
  wppConnectSecret: string;

  @Column('boolean', { default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
