import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAccountDto {
  @ApiProperty({
    example: 'helloworld@musicsseolprise.com',
    description: 'email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '몬드리안',
    description: 'displayName',
  })
  @IsString()
  displayName: string;

  @ApiProperty({
    example: 'my-password',
    description: 'password',
  })
  @IsString()
  password: string;
}
