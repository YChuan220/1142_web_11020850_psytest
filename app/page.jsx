// app/page.jsx
// 根路由：直接導向 /start

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/start');
}
