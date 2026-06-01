'use client';

/**
 * @param {string}   text     - 選項文字
 * @param {string}   style    - 視覺主題（僅作用於 hover / selected 狀態）
 * @param {boolean}  selected - 是否已被選中
 * @param {function} onClick  - 點擊事件
 */
export default function OptionButton({ text, style = 'light', selected = false, onClick }) {

  // 統一色系（不分題目）：白底深字 + ring
  const hover = 'hover:bg-cyan-900/50 hover:text-cyan-50 hover:border-cyan-200';
  const sel   = 'bg-cyan-800/60 text-cyan-50 border-cyan-200 ring-2 ring-cyan-300/50';

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full
        px-5 py-5
        rounded-2xl border
        text-lg leading-relaxed text-center
        transition-all duration-200
        hover:scale-[1.025] hover:shadow-lg hover:backdrop-blur-sm
        active:scale-[0.97]
        cursor-pointer
        ${selected
          ? `${sel} scale-[1.025] shadow-lg backdrop-blur-sm`
          : `bg-transparent border-white/40 text-white drop-shadow-md ${hover}`
        }
      `}
    >
      {/* 選中打勾標記 */}
      {/* {selected && (
        <span className="absolute top-2 right-3 text-base opacity-80">✓</span>
      )} */}

      {text}
    </button>
  );
}
