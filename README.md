# GO FIT 360° – CardioPrevent Lab (React Native / Expo)

Mobile-first prototype for closed-loop cardio-prevention and emergency orchestration. Includes readiness scoring, AI coach nudges, verification, escalation (panic), navigation to capable facilities, and a lessons library. Copy and UX are fully in English.

## Stack
- React Native JS with Expo SDK 50
- Navigation: React Navigation (stack + tabs)
- State: Zustand
- Expo modules: camera (mocked meal scan flow), notifications (nudges helper), location placeholder
- UI: light theming in `src/theme`, reusable buttons/cards, icons via `@expo/vector-icons`

## Core Features (patient app)
- Auth + role selector (patient default)
- Home dashboard: readiness score, risk badge, 3-30-300 tasks, quick actions
- AI Coach: planner, completion %, campaign calendar, behavioral hooks, “next best action” + refresh, Gemini-style chat Q&A
- Meal scan: camera capture + Gemini-style AI mock analysis → sodium/calorie traffic light
- Medication & appointment tracker: tap to verify taken/missed
- Emergency: panic button, symptom check (logged), nearest capable facilities, last escalation
- Lessons library: clickable cards → detail view with timeline and takeaway
- Notifications helper: daily nudge scheduling stub

## Project Structure
```
App.js
src/
  navigation/RootNavigator.js      # Stack + bottom tabs
  screens/                         # Auth, Home, Coach, MealScan, Emergency, Lessons, Medication, Profile
  components/                      # ScoreCard, ActionButton, LessonCard, RiskBadge
  store/useAppStore.js             # Zustand store: user, tasks, meds, events, emergency
  services/                        # api mocks, escalation helpers, notifications stub
  data/                            # Seed data for lessons & campaigns
  theme/                           # Colors & spacing tokens
  utils/format.js                  # Date/time formatting helpers
assets/                            # Add icons/splash as needed
app.json, babel.config.js, package.json
```

## Setup & Run
1) Requirements: Node 18+, npm 9+. (Optional global: `npm i -g expo-cli`.)
2) Install deps: `npm install`
3) Start Metro: `npm run start` (or `npx expo start --host localhost`)
   - iOS simulator: `npm run ios`
   - Android emulator/device: `npm run android`
   - Web preview: `npm run web` or press `w` in Expo CLI (requires react-native-web/react-dom already included)
4) First run: allow camera + location permissions if prompted. Notifications need user permission too.

## Screen Flow
- Auth (`src/screens/AuthScreen.js`): simple patient sign-in with name preset.
- Home (`src/screens/HomeScreen.js`): gradient hero, readiness/risk, quick actions (Coach, Meal Scan, Emergency), 3-30-300 tasks, latest events, last escalation banner.
- Coach (`src/screens/CoachScreen.js`): AI planner tasks, completion %, campaign calendar, behavioral hooks; includes “refresh coach”, “next best action”, and Gemini-style chat Q&A.
- Meal Scan (`src/screens/MealScanScreen.js`): camera capture (expo-camera) + Gemini-style mock analysis; writes verify event with verdict.
- Medication (`src/screens/MedicationScreen.js`): tap meds to mark taken/missed; appointment reminder card.
- Emergency (`src/screens/EmergencyScreen.js`): panic button, symptom check logged, nearest facilities list, last escalation and last symptom check.
- Lessons (`src/screens/LessonsScreen.js`): clickable reels-style anonymized cases → detail view (`LessonDetailScreen`).
- Profile (`src/screens/ProfileScreen.js`): compact profile and logout.

## API Blueprint (backend-first)
Example base URL: `https://api.gofit360.example`

**Auth & Identity**
- `POST /auth/login` → `{ token, profile { id, role, name } }`
- `GET /auth/me` → profile + roles + permissions

**Risk**
- `GET /risk/readiness` → `{ readinessScore, riskBadge: "Low|Moderate|High", rationale: string[] }`
- `POST /risk/compute` → recompute after new events

**Nudge / Campaign**
- `GET /nudges` → nudges (title, message, channel, schedule)
- `POST /nudges/ack` → ack + timestamp
- `GET /campaigns` → calendar-aware packs (heat stress, Ramadan, World Heart Day, etc.)

**Verify (evidence of action)**
- `POST /verify` → `{ actionId, type: "meds|meal|activity|sleep", proofUrl/meta, status }`
- `POST /verify/meal-scan` → upload photo → `{ sodiumTrafficLight, calories, verdict }`

**Escalate / Navigate**
- `POST /escalate` → `{ trigger: "panic|rule", symptoms, vitals, location }` → `{ status, destination, etaMinutes, transport }`
- `GET /facilities?capability=cathlab` → list with capability, distance, SLA
- `POST /navigate/route` → routed polyline + ETA

**Events / Audit**
- `POST /events` → ingestion (nudge sent, verify, escalation, navigation)
- `GET /events?type=escalate&userId=` → filterable audit log

## Event Log Schema (tamper-evident recommended)
- `events`: `id (uuid)`, `user_id`, `role`, `type (nudge|verify|escalate|navigate|risk|meds|lesson)`, `title`, `description`, `metadata (jsonb)`, `created_at`, `hash_prev`
- Helpful indexes: `(user_id, type, created_at DESC)`, `(type, created_at DESC)`
- Supporting tables: `facilities` (capability, geo, SLA), `users` (role, readiness_score, risk_badge), `campaigns` (title, window, focus, segment)

## Chest Pain Escalation Flow (end-to-end)
1. **Predict**: risk engine flags delay-to-care risk → sends nudge.
2. **Nudge**: push “Chest pain ≠ chat” received.
3. **Verify**: user taps Symptom Check → `POST /verify` type=symptom.
4. **Escalate**: user hits Panic → `POST /escalate` with location + symptoms → backend picks cathlab-capable facility.
5. **Navigate**: response returns destination + ETA → UI surfaces directions.
6. **Orchestrate**: provider console gets event stream; timers and EMS activation run.
7. **Learn**: events written to `events` (hash_prev) for audit + lessons.

Code mapping:
- Frontend trigger: `EmergencyScreen` → `triggerPanic()` → `services/escalation.js` → `api.escalate()`
- Event log UI: `useAppStore.recordEmergency()` + Home events list
- Facility list: `fetchEscalationOptions()` (mock) for routing display

## Next Development Steps
- Swap mocks in `src/services/api.js` with real endpoints + auth token handling.
- Persist auth + events (AsyncStorage / secure store) and add offline queueing.
- Integrate maps (`react-native-maps`) + routing API for actual navigation.
- Replace meal scan mock with real `expo-camera` capture + inference endpoint.
- Wire Gemini (or LLM) endpoints for coach chat and meal analysis; secure API keys via env.
- Wire push notifications via FCM/Expo and production-ready channels.
- Extend provider/regulator web views using the same API layer.

## Scripts
- `npm run start` → Metro bundler (Expo)
- `npm run ios` / `npm run android` → open simulator/emulator via Expo
- `npm run web` → browser preview
# Fit-Go-360
