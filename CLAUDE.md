# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server on port 8080 (auto-opens browser)
npm run build    # Lint + tsc + Vite production build
npm run lint     # ESLint
```

No test suite exists yet.

## Architecture

This is a tower defense game demo built on **PixiJS v8**. The codebase has two distinct layers:

### Engine (`src/engine/`)
A reusable framework that wraps PixiJS Application with a **plugin system**. Plugins are registered at startup and attach properties to the Application instance (e.g., `app.navigation`, `app.audio`). Engine-level concerns: screen navigation, audio (BGM/SFX), resize/letterbox, and asset manifests.

Key files:
- `engine.ts` — `CreationEngine` class; initializes plugins and asset loading
- `navigation/navigation.ts` — Screen and popup lifecycle manager; loads asset bundles per screen, calls `prepare/show/hide/reset/update/resize` hooks
- `audio/audio.ts` — Separate `BGM` and `SFX` classes with volume and fade support
- `resize/ResizePlugin.ts` — Custom resize with min 768×1024, letterbox layout
- `map/MapLayer.ts` — Tile-based map (16×18 grid) with building zones and enemy path

### App (`src/app/`)
Game-specific code. Screens are PixiJS Containers implementing the navigation lifecycle interface.

Key files:
- `getEngine.ts` — Singleton `engine()` accessor used everywhere to reach `CreationEngine`
- `screens/main/MainScreen.ts` — Composes map, enemies, UI, and bouncers; wires pause/resume
- `Enemy/EnemyManager.ts` — Spawns and updates enemies; scales waypoints to current screen size
- `Enemy/Enemy.ts` — Follows a waypoint path with smooth per-frame movement

### Screen/Popup model
- Screens are shown via `engine().navigation.showScreen(ScreenClass)`; the nav system loads the screen's asset bundle first, then calls `prepare → show`
- Popups (`showPopup`) blur the active screen and pause its update loop
- Navigation lifecycle: `prepare()` (async, load data), `show()` (animate in), `hide()` (animate out), `reset()`, `update(delta)`, `resize(w, h)`

### Asset pipeline
Assets live in `raw-assets/`. **AssetPack** (via `scripts/assetpack-vite-plugin.ts`) processes them into `public/assets/` and auto-generates `src/manifest.json` on every dev/build run. Do not hand-edit `manifest.json`.

## Code style
- TypeScript strict mode; no semicolons; single quotes (Prettier enforces both)
- Motion (`motion` package) for tweening/animation
- `engine()` singleton is the standard way to access navigation, audio, and the PixiJS app from anywhere in `src/app/`
