# Tool Use and Function Calling

## What is Tool Use?

Tool use (also known as function calling) allows AI agents to interact with external systems. Instead of just generating text, an agent can:

- **Call APIs** to fetch real-time data
- **Execute code** to perform calculations
- **Query databases** to retrieve information
- **Interact with files** to read or write data

## How It Works

1. The AI model receives a list of available tools with their descriptions
2. Based on the user's request, the model decides which tool to call
3. The tool is executed and its result is returned to the model
4. The model uses the result to formulate its response

## Example: Weather Agent

```python
tools = [
    {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {
            "city": {"type": "string", "description": "City name"}
        }
    }
]

# The agent decides to call get_weather("London")
# Result: {"temperature": 15, "condition": "cloudy"}
# Agent responds: "It's currently 15°C and cloudy in London."
```

## Key Concepts

- **Tool definitions** describe what each tool does and what parameters it accepts
- **Tool selection** is the model's decision about which tool to use
- **Tool execution** happens outside the model, in your application code
- **Result integration** is how the model incorporates tool results into its response
