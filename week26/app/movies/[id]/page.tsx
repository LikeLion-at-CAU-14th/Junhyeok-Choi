import Image from 'next/image';
import { Do_Hyeon } from 'next/font/google';
import { movies } from '@/data/movies';
import MovieReviewButton from '@/components/MovieReviewButton';

// 과제2 - 상세 페이지에만 다른 폰트 적용
const doHyeon = Do_Hyeon({
  weight: '400',
  subsets: ['latin'],
});

interface MovieDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  const { id } = await params;

  const movie = movies.find(
    (movie) => movie.id === Number(id)
  );

  if (!movie) {
    return <p>영화를 찾을 수 없습니다.</p>;
  }

  return (
    <main className={doHyeon.className}>
      <h1>{movie.title}</h1>

      {/*과제3 - next/image로 포스터 최적화*/}
      <Image
        src={movie.image}
        alt={movie.title}
        width={300}
        height={430}
      />

      <p>
        {movie.year} · {movie.genre} · {movie.director}
      </p>

      <p style={{ whiteSpace: 'pre-line' }}>{movie.description}</p>

      {/*과제4 - 관람평 불러오기*/}
      <MovieReviewButton />
    </main>
  );
}
