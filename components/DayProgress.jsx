// components/DayProgress.jsx
// 以「上班族的一天」為主題的填答進度條
// 7 題對應 7 個時間節點：起床 → 出門 → 午餐 → 下午 → 下班 → 夜聚 → 回家

'use client';

// 每題對應的時間標籤與 emoji
const DAY_STEPS = [
  { time: '06:00', label: '起床',  emoji: '🛏️' },
  { time: '08:00', label: '出門',  emoji: '🚗' },
  { time: '12:00', label: '午餐',  emoji: '🍱' },
  { time: '14:00', label: '任務',  emoji: '💼' },
  { time: '18:00', label: '下班',  emoji: '🍺' },
  { time: '20:00', label: '夜聚',  emoji: '🗣️' },
  { time: '23:00', label: '回家',  emoji: '🌙' },
];

/**
 * @param {number} currentStep - 目前題號（0-indexed）
 * @param {number} total       - 總題數
 */
export default function DayProgress({ currentStep, total }) {
  // 進度百分比（抵達當前 step 的左端位置）
  const pct = total <= 1 ? 0 : (currentStep / (total - 1)) * 100;

  return (
    <div className="w-full px-1 pt-2 pb-3">

      {/* ── 目前時間標示 ── */}
      <div className="flex justify-between items-center mb-1.5 px-0.5">
        <span className="text-[10px] text-white/70 font-medium tracking-widest uppercase">
          今天的進度
        </span>
        <span className="text-[10px] text-white/80 font-semibold tracking-wide">
          {DAY_STEPS[currentStep]?.time}　{DAY_STEPS[currentStep]?.label}
        </span>
      </div>

      {/* ── 軌道 ── */}
      <div className="relative h-1.5 bg-white/20 rounded-full">
        {/* 已完成段落 */}
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-300 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
        {/* 當前位置光點 */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full
                     bg-white shadow-md shadow-orange-300/60 ring-2 ring-orange-200 transition-all duration-500"
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* ── 節點 emoji ── */}
      <div className="relative flex justify-between mt-2 px-0.5">
        {DAY_STEPS.map((step, i) => {
          const done    = i < currentStep;
          const current = i === currentStep;
          return (
            <div key={i} className="flex flex-col items-center gap-0.5">
              <span
                className={`text-sm leading-none transition-all duration-300 ${
                  current ? 'scale-125 drop-shadow-md' : done ? 'opacity-80' : 'opacity-30'
                }`}
              >
                {step.emoji}
              </span>
              {/* 時間點下方小標 — 僅顯示第一、中間、最後 */}
              {(i === 0 || i === 3 || i === 6) && (
                <span
                  className={`text-[8px] leading-none tracking-tight transition-all ${
                    current ? 'text-white font-bold' : done ? 'text-white/70' : 'text-white/30'
                  }`}
                >
                  {step.time}
                </span>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
