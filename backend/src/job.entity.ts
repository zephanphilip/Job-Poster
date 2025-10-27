
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  jobType: string; 

  @Column()
  salaryRange: string;

  @Column('text')
  description: string;

  @Column('text', { nullable: true })
  requirements: string;

  @Column('text', { nullable: true })
  responsibilities: string;

@Column({ type: 'timestamptz', nullable: true })
applicationDeadline: Date | null;

  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt: Date;

  @Column()
  experience: string;
  
  @Column()
  workmode: string;

  @Column()
  companyLogo: string;
}
