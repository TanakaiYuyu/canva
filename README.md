# Canva – TelemetryOS Application

Display Canva designs on TelemetryOS screens. Configure a Canva shareable or embed URL in Studio; the design is shown full-screen on devices and refreshes on a configurable interval so updates in Canva appear without operator action.

## Features

- **Full-screen Canva embed** – One design per instance, no app chrome; the iframe fills the zone.
- **Configurable refresh** – Reload interval from 5 to 1440 minutes (default 60) to pick up design changes.
- **Transparent states** – Unconfigured, invalid URL, loading, error, and offline: render nothing so the playlist continues.
- **Memory-safe refresh** – Each refresh destroys the previous iframe and creates a new one (no reusing `src`) for long-running stability.

## Quick Start

```bash
npm install
npm run build
npm run dev
```

Use the development harness at the URL printed by `npm run dev` (e.g. `http://localhost:2026`). The harness serves both `/render` and `/settings` with the SDK context.

## Project Structure

```
src/
├── index.tsx           # Entry point, configure('canva')
├── App.tsx             # Router: /render, /settings
├── hooks/
│   └── store.ts        # Instance store: canvaUrl, refreshInterval
├── utils/
│   └── canvaUrl.ts     # URL validation (Canva shareable/embed)
├── views/
│   ├── Render.tsx      # Full-screen iframe; off-screen load then swap
│   ├── Render.css
│   ├── Settings.tsx    # Canva URL + refresh interval
│   └── Settings.css
└── index.css           # Global styles
```

## Configuration (Settings)

| Setting            | Type        | Description |
|--------------------|-------------|-------------|
| **Canva URL**      | Text input  | Required. Canva shareable or embed URL (e.g. `https://www.canva.com/design/.../view?embed`). Must be public/viewable. |
| **Refresh interval** | Number (5–1440) | Minutes between reloads. Invalid or out-of-range values fall back to 60. |

Changes sync to devices via the instance store.

## Behavior

- **Valid URL** – Iframe is loaded off-screen; when ready (or after a 20s timeout), it is swapped into view. No visible loading UI.
- **Invalid / unconfigured / offline** – Render is fully transparent; errors are not shown on the display (validation feedback only in Settings).
- **Refresh** – On the configured interval, a new iframe is created, loaded off-screen, then swapped in; the old iframe is removed to avoid memory growth.

## Build

```bash
npm run build
```

Runs `tsc` and `vite build`. Output is in `dist/`.

## SDK Usage

- `configure('canva')` – In `index.tsx`; name must match `telemetry.config.json`.
- `createUseInstanceStoreState` – `canvaUrl` (string), `refreshInterval` (number).
- `useUiScaleToSetRem(1)` – In Render for REM-based layout.
- Settings: `SettingsContainer`, `SettingsHeading`, `SettingsField`, `SettingsLabel`, `SettingsInputFrame`.

## Requirements

- Node.js and npm (or pnpm).
- TelemetryOS CLI for `npm run dev`: `pnpm install -g telemetryos/cli` (see [TOS App Build Process](https://docs.telemetryos.com/)).

## Author

Max

## Version

1.0.0
