// 과제4 - code splitting으로 관람평 불러오기
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

// 버튼을 눌렀을 때만 MovieReviews 코드를 따로 불러옴
const MovieReviews = dynamic(() => import("./MovieReviews"), {
  loading: () => <p>관람평을 불러오는 중...</p>,
});

export default function MovieReviewButton() {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <>
      <button
        className="movie-reviews-button"
        onClick={() => setShowReviews((prev) => !prev)}
      >
        {showReviews ? "관람평 닫기" : "관람평 보기"}
      </button>

      {showReviews && <MovieReviews />}
    </>
  );
}
