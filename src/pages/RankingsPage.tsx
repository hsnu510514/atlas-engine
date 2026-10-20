import { useEffect } from 'react'
import { RankingsSidebar } from '../components/rankings/RankingsSidebar'
import { RankingBoard } from '../components/rankings/RankingBoard'
import { allRankings, rankingById } from '../lib/rankings'
import { useAppStore } from '../store/appStore'
import { atlasTerms } from '../config'

export function RankingsPage() {
  const selectedRankingId = useAppStore((store) => store.selectedRankingId)
  const selectRanking = useAppStore((store) => store.selectRanking)
  const selectedFigureId = useAppStore((store) => store.selectedFigureId)
  const selectFigure = useAppStore((store) => store.selectFigure)

  const fallbackId = allRankings[0]?.id ?? null
  const activeId =
    selectedRankingId && rankingById[selectedRankingId]
      ? selectedRankingId
      : (fallbackId ?? '')

  useEffect(() => {
    if (!selectedRankingId && fallbackId) selectRanking(fallbackId)
  }, [fallbackId, selectRanking, selectedRankingId])

  return (
    <>
      <aside className="sidebar ranking-nav-pane" aria-label="榜單側欄">
        <RankingsSidebar selectedId={activeId} onSelect={selectRanking} />
      </aside>
      <main className="map-pane ranking-pane" aria-label={`${atlasTerms().rankingsTitle}榜單`}>
        {rankingById[activeId] ? (
          <RankingBoard
            category={rankingById[activeId]}
            selectedKey={selectedFigureId}
            onSelectKey={selectFigure}
          />
        ) : null}
      </main>
    </>
  )
}
