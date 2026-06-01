// components/DayProgress.jsx
// 填答進度條：簡化為三個時段節點，icon 收於進度條內部
//   · 開頭 q1 → ☀️ 太陽
//   · 中間 q5 → 🌇 日落
//   · 結尾 q7 → 🌙 月亮

'use client';

// 三個節點：對應題號（0-indexed step）與時段 icon
const NODES = [
  { emoji: '☀️', step: 0 }, // q1 開頭
  { emoji: '🌇', step: 4 }, // q5 中間
  { emoji: '🌙', step: 6 }, // q7 結尾
];

/**
 * @param {number} currentStep - 目前題號（0-indexed）
 * @param {number} total       - 總題數
 */
export default function DayProgress({ currentStep, total }) {
  // 進度百分比（已完成段落寬度）
  const pct = total <= 1 ? 0 : (currentStep / (total - 1)) * 100;

  return (
    <div className="w-full px-1 pt-2 pb-1">
      {/* ── 軌道（節點收於內部） ── */}
      <div className="relative h-9 rounded-full bg-white/20 overflow-hidden">
        {/* 已完成段落 */}
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-300 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />

        {/* 三個時段節點 icon */}
        <div className="absolute inset-0 flex items-center justify-between px-3.5">
          {NODES.map((node, i) => {
            const reached = currentStep >= node.step;
            return (
              <span
                key={i}
                className={`text-lg leading-none transition-all duration-300 ${
                  reached
                    ? 'opacity-100 scale-110 drop-shadow'
                    : 'opacity-40 scale-90 grayscale'
                }`}
              >
                {node.emoji}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
