import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from 'src/entities/user/private.profile.entity';

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  displayName: string;
}

export class AddPersonalInfo {
  @IsDate()
  birthday: Date;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  givenName: string;

  @IsString()
  familyName: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  thumbnail: string;
}

export class UpdateSocialDto {
  @IsOptional()
  @IsString()
  twitter: string;

  @IsOptional()
  @IsString()
  blog: string;

  @IsOptional()
  @IsString()
  instagram: string;

  @IsOptional()
  @IsString()
  facebook: string;

  @IsOptional()
  @IsString()
  soundcloud: string;

  @IsOptional()
  @IsString()
  youtube: string;
}
