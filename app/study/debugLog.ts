const DEBUG_LOG_STORAGE_KEY = "debugLogs";
const MAX_LOGS = 500;

function formatArg(arg: unknown): string {
  if (typeof arg === "string") return arg;
  try {
    return JSON.stringify(arg);
  } catch {
    return String(arg);
  }
}

// console.logと同時にlocalStorageにも積んでおき、後から別の画面で確認できるようにする
export function debugLog(...args: unknown[]) {
  const line = `${new Date().toISOString()} ${args.map(formatArg).join(" ")}`;
  console.log(line);
  appendLog(line);
}

export function debugError(...args: unknown[]) {
  const line = `${new Date().toISOString()} [ERROR] ${args.map(formatArg).join(" ")}`;
  console.error(line);
  appendLog(line);
}

function appendLog(line: string) {
  try {
    const stored = localStorage.getItem(DEBUG_LOG_STORAGE_KEY);
    const logs: string[] = stored ? JSON.parse(stored) : [];
    logs.push(line);
    if (logs.length > MAX_LOGS) {
      logs.splice(0, logs.length - MAX_LOGS);
    }
    localStorage.setItem(DEBUG_LOG_STORAGE_KEY, JSON.stringify(logs));
  } catch {
    // localStorageが使えない環境では諦める
  }
}

export function getDebugLogs(): string[] {
  const stored = localStorage.getItem(DEBUG_LOG_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function clearDebugLogs() {
  localStorage.removeItem(DEBUG_LOG_STORAGE_KEY);
}
