# Architecture Diagram

> **Note for team:** Export this diagram to PNG/PDF for final submission.

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER (Browser)                             │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     FRONTEND — React + Vite                         │
│                                                                     │
│  ┌───────────┐ ┌───────────┐ ┌──────────┐ ┌─────────┐ ┌─────────┐ │
│  │ Dashboard  │ │  Lesson   │ │  Admin   │ │ Upgrade │ │  Auth   │ │
│  └───────────┘ └───────────┘ └──────────┘ └─────────┘ └─────────┘ │
│  ┌───────────┐ ┌───────────┐ ┌──────────┐                         │
│  │  Sidebar  │ │   Quiz    │ │ AI Tutor │                         │
│  └───────────┘ └───────────┘ └──────────┘                         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │  HTTP / REST (JWT Auth)
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    BACKEND — FastAPI                                 │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              PHASE 1 — Deterministic (No LLM)               │   │
│  │                                                             │   │
│  │  /auth      /courses    /chapters    /quizzes   /progress   │   │
│  │  /search    /admin                                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │          PHASE 2 — Hybrid Intelligence (LLM)                │   │
│  │                 (Premium tier required)                      │   │
│  │                                                             │   │
│  │  /premium/assess          AI-Graded Assessments             │   │
│  │  /premium/adaptive-path   Adaptive Study Paths              │   │
│  └──────────────────────────┬──────────────────────────────────┘   │
│                              │                                      │
│                              ▼                                      │
│                    ┌──────────────────┐                             │
│                    │  Gemini 1.5 Pro  │                             │
│                    │   (Google AI)    │                             │
│                    └──────────────────┘                             │
└──────────┬────────────────────────────────────────┬─────────────────┘
           │                                        │
           ▼                                        ▼
┌─────────────────────┐               ┌──────────────────────┐
│      Database        │               │   Content Storage     │
│  SQLite / PostgreSQL │               │  Local FS / R2        │
│                      │               │                      │
│  • Users (+ tiers)   │               │  • Markdown lessons  │
│  • Courses           │               │  • Module content    │
│  • Modules           │               │                      │
│  • Chapters          │               │                      │
│  • Quizzes           │               │                      │
│  • Progress          │               │                      │
└─────────────────────┘               └──────────────────────┘
```

## Data Flow

### Phase 1 — Deterministic Request
```
User → React → GET /chapters/{slug}/content → FastAPI → DB + Content Storage → Response
```

### Phase 2 — Hybrid Request
```
User → React → POST /premium/assess → FastAPI → Premium Guard → Gemini API → Scored Response
```

### Search (Grounded Q&A)
```
User → React → GET /search?q=keyword → FastAPI → Load all chapters → Substring match → Results
```

## Monetization Tiers

| Tier    | Price     | Phase 1 | Phase 2 |
|---------|-----------|---------|---------|
| Free    | $0        | Full    | None    |
| Premium | $9.99/mo  | Full    | Assessments |
| Pro     | $19.99/mo | Full    | Full    |
| Team    | $49.99/mo | Full    | Full + Team management |
