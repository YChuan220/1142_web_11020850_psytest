// app/question/page.jsx
// 題目頁：
//   · 背景 bg_question_[1-7].svg（full-cover）
//   · 頂部：「一天行程」進度條（取代問題 X 標題）
//   · 中段：情境描述（半透明卡片）
//   · 底部：選項按鈕（大塊 + hover/selected 狀態）

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useQuizStore from '@/store/store';
import { questions } from '@/store/store';
import OptionButton from '@/components/OptionButton';
import DayProgress from '@/components/DayProgress';

// 每題對應的背景 SVG
function getBgSrc(step) {
  return `/bg_question_${step + 1}.svg`;
}

// 每題文字色系
const themeText = {
  blue:     { scenario: 'text-white/95' },
  purple:   { scenario: 'text-white/95' },
  yellow:   { scenario: 'text-gray-800' },
  pink:     { scenario: 'text-gray-800' },
  bluegray: { scenario: 'text-white/95' },
  dark:     { scenario: 'text-gray-100' },
};

export default function QuestionPage() {
  const router = useRouter();
  const { currentStep, addScore } = useQuizStore();

  // 短暫顯示「已選中」狀態後再跳題
  const [selectedId, setSelectedId] = useState(null);

  // 第 5 題起（含未來第 8 題）：body 改為夜間背景
  useEffect(() => {
    const questionNum = questions[currentStep]?.id ?? 0;
    const isNight = questionNum >= 5;

    document.body.classList.toggle('bg-day', !isNight);
    document.body.classList.toggle('bg-night', isNight);

    return () => {
      document.body.classList.remove('bg-night');
      document.body.classList.add('bg-day');
    };
  }, [currentStep]);

  // 所有題目答完 → 過場頁
  useEffect(() => {
    if (currentStep >= questions.length) {
      router.push('/prepare');
    }
  }, [currentStep, router]);

  // selectedId 改變後 350ms 跳到下一題
  useEffect(() => {
    if (selectedId === null) return;
    const t = setTimeout(() => {
      const opt = questions[currentStep]?.options.find((o) => o.id === selectedId);
      if (opt) addScore(opt.score);
      setSelectedId(null);
    }, 350);
    return () => clearTimeout(t);
  }, [selectedId]); // eslint-disable-line react-hooks/exhaustive-deps

  if (currentStep >= questions.length) return null;

  const q  = questions[currentStep];
  const tc = themeText[q.theme] ?? themeText.blue;

  const handleSelect = (optId) => {
    if (selectedId !== null) return; // 防止快速重複點擊
    setSelectedId(optId);
  };

  return (
    <div className="relative w-full h-screen max-w-sm mx-auto overflow-hidden">

      {/* ── 背景 SVG ── */}
      <Image
        src={getBgSrc(currentStep)}
        alt=""
        fill
        className="object-cover object-center"
        priority
      />

      {/* ── 半透明遮罩（提升文字可讀性） ── */}
      <div className="absolute inset-0 bg-black/16 z-[1]" />

      {/* ── 內容 overlay ── */}
      <div className="relative z-10 flex flex-col h-full px-5 pt-6 pb-5">

        {/* ════════════
            一天行程進度條
            ════════════ */}
        <div className="mb-3">
          <DayProgress currentStep={currentStep} total={questions.length} />
        </div>

        {/* ═══════════
            情境描述（H1）
            ═══════════ */}
        <div className="mb-6 px-1">
          <h2 className={`text-center text-xl font-bold leading-relaxed drop-shadow-lg ${tc.scenario}`}>
            {q.scenario}
          </h2>
        </div>

        {/* ════════════════
            選項按鈕（大塊）
            ════════════════ */}
        <div className="flex flex-col w-full items-center justify-center gap-3 flex-1 pb-2">
          {q.options.map((opt) => (
            <OptionButton
              key={opt.id}
              text={opt.text}
              style={opt.style}
              selected={selectedId === opt.id}
              onClick={() => handleSelect(opt.id)}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
