import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Technology } from './technology';

@Entity()
export class Project {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column() description: string;
  @Column() url: string;
  @Column() repo: string;
  @Column() slug: string;

  @ManyToMany(() => Technology)
  @JoinTable()
  technologies: Technology[];

  @Column({ nullable: true }) imageUrl?: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
