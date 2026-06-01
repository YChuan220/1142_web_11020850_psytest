// components/OptionButton.jsx
// 題目選項按鈕 — 大塊全寬設計，對應 reference 圖片的選項視覺
// · style: 'dark' | 'light' | 'cyan' | 'bold' | 'neutral'
// · selected: 已選中狀態（顯示確認色 + 縮放）
// · 完整 hover / active / selected 視覺回饋

'use client';

/**
 * @param {string}   text     - 選項文字
 * @param {string}   style    - 視覺主題
 * @param {boolean}  selected - 是否已被選中
 * @param {function} onClick  - 點擊事件
 */
export default function OptionButton({ text, style = 'light', selected = false, onClick }) {

  // ── 各 style 的基礎色 ──
  const styleMap = {
    dark: {
      base:     'bg-gray-900/80 text-white border-gray-600',
      hover:    'hover:bg-gray-800 hover:border-gray-400',
      selected: 'bg-gray-700 border-white/60 ring-2 ring-white/40',
    },
    light: {
      base:     'bg-white/60 text-gray-800 border-white/70',
      hover:    'hover:bg-white/85 hover:border-white',
      selected: 'bg-white border-gray-300 ring-2 ring-white/80',
    },
    cyan: {
      base:     'bg-transparent text-cyan-200 border-cyan-300/60',
      hover:    'hover:bg-cyan-900/40 hover:border-cyan-200',
      selected: 'bg-cyan-800/50 border-cyan-200 ring-2 ring-cyan-300/50',
    },
    bold: {
      base:     'bg-white/80 text-gray-900 border-white font-bold',
      hover:    'hover:bg-white hover:border-gray-200',
      selected: 'bg-white border-gray-200 ring-2 ring-white/90',
    },
    neutral: {
      base:     'bg-white/15 text-gray-100 border-white/20',
      hover:    'hover:bg-white/30 hover:border-white/40',
      selected: 'bg-white/35 border-white/50 ring-2 ring-white/30',
    },
  };

  const s = styleMap[style] ?? styleMap.light;

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full
        px-5 py-5
        rounded-2xl border backdrop-blur-sm
        text-sm leading-relaxed text-center
        transition-all duration-200
        hover:scale-[1.025] hover:shadow-lg
        active:scale-[0.97]
        cursor-pointer
        ${selected
          ? `${s.selected} scale-[1.025] shadow-lg`
          : `${s.base} ${s.hover}`
        }
      `}
    >
      {/* 選中打勾標記 */}
      {selected && (
        <span className="absolute top-2 right-3 text-base opacity-80">✓</span>
      )}

      {text}
    </button>
  );
}
