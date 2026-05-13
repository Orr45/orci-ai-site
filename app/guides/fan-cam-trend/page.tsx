import type { Metadata } from 'next'
import FanCamTabs from './FanCamTabs'

export const metadata: Metadata = {
  title: 'טרנד מצלמת המשחק הוויראלי | Orci AI',
  description: 'איך ליצור תמונת שידור חי מזויפת ולהפוך אותה לוידאו ויראלי — מתחילים עם Nano Banana 2, מתקדמים עם GPT Image 2 + Seedance 2.0',
}

export default function FanCamTrendPage() {
  return <FanCamTabs />
}
