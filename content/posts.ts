import type { Post } from '@/types'

export const POSTS: Post[] = [
  {
    id: 'nepal-trek',
    date: 'FEB 2026',
    location: 'NEPAL · 尼泊尔',
    image: '/images/hiking.png',
    imageAlt: '尼泊尔徒步',
    title: '喜马拉雅山脚下，我走了十天，想清楚了一件事',
    excerpt: '徒步不是逃离，是一种让大脑重新开机的方式。尼泊尔的山路给了我久违的专注感。',
    href: '#',
  },
  {
    id: 'nomad-os',
    date: 'OCT 2024',
    location: 'NOMAD LIFE',
    image: '/images/working.png',
    imageAlt: '工作日常',
    title: '在流动的世界中建立属于自己的个人操作系统',
    excerpt: '关于自由、效率与持续创作的深度复盘，以及在不确定中找到节奏的方法论。',
    href: '#',
  },
]
