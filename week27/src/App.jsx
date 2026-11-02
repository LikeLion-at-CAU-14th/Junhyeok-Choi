import { useEffect, useRef, useState } from "react";
import "./App.css";
import { sendChat } from "./api/gemini";
import Markdown from "./components/Markdown";

const GREETING = "안녕하세요! 멋사AI예요 🦁\n궁금한 걸 편하게 물어보세요.";

const SUGGESTIONS = [
  "멋쟁이사자처럼은 어떤 동아리야?",
  "React useEffect를 쉽게 설명해줘",
  "해커톤 아이디어 3개만 추천해줘",
  "오늘 저녁 메뉴 골라줘",
];

let nextId = 0;
const createMessage = (role, text, extra = {}) => ({
  id: ++nextId,
  role,
  text,
  time: new Date(),
  ...extra,
});

const createGreeting = () => createMessage("assistant", GREETING, { isGreeting: true });

const formatTime = (date) =>
  date.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" });

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [createGreeting()]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const bodyRef = useRef(null);
  const textareaRef = useRef(null);

  const isEmpty = messages.length === 1;
  const lastMessage = messages[messages.length - 1];

  // 새 메시지가 생기면 맨 아래로 스크롤
  useEffect(() => {
    const body = bodyRef.current;
    body?.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  // 입력 내용에 맞춰 textarea 높이 자동 조절
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);

  // 대화 목록을 화면에 반영하고 AI 응답 요청
  const requestReply = async (conversation) => {
    setMessages(conversation);
    setLoading(true);

    try {
      // 인사 메시지·오류 메시지는 빼고 실제 대화만 API로 보냄 (이전 맥락 유지)
      const history = conversation.filter((m) => !m.isGreeting && !m.isError);
      const aiText = await sendChat(history);
      setMessages((prev) => [...prev, createMessage("assistant", aiText)]);
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [
        ...prev,
        createMessage("assistant", error.message, { isError: true }),
      ]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const sendMessage = (text = input) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    setInput("");
    requestReply([...messages, createMessage("user", trimmed)]);
  };

  // 마지막 오류 메시지를 지우고 같은 대화로 다시 요청
  const retry = () => {
    if (loading) return;
    requestReply(messages.slice(0, -1));
  };

  const resetChat = () => {
    if (loading) return;
    setMessages([createGreeting()]);
    setInput("");
    textareaRef.current?.focus();
  };

  const copyMessage = async (message) => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopiedId(message.id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (error) {
      console.error("복사 실패:", error);
    }
  };

  const handleKeyDown = (e) => {
    // 한글 조합 중 Enter는 무시 (마지막 글자가 한 번 더 전송되는 버그 방지)
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">
        <header className="chat-header">
          <div className="header-info">
            <div className="header-logo">🦁</div>
            <div>
              <h1>Likelion CAU Chatbot</h1>
              <div className={`status ${loading ? "status-busy" : ""}`}>
                <span className="status-dot" />
                {loading ? "답변 작성 중..." : "Gemini · Online"}
              </div>
            </div>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={resetChat}
            disabled={loading || isEmpty}
            title="새 대화"
            aria-label="새 대화 시작"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </header>

        <main className="chat-body" ref={bodyRef}>
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`message-row ${isUser ? "user-row" : "assistant-row"}`}
              >
                {!isUser && <div className="avatar">🦁</div>}

                <div className="message-group">
                  <div
                    className={`message ${isUser ? "user-message" : "assistant-message"} ${
                      message.isError ? "error-message" : ""
                    }`}
                  >
                    {message.isError ? (
                      <>
                        <strong className="error-title">⚠️ 응답을 받지 못했어요</strong>
                        <p className="error-detail">{message.text}</p>
                        {message === lastMessage && (
                          <button type="button" className="retry-button" onClick={retry} disabled={loading}>
                            다시 시도
                          </button>
                        )}
                      </>
                    ) : isUser ? (
                      message.text
                    ) : (
                      <Markdown text={message.text} />
                    )}
                  </div>

                  <div className="message-meta">
                    <time>{formatTime(message.time)}</time>
                    {!isUser && !message.isError && !message.isGreeting && (
                      <button type="button" className="copy-button" onClick={() => copyMessage(message)}>
                        {copiedId === message.id ? "복사됨 ✓" : "복사"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isEmpty && (
            <div className="suggestions">
              <p>이런 질문은 어때요?</p>
              <div className="suggestion-list">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    className="suggestion-chip"
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="message-row assistant-row">
              <div className="avatar">🦁</div>
              <div className="message assistant-message loading-message" aria-label="답변 작성 중">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </main>

        <footer className="chat-input-area">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              rows={1}
              autoFocus
            />
            <button
              type="button"
              className="send-button"
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="보내기"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </button>
          </div>
          <p className="input-hint">Enter 전송 · Shift + Enter 줄바꿈</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
