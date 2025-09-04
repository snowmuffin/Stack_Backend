import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Technology {
  @PrimaryGeneratedColumn() id: number;

  @Column({ unique: true }) name: string;
  @Column({ unique: true }) slug: string;

  @Column({
    type: 'enum',
    enum: [
      'frontend',
      'backend',
      'mobile',
      'devops',
      'database',
      'cloud',
      'data',
      'ai',
    ],
  })
  category: string;

  @Column('text', { nullable: true }) description?: string;
  @Column({
    type: 'enum',
    enum: ['learning', 'familiar', 'intermediate', 'advanced', 'expert'],
    default: 'familiar',
  })
  proficiency: string;
  @Column({ nullable: true }) iconUrl?: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
