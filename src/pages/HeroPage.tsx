import { MapCanvas } from '../components/map/MapCanvas'
import { HeroSidebar } from '../components/heroes/HeroSidebar'
import { atlasTerms } from '../config'

export function HeroPage() {
  const terms = atlasTerms()
  return (
    <>
      <aside className="sidebar" aria-label={`${terms.figureTrail}側欄`}>
        <HeroSidebar />
      </aside>
      <main className="map-pane" aria-label={`${terms.figureTrail}地圖`}>
        <MapCanvas />
      </main>
    </>
  )
}
