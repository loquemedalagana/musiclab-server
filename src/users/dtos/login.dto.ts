import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'helloworld@musicsseolprise.com',
    description: 'email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'my-password',
    description: 'password',
  })
  @IsString()
  password: string;
}
