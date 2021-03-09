/* eslint-disable-next-line @typescript-eslint/no-empty-function */
import {
  Controller,
  Get,
  Post,
  UseGuards,
  Response,
  Body,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

// guards and decorator
import { UserDecorator } from 'src/decorators/user.decorator';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/guards/not-logged-in.guard';

// entities and dtos
import { User } from 'src/entities/user/user.entity';
import { CreateAccountDto } from './dtos/create-account.dto';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  // admin guard
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: `get all users' info : ADMIN` })
  @Get()
  getUsers() {
    console.log(`find all users' data`);
  }

  @ApiOperation({ summary: `get an users' login status` })
  @UseGuards(LoggedInGuard)
  @Get('auth')
  getAuth(@UserDecorator() user: User) {
    return user;
  }

  @ApiOperation({ summary: `get an users' all notifications` })
  @UseGuards(LoggedInGuard)
  @Get('notifications')
  getMyNotifications() {
    console.log(`get an user's notifications`);
  }

  @ApiOperation({ summary: `get an users' a notification` })
  @UseGuards(LoggedInGuard)
  @Get('notifications/:id')
  getMyNotification() {
    console.log(`get an user's notification to let it read`);
  }

  @ApiOperation({ summary: `login request` })
  @UseGuards(NotLoggedInGuard)
  @Post('login')
  login(@UserDecorator() user: User) {
    console.log(user);
    return user;
  }

  @ApiOperation({ summary: `logout request` })
  @UseGuards(LoggedInGuard)
  @Post('logout')
  logout(@Response() res) {
    res.clearCookie('connect.sid', { httpOnly: true });
    return res.send('ok');
  }

  @ApiOperation({ summary: `local create account request` })
  @UseGuards(NotLoggedInGuard)
  @Post()
  createAccount(@Body() data: CreateAccountDto) {
    console.log(data);
  }

  @ApiOperation({ summary: `local register request` })
  @UseGuards(LoggedInGuard)
  @Post('add/email')
  addEmail() {}

  @ApiOperation({ summary: `add an user's personal profile` })
  @Post('add/profile')
  addPersonalInfo() {}
}
