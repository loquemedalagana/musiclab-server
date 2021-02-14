const yadaFirstAlbum = [
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
const yadaSecondAlbum = [
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
const yadaThirdAlbum = [
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
const yadaSpecialStory = ['그대는 모를겁니다', '사랑해 너를'];

const JeonInhyukBandSongs = [
  '이별이 온다',
  '꼭,고백',
  'Masquerade',
  '그때.. 마지막 우리',
  'Miracle',
];

const etcTags = [`Man's Road`, '고음', '샤우팅', '무반주', '불후의 명곡'];

const removeSpecialChars = (str: string) =>
  str.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|\s+]/gi, '');
const removeSpecialCharsAndSpace = (str: string) =>
  str.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi, '');

// 특수 문자 or 공백 제거
export const yadaFirstAlbumKeywords = yadaFirstAlbum.map((title: string) =>
  removeSpecialChars(title),
);
export const yadaSecondAlbumKeywords = yadaSecondAlbum.map((title: string) =>
  removeSpecialChars(title),
);
export const yadaThirdAlbumKeywords = yadaThirdAlbum.map((title: string) =>
  removeSpecialChars(title),
);
export const yadaSpecialStoryAlbumKeywords = yadaSpecialStory.map(
  (title: string) => removeSpecialChars(title),
);
export const jeonInhyukBandSongsKeywords = JeonInhyukBandSongs.map(
  (title: string) => removeSpecialChars(title),
);

// 정규식 생성 (존재하는지?)
const albumList = [
  yadaFirstAlbum,
  yadaSecondAlbum,
  yadaThirdAlbum,
  yadaSpecialStory,
  JeonInhyukBandSongs,
  etcTags,
];

const albumTitleList = [
  { title: '1집', description: 'Wear To Healing Yada' },
  { title: '2집', description: 'Restructure' },
  { title: '3집', description: 'Aquamarine' },
  { title: '베스트앨범', description: 'Special Story' },
  { title: '전인혁밴드', description: '전인혁작곡', etc: '신곡' },
];

export const extractTags = (title: string) => {
  let tags: string[] = [];
  albumList.forEach((album, index) => {
    const taglist = album
      .filter(
        (songTitle) =>
          title.includes(songTitle) ||
          title.includes(removeSpecialChars(songTitle)) ||
          title.includes(removeSpecialCharsAndSpace(songTitle)),
      )
      .map((songTitle) => removeSpecialCharsAndSpace(songTitle));
    if (taglist.length > 0) {
      tags.push(albumTitleList[index].title.replace(/\s+/g, ''));
      tags.push(albumTitleList[index].description.replace(/\s+/g, ''));
      if (albumTitleList[index].etc) tags.push(albumTitleList[index].etc);
    }
    if (taglist.includes('약속')) tags.push('전인혁작곡');
    if (taglist.includes('Miracle')) {
      tags.push('GuitarSolo');
    }
    tags = tags.concat(taglist);
  });
  return tags;
};
