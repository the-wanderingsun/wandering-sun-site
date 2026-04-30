import type { FlashCard } from '@/types'

export const FLASH_CARDS: FlashCard[] = [
  {
    id: 'today',
    tag: 'LATEST · 今日闪念',
    body: '在清迈的咖啡馆写稿，窗外下着雨。突然意识到"在家工作"和"在世界工作"唯一的区别，是窗外的那片风景。',
    date: '2024.10.28',
    accent: true,
  },
  {
    id: 'freedom',
    tag: 'ON FREEDOM',
    body: '真正的自由不是没有约束，而是自己选择约束的方式。游牧之后反而给自己定了更多规矩。',
    date: '2024.10.21',
  },
  {
    id: 'language',
    tag: 'ON LANGUAGE',
    body: '在非英语国家生活久了，对语言的钝感慢慢变成一种舒适感——不必听懂所有对话是一种休息。',
    date: '2024.10.15',
  },
  {
    id: 'belonging',
    tag: 'ON BELONGING',
    body: '旅居第七个城市，我发现归属感不是被一个地方接纳，而是在任何地方都能建立起一套让自己平静的日常。咖啡馆→工作→散步→阅读，这套仪式比地址更像是"家"。',
    date: '2024.10.08',
    wide: true,
  },
  {
    id: 'money',
    tag: 'ON MONEY',
    body: '游牧不便宜，但会让你极度清楚自己的钱花在哪里值得。',
    date: '2024.10.02',
  },
]
