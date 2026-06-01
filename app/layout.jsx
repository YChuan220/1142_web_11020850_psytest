// app/layout.jsx
// 根佈局：全域 CSS、字體、HeroUI Provider
// 各頁面自行以 max-w-sm 控制 RWD 最大寬度

import './globals.css';
import { HeroUIProvider } from '@heroui/react';

export const metadata = {
  title: '你是健康人嗎？',
  description: '快來測測你的健康狀態！',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-day">
        <HeroUIProvider>
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
