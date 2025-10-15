// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors({
    origin: 'https://jobposter-5jh2akvjt-zephans-projects.vercel.app/jobs', 
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true,
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
