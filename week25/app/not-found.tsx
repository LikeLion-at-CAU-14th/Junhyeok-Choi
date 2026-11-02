import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-6xl">🍽️</p>
      <h1 className="text-3xl font-bold">여긴 빈 접시뿐이에요</h1>
      <p className="text-gray-600">찾으시는 페이지가 도감에 없어요.</p>
      <Link href="/restaurants" className="text-orange-500 underline">
        맛집 목록으로 가기
      </Link>
    </div>
  );
}
