import { BiographySidebar } from '../components/biographies/BiographySidebar'
import { BiographyBoard } from '../components/biographies/BiographyBoard'
import { figureById } from '../data/figures'
import { useAppStore } from '../store/appStore'
import { atlasTerms } from '../config'

export function BiographyPage() {
  const selectedFigureId = useAppStore((store) => store.selectedFigureId)
  const selectFigure = useAppStore((store) => store.selectFigure)

  const activeId =
    selectedFigureId && figureById[selectedFigureId] ? selectedFigureId : null

  return (
    <>
      <aside className="sidebar biography-nav-pane" aria-label="人物誌側欄">
        <BiographySidebar selectedId={activeId} onSelect={selectFigure} />
      </aside>
      <main className="map-pane biography-pane" aria-label={`${atlasTerms().biographyTitle}`}>
        <BiographyBoard
          key={activeId ?? 'none'}
          figureId={activeId}
          onSelectFigure={selectFigure}
        />
      </main>
    </>
  )
}
