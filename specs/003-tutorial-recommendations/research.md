# Research: Tutorial Recommendations

## Investigation

The feature requires adding AI-generated educational resource links corresponding to the skills in the growth plan.

**How should the agent source these links?**
*   **Alternative 1 (Tool Calling)**: Create a new YouTube Search Tool for the agent. *Rejected* because it adds significant latency and requires a separate YouTube API key. 
*   **Alternative 2 (Direct Generation)**: Instruct the `gemini-2.0-flash` model in the `root_agent` prompt to generate high-quality generalized search links or rely on its training data to generate canonical URLs (e.g., `https://www.youtube.com/results?search_query=learn+React`). *Chosen* because it matches the project's "Radical Simplicity" approach, avoids extra latency, and requires no new API integrations.

## Decision

We will update `_ANALYZER_INSTRUCTION` in `backend/my_careerpath/agent.py` to mandate the inclusion of `recommended_resources` within the `growth_plan` JSON response. The UI will then parse and render these objects as `<a>` tags.
