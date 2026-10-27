export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string;
  director: string;
  description: string;
  image: string;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: '해리 포터와 마법사의 돌',
    year: 2001,
    genre: '판타지, 모험',
    director: '크리스 콜럼버스',
    description:
      '열한 번째 생일에 자신이 마법사라는 사실을 알게 된 소년 해리의 이야기입니다.\n호그와트 마법학교에 입학한 해리가 친구들과 함께 마법사의 돌에 얽힌 비밀을 파헤칩니다.',
    image: '/posters/harry-potter.jpg',
  },
  {
    id: 2,
    title: '체인소 맨 극장판: 레제편',
    year: 2025,
    genre: '애니메이션, 액션',
    director: '요시하라 타츠야',
    description:
      '악마 사냥꾼 덴지가 비 오는 날 우연히 만난 소녀 레제와 가까워지는 이야기입니다.\n설레는 만남 뒤에 숨겨진 레제의 정체가 드러나며 거대한 폭발과 싸움이 시작됩니다.',
    image: '/posters/chainsaw-man-reze.jpg',
  },
  {
    id: 3,
    title: '올드보이',
    year: 2003,
    genre: '스릴러, 미스터리',
    director: '박찬욱',
    description:
      '이유도 모른 채 15년 동안 사설 감금방에 갇혀 있던 남자 오대수의 이야기입니다.\n갑자기 풀려난 그는 자신을 가둔 자를 찾아 나서고, 5일 안에 그 이유를 밝혀내야 합니다.',
    image: '/posters/oldboy.jpg',
  },
  {
    id: 4,
    title: '이터널 선샤인',
    year: 2004,
    genre: '로맨스, SF',
    director: '미셸 공드리',
    description:
      '헤어진 연인의 기억을 지우기로 한 남녀의 이야기입니다.\n기억을 지우는 과정에서 서로를 사랑했던 순간들을 다시 마주하게 됩니다.',
    image: '/posters/eternal sunshine.jpg',
  },
  {
    id: 5,
    title: '다이 하드',
    year: 1988,
    genre: '액션',
    director: '존 맥티어넌',
    description:
      '크리스마스 이브, 아내를 만나러 LA의 나카토미 빌딩을 찾은 뉴욕 경찰 존 맥클레인의 이야기입니다.\n빌딩을 점거한 테러리스트들에 맞서 맨발로 홀로 싸우는 액션 영화의 고전입니다.',
    image: '/posters/die-hard.jpg',
  },
  {
    id: 6,
    title: '너의 이름은.',
    year: 2016,
    genre: '애니메이션, 로맨스, 판타지',
    director: '신카이 마코토',
    description:
      '시골 마을의 소녀 미츠하와 도쿄의 소년 타키가 꿈속에서 서로의 몸이 바뀌는 이야기입니다.\n만난 적 없는 두 사람이 서로를 찾아가며 시간과 운명을 넘어서는 기적을 그려냅니다.',
    image: '/posters/your-name.jpg',
  },
];
