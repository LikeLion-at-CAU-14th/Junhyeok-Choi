// data/restaurants.ts
export type Restaurant = {
  id: number;
  name: string;
  category: string;
  emoji: string;
  menu: string;
  price: number;
  comment: string;
};

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "한우촌",
    category: "한식",
    emoji: "🥩",
    menu: "생고기 600g",
    price: 75000,
    comment: "광주 가면 무조건 먹고 오는 거",
  },
  {
    id: 2,
    name: "일이삼식당",
    category: "한식",
    emoji: "🍚",
    menu: "제육볶음정식",
    price: 8000,
    comment: "계란말이가좋아",
  },
  {
    id: 3,
    name: "기꾸스시",
    category: "일식",
    emoji: "🍣",
    menu: "특모듬초밥",
    price: 22000,
    comment: "너무맛있엉",
  },
  {
    id: 4,
    name: "채홍",
    category: "중식",
    emoji: "🥡",
    menu: "볶음밥",
    price: 8000,
    comment: "후문은채홍이지",
  },
  {
    id: 5,
    name: "숯불에닭",
    category: "한식",
    emoji: "🍗",
    menu: "숯불닭갈비 소금",
    price: 14000,
    comment: "맛있다",
  },
  {
    id: 6,
    name: "파슬리,파슬리",
    category: "양식",
    emoji: "🍄",
    menu: "머쉬룸 트러플 리조또",
    price: 13000,
    comment: "고소하고너무좋아",
  },
];