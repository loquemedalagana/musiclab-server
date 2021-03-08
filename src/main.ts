import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as hpp from 'hpp';
import { AppModule } from './app.module';

const config = new DocumentBuilder()
  .setTitle('musiclab api')
  .setDescription('Music sseolprise api documentation')
  .setVersion('1.5')
  .addTag('Yada')
  .addCookieAuth('connect.sid')
  .build();

// https://docs.nestjs.com/openapi/introduction

async function musiclab() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'production') {
    app.enable('trust proxy');
    app.enableCors({
      origin: 'https://musicsseolprise.com',
      credentials: true,
    });
    app.use(helmet());
    app.use(hpp());
  } else {
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
  }

  await app.listen(5000);
}
musiclab();
