import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MailService } from './mail.service';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { UserDecorator } from 'src/decorators/user.decorator';
import { User } from 'src/entities/user/user.entity';

@ApiTags('MAILER')
@Controller('api/mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: `request an user's verification email again` })
  @UseGuards(LoggedInGuard)
  @Get('verification')
  sendVerification(@UserDecorator() user: User) {
    return this.mailService.sendVerificationEmail(user);
  }

  @ApiOperation({ summary: `request an user's find password email again` })
  @Get('find-password')
  findPassword(@Query('email') email: string) {
    return this.mailService.sendFindPasswordEmail(email);
  }

  // send personal mail (only by admin)
}
