export const yadaFirstAlbum: Array<string> = [
  '이미 슬픈 사랑',
  '이미 슬픈사랑',
  'T.T',
  'Solo의 자부심',
  'Zero',
  '참아야하느니라',
  '일탈',
  '동상이몽',
  '바램',
  '사랑이라는 것 또한',
  'We Say Yes',
];
export const yadaSecondAlbum: Array<string> = [
  '인연',
  '진혼',
  '사랑이 슬픔에게',
  '기대',
  'Bel Canto',
  'In Your Dream',
  'Hyachinth',
  '체념',
  '사랑가',
  'Chaos',
];
export const yadaThirdAlbum: Array<string> = [
  '내가 원한 사랑',
  '약속',
  '꿈이 아닐까',
  '슬픈 다짐',
  'Only You',
  '아니야',
  '미안해',
  'Kastropolise',
  'Believe',
  'Crazy Boy',
  '너에게 하고픈 말',
  '망각',
];
export const yadaSpecialStory: Array<string> = [
  '그대는 모를겁니다',
  '사랑해 너를',
];

export const JeonInhyukBandSongs: Array<string> = [
  '이별이 온다',
  '꼭,고백',
  'Masquerade',
  '그때.. 마지막 우리',
  'Miracle',
];

export const etcTags: Array<string> = [
  `Man's Road`,
  '고음',
  '샤우팅',
  '무반주',
  '불후의 명곡',
];

// 정규식 생성 (존재하는지?)
export const albumList: Array<string[]> = [
  yadaFirstAlbum,
  yadaSecondAlbum,
  yadaThirdAlbum,
  yadaSpecialStory,
  JeonInhyukBandSongs,
  etcTags,
];

export type albumInfo = {
  title: string;
  description: string;
  etc?: string;
};

export const albumTitleList: albumInfo[] = [
  { title: '1집', description: 'Wear To Healing Yada' },
  { title: '2집', description: 'Restructure' },
  { title: '3집', description: 'Aquamarine' },
  { title: '베스트앨범', description: 'Special Story' },
  { title: '전인혁밴드', description: '전인혁작곡', etc: '신곡' },
];
