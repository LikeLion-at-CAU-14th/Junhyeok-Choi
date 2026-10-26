"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="w-fit text-orange-500 underline"
    >
      뒤로 가기
    </button>
  );
}
