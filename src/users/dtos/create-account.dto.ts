import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({
    example: 'helloworld@musicsseolprise.com',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: '몬드리안',
    description: 'displayName',
  })
  displayName: string;

  @ApiProperty({
    example: 'my-password',
    description: 'password',
  })
  password: string;
}
