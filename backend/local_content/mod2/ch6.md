# Memory and Context Management in AI Agents

## Introduction

One of the biggest challenges in building AI agents is **memory management**. LLMs have a finite context window, and agents often need to operate across long conversations, multiple sessions, and complex multi-step tasks.

Without proper memory management, an agent will:
- Forget earlier instructions mid-conversation
- Lose track of completed steps in a plan
- Repeat work it has already done
- Fail to maintain consistency across interactions

## Types of Agent Memory

### 1. Short-Term Memory (Working Memory)

This is the **current context window** — everything the model can see right now.

```python
class ShortTermMemory:
    def __init__(self, max_tokens=4096):
        self.messages = []
        self.max_tokens = max_tokens

    def add(self, role, content):
        self.messages.append({"role": role, "content": content})
        self._trim_if_needed()

    def _trim_if_needed(self):
        """Remove oldest messages if context is too long."""
        while self._count_tokens() > self.max_tokens:
            # Keep system message, remove oldest user/assistant messages
            if len(self.messages) > 1:
                self.messages.pop(1)  # Index 0 is system prompt

    def get_messages(self):
        return self.messages
```

**Key characteristics:**
- Limited by the model's context window (4K to 200K tokens)
- Fast access — everything is in the prompt
- Volatile — lost when conversation ends

### 2. Long-Term Memory (Persistent Memory)

Information that persists across conversations, stored externally.

```python
import json
from datetime import datetime

class LongTermMemory:
    def __init__(self, storage_path="memory.json"):
        self.storage_path = storage_path
        self.memories = self._load()

    def remember(self, key, value, category="general"):
        """Store a memory with metadata."""
        self.memories[key] = {
            "value": value,
            "category": category,
            "created_at": datetime.now().isoformat(),
            "access_count": 0
        }
        self._save()

    def recall(self, key):
        """Retrieve a memory and update access count."""
        if key in self.memories:
            self.memories[key]["access_count"] += 1
            self._save()
            return self.memories[key]["value"]
        return None

    def search(self, query, category=None):
        """Search memories by keyword."""
        results = []
        for key, data in self.memories.items():
            if category and data["category"] != category:
                continue
            if query.lower() in key.lower() or query.lower() in str(data["value"]).lower():
                results.append((key, data["value"]))
        return results

    def _load(self):
        try:
            with open(self.storage_path, "r") as f:
                return json.load(f)
        except FileNotFoundError:
            return {}

    def _save(self):
        with open(self.storage_path, "w") as f:
            json.dump(self.memories, f, indent=2)
```

### 3. Episodic Memory

Memories of specific past interactions or experiences.

```python
class EpisodicMemory:
    def __init__(self):
        self.episodes = []

    def record_episode(self, task, actions, outcome, success):
        """Record a complete task execution as an episode."""
        self.episodes.append({
            "task": task,
            "actions": actions,
            "outcome": outcome,
            "success": success,
            "timestamp": datetime.now().isoformat()
        })

    def find_similar(self, current_task):
        """Find past episodes similar to the current task."""
        similar = []
        for episode in self.episodes:
            if self._similarity(current_task, episode["task"]) > 0.7:
                similar.append(episode)
        return sorted(similar, key=lambda x: x["success"], reverse=True)
```

### 4. Semantic Memory (Vector-Based)

Using embeddings and vector databases for intelligent retrieval.

```python
# Conceptual example using a vector store
class SemanticMemory:
    def __init__(self, embedding_model, vector_store):
        self.embedder = embedding_model
        self.store = vector_store

    def store_knowledge(self, text, metadata=None):
        """Convert text to embedding and store."""
        embedding = self.embedder.encode(text)
        self.store.add(embedding, text, metadata)

    def retrieve_relevant(self, query, top_k=5):
        """Find most relevant memories for a query."""
        query_embedding = self.embedder.encode(query)
        results = self.store.search(query_embedding, top_k=top_k)
        return results
```

## Context Window Strategies

### Sliding Window
```
[System] [Msg n-3] [Msg n-2] [Msg n-1] [Current]
         ←── Window slides forward ──→
```

### Summarization Strategy
```
[System] [Summary of msgs 1-50] [Msg 51] [Msg 52] [Current]
```

### RAG (Retrieval-Augmented Generation)
```
[System] [Retrieved context from vector DB] [User query] [Current]
```

## The Memory Architecture Pattern

A production agent typically combines all four memory types:

```
┌─────────────────────────────────────────┐
│              AI Agent                    │
│                                          │
│  ┌─────────────┐  ┌──────────────────┐  │
│  │ Short-Term   │  │ Working Context  │  │
│  │ (Context     │  │ (Current task    │  │
│  │  Window)     │  │  state & plan)   │  │
│  └──────┬───────┘  └────────┬────────┘  │
│         │                    │           │
│  ┌──────▼────────────────────▼────────┐  │
│  │       Memory Manager               │  │
│  │  - Decides what to remember        │  │
│  │  - Retrieves relevant context      │  │
│  │  - Compresses old conversations    │  │
│  └──────┬────────────────────┬────────┘  │
│         │                    │           │
│  ┌──────▼───────┐  ┌────────▼────────┐  │
│  │ Long-Term    │  │ Semantic        │  │
│  │ (JSON/DB)    │  │ (Vector Store)  │  │
│  └──────────────┘  └────────────────┘  │
└─────────────────────────────────────────┘
```

## Best Practices

1. **Prioritize recency** — Recent messages are usually more relevant
2. **Summarize, don't truncate** — Compress old context instead of dropping it
3. **Use metadata** — Tag memories with timestamps, categories, importance scores
4. **Implement forgetting** — Remove outdated or low-value memories
5. **Test memory limits** — Know your model's context window and stay within it

## Summary

- **Short-term memory** = context window (fast, limited, volatile)
- **Long-term memory** = persistent storage (unlimited, slower access)
- **Episodic memory** = past experiences (helps avoid repeating mistakes)
- **Semantic memory** = vector embeddings (intelligent retrieval)
- A good agent combines all four with a smart Memory Manager
