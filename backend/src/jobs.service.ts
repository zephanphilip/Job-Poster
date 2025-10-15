// backend/src/jobs.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Job } from './job.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectRepository(Job)
    private jobsRepo: Repository<Job>,
  ) {}

  async create(dto: CreateJobDto) {
    const job = this.jobsRepo.create({
      ...dto,
      applicationDeadline: dto.applicationDeadline ? new Date(dto.applicationDeadline) : null,
    });
    return this.jobsRepo.save(job);
  }

  async findAll(filters: {
    title?: string;
    location?: string;
    jobType?: string;
    minSalary?: number;
    maxSalary?: number;
  }) {
    const qb = this.jobsRepo.createQueryBuilder('job');

    if (filters.title) qb.andWhere('LOWER(job.title) LIKE :title', { title: `%${filters.title.toLowerCase()}%` });
    if (filters.location) qb.andWhere('LOWER(job.location) LIKE :location', { location: `%${filters.location.toLowerCase()}%` });
    if (filters.jobType) qb.andWhere('job.jobType = :jobType', { jobType: filters.jobType });

    // salaryRange stored as string like "20000-40000" or "$20k-$40k"
    if (filters.minSalary || filters.maxSalary) {
      // naive parsing: try extract first number from salaryRange
      if (filters.minSalary) qb.andWhere(`COALESCE(NULLIF(REGEXP_REPLACE(job.salaryRange, '\\D','','g'),''), '0')::int >= :min`, { min: filters.minSalary });
      if (filters.maxSalary) qb.andWhere(`COALESCE(NULLIF(REGEXP_REPLACE(job.salaryRange, '\\D','','g'),''), '0')::int <= :max`, { max: filters.maxSalary });
    }

    return qb.orderBy('job.createdAt', 'DESC').getMany();
  }

  async findOne(id: string) {
    return this.jobsRepo.findOne({ where: { id } });
  }
}
