import { Fragment } from "react";

// Gemini 답변에 자주 나오는 마크다운만 패키지 없이 렌더링
// innerHTML을 쓰지 않고 React 요소로 만들기 때문에 XSS 걱정이 없음

const FENCE = /^\s*```/;
const HEADING = /^(#{1,4})\s+(.*)/;
const BULLET = /^\s*[-*]\s+/;
const ORDERED = /^\s*(\d+)\.\s+/;
const HR = /^\s*(-{3,}|\*{3,})\s*$/;

const isSpecial = (line) =>
  FENCE.test(line) || HEADING.test(line) || BULLET.test(line) || ORDERED.test(line) || HR.test(line);

// **굵게**, `코드` 처리
function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      return <code key={i}>{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

// pattern에 맞는 줄이 이어지는 동안 모아서 목록 항목으로 반환
function collect(lines, start, pattern) {
  const items = [];
  let i = start;
  while (i < lines.length && pattern.test(lines[i])) {
    items.push(lines[i].replace(pattern, ""));
    i++;
  }
  return [items, i];
}

export default function Markdown({ text }) {
  const lines = text.split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = blocks.length;

    if (!line.trim()) {
      i++;
    } else if (FENCE.test(line)) {
      const code = [];
      i++;
      while (i < lines.length && !FENCE.test(lines[i])) code.push(lines[i++]);
      i++; // 닫는 ``` 건너뛰기
      blocks.push(
        <pre key={key}>
          <code>{code.join("\n")}</code>
        </pre>
      );
    } else if (HR.test(line)) {
      blocks.push(<hr key={key} />);
      i++;
    } else if (HEADING.test(line)) {
      blocks.push(
        <p key={key} className="md-heading">
          {renderInline(line.match(HEADING)[2])}
        </p>
      );
      i++;
    } else if (BULLET.test(line)) {
      const [items, next] = collect(lines, i, BULLET);
      blocks.push(
        <ul key={key}>
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      i = next;
    } else if (ORDERED.test(line)) {
      const start = Number(line.match(ORDERED)[1]);
      const [items, next] = collect(lines, i, ORDERED);
      blocks.push(
        <ol key={key} start={start}>
          {items.map((item, j) => (
            <li key={j}>{renderInline(item)}</li>
          ))}
        </ol>
      );
      i = next;
    } else {
      const para = [];
      while (i < lines.length && lines[i].trim() && !isSpecial(lines[i])) para.push(lines[i++]);
      blocks.push(
        <p key={key}>
          {para.map((l, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {renderInline(l)}
            </Fragment>
          ))}
        </p>
      );
    }
  }

  return <div className="markdown">{blocks}</div>;
}
