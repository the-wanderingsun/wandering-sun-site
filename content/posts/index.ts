/**
 * 文章聚合器 — 只需在这里 import 新文章，其他地方零改动
 *
 * 新增文章步骤：
 * 1. 在对应分类文件夹（旅居/Web3/AI/思考）新建 xxx.ts
 * 2. 在下方 import 并加入 POSTS 数组
 */

import type { Post } from '@/types'

import nepalTrek       from './旅居/nepal-trek'
import nepalKathmandu  from './旅居/nepal-kathmandu'
import nomadOs         from './思考/nomad-os'

export const POSTS: Post[] = [
  nepalTrek,
  nepalKathmandu,
  nomadOs,
]
