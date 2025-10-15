// backend/src/jobs.controller.ts
import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateJobDto) {
    return this.jobsService.create(dto);
  }

  @Get()
  findAll(
    @Query('title') title?: string,
    @Query('location') location?: string,
    @Query('jobType') jobType?: string,
    @Query('minSalary') minSalary?: string,
    @Query('maxSalary') maxSalary?: string,
  ) {
    const filters = {
      title,
      location,
      jobType,
      minSalary: minSalary ? Number(minSalary) : undefined,
      maxSalary: maxSalary ? Number(maxSalary) : undefined,
    };
    return this.jobsService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // Check if the id is a valid UUID, if not, return 404
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return { error: 'Invalid job ID' };
    }
    return this.jobsService.findOne(id);
  }
}
