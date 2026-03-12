# TelemetryOS Developer Feedback

**Application:** Canva  
**Purpose:** Display Canva designs on TelemetryOS screens via a full-screen iframe; configurable URL and refresh interval.

Fill in the YAML below during development and finalize before submission. See the [feedback template](https://docs.telemetryos.com/docs/ai-agent-development) for field descriptions.

---

```yaml
# Application Overview
app_name: "canva"
developer: "Max"
stage_1_date: "2026-03-05"   # YYYY-MM-DD
stage_1_hours: 3             # stage 1 only
stage_2_date: "2026-03-05"   # YYYY-MM-DD
stage_2_hours: 2             # stage 2 only
total_hours: 5               # stage 1 + stage 2
complexity: "simple"         # simple | moderate | complex

# Overall Ratings (1–5: 1 = Poor, 5 = Excellent)
platform_rating: 4
sdk_rating: 4

# Blocking Issues
blocking_issues: []

# SDK & API Design
sdk_worked_well:
  - "createUseInstanceStoreState for settings sync (Settings ↔ Render)"
  - "useUiScaleToSetRem for REM-based layout"
  - "Settings components (SettingsHeading, SettingsInputFrame, SettingsField, SettingsLabel)"
sdk_frustrating: 
  - "No obvious SDK helper for common 'embedded web content' patterns (iframe lifecycle, timeouts, safe swapping). I had to manually create off-screen staging, handle load/timeout, and swap DOM nodes." # Render.tsx :contentReference[oaicite:4]{index=4}
  - "Instance-store hooks are great, but the tuple return pattern (e.g., [, value, setter]) is easy to misuse without strong examples/guidance." # store usage :contentReference[oaicite:5]{index=5}

sdk_missing: 
  - "A first-class 'EmbeddedWebView/IframeRenderer' component that supports: off-screen preload, swap-on-load, configurable timeout, teardown on refresh, and optional error callbacks."
  - "A built-in 'validateExternalUrl' utility (or docs) that covers iframe/embed constraints (public access, required query params, potential framing restrictions), beyond simple domain checks." # current validation is domain+https only :contentReference[oaicite:6]{index=6}
  - "A documented pattern for 'transparent render states' (return null vs. opacity 0 vs. placeholder) with recommended accessibility + playlist behavior." # app uses null/opacity swap :contentReference[oaicite:7]{index=7}


# Documentation
docs_helpful:
  - "Store Hooks and instance scope"
  - "Mount Points (render, settings)"
  - "Settings Components reference"
  - "Developer standards (transparent loading/error/empty states)"
docs_missing: 
  - "Clear documentation on best practices for long-running apps that embed third-party content (memory/leak prevention, teardown expectations, refresh strategies, and how to measure success)." # app implements manual teardown :contentReference[oaicite:10]{index=10}
  - "A troubleshooting section specifically for embedded content (CSP/X-Frame-Options, authentication-required URLs, public-sharing requirements, and how failures surface on device vs. in Studio)."
  - "More explicit guidance on recommended defaults/validation for numeric settings (e.g., clamping, empty string behavior) and whether to store raw vs. normalized values." # Settings clamps + resets :contentReference[oaicite:11]{index=11}


# AI Tools & Workflow
ai_tools: ["cursor"]
ai_time_savings: "significant"
ai_helped_with: "Scaffolding from PRD, iframe off-screen load/swap logic, transparent state handling, URL validation and refresh-interval clamping"
ai_hindered: "Some suggested iframe approaches ignored real-world embed quirks (e.g., needing to recreate nodes to avoid memory growth), so I adjusted to a destroy-and-recreate pattern."


# Top 3 Improvements for TelemetryOS
top_improvements:
  - "More examples for iframe/embed apps and cross-origin load detection"
  - "Harness docs for aspect-ratio and settings/render sync testing"
  - "Clearer guidance on when to use Workers vs Render timers (e.g. iframe refresh)"

# Additional Comments (optional)
comments: "Canva app is view-only; single design per instance. Refresh uses destroy/recreate iframe per PRD to avoid memory growth. All edge states (unconfigured, invalid URL, loading, error, offline) render transparently."
```
