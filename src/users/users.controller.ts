/* eslint-disable-next-line @typescript-eslint/no-empty-function */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';

// guards and decorator
import { UserDecorator } from 'src/decorators/user.decorator';
import { RoleCategory } from '../entities/user/role.entity';
import { Roles } from 'src/decorators/role.decorator';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { NotLoggedInGuard } from 'src/auth/guards/not-logged-in.guard';

// entities and dtos
import { User } from 'src/entities/user/user.entity';
import { CreateAccountDto } from './dtos/create-account.dto';
import { AddPersonalInfo } from './dtos/update-account.dto';

@ApiTags('USERS')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // admin guard
  @ApiCookieAuth('connect.sid')
  @ApiOperation({ summary: `get all users' info : ADMIN` })
  @UseGuards(LoggedInGuard)
  @Get()
  @Roles([RoleCategory.Admin, RoleCategory.Inhyuk])
  getUsers() {
    return this.usersService.getAllUsersInfo();
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
    return this.usersService.createAccount(data);
  }

  @ApiOperation({ summary: `local register request` })
  @UseGuards(LoggedInGuard)
  @Post('add/email')
  addEmail(@Body() email: string, @UserDecorator() user: User) {
    return this.usersService.addEmail(user, email);
  }

  @ApiOperation({ summary: `add an user's personal profile to be verified` })
  @Post('add/profile')
  verifyUser(
    @Query('token') token: string,
    @Body() updatedInfo: AddPersonalInfo,
  ) {
    return this.usersService.verifyUser(token, updatedInfo);
  }
}
