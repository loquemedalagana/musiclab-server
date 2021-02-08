import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function musiclab() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5020);
}
musiclab();
