"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "./components/Header";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  const [formData, setFormData] = useState({
    studyMinute: "5",
    breakMinute: "5",
  });
  const router = useRouter();

  const handleStudyMinute = (e: any) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, studyMinute: value }));
  };

  const handleBreakMinute = (e: any) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, breakMinute: value }));
  };

  return (
    <main className={styles.main}>
      <Header />

      <form className={styles.form}>
        <div />

        <div>
          <div className="studyMinute">
            <label htmlFor="studyMinute">勉強時間</label>
            <input
              type="number"
              style={{
                width: "8rem",
                fontSize: "2rem",
                textAlign: "center",
                margin: "0 1rem",
              }}
              min={1}
              max={60}
              value={formData.studyMinute}
              onChange={handleStudyMinute}
              name="studyMinute"
              id="studyMinute"
            />
            分
          </div>

          <div className="breakMinute">
            <label htmlFor="breakMinute">休憩時間</label>
            <input
              type="number"
              style={{
                width: "8rem",
                fontSize: "2rem",
                textAlign: "center",
                margin: "0 1rem",
              }}
              min={1}
              max={60}
              value={formData.breakMinute}
              onChange={handleBreakMinute}
              name="breakMinute"
              id="breakMinute"
            />
            分
          </div>
        </div>

        <Link
          className={styles.button}
          href={{ pathname: "/study", query: formData }}
        >
          勉強を始める
        </Link>
      </form>
    </main>
  );
}
