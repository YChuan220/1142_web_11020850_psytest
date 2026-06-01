// app/result/page.jsx
// 結果頁：bg_result_* 手機主卡片（包覆結果圖 + 按鈕），result_* 為前景主圖

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import useQuizStore from '@/store/store';
import { results } from '@/store/store';

function getResult(score) {
  return (
    results.find((r) => score >= r.scoreRange[0] && score <= r.scoreRange[1]) ??
    results[results.length - 1]
  );
}

export default function ResultPage() {
  const router    = useRouter();
  const score     = useQuizStore((s) => s.currentScore);
  const resetTest = useQuizStore((s) => s.resetTest);
  const result    = getResult(score);

  const handleRetake = () => {
    resetTest();
    router.push('/start');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `我的測驗結果：${result.name}`,
          text: `我在「你是健康人嗎？」得到了「${result.name}」！`,
          url: window.location.origin,
        });
      } catch { /* 使用者取消 */ }
    } else {
      await navigator.clipboard.writeText(window.location.origin);
      alert('連結已複製！快貼給朋友吧 😊');
    }
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href     = result.image;
    a.download = `result_${result.id}.png`;
    a.click();
  };

  return (
    <div className="mx-auto h-dvh w-full max-w-sm overflow-hidden">
      {/* 手機主卡片：bg_result 滿高直式背景（無圓角） */}
      <div className="relative flex h-full w-full flex-col">
        <div className="absolute inset-0 h-full w-full">
          <Image
            src={result.bgImage}
            alt=""
            fill
            className="h-full w-full object-cover object-center select-none"
            draggable={false}
            priority
            unoptimized
          />
        </div>

        <div className="relative z-10 flex min-h-0 h-full flex-1 flex-col px-5 pb-5 pt-6">
          {/* 結果主圖 */}
          <div
            className="relative min-h-0 flex-1"
            onContextMenu={(e) => { e.preventDefault(); handleDownload(); }}
            onTouchStart={() => { window._dlTimer = setTimeout(handleDownload, 500); }}
            onTouchEnd={()  => clearTimeout(window._dlTimer)}
            onTouchMove={()  => clearTimeout(window._dlTimer)}
          >
            <Image
              src={result.image}
              alt={result.name}
              fill
              className="object-contain object-center select-none"
              draggable={false}
              priority
              unoptimized
            />
          </div>

          {/* 按鈕（在卡片背景內） */}
          <div className="mt-2 w-full shrink-0 space-y-2">
            <button
              onClick={handleRetake}
              className="
                w-full py-3 rounded-full
                bg-gradient-to-r from-yellow-200 to-yellow-300
                text-yellow-800 font-semibold tracking-widest text-sm
                border border-yellow-300 shadow-sm
                transition-all duration-200
                hover:scale-[1.02] hover:shadow-md hover:from-yellow-300 hover:to-yellow-400
                active:scale-[0.98]
                cursor-pointer
              "
            >
              重新測驗
            </button>

            <button
              onClick={handleShare}
              className="
                w-full py-3 rounded-full
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

            <p className="text-center text-[11px] text-gray-600/80 tracking-wide">
              長按圖片即可儲存至相簿
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
