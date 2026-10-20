import type { ReactNode } from 'react'
import type { Figure } from './data/types'

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
