"use client";
import { Suspense, useEffect, useState } from "react";
import Header from "../components/Header";
import Timer from "../components/Timer";
import styles from "./page.module.css";
import Image from "next/image";
import useAudio from "../hooks/useAudio";
import { useSearchParams } from "next/navigation";
import axios from "axios";

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
    10
  );
  const initialBreakMinute = parseInt(
    searchParams.get("breakMinute") as string,
    10
  );
  // タイマーの初期値を5分に設定する
  const initialStudyTime = initialStudyMinute * 60;
  const initialBreakTime = initialBreakMinute * 60;

  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(
    initialStudyMinute * 60
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
  }, [currentTime, isStudying]);

  useEffect(() => {
    async function sendLineMessage() {
      await axios.post("/api/linebot", {
        message: `\nめいちゃんが ${initialStudyMinute}分間 勉強を頑張りました！\n\n今日の勉強合計時間は ${
          totalStudyTime + initialStudyMinute
        }分 です📚📚\n\nこの調子で頑張ってね！！！\n`,
      });
    }
    if (!isStudying) {
      setTotalStudyTime((prev) => prev + initialStudyMinute);
      sendLineMessage();
    }
  }, [isStudying]);

  return (
    <main className={styles.main}>
      <Header />
      <Timer currentTime={currentTime} isStudying={isStudying} />
      {isStudying ? (
        <div>勉強中！頑張れめいちゃん！</div>
      ) : (
        <div>〜休憩中〜</div>
      )}
      {!isStudying && (
        <Image width={450} height={300} src="/image.png" alt="JO1の写真" />
      )}
    </main>
  );
}
