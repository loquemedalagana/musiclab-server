import { MultiLanguageText } from '../../common/types/multilanguage';

const korText = [
  `안녕하세요! 뮤직 썰프라이즈에 관심을 가져주셔서 감사합니다.`,
  `뮤직 썰!프라이즈는 뮤직랩에서 개발한 웹 어플리케이션입니다.
  뮤썰에서 야다 메인보컬, 메인기타리스트 전인혁님과 전인혁님이 결성한 전인혁밴드에 대한 모든 정보를
  하나의 공간에서 제공합니다.`,
  `아티스트 전인혁님과 전인혁밴드의 팬들과 관련 아티스트분들과 언어의 장벽 없이 뮤썰에서 소통이 가능합니다.`,
  `뮤썰을 이용하시려면 추가 정보를 제공해야 합니다. 아래 인증링크를 통해 들어가셔서 추가 정보를 입력하시면
  뮤썰에서 제공하는 모든 서비스를 제약 없이 사용이 가능합니다.`,
  `이름, 생년월일, 이메일 등은 인혁님만 열람이 가능하니 크게 걱정 안 하셔도 됩니다.`,
];

const engText = [
  `Thanks for your interest in Jeon Inhyuk's music sseolprise!`,
  `Music sseolprise is a progressive web app developed by Musiclab Team. 
  We offer all information about Korean rock artist Jeon Inhyuk and his band 
  in only a single space.`,
  `With our service, you can also communicate with Jeon Inhyuk's fans and related artists 
  without language barriers.`,
  `If you are willing to subscribe to our membership, 
  you should provide additional information: your name, gender, and birthday to Inhyuk. 
  Here is the link. 
  After submitting your info, you can use our service without restriction!`,
  `We promise to allow only Inhyuk to have access to members' private data.`,
];

const espText = [
  `Le agredecemos su interés por music sseolprise de Jeon Inhyuk!`,
  ``,
  ``,
  ``,
  ``,
];

export const authMailText: MultiLanguageText[] = korText.reduce(
  (paragraphs, paragraph, index) => {
    paragraphs.push({
      ko: paragraph,
      en: engText[index],
      es: espText[index],
    });
    return paragraphs;
  },
  [],
);
