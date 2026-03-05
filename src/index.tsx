/// <reference types="vite/client" />

import './index.css'
import { createRoot } from 'react-dom/client'
import { configure } from '@telemetryos/sdk'
import { App } from './App'

configure('canva')

createRoot(document.querySelector('#app')!).render(<App />)
