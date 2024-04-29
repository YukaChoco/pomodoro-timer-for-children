"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import styles from "./page.module.css";

export default function Home() {
  // タイマーの初期値を5分に設定する
  const initialTime = 1 * 10;
  const [currentTime, setCurrentTime] = useState<number>(initialTime);
  const [isStudying, setIsStudying] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  console.log(currentTime);

  // 5分カウントダウンタイマー
  useEffect(() => {
    const timerId = setInterval(() => {
      if (isTimerRunning) {
        if (currentTime <= 0) {
          setCurrentTime(initialTime);
          setIsStudying((prev) => !prev);
          console.log("change");
        } else {
          setCurrentTime((prev) => prev - 1);
          console.log("counted down");
        }
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isTimerRunning, currentTime]);

  return (
    <main className={styles.main}>
      <Header />
      <Timer currentTime={currentTime} isStudying={isStudying} />
      {isTimerRunning ? (
        isStudying ? (
          <div>勉強中！頑張れめいちゃん！</div>
        ) : (
          <div>〜休憩中〜</div>
        )
      ) : (
        <button onClick={() => setIsTimerRunning((pre) => !pre)}>
          勉強を始める
        </button>
      )}
      {isTimerRunning && !isStudying && (
        <img height={250} src="/image.png" alt="JO1の写真" />
      )}

      {/* <a href="/result">go to result</a> */}
    </main>
  );
}
