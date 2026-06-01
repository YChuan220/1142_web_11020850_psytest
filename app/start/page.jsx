// app/start/page.jsx
// 首頁：以 public/bg_start.svg 為全版背景，疊加「開始測驗」按鈕
// RWD：max-w-sm 居中，圖片 object-cover 填滿

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useQuizStore from '@/store/store';
import StartButton from '@/components/StartButton';

export default function StartPage() {
  const router = useRouter();
  const resetTest = useQuizStore((s) => s.resetTest);

  const handleStart = () => {
    resetTest();
    router.push('/question');
  };

  return (
    // 外層：手機框，限寬置中
    <div className="relative w-full h-screen max-w-sm mx-auto overflow-hidden">

      {/* ── 背景 SVG（使用者上傳至 public/bg_start.svg） ── */}
      <Image
        src="/bg_start.svg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />

      {/* ── 內容 overlay ── */}
      <div className="relative z-10 flex flex-col h-full">

        {/* 標題區：左上 */}
        <div className="pt-14 pl-8 pr-6">
          <h1 className="text-6xl font-black text-gray-800 leading-snug tracking-tight">
            你是<br />健康人<br />嗎？
          </h1>
        </div>

        {/* 彈性空間 */}
        <div className="flex-1" />

        {/* 按鈕區：底部置中 */}
        <div className="flex justify-center pb-14">
          <StartButton onClick={handleStart} />
        </div>

      </div>
    </div>
  );
}
