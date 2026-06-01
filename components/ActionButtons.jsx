// components/ActionButtons.jsx
// 結果頁底部操作按鈕組
// · 分享到社群媒體（主要 CTA，漸層色）
// · 重新測驗（次要，淡色）

'use client';

/**
 * @param {function} onRetake - 重新測驗
 * @param {function} onShare  - 分享到社群媒體
 */
export default function ActionButtons({ onRetake, onShare }) {
  return (
    <div className="flex flex-col gap-3 w-full">

      {/* 分享（主要 CTA） */}
      <button
        onClick={onShare}
        className="
          w-full py-3.5
          rounded-full
          bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
          text-white font-semibold tracking-widest text-sm
          shadow-md
          transition-all duration-200
          hover:scale-[1.02] hover:shadow-lg hover:opacity-90
          active:scale-[0.98]
          cursor-pointer
        "
      >
        分享到社群媒體
      </button>

      {/* 重新測驗（次要） */}
      <button
        onClick={onRetake}
        className="
          w-full py-3
          rounded-full
          bg-white/50 backdrop-blur-sm
          text-gray-600 font-semibold tracking-widest text-sm
          border border-white/60
          transition-all duration-200
          hover:scale-[1.02] hover:bg-white/70
          active:scale-[0.98]
          cursor-pointer
        "
      >
        重新測驗
      </button>

    </div>
  );
}
