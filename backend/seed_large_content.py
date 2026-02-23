from sqlmodel import Session, select
from src.core.db import engine
from src.models.base import Course, Module, Chapter, Quiz

# Curriculum Data — Based on Course Companion FTE Hackathon IV Document
CURRICULUM = [
    {
        "title": "Course Companion FTE: Building a Digital Full-Time Equivalent",
        "description": "A complete guide to building a Digital FTE educational tutor using dual-frontend architecture with Zero-Backend-LLM default and selective hybrid intelligence.",
        "order": 1,
        "chapters": [
            {
                "title": "The Digital FTE Thesis",
                "slug": "digital-fte-thesis",
                "order": 1,
                "content": """# The Digital FTE Thesis

> "In the AI era, the most valuable educational platforms won't sell courses — they'll hire Digital Tutors that work 168 hours per week."

## What is a Digital FTE?
A **Digital Full-Time Equivalent** is an AI-powered tutor that replaces or augments human tutors at massive scale and drastically lower cost.

## Human Tutor vs Digital FTE

| Feature | Human Tutor | Course Companion FTE |
| :--- | :--- | :--- |
| **Availability** | 40 hours/week | 168 hours/week (24/7) |
| **Monthly Cost** | $2,000 - $5,000 | $200 - $500 |
| **Students per Tutor** | 20-50 | Unlimited (concurrent) |
| **Consistency** | Variable (85-95%) | Predictable (99%+) |
| **Ramp-up Time** | Weeks of training | Instant (via SKILL.md) |
| **Personalization** | Limited by time | Infinite patience |
| **Cost per Session** | $25 - $100 | $0.10 - $0.50 |
| **Language Support** | 1-3 languages | 50+ languages |

## The 'Aha!' Moment
A Digital Tutor FTE can conduct **50,000+ tutoring sessions per month** at approximately **$0.25 per session** — compared to $50+ for human tutoring. This represents a **99% cost reduction** while maintaining quality through guardrails and Agent Skills.

## The Agent Factory Architecture
- **General Agents** (Claude Code) manufacture the Custom Agent using Spec-Driven Development
- **Custom Agents** (Digital FTE) deliver tutoring at scale with enterprise-grade reliability
- **Dual Frontends** — ChatGPT App + Web App provide maximum reach
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "How many hours per week does a Digital FTE operate?",
                            "options": ["40 hours", "100 hours", "168 hours", "120 hours"],
                            "correct_answer": 2
                        },
                        {
                            "id": "q2",
                            "text": "What is the approximate cost per tutoring session for a Digital FTE?",
                            "options": ["$25 - $100", "$5 - $10", "$0.10 - $0.50", "$1 - $5"],
                            "correct_answer": 2
                        }
                    ]
                }
            },
            {
                "title": "Project Overview & Dual Frontend Architecture",
                "slug": "project-overview-dual-frontend",
                "order": 2,
                "content": """# Project Overview & Dual Frontend Architecture

## What You're Building
An AI-Native Course Companion that:
1. **Teaches** — Delivers course content with intelligent navigation
2. **Explains** — Breaks down concepts at the learner's level
3. **Quizzes** — Tests understanding with immediate feedback
4. **Tracks** — Monitors progress and identifies knowledge gaps
5. **Adapts** — Adjusts difficulty and approach (Phase 2)
6. **Web App** — Provides a comprehensive standalone Web App (Phase 3)

## Dual Frontend Architecture
Teams must build **two frontends** that share backend features:

| Component | Technology | Purpose |
| :--- | :--- | :--- |
| **ChatGPT App Frontend (Phase 1)** | OpenAI Apps SDK | Conversational UI, 800M+ user reach |
| **Deterministic Backend (Phase 1)** | FastAPI (Python) | Content APIs, Quiz APIs, Progress APIs |
| **Hybrid Backend (Phase 2)** | FastAPI + LLM API Calls | Paid Premium Features |
| **Web Frontend (Phase 3)** | Next.js / React | Full LMS dashboard, progress visuals |
| **Content Storage** | Cloudflare R2 | Course content, media assets, quiz banks |

## Course Content Options
Teams choose ONE topic:
- **Option A**: AI Agent Development (Claude Agent SDK, MCP, Agent Skills)
- **Option B**: Cloud-Native Python (FastAPI, Containers, Kubernetes)
- **Option C**: Generative AI Fundamentals (LLMs, Prompting, RAG, Fine-tuning)
- **Option D**: Modern Python with Typing
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "Which technology is used for the ChatGPT App Frontend?",
                            "options": ["Next.js", "React Native", "OpenAI Apps SDK", "Flutter"],
                            "correct_answer": 2
                        },
                        {
                            "id": "q2",
                            "text": "What is used for content storage in this architecture?",
                            "options": ["AWS S3", "Cloudflare R2", "Google Cloud Storage", "Azure Blob"],
                            "correct_answer": 1
                        }
                    ]
                }
            },
            {
                "title": "Agent Factory Architecture & Technical Stack",
                "slug": "agent-factory-architecture",
                "order": 3,
                "content": """# Agent Factory Architecture & Technical Stack

## Agent Factory Context
This project implements the Agent Factory Architecture where:
- **You** (the team) write the Spec (requirements, guardrails, skills)
- **General Agent** (Claude Code) manufactures the Custom Agent code
- **Custom Agent** (Course Companion FTE) runs in production serving students

## 8-Layer Technical Stack

| Layer | Technology | Purpose | Phase |
| :--- | :--- | :--- | :--- |
| **L0** | Agent Sandbox (gVisor) | Secure execution | Phase 2 & 3 |
| **L1** | Apache Kafka | Event backbone | Phase 2 & 3 |
| **L2** | Dapr + Workflows | Infrastructure + Durability | Phase 2 & 3 |
| **L3** | FastAPI | HTTP interface + A2A | Phase 1, 2 & 3 |
| **L4** | OpenAI Agents SDK | High-level orchestration | Phase 2 & 3 |
| **L5** | Claude Agent SDK | Agentic execution | Phase 2 & 3 |
| **L6** | Runtime Skills + MCP | Domain knowledge + Tools | Phase 1, 2 & 3 |
| **L7** | A2A Protocol | Multi-FTE collaboration | Phase 2 & 3 |

## Phase 1 Focus
**L3 (FastAPI) + L6 (Skills + MCP)** — Deterministic backend only.

## Phase 2 Addition
**L4 + L5 (Hybrid SDK)** for premium features.

## Key Insight
In Phase 1, ChatGPT does ALL the intelligent work. Your backend is purely deterministic — serving content, tracking progress, and enforcing rules. This means **near-zero marginal cost per user**.
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "Which layer provides the HTTP interface in the 8-layer stack?",
                            "options": ["L1 - Apache Kafka", "L3 - FastAPI", "L5 - Claude Agent SDK", "L6 - Runtime Skills"],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "What is the Phase 1 architectural focus?",
                            "options": ["L1 + L2 (Kafka + Dapr)", "L4 + L5 (SDK orchestration)", "L3 + L6 (FastAPI + Skills/MCP)", "L0 + L7 (Sandbox + A2A)"],
                            "correct_answer": 2
                        }
                    ]
                }
            },
            {
                "title": "Phase 1: Zero-Backend-LLM Architecture",
                "slug": "phase-1-zero-backend-llm",
                "order": 4,
                "content": """# Phase 1: Zero-Backend-LLM Architecture

## Goal
Build a fully functional Course Companion where:
- Backend performs **ZERO LLM inference**
- ChatGPT handles ALL explanation, tutoring, and adaptation
- System is production-viable and can scale to **100k+ users** cheaply

## Architecture Flow
```
User -> ChatGPT App -> Deterministic Backend
```

## What the Backend DOES (Allowed)

| Component | Purpose | Example |
| :--- | :--- | :--- |
| Content APIs | Serve course material | `GET /chapters/{id}` |
| Navigation APIs | Chapter sequencing | `GET /chapters/{id}/next` |
| Quiz APIs | Rule-based grading | `POST /quizzes/{id}/submit` |
| Progress APIs | Track completion | `PUT /progress/{user_id}` |
| Search APIs | Keyword/semantic search | `GET /search?q=neural+networks` |
| Access Control | Freemium gating | `GET /access/check` |

## What the Backend MUST NOT DO (Forbidden)

| Forbidden | Why |
| :--- | :--- |
| LLM API calls | Violates Zero-Backend-LLM |
| RAG summarization | LLM inference |
| Prompt orchestration | LLM inference |
| Agent loops | Must be in ChatGPT |
| Content generation | Pre-generate only |

## Disqualification Warning
Teams are **IMMEDIATELY DISQUALIFIED** from Phase 1 if the backend contains ANY LLM API calls, summarization logic, or agent loops. Detection method: Code review + API audit.
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "In Phase 1, who handles ALL the intelligent work (explanation, tutoring)?",
                            "options": ["The FastAPI backend", "ChatGPT", "Claude Agent SDK", "The Web Frontend"],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "Which of these is FORBIDDEN in the Phase 1 backend?",
                            "options": ["Serving content via API", "Rule-based quiz grading", "LLM API calls", "Progress tracking"],
                            "correct_answer": 2
                        }
                    ]
                }
            },
            {
                "title": "Phase 1: Required Features",
                "slug": "phase-1-required-features",
                "order": 5,
                "content": """# Phase 1: Required Features

All teams must implement these **6 features** in Phase 1:

## 1. Content Delivery
- **Backend**: Serve content verbatim from storage
- **ChatGPT**: Explain at learner's level

## 2. Navigation
- **Backend**: Return next/previous chapters
- **ChatGPT**: Suggest optimal learning path

## 3. Grounded Q&A
- **Backend**: Return relevant content sections
- **ChatGPT**: Answer using content only (no hallucination)

## 4. Rule-Based Quizzes
- **Backend**: Grade with answer key (deterministic)
- **ChatGPT**: Present questions, encourage, explain wrong answers

## 5. Progress Tracking
- **Backend**: Store completion status, streaks
- **ChatGPT**: Celebrate achievements, motivate learner

## 6. Freemium Gate
- **Backend**: Check access rights (free vs premium)
- **ChatGPT**: Explain premium benefits gracefully

## Key Principle
The backend is a **dumb data server**. ChatGPT is the **intelligent tutor**. This separation ensures near-zero backend cost while leveraging ChatGPT's capabilities for free (users pay via their own ChatGPT subscription).
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "How many required features must be implemented in Phase 1?",
                            "options": ["4", "5", "6", "8"],
                            "correct_answer": 2
                        },
                        {
                            "id": "q2",
                            "text": "How does the backend grade quizzes in Phase 1?",
                            "options": ["Using LLM evaluation", "Rule-based with answer key", "Peer review system", "No grading in Phase 1"],
                            "correct_answer": 1
                        }
                    ]
                }
            },
            {
                "title": "Phase 2: Hybrid Intelligence (Premium)",
                "slug": "phase-2-hybrid-intelligence",
                "order": 6,
                "content": """# Phase 2: Hybrid Intelligence (Paid Premium)

## Goal
Add selective backend intelligence that:
- Delivers clear **additional educational value**
- Is **cost-justified** as a premium feature
- Is **cleanly isolated** from Phase 1 logic

## Architecture Flow
```
User -> ChatGPT App -> Backend -> LLM APIs
```

## Hybrid Intelligence Rules

### MUST be:
- **Feature-scoped** (limited to specific features)
- **User-initiated** (user requests it)
- **Premium-gated** (paid users only)
- **Isolated** (separate API routes)
- **Cost-tracked** (monitor per-user cost)

### Must NOT:
- Convert entire app to hybrid
- Auto-trigger hybrid features
- Make hybrid required for core UX
- Hide hybrid costs from analysis

## Allowed Hybrid Features (Choose Up to 2)

| Feature | What It Does | Why It Needs LLM |
| :--- | :--- | :--- |
| **Adaptive Learning Path** | Analyzes patterns, generates personalized recommendations | Requires reasoning over learning data |
| **LLM-Graded Assessments** | Evaluates free-form answers with detailed feedback | Rule-based can't evaluate reasoning |
| **Cross-Chapter Synthesis** | Connects concepts across chapters, generates "big picture" | Requires multi-document reasoning |
| **AI Mentor Agent** | Long-running agent for complex tutoring workflows | Multi-turn problem solving |
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "How many hybrid features can a team choose in Phase 2?",
                            "options": ["1", "Up to 2", "Up to 4", "Unlimited"],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "Why does LLM-Graded Assessment need backend LLM calls?",
                            "options": ["To save ChatGPT tokens", "Rule-based grading can't evaluate free-form reasoning", "It's faster than ChatGPT", "It reduces latency"],
                            "correct_answer": 1
                        }
                    ]
                }
            },
            {
                "title": "Phase 3: Web App & Consolidated Backend",
                "slug": "phase-3-web-app",
                "order": 7,
                "content": """# Phase 3: Full End-to-End Web App

## Architecture
```
Web App (Next.js / React)
        |
    Backend (FastAPI)
        |
    LLM APIs (All Features)
```

For the Web App there is a **single set of APIs** combining all Phase 1 and Phase 2 features.

## Web Frontend Requirements
- Full LMS dashboard
- Progress visuals and analytics
- Admin features
- Responsive design
- All 6 core features from Phase 1
- Premium hybrid features from Phase 2

## Phase 3 Scoring (30 points total)

| Criteria | Points | Evaluation Method |
| :--- | :--- | :--- |
| Architecture Correctness | 10 | Code review |
| Feature Completeness | 5 | Checklist verification |
| Web Frontend Quality | 10 | UX testing + responsiveness |
| Cost Efficiency | 5 | Cost analysis review |

## Deliverables Required
- Source Code (GitHub repo with README)
- Architecture Diagram (PNG/PDF)
- Spec Document (Markdown)
- Cost Analysis (Markdown/PDF)
- Demo Video (5 min MP4)
- API Documentation (OpenAPI/Swagger)
- ChatGPT App Manifest (YAML)
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What frontend framework is recommended for Phase 3?",
                            "options": ["Angular", "Vue.js", "Next.js / React", "Svelte"],
                            "correct_answer": 2
                        },
                        {
                            "id": "q2",
                            "text": "How many total points is Phase 3 worth in the judging rubric?",
                            "options": ["20 points", "25 points", "30 points", "45 points"],
                            "correct_answer": 2
                        }
                    ]
                }
            },
            {
                "title": "Agent Skills Design",
                "slug": "agent-skills-design",
                "order": 8,
                "content": """# Agent Skills Design

Agent Skills teach the Course Companion FTE how to perform educational tasks consistently. Each skill is a **SKILL.md** file containing procedural knowledge.

## Required Runtime Skills

| Skill Name | Purpose | Trigger Keywords |
| :--- | :--- | :--- |
| **concept-explainer** | Explain concepts at various complexity levels | "explain", "what is", "how does" |
| **quiz-master** | Guide students through quizzes with encouragement | "quiz", "test me", "practice" |
| **socratic-tutor** | Guide learning through questions, not answers | "help me think", "I'm stuck" |
| **progress-motivator** | Celebrate achievements, maintain motivation | "my progress", "streak", "how am I doing" |

## SKILL.md Structure Template

Each skill file must contain:
1. **Metadata**: Name, description, trigger keywords
2. **Purpose**: What this skill accomplishes
3. **Workflow**: Step-by-step procedure
4. **Response Templates**: Example outputs
5. **Key Principles**: Guidelines and constraints

## How Skills Work
- Skills are loaded as part of the system prompt
- ChatGPT activates the right skill based on trigger keywords
- Skills enforce consistent educational delivery (99%+ consistency)
- New skills can be added without code changes — just add a new SKILL.md
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "Which skill is triggered by keywords like 'help me think' or 'I'm stuck'?",
                            "options": ["concept-explainer", "quiz-master", "socratic-tutor", "progress-motivator"],
                            "correct_answer": 2
                        },
                        {
                            "id": "q2",
                            "text": "What file format defines each Agent Skill?",
                            "options": ["skill.json", "SKILL.md", "skill.yaml", "skill.py"],
                            "correct_answer": 1
                        }
                    ]
                }
            },
            {
                "title": "Cost Analysis & Monetization",
                "slug": "cost-analysis-monetization",
                "order": 9,
                "content": """# Cost Analysis & Monetization

## Phase 1 Cost Structure (Zero-Backend-LLM)

| Component | Cost Model | Est. Monthly (10K users) |
| :--- | :--- | :--- |
| Cloudflare R2 | $0.015/GB + $0.36/M reads | ~$5 |
| Database (Neon/Supabase) | Free tier -> $25/mo | $0 - $25 |
| Compute (Fly.io/Railway) | ~$5-20/mo | ~$10 |
| Domain + SSL | ~$12/year | ~$1 |
| **TOTAL** | | **$16 - $41** |
| **Cost per User** | | **$0.002 - $0.004** |

ChatGPT Usage: **$0 to developer** (users access via their ChatGPT subscription).

## Phase 2 Cost Structure (Hybrid Intelligence)

| Feature | LLM Model | Est. Tokens/Request | Cost/Request |
| :--- | :--- | :--- | :--- |
| Adaptive Path | Claude Sonnet | ~2,000 | $0.018 |
| LLM Assessment | Claude Sonnet | ~1,500 | $0.014 |
| Synthesis | Claude Sonnet | ~3,000 | $0.027 |
| Mentor Session | Claude Sonnet | ~10,000 | $0.090 |

## Monetization Tiers

| Tier | Price | Features |
| :--- | :--- | :--- |
| **Free** | $0 | First 3 chapters, basic quizzes, ChatGPT tutoring |
| **Premium** | $9.99/mo | All chapters, all quizzes, progress tracking |
| **Pro** | $19.99/mo | Premium + Adaptive Path + LLM Assessments |
| **Team** | $49.99/mo | Pro + Analytics + Multiple seats |
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is the estimated total monthly cost for Phase 1 with 10K users?",
                            "options": ["$100 - $200", "$16 - $41", "$500 - $1000", "$200 - $500"],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "How much does the developer pay for ChatGPT usage in Phase 1?",
                            "options": ["$0.01 per request", "$50/month", "$0 (users pay via their subscription)", "$10/month"],
                            "correct_answer": 2
                        }
                    ]
                }
            },
            {
                "title": "Zero-Backend-LLM vs Hybrid: Decision Framework",
                "slug": "zero-llm-vs-hybrid-decision",
                "order": 10,
                "content": """# Zero-Backend-LLM vs Hybrid: Decision Framework

## Definitions

**Zero-Backend-LLM**: No LLM calls in your backend. ChatGPT does all reasoning. Backend is deterministic. Content is served verbatim.

**Hybrid**: ChatGPT handles user interaction. Backend ALSO calls LLMs for RAG, summarization, evaluation, and agent workflows.

## Side-by-Side Comparison

| Dimension | Zero-Backend-LLM | Hybrid |
| :--- | :--- | :--- |
| Backend LLM calls | None | Yes |
| Your LLM cost | $0 | High / variable |
| Infra complexity | Very low | Medium to High |
| Latency | Low | Higher |
| Hallucination risk | Low (source-grounded) | Medium |
| Personalization depth | Medium | High |
| Scalability | Excellent | Cost-bound |
| Compliance / auditability | High | Medium |

## When to Choose What

**Choose Zero-Backend-LLM if:**
- You sell content (courses, books)
- You want low and predictable cost
- You want predictable scaling
- You care about correctness and auditability

**Choose Hybrid if:**
- Intelligence IS the product
- You need agent autonomy
- You can charge accordingly
- You have ops maturity for prompt versioning, token limits, cost ceilings

## The Golden Rules
1. **Zero-Backend-LLM is the default** — start here always
2. **Hybrid must be selective and premium** — justify every LLM call
3. **Your Spec is your Source Code** — describe the excellence you want, AI builds the FTE

## Recommended Evolution
```
Phase 1: Zero-Backend-LLM (free users)
    |
Phase 2: Hybrid for premium users
    |
Phase 3: Agentic workflows (optional)
```

> "Most teams overestimate the need for backend intelligence and underestimate ops complexity. Start zero-LLM, add hybrid only where value is proven."
""",
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is the default architecture recommended by the hackathon?",
                            "options": ["Full Hybrid", "Zero-Backend-LLM", "Microservices with LLM", "Serverless LLM"],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "What is the LLM cost for the developer in Zero-Backend-LLM architecture?",
                            "options": ["Low", "Medium", "$0", "High but manageable"],
                            "correct_answer": 2
                        },
                        {
                            "id": "q3",
                            "text": "Which dimension is 'Excellent' for Zero-Backend-LLM but 'Cost-bound' for Hybrid?",
                            "options": ["Latency", "Personalization", "Scalability", "Compliance"],
                            "correct_answer": 2
                        }
                    ]
                }
            }
        ]
    }
]

def seed_data():
    print("Beginning Database Seeding...")
    with Session(engine) as session:
        # 1. Get or Create Course
        course = session.exec(select(Course).where(Course.slug == "ai-agent-dev")).first()
        if not course:
            course = Course(title="AI Agent Dev", slug="ai-agent-dev", description="Master the art of building autonomous AI agents.", is_published=True)
            session.add(course)
            session.commit()
            session.refresh(course)
        print(f"Course: {course.title}")

        # 2. Iterate Modules
        for mod_data in CURRICULUM:
            # Check if module exists
            module = session.exec(select(Module).where(Module.course_id == course.id).where(Module.order_index == mod_data["order"])).first()
            if not module:
                module = Module(
                    title=mod_data["title"],
                    description=mod_data["description"],
                    order_index=mod_data["order"],
                    course_id=course.id
                )
                session.add(module)
                session.commit()
                session.refresh(module)
                print(f"  Created Module: {module.title}")
            else:
                 # Update title/desc if needed
                module.title = mod_data["title"]
                module.description = mod_data["description"]
                session.add(module)
                session.commit()
                # print(f"  Updated Module: {module.title}")

            # 3. Iterate Chapters
            for chap_data in mod_data["chapters"]:
                chapter = session.exec(select(Chapter).where(Chapter.slug == chap_data["slug"]).where(Chapter.module_id == module.id)).first()
                
                # Check if slug exists globally (to avoid collision if we moved modules) - strict check
                if not chapter:
                     chapter = session.exec(select(Chapter).where(Chapter.slug == chap_data["slug"])).first()
                     if chapter:
                         # Move it to correct module if needed configuration changed
                         chapter.module_id = module.id

                if not chapter:
                    chapter = Chapter(
                        title=chap_data["title"],
                        slug=chap_data["slug"],
                        r2_key=f"{chap_data['slug']}.md", # Legacy field, but we keep it populated
                        content=chap_data["content"],
                        order_index=chap_data["order"],
                        module_id=module.id,
                        is_published=True
                    )
                    session.add(chapter)
                    print(f"    Created Chapter: {chapter.title}")
                else:
                    # Update content
                    chapter.title = chap_data["title"]
                    chapter.content = chap_data["content"]
                    chapter.order_index = chap_data["order"]
                    session.add(chapter)
                    # print(f"    Updated Chapter: {chapter.title}")

                # 4. Create/Update Quiz (if defined in curriculum)
                if "quiz" in chap_data:
                    quiz = session.exec(select(Quiz).where(Quiz.chapter_id == chapter.id)).first()
                    if not quiz:
                        quiz = Quiz(
                            chapter_id=chapter.id,
                            title=f"Quiz: {chap_data['title']}",
                            content=chap_data["quiz"]
                        )
                        session.add(quiz)
                        print(f"      Created Quiz for: {chapter.title}")
                    else:
                        quiz.content = chap_data["quiz"]
                        session.add(quiz)
                        # print(f"      Updated Quiz for: {chapter.title}")
            
            session.commit()
    
    print("Database Seeding Complete! 🚀")

if __name__ == "__main__":
    seed_data()
