import { Module } from '@nestjs/common';
import * as Joi from 'joi';
// modules
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeChannelsModule } from './youtube-channels/youtube-channels.module';
import { YoutubeVideosModule } from './youtube-videos/youtube-videos.module';
import { TagsModule } from './tags/tags.module';
// entities
import { Tag } from './tags/entities/tag.entity';
import { YoutubeVideo } from './youtube-videos/entities/youtube-video.entity';
import { YoutubeChannel } from './youtube-channels/entities/youtube-channel.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'dev'
          ? '.env.dev'
          : 'production'
          ? '.env'
          : '.env.test',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'production', 'test').required(),
        DB_HOST: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),

        GOOGLE_API_KEY: Joi.string(),
        MAILGUN_FROM_EMAIL: Joi.string(),
        MAILGUN_DOMAIN_NAME: Joi.string(),
        MAILGUN_API_KEY: Joi.string(),

        AWS_ACCESS_KEY_ID: Joi.string(),
        AWS_SECRET_KEY: Joi.string(),

        SERVERURL: Joi.string(),
        CLIENTURL: Joi.string(),

        KAKAO_ID: Joi.string(),

        FACEBOOK_ID: Joi.string(),
        FACEBOOK_SECRET: Joi.string(),
        FACEBOOK_CLIENT_ID: Joi.string(),

        GOOGLE_ID: Joi.string(),
        GOOGLE_SECRET: Joi.string(),

        COOKIE_SECRET: Joi.string(),
        SESSION_SECRET: Joi.string(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV !== 'production',
      logging:
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test',
      entities: [Tag, YoutubeVideo, YoutubeChannel],
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    YoutubeChannelsModule,
    YoutubeVideosModule.forRoot({
      youtubeApiKey: process.env.GOOGLE_API_KEY,
    }),
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
