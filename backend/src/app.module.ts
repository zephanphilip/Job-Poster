// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsModule } from './jobs.module';
import { Job } from './job.entity';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
   // app.module.ts (or where you configure TypeOrmModule)
TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL, // or host/port/user/pass/db
  autoLoadEntities: true,        // auto register entities from modules
  synchronize: true,             // <-- creates DB tables automatically (dev only)
  ssl: { rejectUnauthorized: false } as any, // if your DB requires SSL
}),

    JobsModule,
  ],
})
export class AppModule {}
