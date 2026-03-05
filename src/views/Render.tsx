import { useCallback, useEffect, useRef, useState } from 'react'
import { useUiScaleToSetRem } from '@telemetryos/sdk/react'
import { useCanvaUrlStoreState, useRefreshIntervalStoreState } from '../hooks/store'
import { isValidCanvaUrl } from '../utils/canvaUrl'
import './Render.css'

const IFRAME_LOAD_TIMEOUT_MS = 20000

const Render: React.FC = () => {
  useUiScaleToSetRem(1)

  const [, canvaUrl] = useCanvaUrlStoreState()
  const [, refreshIntervalMinutes] = useRefreshIntervalStoreState()

  const visibleContainerRef = useRef<HTMLDivElement>(null)
  const [hasContent, setHasContent] = useState(false)
  const refreshTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const trimmedUrl = canvaUrl?.trim() ?? ''
  const hasValidUrl = trimmedUrl.length > 0 && isValidCanvaUrl(trimmedUrl)

  const loadAndSwapIframe = useCallback((url: string) => {
    const visible = visibleContainerRef.current
    if (!visible) return

    const staging = document.createElement('div')
    staging.style.cssText =
      'position:fixed;left:-9999px;top:0;width:100%;height:100%;pointer-events:none;visibility:hidden;'
    document.body.appendChild(staging)

    const iframe = document.createElement('iframe')
    iframe.setAttribute('src', url)
    iframe.setAttribute('title', 'Canva design')
    iframe.className = 'canva-iframe'
    iframe.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;border:none;'
    staging.appendChild(iframe)

    let settled = false
    const cleanup = () => {
      if (staging.parentNode) staging.remove()
    }

    const timeoutId = window.setTimeout(() => {
      if (settled) return
      settled = true
      cleanup()
    }, IFRAME_LOAD_TIMEOUT_MS)

    iframe.addEventListener('load', () => {
      if (settled) return
      settled = true
      window.clearTimeout(timeoutId)
      const current = visible.querySelector('iframe')
      if (current) current.remove()
      visible.appendChild(iframe)
      staging.remove()
      setHasContent(true)
    })
  }, [])

  useEffect(() => {
    if (!hasValidUrl) {
      setHasContent(false)
      if (visibleContainerRef.current) {
        const iframe = visibleContainerRef.current.querySelector('iframe')
        if (iframe) iframe.remove()
      }
      return
    }

    const intervalMs =
      Math.max(5, Math.min(1440, refreshIntervalMinutes)) * 60 * 1000

    const refresh = () => loadAndSwapIframe(trimmedUrl)

    refresh()

    refreshTimerRef.current = setInterval(refresh, intervalMs)
    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current)
        refreshTimerRef.current = null
      }
      if (visibleContainerRef.current) {
        const iframe = visibleContainerRef.current.querySelector('iframe')
        if (iframe) iframe.remove()
      }
      setHasContent(false)
    }
  }, [hasValidUrl, trimmedUrl, refreshIntervalMinutes, loadAndSwapIframe])

  if (!hasValidUrl) {
    return null
  }

  return (
    <div
      className="canva-render"
      ref={visibleContainerRef}
      style={{
        opacity: hasContent ? 1 : 0,
        pointerEvents: hasContent ? 'auto' : 'none',
      }}
    />
  )
}

export default Render
