import { BrowserRouter } from 'react-router-dom'
import App from './App'

export interface AtlasAppProps {
  basename?: string
}

export function AtlasApp({ basename }: AtlasAppProps) {
  return (
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  )
}
