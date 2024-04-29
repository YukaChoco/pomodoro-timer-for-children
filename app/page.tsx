"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Timer from "./components/Timer";
import styles from "./page.module.css";

export default function Home() {
  // タイマーの初期値を5分に設定する
  const [initialStudyMinute, setInitialStudyMinute] = useState<number>(5);
  const [initialBreakMinute, setInitialBreakMinute] = useState<number>(5);
  const initialStudyTime = initialStudyMinute * 60;
  const initialBreakTime = initialBreakMinute * 60;
  const [currentTime, setCurrentTime] = useState<number>(
    initialStudyMinute * 60
  );
  const [isStudying, setIsStudying] = useState<boolean>(true);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  console.log(currentTime);

  // 5分カウントダウンタイマー
  useEffect(() => {
    const timerId = setInterval(() => {
      if (isTimerRunning) {
        if (currentTime <= 0) {
          if (isStudying) {
            setCurrentTime(initialBreakTime);
          } else {
            setCurrentTime(initialStudyTime);
          }
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
      {!isTimerRunning && (
        // タイマーの初期値を入力する
        <div>
          <div className="study-minute">
            <label htmlFor="study-minute">勉強時間</label>
            <input
              type="number"
              value={initialStudyMinute}
              onChange={(e) => setInitialStudyMinute(Number(e.target.value))}
              name="study-minute"
              id="study-minute"
            />
          </div>

          <div className="break-minute">
            <label htmlFor="break-minute">休憩時間</label>
            <input
              type="number"
              value={initialBreakMinute}
              onChange={(e) => setInitialBreakMinute(Number(e.target.value))}
              name="break-minute"
              id="break-minute"
            />
          </div>
        </div>
      )}
      {isTimerRunning && (
        <Timer currentTime={currentTime} isStudying={isStudying} />
      )}
      {isTimerRunning ? (
        isStudying ? (
          <div>勉強中！頑張れめいちゃん！</div>
        ) : (
          <div>〜休憩中〜</div>
        )
      ) : (
        <button
          onClick={() => {
            setIsTimerRunning((pre) => !pre);
            setCurrentTime(initialStudyTime);
          }}
        >
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
