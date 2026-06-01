// store/store.js
// Zustand 全域狀態管理：心理測驗資料中心

import { create } from 'zustand';

// ─────────────────────────────────────────
// 📋 靜態題目資料
// 每題包含：標題、情境描述、選項陣列（文字 + 分數 + 選項風格 key）
// ─────────────────────────────────────────
export const questions = [
  {
    id: 1,
    title: '問題一',
    scenario:
      '從睡夢中醒來，你按掉鬧鐘，此時窗外天色明亮。你躺在床上思考了一陣子，然後...',
    theme: 'blue', // 對應頁面配色主題
    options: [
      {
        id: 'A',
        text: '你決定起身，為自己泡一杯熱可可，開啟嶄新的一天。',
        score: 2,
        style: 'dark', // dark = 深色底白字
      },
      {
        id: 'B',
        text: '反正還早，再睡一下也無所謂啦！你設了十分鐘的鬧鐘並深深地睡去。',
        score: 0,
        style: 'light', // light = 淺色底深字
      },
    ],
  },
  {
    id: 2,
    title: '問題二',
    scenario:
      '從昏睡中醒來，發現自己在睡夢中把鬧鐘按掉，因此睡過頭了，於是你決定...',
    theme: 'purple',
    options: [
      {
        id: 'A',
        text: '反正都遲到了，就從容地走去，享受早晨的陽光。',
        score: 1,
        style: 'light',
      },
      {
        id: 'B',
        text: '急迫地出門，並攔了一輛計程車，開始為睡過頭懊悔。',
        score: 0,
        style: 'cyan',
      },
    ],
  },
  {
    id: 3,
    title: '問題三',
    scenario:
      '不知不覺一天就過了一半，又到了開始煩惱午餐要吃什麼的時間，你會...',
    theme: 'yellow',
    options: [
      {
        id: 'A',
        text: '接受朋友的午餐邀約，去吃油膩的燒肉定食。',
        score: 0,
        style: 'bold',
      },
      {
        id: 'B',
        text: '為了自己的健康著想，購買鄰近的健康餐盒。',
        score: 2,
        style: 'light',
      },
    ],
  },
  {
    id: 4,
    title: '問題四',
    scenario:
      '下午，你被指派了一個非常重要的任務，但對你而言實在是太困難了，因此...',
    theme: 'pink',
    options: [
      {
        id: 'A',
        text: '你感到沮喪，開始懷疑自己並覺得不知所措。',
        score: 0,
        style: 'light',
      },
      {
        id: 'B',
        text: '你十分興奮，決定全心全意地投入這項任務。',
        score: 2,
        style: 'bold',
      },
      {
        id: 'C',
        text: '你決定尋求朋友幫忙，透過合作完成任務。',
        score: 1,
        style: 'light',
      },
    ],
  },
  {
    id: 5,
    title: '問題五',
    scenario:
      '經歷了一整天的折騰，好不容易把手上的任務告一段落。此時，朋友們約你去喝酒聚餐，你會...',
    theme: 'bluegray',
    options: [
      {
        id: 'A',
        text: '接受朋友邀約，藉由大吃大喝來紓解壓力。',
        score: 0,
        style: 'cyan',
      },
      {
        id: 'B',
        text: '婉拒朋友的邀約，選擇自己吃飯並回家休息。',
        score: 2,
        style: 'light',
      },
    ],
  },
  {
    id: 6,
    title: '問題六',
    scenario:
      '吃飯過程中，一位朋友忍不住開始訴苦，委屈地說起自己遇到的鳥事，而你...',
    theme: 'bluegray',
    options: [
      {
        id: 'A',
        text: '對朋友的遭遇感到同情，忍不住安慰他並幫他想辦法。',
        score: 2,
        style: 'light',
      },
      {
        id: 'B',
        text: '表面上很認真聽，其實大腦早就在神遊了。',
        score: 0,
        style: 'dark',
      },
    ],
  },
  {
    id: 7,
    title: '問題七',
    scenario: '你喝得爛醉回到家，倒在床上，此時你腦中想著...',
    theme: 'dark',
    options: [
      {
        id: 'A',
        text: '自己今天發生了什麼事情',
        score: 1,
        style: 'neutral',
      },
      {
        id: 'B',
        text: '#:&#@\\)?*}%-><-!%[/(.{',
        score: 0,
        style: 'cyan',
      },
    ],
  },
];

// ─────────────────────────────────────────
// 🏆 結果資料
// scoreRange: [min, max]（含頭含尾）
// image:    public/result_<id>.png  結果主圖（前景）
// bgImage:  public/bg_result_<id>.svg  直式背景（襯在結果圖後方）
// ─────────────────────────────────────────
export const results = [
  {
    id: 'health',
    name: '健康人',
    scoreRange: [10, 12],
    image: '/result_health.png',
    bgImage: '/bg_result_health.svg',
    gradient: 'from-blue-200 via-purple-200 to-pink-200',
    accentColor: 'text-blue-500',
  },
  {
    id: 'victor',
    name: '腎利組',
    scoreRange: [8, 9],
    image: '/result_victor.png',
    bgImage: '/bg_result_victor.svg',
    gradient: 'from-green-200 via-teal-200 to-blue-200',
    accentColor: 'text-teal-500',
  },
  {
    id: 'liver',
    name: '肝菁人',
    scoreRange: [6, 7],
    image: '/result_liver.png',
    bgImage: '/bg_result_liver.svg',
    gradient: 'from-teal-300 via-green-200 to-yellow-200',
    accentColor: 'text-teal-600',
  },
  {
    id: 'stomach',
    name: '無所胃',
    scoreRange: [4, 5],
    image: '/result_stomach.png',
    bgImage: '/bg_result_stomach.svg',
    gradient: 'from-pink-200 via-purple-200 to-blue-200',
    accentColor: 'text-purple-500',
  },
  {
    id: 'heart',
    name: '玻璃心',
    scoreRange: [3, 3],
    image: '/result_heart.png',
    bgImage: '/bg_result_heart.svg',
    gradient: 'from-indigo-300 via-purple-300 to-pink-300',
    accentColor: 'text-indigo-500',
  },
  {
    id: 'trash',
    name: '小肺物',
    scoreRange: [1, 2],
    image: '/result_trash.png',
    bgImage: '/bg_result_trash.svg',
    gradient: 'from-blue-200 via-cyan-200 to-pink-200',
    accentColor: 'text-blue-500',
  },
  {
    id: 'brain',
    name: '無煩腦',
    scoreRange: [0, 0],
    image: '/result_brain.png',
    bgImage: '/bg_result_brain.svg',
    gradient: 'from-yellow-200 via-pink-200 to-purple-200',
    accentColor: 'text-pink-500',
  },
];

// ─────────────────────────────────────────
// 🗃️ Zustand Store
// ─────────────────────────────────────────
const useQuizStore = create((set) => ({
  // 當前累積分數
  currentScore: 0,

  // 當前題號（0-indexed，第 0 題 = questions[0]）
  currentStep: 0,

  // 加分方法：傳入選項的 score 值進行累加，並推進至下一題
  addScore: (score) =>
    set((state) => ({
      currentScore: state.currentScore + score,
      currentStep: state.currentStep + 1,
    })),

  // 重置測驗：分數與題號歸零
  resetTest: () =>
    set({
      currentScore: 0,
      currentStep: 0,
    }),
}));

export default useQuizStore;
