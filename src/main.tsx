import { createRoot } from 'react-dom/client'
import './tailwind.css'
import { Page } from './page'

createRoot(document.getElementById('root')!).render(
  <Page />
)
