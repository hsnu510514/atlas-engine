import type {
  Achievement,
  Arc,
  AtlasMap,
  BioHighlight,
  Chapter,
  Character,
  DeedCampaign,
  DeedCapture,
  DeedFight,
  DeedKill,
  Figure,
  Hero,
  HeroAnchor,
  HeroStatus,
  Interaction,
  MapArea,
  MapLabel,
  MapLake,
  MapLine,
  Place,
  PortraitSource,
  RankingCategory,
  RankingGroup,
  Relation,
  StoryEvent,
} from './types'

export interface RawContent {
  chapters?: Chapter[]
  arcs?: Arc[]
  places?: Place[]
  events?: StoryEvent[]
  heroes?: Hero[]
  characters?: Character[]
  figures?: Figure[]
  heroAnchors?: HeroAnchor[]
  relations?: Relation[]
  interactions?: Interaction[]
  rankingGroups?: RankingGroup[]
  curatedRankings?: RankingCategory[]
  bios?: Record<string, BioHighlight[]>
  achievements?: Record<string, Achievement[]>
  deeds?: {
    captures?: DeedCapture[]
    fights?: DeedFight[]
    kills?: DeedKill[]
    campaigns?: DeedCampaign[]
  }
  portraits?: Record<string, PortraitSource[]>
  map?: AtlasMap
}

export interface HeroState {
  hero: Hero
  status: HeroStatus | 'notYet'
  placeId: string | null
  confidence: 'text' | 'inferred'
  sinceChapter?: number
  note?: string
}

export let chapterUnit = '回'

export let chapters: Chapter[] = []
export let arcs: Arc[] = []
export let places: Place[] = []
export let events: StoryEvent[] = []
export let heroes: Hero[] = []
export let characters: Character[] = []
export let figures: Figure[] = []
export let relations: Relation[] = []
export let interactions: Interaction[] = []
export let rankingGroups: RankingGroup[] = []
export let curatedRankings: RankingCategory[] = []
export let bios: Record<string, BioHighlight[]> = {}
export let achievements: Record<string, Achievement[]> = {}
export let captures: DeedCapture[] = []
export let fights: DeedFight[] = []
export let kills: DeedKill[] = []
export let campaigns: DeedCampaign[] = []
export let portraitsByFigure: Record<string, PortraitSource[]> = {}

const emptyGeo: NonNullable<AtlasMap['landGeo']> = { type: 'FeatureCollection', features: [] }

export let landGeo: NonNullable<AtlasMap['landGeo']> = emptyGeo
export let admin1Geo: NonNullable<AtlasMap['admin1Geo']> = emptyGeo
export let rivers: MapLine[] = []
export let lakes: MapLake[] = []
export let areas: MapArea[] = []
export let frontiers: MapLine[] = []
export let mapLabels: MapLabel[] = []
export let mapExtent: [number, number, number, number] = [0, 0, 1, 1]

export let chapterByNumber: Record<number, Chapter> = {}
export let chapterTitles: string[] = []
export let arcById: Record<string, Arc> = {}
export let eventById: Record<string, StoryEvent> = {}
export let eventsByChapter: Record<number, StoryEvent[]> = {}
export let placeById: Record<string, Place> = {}
export let heroById: Record<string, Hero> = {}
export let characterById: Record<string, Character> = {}
export let figureById: Record<string, Figure> = {}
export let relationById: Record<string, Relation> = {}
export let interactionById: Record<string, Interaction> = {}
export let rankingGroupById: Record<string, RankingGroup> = {}
export let heroAnchorsByHero: Record<string, HeroAnchor[]> = {}

function indexBy<T extends { id: string }>(items: T[]): Record<string, T> {
  return Object.fromEntries(items.map((item) => [item.id, item]))
}

function sortAnchors(items: HeroAnchor[]): Record<string, HeroAnchor[]> {
  const grouped: Record<string, HeroAnchor[]> = {}
  for (const anchor of items) {
    const list = grouped[anchor.heroId] ?? []
    list.push(anchor)
    grouped[anchor.heroId] = list
  }
  for (const list of Object.values(grouped)) {
    list.sort((left, right) => left.chapter - right.chapter)
  }
  return grouped
}

export function resetContent(raw: RawContent): void {
  chapters = raw.chapters ?? []
  arcs = raw.arcs ?? []
  places = raw.places ?? []
  events = raw.events ?? []
  heroes = raw.heroes ?? []
  characters = raw.characters ?? []
  figures = raw.figures ?? []
  relations = raw.relations ?? []
  interactions = raw.interactions ?? []
  rankingGroups = raw.rankingGroups ?? []
  curatedRankings = raw.curatedRankings ?? []
  bios = raw.bios ?? {}
  achievements = raw.achievements ?? {}
  captures = raw.deeds?.captures ?? []
  fights = raw.deeds?.fights ?? []
  kills = raw.deeds?.kills ?? []
  campaigns = raw.deeds?.campaigns ?? []
  portraitsByFigure = raw.portraits ?? {}

  landGeo = raw.map?.landGeo ?? emptyGeo
  admin1Geo = raw.map?.admin1Geo ?? emptyGeo
  rivers = raw.map?.rivers ?? []
  lakes = raw.map?.lakes ?? []
  areas = raw.map?.areas ?? []
  frontiers = raw.map?.frontiers ?? []
  mapLabels = raw.map?.labels ?? []
  mapExtent = raw.map?.extent ?? [0, 0, 1, 1]

  chapterByNumber = Object.fromEntries(chapters.map((chapter) => [chapter.n, chapter]))
  chapterTitles = chapters.map((chapter) => chapter.title)
  arcById = indexBy(arcs)
  eventById = indexBy(events)
  eventsByChapter = events.reduce<Record<number, StoryEvent[]>>((acc, event) => {
    ;(acc[event.chapter] ??= []).push(event)
    return acc
  }, {})
  placeById = indexBy(places)
  heroById = indexBy(heroes)
  characterById = indexBy(characters)
  figureById = indexBy(figures)
  relationById = indexBy(relations)
  interactionById = indexBy(interactions)
  rankingGroupById = indexBy(rankingGroups)
  heroAnchorsByHero = sortAnchors(raw.heroAnchors ?? [])
}

export function setChapterUnit(unit: string): void {
  chapterUnit = unit
}

export function arcForChapter(n: number): Arc {
  return arcs.find((arc) => n >= arc.from && n <= arc.to) ?? arcs[0]
}

export function eventsForChapter(chapter: number): StoryEvent[] {
  return eventsByChapter[chapter] ?? []
}

export function chapterLabel(n: number): string {
  const chapter = chapterByNumber[n]
  return chapter ? `第${chapter.n}${chapterUnit}　${chapter.title}` : `第${n}${chapterUnit}`
}

export function placeName(id: string): string {
  return placeById[id]?.name ?? id
}

export function heroName(id: string): string {
  return heroById[id]?.name ?? id
}

export function characterName(id: string): string {
  return characterById[id]?.name ?? id
}

export function figureName(id: string): string {
  return figureById[id]?.name ?? id
}

export function interactionsForPair(a: string, b: string): Interaction[] {
  return interactions
    .filter(
      (interaction) =>
        (interaction.a === a && interaction.b === b) || (interaction.a === b && interaction.b === a),
    )
    .sort((left, right) => left.chapter - right.chapter)
}

export function anchorsForHero(heroId: string): HeroAnchor[] {
  return heroAnchorsByHero[heroId] ?? []
}

export function resolveHeroState(heroId: string, chapter: number): HeroState {
  const hero = heroById[heroId]
  if (!hero) {
    throw new Error(`Unknown hero: ${heroId}`)
  }
  if (chapter < hero.firstChapter) {
    return {
      hero,
      status: 'notYet',
      placeId: null,
      confidence: 'inferred',
      note: '尚未出場。',
    }
  }
  const anchors = anchorsForHero(heroId)
  let current: HeroAnchor | null = null
  for (const anchor of anchors) {
    if (anchor.chapter > chapter) break
    current = anchor
  }
  if (!current) {
    return {
      hero,
      status: 'unknown',
      placeId: null,
      confidence: 'inferred',
      note: '已出場，行蹤未載。',
    }
  }
  return {
    hero,
    status: current.status,
    placeId: current.placeId,
    confidence: current.confidence,
    sinceChapter: current.chapter,
    note: current.note,
  }
}

export function statesForChapter(chapter: number): HeroState[] {
  return heroes.map((hero) => resolveHeroState(hero.id, chapter))
}

export function bioFor(id: string): BioHighlight[] {
  return bios[id] ?? []
}

export function achievementsFor(id: string): Achievement[] {
  return achievements[id] ?? []
}

export function portraitsFor(figureId: string): PortraitSource[] {
  return portraitsByFigure[figureId] ?? []
}
