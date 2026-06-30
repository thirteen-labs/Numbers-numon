# Numon Documentation

## Overview

Numon is an offline-first numerology application built with React Native (Expo SDK 56) that processes birth information and names into numerological interpretations entirely on-device.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native 0.85.3 + Expo SDK 56 |
| Routing | Expo Router (file-based, typed routes) |
| Language | TypeScript 6.0 |
| State | Zustand |
| Database | SQLite |
| Fast Storage | MMKV |
| UI Runtime | Reanimated 4.3, Gesture Handler 2.31 |
| Icons | `expo-symbols` (SF Symbols / Material) |
| Styling | StyleSheet (with path to NativeWind) |
| Forms | React Hook Form |
| Validation | Zod |
| Charts | Victory Native |
| Testing | Jest + RN Testing Library |

## Project Structure

```
src/
├── app/              # Expo Router routes (file-based)
│   ├── _layout.tsx   # Root layout (tabs + splash)
│   ├── index.tsx     # Home / Dashboard
│   ├── explore.tsx   # Explore / docs
│   ├── calculator/   # [planned] Core calculator screens
│   ├── profile/      # [planned] Profile management
│   ├── journal/      # [planned] Journal screens
│   ├── references/   # [planned] Angel numbers, Zodiac, etc.
│   └── settings/     # [planned] Settings & themes
├── components/       # Shared components
├── constants/
│   └── theme.ts      # Colors, Fonts, Spacing
├── hooks/            # Custom hooks
├── lib/              # [planned] Business logic
│   ├── numerology/   # Calculation engine
│   ├── database/     # SQLite helpers
│   └── storage/      # MMKV helpers
├── features/         # [planned] Feature modules
└── store/            # [planned] Zustand stores
```

---

## Architecture

### Calculation Engine (`src/lib/numerology/`)

All numerology calculations are pure functions operating on a `Person` data type. No side effects, no dependencies on React state.

```
Person {
  firstName: string
  lastName: string
  middleName?: string
  dateOfBirth: Date
}
```

Key functions:
- `reduceNumber(n: number): number` — reduce to single digit (preserve master numbers 11, 22, 33)
- `letterToNumber(letter: string, system: 'pythagorean' | 'chaldean'): number`
- `getVowels(name: string): string`
- `getConsonants(name: string): string`
- `calculateLifePath(dob: Date): number`
- `calculateExpression(fullName: string): number`
- `calculateSoulUrge(name: string): number`
- `calculatePersonality(name: string): number`

### State Management (Zustand)

```
store/
├── app-store.ts       # Global app state (theme, current profile)
├── profile-store.ts   # Active profile + profile list
├── journal-store.ts   # [future] Journal entries
└── settings-store.ts  # [future] User preferences
```

### Database (SQLite)

Tables:
- `profiles` — Saved user profiles
- `reports` — Cached calculation reports
- `journal_entries` — [future] Journal entries
- `goals` — [future] User goals
- `angel_numbers` — [future] Angel number interpretations
- `zodiac_data` — [future] Chinese zodiac dataset

### Fast Storage (MMKV)

- `theme` — Current theme name
- `last_opened_screen` — Navigation restoration
- `settings` — Quick preferences (notifications, etc.)
- `daily_cache` — Cached daily readings

---

## Component Library

### Base Components

| Component | Props | Description |
|---|---|---|
| `ThemedText` | `type`, `themeColor` | Typography with theme-aware color |
| `ThemedView` | `type` | Container with theme-aware background |
| `Collapsible` | `title` | Animated expand/collapse section |

### [Planned] UI Components

- `Card` — Themed card container
- `Button` — Primary/secondary/ghost buttons
- `Input` — Form input with validation
- `Badge` — Themed badge/chip
- `Timeline` — Life cycle timeline chart
- `NumberCircle` — Numerology number display
- `Section` — Grouped section with title

---

## Theming

Colors defined in `src/constants/theme.ts`. Currently supports `light` and `dark`. Planned expansion to 8 themes: Light, Dark, AMOLED, Mystic, Cosmic, Emerald, Royal, Glass.

`useTheme()` hook returns the current color palette based on system color scheme.

---

## Routes

### Current
| Route | Screen |
|---|---|
| `/` | Home (Welcome tab) |
| `/explore` | Explore (docs tab) |

### Planned
| Route | Screen |
|---|---|
| `/calculator` | Core numbers report |
| `/calculator/life-path` | Life Path detail |
| `/calculator/expression` | Expression detail |
| `/calculator/soul-urge` | Soul Urge detail |
| `/calculator/personality` | Personality detail |
| `/calculator/pinnacles` | Pinnacles timeline |
| `/calculator/challenges` | Challenges breakdown |
| `/profile/new` | Create profile |
| `/profile/[id]` | Profile detail |
| `/profile/[id]/edit` | Edit profile |
| `/compatibility` | Name comparison |
| `/references/angel-numbers` | Angel number lookup |
| `/references/angel-numbers/[id]` | Angel number detail |
| `/references/zodiac` | Chinese zodiac |
| `/references/zodiac/[animal]` | Zodiac animal detail |
| `/journal` | Journal list |
| `/journal/[id]` | Journal entry |
| `/journal/new` | New journal entry |
| `/goals` | Goals list |
| `/goals/new` | New goal |
| `/reports` | Saved reports |
| `/reports/[id]` | Report detail |
| `/settings` | App settings |
| `/settings/themes` | Theme picker |
| `/backup` | Backup & restore |
| `/statistics` | Usage statistics |
| `/library` | Educational library |

---

## Development Conventions

- **No comments in code** unless absolutely necessary
- **Pure functions** for all numerology calculations
- **Feature-based** folder organization under `src/features/`
- **Zod schemas** for all data validation
- **Typed routes** enabled (`experiments.typedRoutes: true`)
- **React Compiler** enabled (`experiments.reactCompiler: true`)
- Follow existing code style (StyleSheet, component patterns)
- Refer to Expo v56 docs when using Expo APIs

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start Expo dev server |
| `npm run android` | Start on Android |
| `npm run ios` | Start on iOS |
| `npm run web` | Start on web |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Reset to blank app |

---

## Key Dependencies

- `expo-router` — File-based navigation with typed routes
- `react-native-reanimated` — Smooth animations (collapsibles, transitions)
- `react-native-gesture-handler` — Gesture primitives
- `expo-symbols` — Native SF Symbols (iOS) / Material icons (Android)
- `expo-image` — Optimized image component
- `@expo/ui` — Native UI components (SwiftUI/Compose cross-platform)
