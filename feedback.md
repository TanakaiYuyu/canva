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
stage_1_hours: 2             # stage 1 only
stage_2_date: "2026-03-05"   # YYYY-MM-DD
stage_2_hours: 1             # stage 2 only
total_hours: 3               # stage 1 + stage 2
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
sdk_frustrating: []
sdk_missing: []

# Documentation
docs_helpful:
  - "Store Hooks and instance scope"
  - "Mount Points (render, settings)"
  - "Settings Components reference"
  - "Developer standards (transparent loading/error/empty states)"
docs_missing: []

# AI Tools & Workflow
ai_tools: ["cursor"]
ai_time_savings: "significant"
ai_helped_with: "Scaffolding from PRD, iframe off-screen load/swap logic, transparent state handling, URL validation and refresh-interval clamping"
ai_hindered: ""

# Top 3 Improvements for TelemetryOS
top_improvements:
  - "More examples for iframe/embed apps and cross-origin load detection"
  - "Harness docs for aspect-ratio and settings/render sync testing"
  - "Clearer guidance on when to use Workers vs Render timers (e.g. iframe refresh)"

# Additional Comments (optional)
comments: "Canva app is view-only; single design per instance. Refresh uses destroy/recreate iframe per PRD to avoid memory growth. All edge states (unconfigured, invalid URL, loading, error, offline) render transparently."
```
