/* eslint-disable-next-line @typescript-eslint/no-empty-function */
import { Controller, Get, Post } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: `get all users' info : ADMIN` })
  @Get()
  getUsers() {}

  @ApiOperation({ summary: `get an users' login status` })
  @Get('auth')
  getAuth() {}

  @ApiOperation({ summary: `get an users' all notifications` })
  @Get('notifications')
  getMyNotifications() {}

  @ApiOperation({ summary: `get an users' a notification` })
  @Get('notifications/:id')
  getMyNotification() {}

  @ApiOperation({ summary: `login request` })
  @Post('login')
  login() {}

  @ApiOperation({ summary: `logout request` })
  @Post('logout')
  logout() {}

  @ApiOperation({ summary: `local register request` })
  @Post('register')
  register() {}

  @ApiOperation({ summary: `local register request` })
  @Post('register/email')
  addEmail() {}

  @ApiOperation({ summary: `add an user's personal info` })
  @Post('register/information')
  addPersonalInfo() {}
}
