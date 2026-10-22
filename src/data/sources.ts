import type { SourceRecord } from '../domain/anatomy'

export const sources: SourceRecord[] = [
  {
    id: 'project-editorial',
    title: 'FitnessGuide 项目原创编辑资料',
    url: 'https://fitness-guide.local/editorial',
    license: 'CC BY-SA 4.0',
    attribution: 'FitnessGuide contributors',
    accessedDate: '2026-10-21',
    notes: '内容为项目原创概述，发布到生产环境前需要专业解剖学审核。',
  },
  {
    id: 'repdb',
    title: 'Exercise data by RepDB (repdb.co)',
    url: 'https://repdb.co',
    license: 'RepDB Free Tier License v1.0',
    attribution: 'Exercise data by RepDB (repdb.co)',
    accessedDate: '2026-10-21',
    notes:
      '应用内引用其免费档 512px WebP 静图，只保存远程地址。不转载完整数据集，也不使用 premium-samples 预览动画。',
  },
]
