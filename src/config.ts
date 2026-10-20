import type { ReactNode } from 'react'
import type { Figure, Hero } from './data/types'

export interface AtlasNavItem {
  id: string
  to: string
  label: string
  caption: string
}

export interface AtlasFigureGroup {
  label: string
  order: number
}

export interface AtlasCluster {
  label: string
  tone: string
  center: { x: number; y: number }
}

export interface AtlasHeroGroup {
  id: string
  label: string
  match: (hero: Hero) => boolean
}

export interface AtlasTerms {
  figure: string
  figurePlural: string
  figures: string
  figureTrail: string
  biographyTitle: string
  biographySubtitle: string
  rankingsTitle: string
  edition: string
  faction: string
  searchPlaceholder: string
}

const defaultTerms: AtlasTerms = {
  figure: '人物',
  figurePlural: '人物',
  figures: '人物',
  figureTrail: '人物行蹤',
  biographyTitle: '人物列傳',
  biographySubtitle: '群英事蹟',
  rankingsTitle: '群英',
  edition: '文學作品',
  faction: '勢力',
  searchPlaceholder: '搜尋姓名、別名、出身',
}

export function atlasTerms(): AtlasTerms {
  return { ...defaultTerms, ...config.terms }
}

export interface AtlasConfig {
  id: string
  title: string
  seal: string
  subtitle: string
  chapterUnit?: string
  nav: AtlasNavItem[]
  about?: ReactNode
  figureGroups?: Record<string, AtlasFigureGroup>
  figureGroupOf?: (figure: Figure) => string
  clusters?: Record<string, AtlasCluster>
  clusterOf?: (figure: Figure) => string
  heroGroups?: AtlasHeroGroup[]
  terms?: Partial<AtlasTerms>
}

let config: AtlasConfig = {
  id: 'atlas',
  title: '輿圖',
  seal: '輿圖',
  subtitle: '',
  nav: [{ id: 'story', to: '/story', label: '章回事件', caption: '事件' }],
}

export function atlasConfig(): AtlasConfig {
  return config
}

export function setAtlasConfig(next: AtlasConfig): void {
  config = next
}
