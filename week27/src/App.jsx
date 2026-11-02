import { useState } from "react";
import "./App.css";
import { sendChat } from "./api/gemini";

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "안녕하세요! 무엇이든 물어보세요 👋",
      isGreeting: true,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", text: input.trim() };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      // 인사 메시지·오류 메시지는 빼고 실제 대화만 API로 보냄 (이전 맥락 유지)
      const history = nextMessages.filter((m) => !m.isGreeting && !m.isError);
      const aiText = await sendChat(history);

      setMessages((prev) => [...prev, { role: "assistant", text: aiText }]);
    } catch (error) {
      console.error("Gemini API Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: `오류가 발생했습니다.\n${error.message}`,
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="chat-container">

        <header className="chat-header">
          <div>
            <h1>Likelion CAU Chatbot 🦁</h1>
            <p>week27 AI API 실습</p>
          </div>

          <div className="status">
            <span />
            Online
          </div>
        </header>

        <main className="chat-body">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message-row ${
                message.role === "user"
                  ? "user-row"
                  : "assistant-row"
              }`}
            >
              {message.role === "assistant" && (
                <div className="avatar">
                  멋사AI
                </div>
              )}

              <div
                className={`message ${
                  message.role === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message-row assistant-row">
              <div className="avatar">
                멋사AI
              </div>

              <div className="message assistant-message loading-message">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}
        </main>

        <div className="chat-input-area">
          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            rows={1}
          />

          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            {loading ? "전송 중..." : "보내기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;