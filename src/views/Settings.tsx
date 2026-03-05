import { useCallback, useEffect } from 'react'
import {
  SettingsContainer,
  SettingsField,
  SettingsHeading,
  SettingsInputFrame,
  SettingsLabel,
} from '@telemetryos/sdk/react'
import { useCanvaUrlStoreState, useRefreshIntervalStoreState } from '../hooks/store'
import { isValidCanvaUrl } from '../utils/canvaUrl'
import './Settings.css'

const MIN_REFRESH_MINUTES = 5
const MAX_REFRESH_MINUTES = 1440
const DEFAULT_REFRESH_MINUTES = 60

function clampRefreshMinutes(value: number): number {
  return Math.max(MIN_REFRESH_MINUTES, Math.min(MAX_REFRESH_MINUTES, value))
}

const Settings: React.FC = () => {
  const [, canvaUrl, setCanvaUrl] = useCanvaUrlStoreState()
  const [, refreshInterval, setRefreshInterval] = useRefreshIntervalStoreState()

  const parsedInterval = Number(refreshInterval)
  const isValidInterval =
    Number.isFinite(parsedInterval) &&
    parsedInterval >= MIN_REFRESH_MINUTES &&
    parsedInterval <= MAX_REFRESH_MINUTES
  const displayInterval = isValidInterval ? parsedInterval : DEFAULT_REFRESH_MINUTES

  const syncStoredInterval = useCallback(() => {
    if (!Number.isFinite(parsedInterval) || parsedInterval < MIN_REFRESH_MINUTES || parsedInterval > MAX_REFRESH_MINUTES) {
      setRefreshInterval(DEFAULT_REFRESH_MINUTES)
    }
  }, [parsedInterval, setRefreshInterval])

  useEffect(() => {
    syncStoredInterval()
  }, [syncStoredInterval])

  const handleRefreshIntervalChange = (value: string) => {
    const num = Number(value)
    if (value === '' || !Number.isFinite(num)) {
      setRefreshInterval(DEFAULT_REFRESH_MINUTES)
      return
    }
    setRefreshInterval(clampRefreshMinutes(num))
  }

  const urlError = canvaUrl?.trim() ? !isValidCanvaUrl(canvaUrl.trim()) : false

  return (
    <div className="settings-page">
      <SettingsContainer>
        <SettingsHeading>Canva</SettingsHeading>
        <SettingsField>
          <SettingsLabel>Canva URL</SettingsLabel>
          <SettingsInputFrame>
            <input
              type="url"
              value={canvaUrl ?? ''}
              onChange={(e) => setCanvaUrl(e.target.value)}
              placeholder="https://www.canva.com/design/.../view?embed"
              aria-invalid={urlError}
              aria-describedby={urlError ? 'canva-url-hint' : undefined}
            />
          </SettingsInputFrame>
          {urlError && (
            <p id="canva-url-hint" className="settings-hint settings-hint--error">
              Enter a valid Canva shareable or embed URL (https://www.canva.com/...).
            </p>
          )}
        </SettingsField>

        <SettingsField>
          <SettingsLabel>Refresh interval (minutes)</SettingsLabel>
          <SettingsInputFrame>
            <input
              type="number"
              min={MIN_REFRESH_MINUTES}
              max={MAX_REFRESH_MINUTES}
              value={displayInterval}
              onChange={(e) => handleRefreshIntervalChange(e.target.value)}
              placeholder="60"
            />
          </SettingsInputFrame>
          <p className="settings-hint">
            How often to reload the design ({MIN_REFRESH_MINUTES}–{MAX_REFRESH_MINUTES} minutes).
          </p>
        </SettingsField>
      </SettingsContainer>
    </div>
  )
}

export default Settings
