# Course Companion FTE

An AI-powered Learning Management System (LMS) for the **AI Agent Development** course. Built with a hybrid architecture separating deterministic (Phase 1) and AI-augmented (Phase 2) features.

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, TypeScript, Tailwind CSS, Vite |
| Backend   | FastAPI, SQLModel, Alembic        |
| Database  | SQLite (dev) / PostgreSQL (prod)  |
| AI        | Google Gemini 1.5 Pro             |
| Storage   | Local filesystem / Cloudflare R2  |

## Features

### Phase 1 — Deterministic (No LLM)
- Course catalog with modules and chapters
- Markdown lesson viewer
- Quizzes with auto-scoring
- Progress tracking and streaks
- Text search across all chapters (`GET /search?q=keyword`)
- Previous / Next chapter navigation

### Phase 2 — Hybrid Intelligence (LLM-augmented, Premium)
- AI-Graded Assessments (rubric-based scoring via Gemini)
- Adaptive Study Paths (personalized roadmaps based on quiz performance)

### Monetization
Four-tier pricing model: **Free** ($0) | **Premium** ($9.99/mo) | **Pro** ($19.99/mo) | **Team** ($49.99/mo)

## Project Structure

```
├── backend/
│   ├── alembic/              # Database migrations
│   ├── local_content/        # Markdown lesson files
│   └── src/
│       ├── api/              # Route handlers
│       │   ├── premium/      # AI-powered endpoints (assessments, adaptive)
│       │   └── admin/        # Admin analytics
│       ├── core/             # Config, DB engine
│       ├── models/           # SQLModel table definitions
│       └── services/         # Content storage, AI service
├── frontend/
│   └── src/
│       ├── components/       # Reusable UI (LessonViewer, Quiz, AITutor, Sidebar)
│       ├── pages/            # Dashboard, Lesson, Login, Register, Admin, Upgrade
│       └── lib/              # API client
├── ARCHITECTURE.md           # System architecture diagram
└── README.md
```

## Setup

### Prerequisites
- Python 3.11+
- Node.js 18+

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env            # Edit with your config
alembic upgrade head
uvicorn src.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:8000`.

## API Endpoints

| Method | Path                              | Description                  | Auth     |
|--------|-----------------------------------|------------------------------|----------|
| POST   | `/api/v1/auth/register`           | Register new user            | Public   |
| POST   | `/api/v1/auth/login`              | Login, returns JWT           | Public   |
| GET    | `/api/v1/courses/`                | List all courses             | Bearer   |
| GET    | `/api/v1/chapters/{slug}/content` | Get chapter content          | Bearer   |
| GET    | `/api/v1/search?q=keyword`        | Search chapters              | Public   |
| POST   | `/api/v1/quizzes/{id}/submit`     | Submit quiz answers          | Bearer   |
| POST   | `/api/v1/progress/`               | Update progress              | Bearer   |
| POST   | `/api/v1/premium/assess`          | AI-graded assessment         | Premium  |
| GET    | `/api/v1/premium/adaptive-path`   | Adaptive study path          | Premium  |
| GET    | `/api/v1/admin/analytics`         | Admin analytics dashboard    | Admin    |

## Default Credentials (Dev)

| Role    | Email               | Password   |
|---------|---------------------|------------|
| Admin   | admin@example.com   | admin123   |
| Premium | premium@example.com | premium123 |
| Free    | user@example.com    | user123    |

## License

MIT
