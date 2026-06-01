// components/ActionButtons.jsx
// 結果頁底部操作按鈕組（依 Figma 設計稿）
// · 膠囊外形 radius 40px
// · 漸層 linear-gradient(180deg, #FFF4BB → #B7E8FF)
// · 文字 #6E7CF8、weight 500、22px、letter-spacing 0.2em

'use client';

// 共用文字樣式（letterSpacing 末字補償以維持置中）
const labelStyle = {
  fontFamily: "'Noto Sans TC', sans-serif",
  fontWeight: 500,
  fontSize: '22px',
  lineHeight: 1.2,
  letterSpacing: '0.2em',
  color: '#6E7CF8',
};

/**
 * @param {function} onRetake - 重新測驗
 * @param {function} onShare  - 分享到社群媒體
 */
export default function ActionButtons({ onRetake, onShare }) {
  return (
    <div className="flex flex-col gap-3 w-full">
      
      {/* 重新測驗（次要）— 同字色／膠囊，淡底外框 */}
      <button
        onClick={onRetake}
        style={{ ...labelStyle,
          background: 'linear-gradient(180deg, #FFF4BB 0%, #B7E8FF 100%)'}}
        className="
          w-full py-2 rounded-[40px]
          text-center shadow-md
          transition-all duration-200
          hover:scale-[1.02] hover:shadow-lg hover:brightness-[1.03]
          active:scale-[0.98]
          cursor-pointer
        "
      >
        <span style={{ marginRight: '-0.2em' }}>重新測驗</span>
      </button>

      {/* 分享（主要 CTA）— 漸層膠囊 */}
      <button
        onClick={onShare}
        style={{
          ...labelStyle,
          background: 'linear-gradient(180deg, #FFF4BB 0%, #B7E8FF 100%)',
        }}
        className="
          w-full py-2 rounded-[40px]
          text-center shadow-md
          transition-all duration-200
          hover:scale-[1.02] hover:shadow-lg hover:brightness-[1.03]
          active:scale-[0.98]
          cursor-pointer
        "
      >
        <span style={{ marginRight: '-0.2em' }}>分享到社群媒體</span>
      </button>

    </div>
  );
}
