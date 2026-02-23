---
title: Course Companion Backend
emoji: 🎓
colorFrom: blue
colorTo: green
sdk: docker
app_port: 7860
pinned: false
---

# Course Companion FTE — Backend

FastAPI backend for the Course Companion FTE Hackathon IV project.

## Environment Variables (set in HF Space Secrets)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `SECRET_KEY` | JWT signing secret |
| `GEMINI_API_KEY` | Google Gemini API key |
| `STORAGE_TYPE` | `local` or `r2` |
