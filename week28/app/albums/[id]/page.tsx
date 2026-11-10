import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlbum } from "@/data/albums";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const album = getAlbum(id);

  if (!album) {
    return { title: "앨범을 찾을 수 없어요" };
  }

  const title = `${album.title} - ${album.artist}`;

  return {
    title,
    description: album.description,
    openGraph: {
      title,
      description: album.description,
      siteName: "나의 앨범",
      locale: "ko_KR",
      type: "music.album",
      images: [
        {
          url: album.cover,
          width: 3000,
          height: 3000,
          alt: `${album.artist} - ${album.title} 앨범 표지`,
        },
      ],
    },
  };
}

// 도전 과제: generateStaticParams로 상세 페이지를 빌드할 때 미리 만들어두기

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const album = getAlbum(id);

  if (!album) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← 목록으로
      </Link>

      <div className="detail">
        <Image
          src={album.cover}
          alt={`${album.artist} - ${album.title} 앨범 표지`}
          width={600}
          height={600}
          sizes="(max-width: 768px) 100vw, 420px"
          preload
          className="detail-cover"
        />

        <div className="detail-info">
          <div className="detail-genre">
            {album.genre} · {album.year}
          </div>
          <h1 className="detail-title">{album.title}</h1>
          <div className="detail-artist">{album.artist}</div>
          <p className="detail-desc">{album.description}</p>

          <h2 className="track-heading">수록곡</h2>
          <ol className="track-list">
            {album.tracks.map((track) => (
              <li key={track}>{track}</li>
            ))}
          </ol>
        </div>
      </div>
    </main>
  );
}