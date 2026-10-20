import { rebuildRankings } from './lib/rankings'
import { rebuildRelationsGraph } from './lib/relationsGraph'
import { setAtlasConfig, type AtlasConfig } from './config'
import { resetContent, setChapterUnit, type RawContent } from './data/state'

export const SUPPORTED_CONTENT_SCHEMA = '1'

export interface AtlasContent extends RawContent {
  schemaVersion?: string
  config: AtlasConfig
}

export function configureAtlas(content: AtlasContent): void {
  const version = content.schemaVersion ?? SUPPORTED_CONTENT_SCHEMA
  if (version.split('.')[0] !== SUPPORTED_CONTENT_SCHEMA.split('.')[0]) {
    throw new Error(
      `[@atlas/engine] unsupported content schema "${version}" (supported: ${SUPPORTED_CONTENT_SCHEMA}). ` +
        'Upgrade the engine or run the content migrations.',
    )
  }
  setAtlasConfig(content.config)
  setChapterUnit(content.config.chapterUnit ?? '回')
  resetContent(content)
  rebuildRankings()
  rebuildRelationsGraph()
}

export {
  atlasConfig,
  type AtlasCluster,
  type AtlasConfig,
  type AtlasFigureGroup,
  type AtlasNavItem,
} from './config'
