// components/StartButton.jsx
// 開始測驗按鈕：首頁的主要 CTA

'use client';

/**
 * StartButton
 * @param {function} onClick - 點擊後觸發的事件
 * @param {string}   label   - 按鈕文字（預設「開始測驗」）
 */
export default function StartButton({ onClick, label = '開始測驗' }) {
  return (
    <button
      onClick={onClick}
      className="
        px-24 py-2 rounded-[40px]
        bg-gradient-to-r from-cyan-200 to-blue-200
        text-blue-600 font-semibold text-lg tracking-widest
        border border-blue-200
        text-center shadow-md
        transition-all duration-200
        hover:scale-105 hover:shadow-lg hover:from-cyan-300 hover:to-blue-300
        active:scale-95 active:shadow-sm
        cursor-pointer
      "
    >
      {label}
    </button>
  );
}
