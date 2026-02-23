# Prompt Engineering for AI Agents

## Introduction

Prompt engineering is the art and science of crafting effective instructions for Large Language Models (LLMs). For AI agents, prompt engineering is the **backbone** — it determines how well an agent reasons, plans, and executes tasks.

Unlike simple chatbot prompts, agent prompts must handle:
- **Multi-step reasoning** across complex tasks
- **Tool selection** from available capabilities
- **Error recovery** when things go wrong
- **Context management** across long conversations

## Core Prompting Techniques

### 1. Zero-Shot Prompting

The simplest approach — give the model a task with no examples.

```python
prompt = """
You are a helpful coding assistant.
Task: Write a Python function that checks if a number is prime.
"""
```

**When to use:** Simple, well-defined tasks the model already understands.

### 2. Few-Shot Prompting

Provide examples to guide the model's output format and reasoning.

```python
prompt = """
Convert natural language to SQL queries.

Example 1:
Input: "Show all users who signed up in 2024"
Output: SELECT * FROM users WHERE YEAR(created_at) = 2024;

Example 2:
Input: "Count orders by status"
Output: SELECT status, COUNT(*) FROM orders GROUP BY status;

Now convert:
Input: "Find the top 5 customers by total spending"
Output:
"""
```

**When to use:** When you need consistent output formatting or the task requires specific patterns.

### 3. Chain-of-Thought (CoT) Prompting

Force the model to show its reasoning step-by-step before giving a final answer.

```python
prompt = """
Solve this step by step:

Question: A store has 50 apples. They sell 30% on Monday and
half of the remainder on Tuesday. How many are left?

Think step by step:
1. Monday sales: 50 × 0.30 = 15 apples sold
2. After Monday: 50 - 15 = 35 apples remain
3. Tuesday sales: 35 ÷ 2 = 17.5 → 17 apples sold
4. After Tuesday: 35 - 17 = 18 apples remain

Answer: 18 apples
"""
```

**When to use:** Math problems, logic puzzles, multi-step reasoning tasks.

### 4. ReAct Prompting (For Agents)

The most important pattern for AI agents — combines **Reasoning** and **Acting**.

```python
system_prompt = """
You are an AI agent with access to these tools:
- search(query): Search the web
- calculator(expression): Evaluate math
- weather(city): Get weather data

For each user request, follow this pattern:
Thought: [reason about what to do next]
Action: [tool_name(parameters)]
Observation: [result from the tool]
... (repeat as needed)
Final Answer: [response to the user]
"""
```

## Building an Agent System Prompt

A well-structured agent prompt has these sections:

```python
AGENT_SYSTEM_PROMPT = """
# Role
You are a Research Assistant AI Agent specialized in finding
and summarizing academic papers.

# Available Tools
1. search_papers(query, year_range) - Search academic databases
2. read_paper(paper_id) - Get full text of a paper
3. summarize(text, length) - Create a summary
4. cite(paper_id, format) - Generate a citation

# Instructions
- Always search before answering questions
- Cite your sources using APA format
- If a paper is behind a paywall, note this to the user
- Break complex research questions into sub-queries

# Output Format
For each research task:
1. List the papers you found
2. Provide a synthesis of key findings
3. Include all citations at the end

# Constraints
- Never fabricate paper titles or authors
- Maximum 5 tool calls per request
- Always verify information across multiple sources
"""
```

## Prompt Templates for Common Agent Tasks

### Task Decomposition Prompt
```python
decomposition_prompt = """
Break down this complex task into smaller, actionable steps:
Task: {user_task}

Rules:
- Each step should be independently executable
- Steps should be in logical order
- Include error handling steps where needed
- Mark which steps can run in parallel

Output format:
Step 1: [action] - Depends on: [none/step_n]
Step 2: [action] - Depends on: [step_1]
...
"""
```

### Self-Reflection Prompt
```python
reflection_prompt = """
Review your previous response and check for:
1. Factual accuracy - Are all claims verifiable?
2. Completeness - Did you address all parts of the question?
3. Logic - Is the reasoning sound?
4. Hallucination - Did you make up any information?

If you find issues, correct them. If the response is good,
confirm it with "VERIFIED: No issues found."
"""
```

## Common Pitfalls

| Pitfall | Problem | Solution |
|---------|---------|----------|
| Vague instructions | Agent guesses intent | Be specific and explicit |
| No examples | Inconsistent output format | Add few-shot examples |
| Missing constraints | Agent goes off-track | Set clear boundaries |
| No error handling | Agent crashes on failures | Add fallback instructions |
| Too many tools | Agent gets confused | Limit to 5-7 relevant tools |

## Summary

- **Zero-shot** for simple tasks, **few-shot** for formatting, **CoT** for reasoning
- **ReAct** is the gold standard for agentic prompting
- Always include: Role, Tools, Instructions, Output Format, Constraints
- Test prompts iteratively — small changes can have big effects
