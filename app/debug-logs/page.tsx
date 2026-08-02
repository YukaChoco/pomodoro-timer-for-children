"use client";
import { useEffect, useState } from "react";
import { clearDebugLogs, getDebugLogs } from "../study/debugLog";

export default function DebugLogsPage() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    setLogs(getDebugLogs());
  }, []);

  const text = logs.join("\n");

  return (
    <main style={{ padding: "1rem" }}>
      <h1>デバッグログ</h1>
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
        <button onClick={() => navigator.clipboard.writeText(text)}>
          コピー
        </button>
        <button onClick={() => setLogs(getDebugLogs())}>再読み込み</button>
        <button
          onClick={() => {
            clearDebugLogs();
            setLogs([]);
          }}
        >
          クリア
        </button>
      </div>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          background: "#f4f4f4",
          padding: "1rem",
          fontSize: "0.8rem",
        }}
      >
        {text || "(ログはまだありません)"}
      </pre>
    </main>
  );
}
