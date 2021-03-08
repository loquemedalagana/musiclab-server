import { ApiProperty } from '@nestjs/swagger';

export class AddEmailDto {
  @ApiProperty({
    example: 'helloworld@musicsseolprise.com',
    description: 'email',
  })
  email: string;
}

export class AddPersonalInfoDto {}
