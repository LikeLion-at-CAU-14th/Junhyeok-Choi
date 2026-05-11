// URL에서 쿼리 스트링 파라미터 가져오기
const params = new URLSearchParams(window.location.search);

// 날짜 포맷 변경 함수 (20131112101628 -> 2013년 11월 12일)
function formatDate(dateStr) {
    if (!dateStr || dateStr.length < 8) return "정보 없음";
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
}

// 각 요소에 데이터 매핑
document.getElementById("detail-title").innerText = params.get("title") || "제목 없음";
document.getElementById("detail-image").src = params.get("img");
document.getElementById("info-location").innerText = params.get("location") || "정보 없음";
document.getElementById("info-photographer").innerText = params.get("photographer") || "정보 없음";
document.getElementById("info-keywords").innerText = params.get("keywords") || "정보 없음";

// 날짜 처리
const rawDate = params.get("time");
document.getElementById("info-date").innerText = formatDate(rawDate);