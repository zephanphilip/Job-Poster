
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateJobDto {
  @IsNotEmpty() @IsString() title: string;
  @IsNotEmpty() @IsString() companyName: string;
  @IsNotEmpty() @IsString() location: string;
  @IsNotEmpty() @IsString() jobType: string;
  @IsNotEmpty() @IsString() salaryRange: string;
  @IsNotEmpty() @IsString() description: string;
  @IsOptional() @IsString() requirements?: string;
  @IsOptional() @IsString() responsibilities?: string;
  @IsOptional() @IsDateString() applicationDeadline?: string;
  @IsOptional() @IsString() experience?: string;
  @IsOptional() @IsString() workmode?: string;
  @IsOptional() @IsString() companyLogo?: string;
}
