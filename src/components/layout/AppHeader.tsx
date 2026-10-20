import { NavLink } from 'react-router-dom'
import { atlasConfig } from '../../content'

interface AppHeaderProps {
  onOpenAbout: () => void
}

export function AppHeader({ onOpenAbout }: AppHeaderProps) {
  const config = atlasConfig()

  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-seal" aria-hidden="true">
          {config.seal}
        </div>
        <div className="brand-copy">
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>
      </div>

      <nav className="mode-switch" aria-label="地圖模式">
        {config.nav.map((item) => (
          <NavLink
            key={item.id}
            to={item.to}
            className={({ isActive }) => `mode-link${isActive ? ' active' : ''}`}
          >
            {item.label}
            <small>{item.caption}</small>
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <button type="button" className="header-action" onClick={onOpenAbout}>
          考證
        </button>
        <span className="header-rule" aria-hidden="true" />
        <button type="button" className="header-action" onClick={onOpenAbout}>
          關於
        </button>
      </div>
    </header>
  )
}
