export type Language = 'en' | 'ko' | 'es';

export type MultiLanguageText = {
  ko: string;
  en: string;
  es?: string;
};

export type MultilanguageWithImage = {
  image: string;
  message: MultiLanguageText;
  alt: string;
};
