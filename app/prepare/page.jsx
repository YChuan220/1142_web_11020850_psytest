// app/prepare/page.jsx
// 過場 Loading 頁：以 public/bg_prepare.svg 為背景，自動 3.5s 跳轉
// 設計參考 prepare.png：深色背景、星星、粉紫半圓、「查看結果」按鈕

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PreparePage() {
  const router = useRouter();
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    document.body.classList.remove('bg-day');
    document.body.classList.add('bg-night');
    return () => {
      document.body.classList.remove('bg-night');
      document.body.classList.add('bg-day');
    };
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowBtn(true), 2500);
    const navTimer  = setTimeout(() => router.push('/result'), 3500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(navTimer);
    };
  }, [router]);

  return (
    <div className="relative w-full h-screen max-w-sm mx-auto overflow-hidden">

      {/* ── 背景 SVG ── */}
      <Image
        src="/bg_question_7.svg"
        alt=""
        fill
        className="object-cover object-center"
        priority
      />

      {/* ── 內容 overlay ── */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full gap-6">

        {/* Loading 點點動畫 */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-cyan-200 to-blue-400 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* 提示文字 */}
        <p className="text-gray-400 text-lg tracking-widest animate-pulse">
          正在分析你的結果...
        </p>

        {/* 查看結果按鈕（2.5s 後淡入） */}
        <div
          className={`transition-all duration-700 ${
            showBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
        </div>

      </div>
    </div>
  );
}
