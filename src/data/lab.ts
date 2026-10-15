/**
 * 实验室公开信息。
 * 网站正文内容全部来自本文件，修改此处即可更新页面，无需改动任何组件。
 */

export interface ResearchDirection {
  /** 页面锚点，同时用于导航定位 */
  id: string
  /** 展示用序号 */
  index: string
  title: string
  titleEn: string
  summary: string
  details: string[]
  facts: { label: string, value: string }[]
}

export interface Member {
  name: string
  affiliation: string
}

export interface Publication {
  direction: string
  venue: string
  status: string
}

export interface Collaboration {
  partner: string
  partnerEn?: string
  detail: string
}

export const lab = {
  nameZh: '人工智能实验室',
  nameEn: 'Artificial Intelligence Laboratory',
  pi: '蒋峰岭',
  tagline: '面向多模态感知与理解的智能计算研究',
  introduction: [
    '人工智能实验室由蒋峰岭老师指导，围绕人工智能领域的前沿问题开展研究，重点关注多模态信息的感知、理解与融合，强调方法创新与工程应用的结合。',
    '实验室现有多个研究方向并行推进，研究内容涵盖图像描述生成、视听语音增强、多模态融合与目标跟踪等，并与国内多所高校及海外研究团队保持稳定的合作与交流。',
  ],
  affiliations: ['合肥师范学院', '安徽建筑大学'],
  facts: [
    { label: '研究方向', value: '3' },
    { label: '研究生成员', value: '4' },
    { label: '合作单位', value: '2' },
  ],
}

export const advisor = {
  name: '蒋峰岭',
  role: '导师',
}

export const members: Member[] = [
  { name: '王修瑞', affiliation: '合肥师范学院' },
  { name: '匡文超', affiliation: '合肥师范学院' },
  { name: '刘雯晶', affiliation: '安徽建筑大学' },
  { name: '李永晨', affiliation: '安徽建筑大学' },
]

export const researchDirections: ResearchDirection[] = [
  {
    id: 'image-captioning',
    index: '01',
    title: '图像描述生成',
    titleEn: 'Image Captioning',
    summary: '面向图像到自然语言的跨模态生成任务，研究图像内容理解与语言描述生成方法，是实验室新近布局的研究方向。',
    details: [
      '前期已围绕该方向开展大量基础性工作，形成了较为完整的研究积累，具备良好的延续性。',
      '目前由一名研三同学负责主要研究推进，已发表 IEEE Transactions on Multimedia（TMM）论文一篇，另有一篇 TMM 论文处于审稿阶段。',
      '研究可进一步延伸至视频理解等时序多模态任务。',
    ],
    facts: [
      { label: '论文', value: 'TMM 已发表 1 篇 · 审稿中 1 篇' },
      { label: '团队', value: '研三同学 1 名' },
    ],
  },
  {
    id: 'audio-visual-speech-enhancement',
    index: '02',
    title: '视听语音增强',
    titleEn: 'Audio-Visual Speech Enhancement',
    summary: '融合视觉信息辅助语音增强，研究复杂声学环境下语音质量与可懂度的提升方法，属于多模态感知的交叉方向。',
    details: [
      '目前由两名研二同学开展研究，两篇论文已投稿至本领域国际顶级会议。',
      '面向中文场景的语音数据集正在构建中。',
      '该方向与英国爱丁堡龙比亚大学（Edinburgh Napier University）合作开展，并得到 Amir Hussain 教授指导，国内相关研究相对较少。',
    ],
    facts: [
      { label: '论文', value: '国际顶级会议投稿 2 篇' },
      { label: '团队', value: '研二同学 2 名' },
      { label: '合作', value: '爱丁堡龙比亚大学' },
    ],
  },
  {
    id: 'multimodal-fusion-tracking',
    index: '03',
    title: '多模态融合与目标跟踪',
    titleEn: 'Multimodal Fusion and Object Tracking',
    summary: '研究多模态信息融合与目标跟踪方法，重点探索红外图像与可见光图像的互补融合。',
    details: [
      '目前由一名研三同学开展研究，两篇论文处于投稿阶段。',
      '该方向与安徽大学李成龙老师合作开展。',
      '面向低空无人机场景，研究复杂环境下多模态感知能力的提升。',
    ],
    facts: [
      { label: '论文', value: '投稿中 2 篇' },
      { label: '团队', value: '研三同学 1 名' },
      { label: '合作', value: '安徽大学' },
    ],
  },
]

export const publications: Publication[] = [
  {
    direction: '图像描述生成',
    venue: 'IEEE Transactions on Multimedia（TMM）',
    status: '已发表 1 篇 · 审稿中 1 篇',
  },
  {
    direction: '视听语音增强',
    venue: '本领域国际顶级会议',
    status: '已投稿 2 篇',
  },
  {
    direction: '多模态融合与目标跟踪',
    venue: '国际期刊与会议',
    status: '投稿中 2 篇',
  },
]

export const collaborations: Collaboration[] = [
  {
    partner: '爱丁堡龙比亚大学',
    partnerEn: 'Edinburgh Napier University',
    detail: '在视听语音增强方向开展合作研究，由 Amir Hussain 教授提供指导。',
  },
  {
    partner: '安徽大学',
    detail: '在多模态融合与目标跟踪方向开展合作研究，与李成龙老师共同推进。',
  },
]
