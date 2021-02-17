import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function musiclab() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: 'https://musicsseolprise.com',
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
  }

  await app.listen(5000);
}
musiclab();
