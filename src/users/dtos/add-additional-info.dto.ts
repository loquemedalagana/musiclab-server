import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddEmailDto {
  @ApiProperty({
    example: 'helloworld@musicsseolprise.com',
    description: 'email',
  })
  @IsString()
  email: string;
}

export class AddPersonalInfoDto {}
