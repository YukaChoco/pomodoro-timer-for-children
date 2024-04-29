import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "めいちゃんのためのポモドーロタイマー",
  description: "めいちゃんのために用意した勉強用ポモドーロタイマーです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bungee&family=Jersey+15+Charted&family=Mochiy+Pop+One&family=Mochiy+Pop+P+One&family=Orbitron:wght@400..900&family=Rajdhani:wght@300;400;500;600;700&family=Saira:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        {/* ogpを設定 */}
        <meta property="og:title" content="めいちゃんのためのポモドーロ" />
        <meta
          property="og:description"
          content="わがいとこ、めいちゃんのために用意した勉強用ポモドーロタイマーです。"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://pomodoro-timer-for-children.vercel.app/"
        />
        <meta
          property="og:image"
          content="https://pomodoro-timer-for-children.vercel.app/ogp.png"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
