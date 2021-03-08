import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'helloworld@musicsseolprise.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'my-password',
    description: 'password',
  })
  password: string;
}
