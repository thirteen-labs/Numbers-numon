# Numon Development Plan

## Phase 0 — Foundation (current state)
- [x] Expo SDK 56 + Expo Router scaffolding
- [x] Tab navigation (Home, Explore)
- [x] Themed components (Text, View)
- [x] Reanimated collapsible
- [x] Light/dark mode support

## Phase 1 — Core Architecture
- [ ] Set up path aliases (src/lib, src/features, src/data)
- [ ] Numerology calculation engine (`src/lib/numerology/`)
  - [ ] Number reducer (reduce to single digit / master number)
  - [ ] Pythagorean letter-to-number mapping
  - [ ] Vowel/consonant extraction
- [ ] Zod schemas for Person (name, DOB)
- [ ] Zustand store skeleton (app state, current profile)
- [ ] SQLite database setup with schema for profiles
- [ ] MMKV for fast preferences (theme, settings)

## Phase 2 — Calculator & Core Numbers
- [ ] Life Path Number
- [ ] Expression (Destiny) Number
- [ ] Soul Urge Number
- [ ] Personality Number
- [ ] Birthday Number
- [ ] Attitude Number
- [ ] Maturity Number
- [ ] Core numbers summary screen (`src/app/calculator.tsx`)

## Phase 3 — Profile & Dashboard
- [ ] Profile creation form (name, DOB, nickname)
- [ ] Multi-profile management (CRUD with SQLite)
- [ ] Home dashboard redesign with real data
  - [ ] Daily number (personal day)
  - [ ] Personal year/month display
  - [ ] Lucky color/number
  - [ ] Today's affirmation
- [ ] Saved profiles quick-access

## Phase 4 — Life Cycles
- [ ] Pinnacles (4 life stages with timeline)
- [ ] Challenges (4 challenge periods)
- [ ] Personal Year calculator with full breakdown
- [ ] Personal Month
- [ ] Personal Day
- [ ] Universal Year / Month / Day

## Phase 5 — Advanced Numbers
- [ ] Karmic Lessons (missing numbers in name)
- [ ] Karmic Debt (13, 14, 16, 19)
- [ ] Hidden Passion Number
- [ ] Balance Number
- [ ] Rational Thought Number
- [ ] Subconscious Self
- [ ] Cornerstone / Capstone Analysis
- [ ] First Vowel / First Consonant Analysis

## Phase 6 — Charts & Visualization
- [ ] Life cycles timeline (Victory Native)
- [ ] Pinnacles interactive chart
- [ ] Challenges growth chart
- [ ] Personal year line chart
- [ ] Core numbers radar/spider chart
- [ ] Timeline component (`src/components/ui/timeline.tsx`)

## Phase 7 — Compatibility & Analysis
- [ ] Name Compatibility (two-person comparison)
- [ ] Business Name Analysis
- [ ] Baby Name Analyzer
- [ ] Phone Number Analysis
- [ ] House Number Analysis
- [ ] Vehicle Number Analysis

## Phase 8 — Lucky & Daily Features
- [ ] Lucky Numbers generator
- [ ] Lucky Colors
- [ ] Lucky Days
- [ ] Daily Affirmations engine
- [ ] Notifications setup (daily number, affirmation)

## Phase 9 — Reference Modules
- [ ] Angel Numbers database + search
- [ ] Chinese Zodiac (12 animals, elements, compatibility)
- [ ] Number meanings library
- [ ] Educational library (history, FAQs, master numbers)
- [ ] Search across all reference data

## Phase 10 — Journal & Goals
- [ ] Journal with rich text + mood tracking
- [ ] Goals with progress tracking
- [ ] Associate goals with favorable periods
- [ ] Search in journal/goals

## Phase 11 — Reports & Backup
- [ ] PDF report generation
- [ ] JSON/CSV export
- [ ] Full backup (export/import/restore)
- [ ] Device migration support

## Phase 12 — Polish & Theming
- [ ] All 8 themes (Light, Dark, AMOLED, Mystic, Cosmic, Emerald, Royal, Glass)
- [ ] Glass effects (Expo Glass Effect)
- [ ] Animations & transitions
- [ ] Statistics dashboard
- [ ] Multi-profile picker

## Phase 13 — Testing & QA
- [ ] Unit tests for calculation engine
- [ ] Component tests (RN Testing Library)
- [ ] Integration tests for core flows
- [ ] E2E testing setup

## Future
- [ ] AI-powered interpretation assistant
- [ ] Cloud sync
- [ ] Astrology integration
- [ ] Tarot reference library
- [ ] Widgets (Android/iOS)
- [ ] Desktop app (Expo + web)
