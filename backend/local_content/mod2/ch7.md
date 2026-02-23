# Building Multi-Agent Systems

## Introduction

A **multi-agent system (MAS)** is an architecture where multiple AI agents collaborate, specialize, and communicate to solve problems that are too complex for any single agent. Think of it as building a team where each member has a specific role.

Real-world examples:
- **ChatDev** — Agents acting as CEO, CTO, Programmer, and Tester to build software
- **AutoGen** — Microsoft's framework for multi-agent conversations
- **CrewAI** — Agents with roles, goals, and backstories working as a crew

## Why Multi-Agent?

| Single Agent | Multi-Agent |
|-------------|-------------|
| Does everything itself | Specialization by role |
| Limited by one prompt | Each agent has focused prompts |
| Confusion on complex tasks | Clear responsibility boundaries |
| Hard to debug | Modular and testable |
| One point of failure | Redundancy and fallbacks |

## Architecture Patterns

### 1. Hub-and-Spoke (Orchestrator Pattern)

One central agent coordinates all others.

```
              ┌──────────┐
              │Orchestrator│
              │  Agent     │
              └─────┬──────┘
           ┌────────┼────────┐
           ▼        ▼        ▼
      ┌────────┐┌────────┐┌────────┐
      │Research ││ Code   ││ Review │
      │ Agent  ││ Agent  ││ Agent  │
      └────────┘└────────┘└────────┘
```

```python
class OrchestratorAgent:
    def __init__(self):
        self.agents = {
            "researcher": ResearchAgent(),
            "coder": CodingAgent(),
            "reviewer": ReviewAgent(),
        }

    def execute(self, task):
        # Step 1: Understand the task
        plan = self.plan(task)

        # Step 2: Delegate to specialists
        results = {}
        for step in plan:
            agent_name = step["assigned_to"]
            agent = self.agents[agent_name]
            results[step["id"]] = agent.execute(step["task"])

        # Step 3: Combine results
        return self.synthesize(results)

    def plan(self, task):
        return [
            {"id": 1, "task": "Research the topic", "assigned_to": "researcher"},
            {"id": 2, "task": "Write the code", "assigned_to": "coder"},
            {"id": 3, "task": "Review the code", "assigned_to": "reviewer"},
        ]
```

### 2. Pipeline Pattern

Agents work in sequence — output of one becomes input of the next.

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Planner  │───►│ Coder    │───►│ Tester   │───►│ Deployer │
│ Agent    │    │ Agent    │    │ Agent    │    │ Agent    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
```

```python
class Pipeline:
    def __init__(self, agents):
        self.agents = agents  # Ordered list of agents

    def run(self, initial_input):
        current_output = initial_input

        for agent in self.agents:
            print(f"Running: {agent.name}")
            current_output = agent.execute(current_output)

            # Validate output before passing to next agent
            if not current_output or current_output.get("error"):
                print(f"Pipeline stopped at {agent.name}")
                return current_output

        return current_output

# Usage
pipeline = Pipeline([
    PlannerAgent(),
    CoderAgent(),
    TesterAgent(),
    DeployerAgent()
])
result = pipeline.run({"task": "Build a REST API for todo items"})
```

### 3. Debate Pattern

Agents with different perspectives debate to reach a better answer.

```python
class DebateSystem:
    def __init__(self):
        self.proponent = Agent(
            role="Argue FOR the proposed solution"
        )
        self.opponent = Agent(
            role="Find flaws and argue AGAINST"
        )
        self.judge = Agent(
            role="Evaluate arguments and decide the winner"
        )

    def debate(self, topic, rounds=3):
        history = []

        for round_num in range(rounds):
            # Proponent argues
            pro_arg = self.proponent.argue(topic, history)
            history.append({"side": "pro", "argument": pro_arg})

            # Opponent counters
            con_arg = self.opponent.argue(topic, history)
            history.append({"side": "con", "argument": con_arg})

        # Judge decides
        verdict = self.judge.decide(topic, history)
        return verdict
```

### 4. Blackboard Pattern

Agents share a common workspace and contribute when they can.

```python
class Blackboard:
    def __init__(self):
        self.state = {}
        self.agents = []

    def register_agent(self, agent):
        self.agents.append(agent)

    def run(self, initial_problem):
        self.state["problem"] = initial_problem
        self.state["solved"] = False

        max_iterations = 10
        for i in range(max_iterations):
            for agent in self.agents:
                if agent.can_contribute(self.state):
                    contribution = agent.contribute(self.state)
                    self.state.update(contribution)

            if self.state.get("solved"):
                break

        return self.state
```

## Communication Between Agents

### Message Passing

```python
class Message:
    def __init__(self, sender, receiver, content, msg_type="request"):
        self.sender = sender
        self.receiver = receiver
        self.content = content
        self.msg_type = msg_type  # request, response, broadcast

class MessageBus:
    def __init__(self):
        self.queues = {}

    def register(self, agent_name):
        self.queues[agent_name] = []

    def send(self, message):
        if message.receiver in self.queues:
            self.queues[message.receiver].append(message)

    def receive(self, agent_name):
        messages = self.queues.get(agent_name, [])
        self.queues[agent_name] = []
        return messages
```

## Building a Simple Multi-Agent System

Here's a complete example — a **Code Review System** with 3 agents:

```python
class CodeReviewSystem:
    """
    3 agents collaborate to review code:
    1. Analyzer - Checks code structure and patterns
    2. Security - Checks for vulnerabilities
    3. Synthesizer - Combines feedback into a report
    """

    def __init__(self, llm):
        self.analyzer = self._create_agent(llm,
            "You are a code quality analyzer. Check for: "
            "code smells, design patterns, readability, and best practices."
        )
        self.security = self._create_agent(llm,
            "You are a security auditor. Check for: "
            "injection vulnerabilities, authentication issues, "
            "data exposure, and OWASP Top 10."
        )
        self.synthesizer = self._create_agent(llm,
            "You synthesize multiple code review reports into "
            "a single, prioritized, actionable summary."
        )

    def review(self, code):
        # Parallel analysis
        quality_report = self.analyzer.analyze(code)
        security_report = self.security.analyze(code)

        # Synthesis
        final_report = self.synthesizer.combine(
            quality_report,
            security_report
        )
        return final_report
```

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Agents disagreeing | Use a judge agent or voting system |
| Infinite loops | Set max iterations and timeouts |
| Communication overhead | Minimize message size, use structured formats |
| Debugging difficulty | Log all inter-agent messages |
| Cost management | Cache results, limit LLM calls per agent |

## When to Use Multi-Agent vs Single Agent

**Use Single Agent when:**
- Task is straightforward
- One domain of expertise is enough
- Low latency is required

**Use Multi-Agent when:**
- Task spans multiple domains (research + coding + testing)
- Quality requires multiple perspectives (debate pattern)
- Task has natural pipeline stages
- You need specialization and modularity

## Summary

- Multi-agent systems divide complex problems among specialized agents
- **Orchestrator** pattern is the most common starting point
- **Pipeline** works great for sequential workflows
- **Debate** improves answer quality through adversarial review
- Communication via message passing keeps agents decoupled
- Start simple (2-3 agents) and add complexity only when needed
