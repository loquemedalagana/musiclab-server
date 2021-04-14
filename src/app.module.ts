import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { Tag } from './entities/tag/tag.entity';
import { YoutubeVideo } from './entities/youtube/youtube-video.entity';
import { YoutubeChannel } from './entities/youtube/youtube-channel.entity';
import { User } from './entities/user/user.entity';
import { Role } from './entities/user/role.entity';
import { Verification } from './entities/user/verification.entity';
import { PrivateProfile } from './entities/user/private.profile.entity';
import { PublicProfile } from './entities/user/public.profile.entity';

// middlewares
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { MailModule } from './mail/mail.module';
import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UploadsModule } from './uploads/uploads.module';
import { AuthModule } from './auth/auth.module';

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

        TRANSLOADIT_KEY: Joi.string(),
        TRANSLOADIT_SECRET: Joi.string(),
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
      entities: [
        Tag,
        YoutubeVideo,
        YoutubeChannel,
        // User,
        // Role,
        // Verification,
        // PrivateProfile,
        // PublicProfile,
      ],
      autoLoadEntities: true,
      charset: 'utf8mb4',
    }),
    ScheduleModule.forRoot(),
    YoutubeChannelsModule,
    YoutubeVideosModule.forRoot({
      youtubeApiKey: process.env.GOOGLE_API_KEY,
    }),
    TagsModule,
    /*
    MailModule.forRoot({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN_NAME,
      fromEmail: process.env.MAILGUN_FROM_EMAIL,
    }),
    UsersModule,
    NotificationsModule,
    UploadsModule,
    AuthModule.forRoot({
      googleId: process.env.GOOGLE_ID,
      googleSecret: process.env.GOOGLE_SECRET,
      kakaoId: process.env.KAKAO_ID,
      facebookClientId: process.env.FACEBOOK_CLIENT_ID,
      facebookSecret: process.env.FACEBOOK_SECRET,
      facebookId: process.env.FACEBOOK_ID,
    }),
    * */
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
