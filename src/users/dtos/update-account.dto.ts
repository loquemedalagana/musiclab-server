export class UpdateAccountDto {
  birthday?: Date;
  gender?: 'male' | 'female';
  image?: string;
  thumbnail?: string;
  locale?: string;
  points?: number;
  description?: string;
  displayName?: string;
  givenName?: string;
  familyName?: string;
}

export class AddPersonalInfo {
  birthday: Date;
  gender: 'male' | 'female';
  givenName: string;
  familyName: string;
  image?: string;
  thumbnail?: string;
}

export class UpdateSocialDto {
  twitter?: string;
  blog?: string;
  instagram?: string;
  facebook?: string;
  soundcloud?: string;
  youtube?: string;
}
