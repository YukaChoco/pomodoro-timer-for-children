"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import Timer from "../components/Timer";
import styles from "./page.module.css";
import Image from "next/image";
import useAudio from "../hooks/useAudio";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const TOTAL_STUDY_TIME_STORAGE_KEY = "totalStudyTime";

// ローカルストレージに保存する日付のキー（YYYY-M-D）を取得する
function getTodayKey() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}

function HomeContent() {
  // クエリパラメーターを取得
  const searchParams = useSearchParams();
  const initialStudyMinute = parseInt(
    searchParams.get("studyMinute") as string,
    10,
  );
  const initialBreakMinute = parseInt(
    searchParams.get("breakMinute") as string,
    10,
  );
  // タイマーの初期値を5分に設定する
  const initialStudyTime = initialStudyMinute * 60;
  const initialBreakTime = initialBreakMinute * 60;

  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  // useEffectの依存配列にtotalStudyTimeを入れると更新のたびに再発火して
  // 無限ループになるため、最新値の参照用にrefでも保持しておく
  const totalStudyTimeRef = useRef(totalStudyTime);
  const [currentTime, setCurrentTime] = useState<number>(
    initialStudyMinute * 60,
  );
  const [isStudying, setIsStudying] = useState<boolean>(true);
  // useAudioを使って音声を再生する
  const playBell = useAudio();

  // 5分カウントダウンタイマー
  useEffect(() => {
    const timerId = setInterval(() => {
      if (currentTime <= 0) {
        if (isStudying) {
          setCurrentTime(initialBreakTime);
        } else {
          setCurrentTime(initialStudyTime);
        }
        setIsStudying((prev) => !prev);
        playBell();
      } else {
        setCurrentTime((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [currentTime, isStudying, initialBreakTime, initialStudyTime, playBell]);

  // 今日すでに保存された勉強合計時間があれば復元する
  useEffect(() => {
    const stored = localStorage.getItem(TOTAL_STUDY_TIME_STORAGE_KEY);
    if (!stored) return;
    const { date, minutes } = JSON.parse(stored);
    if (date === getTodayKey()) {
      setTotalStudyTime(minutes);
      totalStudyTimeRef.current = minutes;
    }
  }, []);

  // 「勉強を始める」ボタンを押して最初にこのページに来たタイミングで1回だけ応援メッセージを送る
  useEffect(() => {
    async function sendStartMessage() {
      await axios.post("/api/linebot", {
        message: `\nめいちゃんが勉強をスタートしました！🔥\n\n応援してるよ〜！！頑張れー📣✨\n\n`,
      });
    }
    sendStartMessage();
  }, []);

  useEffect(() => {
    async function sendLineMessage(newTotal: number) {
      await axios.post("/api/linebot", {
        message: `\nめいちゃんが ${initialStudyMinute}分間 勉強を頑張りました！\n\n今日の勉強合計時間は ${newTotal}分 です📚📚\n\nこの調子で頑張ってね！！！\n\n`,
      });
    }
    if (!isStudying) {
      const newTotal = totalStudyTimeRef.current + initialStudyMinute;
      totalStudyTimeRef.current = newTotal;
      setTotalStudyTime(newTotal);
      localStorage.setItem(
        TOTAL_STUDY_TIME_STORAGE_KEY,
        JSON.stringify({ date: getTodayKey(), minutes: newTotal }),
      );
      sendLineMessage(newTotal);
    }
  }, [isStudying, initialStudyMinute]);

  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <div className={styles.left}>
          <Timer currentTime={currentTime} isStudying={isStudying} />
          {isStudying ? (
            <div>勉強中！頑張れめいちゃん！</div>
          ) : (
            <div>〜休憩中〜</div>
          )}
        </div>
        <div className={styles.imageBox}>
          {!isStudying && (
            <Image
              width={1110}
              height={1475}
              src="/image.jpg"
              alt="JO1の写真"
              className={styles.studyImage}
            />
          )}
        </div>
      </div>
    </main>
  );
}
