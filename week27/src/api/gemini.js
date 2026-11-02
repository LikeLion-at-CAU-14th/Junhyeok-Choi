// Gemini API를 SDK 없이 fetch로 직접 호출하는 모듈
const BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-3.6-flash";

// 429(요청 과다), 500, 503(서버 과부하)은 잠시 후 다시 시도하면 성공하는 경우가 많음
const RETRY_STATUS = [429, 500, 503];
const MAX_RETRIES = 2;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 앱의 메시지 형식({ role, text })을 Gemini 요청 형식(contents)으로 변환
// Gemini는 assistant 대신 "model" role을 사용함
const toGeminiContents = (messages) =>
  messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.text }],
  }));

// Gemini 응답(candidates)에서 텍스트만 추출
const extractText = (data) =>
  data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("\n");

/**
 * 대화 기록 전체를 보내고 AI 응답 텍스트를 돌려준다.
 * @param {{ role: "user" | "assistant", text: string }[]} history
 * @returns {Promise<string>}
 */
export async function sendChat(history) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("API Key를 찾을 수 없습니다. .env 파일을 확인해주세요.");
  }

  const url = `${BASE_URL}/${MODEL}:generateContent`;

  // ===== Request =====
  const requestBody = {
    contents: toGeminiContents(history),
  };

  console.groupCollapsed(`[Gemini] Request → ${MODEL}`);
  console.log("URL:", url);
  console.log("Body:", requestBody);
  console.groupEnd();

  let response;
  let data;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // API Key를 URL 쿼리 대신 헤더로 전달 (주소창/로그에 키가 덜 노출됨)
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(requestBody),
    });

    // ===== Response =====
    data = await response.json();

    console.groupCollapsed(`[Gemini] Response ← ${response.status}`);
    console.log("OK:", response.ok);
    console.log("Data:", data);
    console.groupEnd();

    // 서버 과부하 같은 일시적 오류면 잠시 기다렸다가 재시도 (1초 → 2초)
    if (!RETRY_STATUS.includes(response.status) || attempt === MAX_RETRIES) break;

    const delay = 1000 * 2 ** attempt;
    console.warn(`[Gemini] ${response.status} → ${delay / 1000}초 후 재시도 (${attempt + 1}/${MAX_RETRIES})`);
    await sleep(delay);
  }

  if (!response.ok) {
    throw new Error(
      data?.error?.message || `Gemini API 요청에 실패했습니다. (${response.status})`
    );
  }

  return extractText(data) || "응답을 가져오지 못했습니다.";
}
