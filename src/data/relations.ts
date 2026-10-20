import type { RelationType } from './types'

export const relationTypeMeta: Record<
  RelationType,
  { label: string; tone: string; directed?: boolean }
> = {
  kinship: { label: '親屬', tone: 'stone' },
  marriage: { label: '婚配', tone: 'cinnabar' },
  sworn: { label: '結義', tone: 'ochre' },
  master: { label: '師徒', tone: 'azurite', directed: true },
  patronage: { label: '恩義', tone: 'moss', directed: true },
  friendship: { label: '友誼', tone: 'moss' },
  romance: { label: '情愛', tone: 'cinnabar' },
  subordinate: { label: '隸屬', tone: 'stone', directed: true },
  alliance: { label: '同盟', tone: 'azurite' },
  rivalry: { label: '競爭', tone: 'ochre' },
  enmity: { label: '仇敵', tone: 'ink' },
  other: { label: '其他', tone: 'stone' },
}

export { relations, relationById } from './state'
