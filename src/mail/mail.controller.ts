import { Controller, Get, Query } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';

@ApiTags('MAILER')
@Controller('api/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: `request an user's verification email again` })
  @Get('verification')
  sendVerification(@Query('email') email: string) {
    console.log(`request verification email to ${email} again`);
  }
}
