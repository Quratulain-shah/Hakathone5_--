"""
Seed script to add ALL chapters with MCQ quizzes to the database.

Run from backend/ directory:
    python seed_chapters.py

This script is idempotent — safe to run multiple times.
It skips chapters that already exist (by slug).
"""

import logging
import os
from dotenv import load_dotenv

# Force load from root .env
root_env = os.path.abspath(os.path.join(os.path.dirname(__file__), ".env"))
if not os.path.exists(root_env):
    root_env = os.path.abspath(os.path.join(os.getcwd(), ".env"))

load_dotenv(root_env, override=True)

from sqlmodel import Session, select
from src.core.db import engine, init_db
from src.models.base import Course, Module, Chapter, Quiz

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# ── DATA DEFINITION ──────────────────────────────────────────────

COURSE = {
    "slug": "ai-agent-dev",
    "title": "AI Agent Development",
    "description": "Learn to build autonomous AI agents with Python and LLMs.",
}

MODULES = [
    {
        "title": "Module 1: Foundations",
        "description": "Core concepts of AI agents — deterministic vs agentic systems, tool use, and workflows.",
        "order_index": 1,
        "chapters": [
            {
                "title": "Deterministic vs Agentic Systems",
                "slug": "deterministic-vs-agentic",
                "r2_key": "mod1/ch1.md",
                "order_index": 1,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is the defining characteristic of a deterministic system?",
                            "type": "mcq",
                            "options": [
                                "It uses machine learning to make decisions",
                                "Given the same input, it always produces the same output",
                                "It can adapt to new situations autonomously",
                                "It requires an internet connection to function"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "Which of the following is an example of an agentic system?",
                            "type": "mcq",
                            "options": [
                                "A calculator that adds two numbers",
                                "A sorting algorithm like bubble sort",
                                "An AI assistant that autonomously researches and writes reports",
                                "A static HTML web page"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q3",
                            "text": "Why might you choose a deterministic system over an agentic one?",
                            "type": "mcq",
                            "options": [
                                "When you need creativity and flexibility",
                                "When predictability and reliability are critical",
                                "When the task requires multi-step reasoning",
                                "When the output format varies each time"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q4",
                            "text": "What is a key risk of agentic systems compared to deterministic ones?",
                            "type": "mcq",
                            "options": [
                                "They are always slower",
                                "They cannot use APIs",
                                "Their outputs can be unpredictable or inconsistent",
                                "They require more RAM"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q5",
                            "text": "In a hybrid architecture, deterministic components are used for:",
                            "type": "mcq",
                            "options": [
                                "Creative writing and brainstorming",
                                "Input validation, routing, and guardrails",
                                "Generating images from text",
                                "Training new models"
                            ],
                            "correct_answer": 1
                        }
                    ],
                    "answer_key": {
                        "q1": "1", "q2": "2", "q3": "1", "q4": "2", "q5": "1"
                    }
                }
            },
            {
                "title": "Tool Use and Function Calling",
                "slug": "tool-use-function-calling",
                "r2_key": "mod1/ch2.md",
                "order_index": 2,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is 'tool use' in the context of AI agents?",
                            "type": "mcq",
                            "options": [
                                "Using a wrench to fix hardware",
                                "The ability of an AI agent to call external functions and APIs",
                                "Manually writing code for every task",
                                "Training a model on new data"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "In function calling, who decides WHICH tool to use?",
                            "type": "mcq",
                            "options": [
                                "The end user explicitly chooses",
                                "A random selection algorithm",
                                "The AI model decides based on the user's request",
                                "The database selects automatically"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q3",
                            "text": "Where does actual tool execution happen?",
                            "type": "mcq",
                            "options": [
                                "Inside the LLM model itself",
                                "In the user's browser",
                                "In your application code, outside the model",
                                "On the model provider's servers"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q4",
                            "text": "What does a tool definition include?",
                            "type": "mcq",
                            "options": [
                                "Only the tool's name",
                                "The tool's name, description, and parameter schema",
                                "The tool's source code",
                                "The tool's price and license"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q5",
                            "text": "What happens after a tool returns its result to the AI model?",
                            "type": "mcq",
                            "options": [
                                "The conversation ends immediately",
                                "The model integrates the result into its response to the user",
                                "The result is stored in a blockchain",
                                "Another model is called to verify the result"
                            ],
                            "correct_answer": 1
                        }
                    ],
                    "answer_key": {
                        "q1": "1", "q2": "2", "q3": "2", "q4": "1", "q5": "1"
                    }
                }
            },
            {
                "title": "Agentic Workflows",
                "slug": "agentic-workflows",
                "r2_key": "mod1/ch3.md",
                "order_index": 3,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is the ReAct pattern in AI agents?",
                            "type": "mcq",
                            "options": [
                                "A JavaScript framework for building UIs",
                                "A pattern where the agent alternates between reasoning and taking action",
                                "A method for training reinforcement learning models",
                                "A database query optimization technique"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "Which component is NOT part of an agentic workflow?",
                            "type": "mcq",
                            "options": [
                                "Planning — breaking down tasks into steps",
                                "Execution — carrying out each step",
                                "Compilation — converting code to machine language",
                                "Reflection — evaluating results and adjusting"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q3",
                            "text": "In a 'Plan and Execute' pattern, what happens first?",
                            "type": "mcq",
                            "options": [
                                "The agent immediately starts executing tools",
                                "The agent creates a complete plan before executing any step",
                                "The agent asks the user for permission",
                                "The agent searches the internet for solutions"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q4",
                            "text": "What is a multi-agent system?",
                            "type": "mcq",
                            "options": [
                                "A single agent with multiple tools",
                                "Multiple users sharing one AI assistant",
                                "Multiple specialized agents collaborating to solve complex problems",
                                "An agent that can speak multiple languages"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q5",
                            "text": "What is the FIRST step recommended when building your first agent?",
                            "type": "mcq",
                            "options": [
                                "Add as many tools as possible",
                                "Define a clear goal for your agent",
                                "Implement complex error handling",
                                "Deploy to production immediately"
                            ],
                            "correct_answer": 1
                        }
                    ],
                    "answer_key": {
                        "q1": "1", "q2": "2", "q3": "1", "q4": "2", "q5": "1"
                    }
                }
            },
            {
                "title": "Deterministic vs Agentic — Deep Dive",
                "slug": "deterministic-agentic-deep-dive",
                "r2_key": "mod1/ch4.md",
                "order_index": 4,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "Which statement about deterministic systems is TRUE?",
                            "type": "mcq",
                            "options": [
                                "They produce different outputs each time",
                                "They rely on LLMs for every decision",
                                "They operate on explicit, hardcoded logic like if-then-else",
                                "They require internet access to function"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q2",
                            "text": "An agentic system is best suited for tasks that require:",
                            "type": "mcq",
                            "options": [
                                "Simple arithmetic calculations",
                                "Autonomous reasoning and multi-step decision making",
                                "Displaying static content on a web page",
                                "Sorting a list of numbers"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q3",
                            "text": "What is a guardrail in the context of AI agents?",
                            "type": "mcq",
                            "options": [
                                "A physical barrier around a server",
                                "A deterministic check that constrains agent behavior within safe limits",
                                "A type of neural network layer",
                                "A method to increase LLM speed"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q4",
                            "text": "In a hybrid system, which part typically handles user input validation?",
                            "type": "mcq",
                            "options": [
                                "The agentic/LLM component",
                                "The deterministic component",
                                "The frontend JavaScript",
                                "The cloud provider"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q5",
                            "text": "Why is transparency harder to achieve in agentic systems?",
                            "type": "mcq",
                            "options": [
                                "Because they use encrypted communication",
                                "Because the decision-making path of an LLM is not always traceable",
                                "Because they run on private clouds only",
                                "Because they don't have logging capabilities"
                            ],
                            "correct_answer": 1
                        }
                    ],
                    "answer_key": {
                        "q1": "2", "q2": "1", "q3": "1", "q4": "1", "q5": "1"
                    }
                }
            },
            {
                "title": "Module 1 Assessment",
                "slug": "mod1-assessment",
                "r2_key": "mod1/assessment.md",
                "order_index": 5,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is the main difference between deterministic and agentic systems?",
                            "type": "mcq",
                            "options": [
                                "Deterministic systems use AI, agentic systems do not",
                                "Deterministic systems always produce the same output for the same input, agentic systems may vary",
                                "Agentic systems are faster than deterministic systems",
                                "There is no difference, they are the same"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "In function calling, what does the AI model generate?",
                            "type": "mcq",
                            "options": [
                                "The final answer directly without tools",
                                "A function call with arguments that your app executes externally",
                                "Executable binary code",
                                "A new machine learning model"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q3",
                            "text": "What does the ReAct pattern stand for?",
                            "type": "mcq",
                            "options": [
                                "Reactive Architecture",
                                "Read and Extract",
                                "Reasoning and Acting",
                                "Recursive Activation"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q4",
                            "text": "Which is the best use case for a deterministic system?",
                            "type": "mcq",
                            "options": [
                                "Writing creative stories",
                                "Financial transaction processing where accuracy is critical",
                                "Open-ended research tasks",
                                "Having a conversation with a user"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q5",
                            "text": "What is a guardrail in a hybrid AI system?",
                            "type": "mcq",
                            "options": [
                                "A GPU optimization technique",
                                "A deterministic check that keeps the agent within safe limits",
                                "A method to speed up LLM responses",
                                "A type of vector database"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q6",
                            "text": "In an agentic workflow, what happens during the Reflection phase?",
                            "type": "mcq",
                            "options": [
                                "The agent shuts down",
                                "The agent evaluates its results and adjusts the plan if needed",
                                "The agent deletes its memory",
                                "The agent sends an email to the user"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q7",
                            "text": "Why do hybrid architectures use deterministic components for input validation?",
                            "type": "mcq",
                            "options": [
                                "Because LLMs are too expensive for validation",
                                "Because validation rules are fixed and must be 100% reliable",
                                "Because users prefer deterministic UIs",
                                "Because Python cannot handle validation"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q8",
                            "text": "What is tool selection in the context of AI agents?",
                            "type": "mcq",
                            "options": [
                                "Manually choosing which IDE to use",
                                "The model deciding which external function to call based on the user request",
                                "Selecting a programming language for a project",
                                "Choosing between CPU and GPU for training"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q9",
                            "text": "What is the Plan-and-Execute pattern?",
                            "type": "mcq",
                            "options": [
                                "The agent creates a full plan first, then executes each step",
                                "The agent executes random actions until the goal is met",
                                "The user writes the plan and the agent only executes",
                                "The agent plans but never executes"
                            ],
                            "correct_answer": 0
                        },
                        {
                            "id": "q10",
                            "text": "Which statement about multi-agent systems is TRUE?",
                            "type": "mcq",
                            "options": [
                                "They always use exactly two agents",
                                "Multiple specialized agents collaborate to solve complex problems",
                                "They are slower than single agents in every scenario",
                                "They cannot communicate with each other"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "essay1",
                            "text": "Explain how you would decide which parts of an AI application should be deterministic and which should be agentic. Give a real-world example.",
                            "type": "essay"
                        }
                    ]
                }
            }
        ]
    },
    {
        "title": "Module 2: Advanced Agent Techniques",
        "description": "Prompt engineering, memory management, and multi-agent systems for production AI.",
        "order_index": 2,
        "chapters": [
            {
                "title": "Prompt Engineering for AI Agents",
                "slug": "prompt-engineering-agents",
                "r2_key": "mod2/ch5.md",
                "order_index": 1,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is zero-shot prompting?",
                            "type": "mcq",
                            "options": [
                                "Giving the model many examples before asking a question",
                                "Giving the model a task with no examples at all",
                                "Asking the model to generate images",
                                "Training the model from scratch"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "In few-shot prompting, what do the 'shots' refer to?",
                            "type": "mcq",
                            "options": [
                                "The number of API calls made",
                                "The examples provided in the prompt to guide the model",
                                "The number of tokens in the response",
                                "The number of models used"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q3",
                            "text": "What is the purpose of Chain-of-Thought (CoT) prompting?",
                            "type": "mcq",
                            "options": [
                                "To make the model respond faster",
                                "To reduce the cost of API calls",
                                "To force the model to show step-by-step reasoning before answering",
                                "To connect multiple models together"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q4",
                            "text": "The ReAct prompting pattern combines:",
                            "type": "mcq",
                            "options": [
                                "Reading and Writing",
                                "Reasoning and Acting",
                                "Retrieval and Caching",
                                "Rendering and Animation"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q5",
                            "text": "Which section should NOT be in an agent's system prompt?",
                            "type": "mcq",
                            "options": [
                                "Role — what the agent is",
                                "Available Tools — what the agent can use",
                                "API Keys — credentials for services",
                                "Constraints — what the agent should avoid"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q6",
                            "text": "What is a self-reflection prompt used for?",
                            "type": "mcq",
                            "options": [
                                "Making the agent delete its own code",
                                "Having the agent review its own response for accuracy and completeness",
                                "Training a new model on the agent's outputs",
                                "Generating random test data"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q7",
                            "text": "What is a common pitfall when providing too many tools to an agent?",
                            "type": "mcq",
                            "options": [
                                "The agent becomes more accurate",
                                "The agent gets confused and picks the wrong tool",
                                "The agent runs faster",
                                "The agent uses less memory"
                            ],
                            "correct_answer": 1
                        }
                    ],
                    "answer_key": {
                        "q1": "1", "q2": "1", "q3": "2", "q4": "1",
                        "q5": "2", "q6": "1", "q7": "1"
                    }
                }
            },
            {
                "title": "Memory and Context Management",
                "slug": "memory-context-management",
                "r2_key": "mod2/ch6.md",
                "order_index": 2,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is 'short-term memory' for an AI agent?",
                            "type": "mcq",
                            "options": [
                                "A separate database for recent queries",
                                "The current context window — everything the model can see right now",
                                "The agent's training data",
                                "A cache on the user's browser"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "What is the main limitation of short-term memory?",
                            "type": "mcq",
                            "options": [
                                "It is too expensive",
                                "It is limited by the model's context window size",
                                "It cannot store text",
                                "It requires a GPU"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q3",
                            "text": "What does RAG stand for in the context of AI?",
                            "type": "mcq",
                            "options": [
                                "Random Access Generation",
                                "Retrieval-Augmented Generation",
                                "Rapid Agent Growth",
                                "Recursive Algorithm Generator"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q4",
                            "text": "Episodic memory in an AI agent stores:",
                            "type": "mcq",
                            "options": [
                                "The model's weights and biases",
                                "Records of specific past interactions and their outcomes",
                                "User passwords and credentials",
                                "Static configuration files"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q5",
                            "text": "Semantic memory uses what technology for intelligent retrieval?",
                            "type": "mcq",
                            "options": [
                                "SQL databases with LIKE queries",
                                "Regular expressions",
                                "Vector embeddings and similarity search",
                                "File system search (grep)"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q6",
                            "text": "Which strategy compresses old conversations instead of dropping them?",
                            "type": "mcq",
                            "options": [
                                "Sliding window",
                                "Summarization strategy",
                                "Token counting",
                                "Random sampling"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q7",
                            "text": "Why should an agent implement 'forgetting' in its memory system?",
                            "type": "mcq",
                            "options": [
                                "To save disk space only",
                                "To remove outdated or low-value memories that could confuse the agent",
                                "Because regulations require it",
                                "To make the agent seem more human-like"
                            ],
                            "correct_answer": 1
                        }
                    ],
                    "answer_key": {
                        "q1": "1", "q2": "1", "q3": "1", "q4": "1",
                        "q5": "2", "q6": "1", "q7": "1"
                    }
                }
            },
            {
                "title": "Building Multi-Agent Systems",
                "slug": "multi-agent-systems",
                "r2_key": "mod2/ch7.md",
                "order_index": 3,
                "is_premium": False,
                "quiz": {
                    "questions": [
                        {
                            "id": "q1",
                            "text": "What is a multi-agent system?",
                            "type": "mcq",
                            "options": [
                                "A single AI with multiple GPUs",
                                "Multiple specialized AI agents collaborating to solve complex problems",
                                "An agent that speaks multiple languages",
                                "A system that runs on multiple servers"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q2",
                            "text": "In the Orchestrator (Hub-and-Spoke) pattern, the central agent's role is to:",
                            "type": "mcq",
                            "options": [
                                "Do all the work itself",
                                "Coordinate and delegate tasks to specialist agents",
                                "Store data in a database",
                                "Handle user authentication"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q3",
                            "text": "In a Pipeline pattern, how do agents interact?",
                            "type": "mcq",
                            "options": [
                                "All agents work simultaneously on the same task",
                                "Agents work in sequence — output of one becomes input of the next",
                                "Agents vote on the best solution",
                                "Agents ignore each other completely"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q4",
                            "text": "What is the Debate pattern used for?",
                            "type": "mcq",
                            "options": [
                                "Making agents argue to reach a better, more robust answer",
                                "Training agents to be polite",
                                "Reducing the number of API calls",
                                "Encrypting communication between agents"
                            ],
                            "correct_answer": 0
                        },
                        {
                            "id": "q5",
                            "text": "When should you use a multi-agent system instead of a single agent?",
                            "type": "mcq",
                            "options": [
                                "When the task is simple and well-defined",
                                "When low latency is the only priority",
                                "When the task spans multiple domains and requires specialization",
                                "When you want to minimize costs"
                            ],
                            "correct_answer": 2
                        },
                        {
                            "id": "q6",
                            "text": "In the Blackboard pattern, agents share:",
                            "type": "mcq",
                            "options": [
                                "Their source code",
                                "A common workspace/state that any agent can read and update",
                                "A physical whiteboard in an office",
                                "Their API keys"
                            ],
                            "correct_answer": 1
                        },
                        {
                            "id": "q7",
                            "text": "What is the recommended approach when starting to build a multi-agent system?",
                            "type": "mcq",
                            "options": [
                                "Start with 20+ agents for maximum coverage",
                                "Copy an existing open-source system entirely",
                                "Start simple with 2-3 agents and add complexity only when needed",
                                "Skip planning and start coding immediately"
                            ],
                            "correct_answer": 2
                        }
                    ],
                    "answer_key": {
                        "q1": "1", "q2": "1", "q3": "1", "q4": "0",
                        "q5": "2", "q6": "1", "q7": "2"
                    }
                }
            }
        ]
    }
]


# ── SEED LOGIC ───────────────────────────────────────────────────

def seed_chapters():
    logger.info("Initializing database tables...")
    init_db()

    with Session(engine) as session:
        # 1. Get or create course
        course = session.exec(
            select(Course).where(Course.slug == COURSE["slug"])
        ).first()

        if not course:
            logger.info(f"Creating course: {COURSE['title']}")
            course = Course(
                slug=COURSE["slug"],
                title=COURSE["title"],
                description=COURSE["description"],
                is_published=True,
            )
            session.add(course)
            session.commit()
            session.refresh(course)
        else:
            logger.info(f"Course '{course.title}' already exists.")

        # 2. Loop through modules
        for mod_data in MODULES:
            module = session.exec(
                select(Module).where(
                    Module.course_id == course.id,
                    Module.title == mod_data["title"],
                )
            ).first()

            if not module:
                logger.info(f"  Creating module: {mod_data['title']}")
                module = Module(
                    course_id=course.id,
                    title=mod_data["title"],
                    description=mod_data["description"],
                    order_index=mod_data["order_index"],
                )
                session.add(module)
                session.commit()
                session.refresh(module)
            else:
                # Update description if changed
                if module.description != mod_data["description"]:
                    module.description = mod_data["description"]
                    session.add(module)
                    session.commit()
                logger.info(f"  Module '{module.title}' already exists.")

            # 3. Loop through chapters
            for ch_data in mod_data["chapters"]:
                chapter = session.exec(
                    select(Chapter).where(Chapter.slug == ch_data["slug"])
                ).first()

                if not chapter:
                    logger.info(f"    Creating chapter: {ch_data['title']} (slug={ch_data['slug']})")
                    chapter = Chapter(
                        module_id=module.id,
                        title=ch_data["title"],
                        slug=ch_data["slug"],
                        r2_key=ch_data["r2_key"],
                        is_premium=ch_data["is_premium"],
                        order_index=ch_data["order_index"],
                    )
                    session.add(chapter)
                    session.commit()
                    session.refresh(chapter)
                else:
                    logger.info(f"    Chapter '{chapter.title}' already exists.")

                # 4. Create or update quiz
                if ch_data.get("quiz"):
                    quiz = session.exec(
                        select(Quiz).where(Quiz.chapter_id == chapter.id)
                    ).first()

                    if not quiz:
                        logger.info(f"      Adding quiz ({len(ch_data['quiz']['questions'])} questions)")
                        quiz = Quiz(
                            chapter_id=chapter.id,
                            content=ch_data["quiz"],
                        )
                        session.add(quiz)
                        session.commit()
                    else:
                        # Update quiz content if it has changed
                        old_count = len(quiz.content.get("questions", []))
                        new_count = len(ch_data["quiz"]["questions"])
                        if old_count != new_count:
                            logger.info(f"      Updating quiz: {old_count} -> {new_count} questions")
                            quiz.content = ch_data["quiz"]
                            session.add(quiz)
                            session.commit()
                        else:
                            logger.info(f"      Quiz already exists ({old_count} questions)")

    logger.info("")
    logger.info("=" * 50)
    logger.info("SEEDING COMPLETE!")
    logger.info("=" * 50)

    # Print summary
    with Session(engine) as session:
        courses = session.exec(select(Course)).all()
        for c in courses:
            modules = session.exec(
                select(Module).where(Module.course_id == c.id).order_by(Module.order_index)
            ).all()
            logger.info(f"\nCourse: {c.title} ({c.slug})")
            for m in modules:
                chapters = session.exec(
                    select(Chapter).where(Chapter.module_id == m.id).order_by(Chapter.order_index)
                ).all()
                logger.info(f"  {m.title} ({len(chapters)} chapters)")
                for ch in chapters:
                    quiz = session.exec(select(Quiz).where(Quiz.chapter_id == ch.id)).first()
                    q_count = len(quiz.content.get("questions", [])) if quiz else 0
                    logger.info(f"    [{ch.order_index}] {ch.title} (slug={ch.slug}, quiz={q_count}q)")


if __name__ == "__main__":
    seed_chapters()
