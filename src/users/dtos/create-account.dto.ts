import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    example: 'helloworld@musicsseolprise.com',
    description: 'email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '몬드리안',
    description: 'displayName',
    required: true,
  })
  @IsString()
  displayName: string;

  @ApiProperty({
    example: 'my-password',
    description: 'password',
    required: true,
  })
  @IsString()
  password: string;
}
