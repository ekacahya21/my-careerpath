"""
my-careerpath ADK Agent Definitions.

Architecture:
  - Analyzer Agent (root_agent): Parses CV text → structured career plan JSON.
  - Scout Agent (sub-agent): Takes career trajectory → searches for real-world
    company matches via GoogleSearchTool.

State flow follows ADK Constitution Principle 2: all inter-agent state is
passed explicitly. No custom state, no external stores.
"""

import json
from google.adk.agents import Agent
from google.adk.tools import google_search
from google.adk.tools.agent_tool import AgentTool

# ---------------------------------------------------------------------------
# Scout Agent — Company discovery via Google Search
# ---------------------------------------------------------------------------

_SCOUT_INSTRUCTION = """
You are a career scout agent. You receive a JSON career trajectory with fields:
  - current_skills: list of current candidate skills
  - skill_gaps: list of skills to develop
  - milestones: list of career growth steps

Your task:
1. For each milestone's focus area, compose a targeted Google Search query such as:
   "[focus area] companies hiring [key skill] engineers 2024"
2. Execute the search and extract 3 company matches from the results.
3. Return ONLY valid JSON in this exact format (no markdown fences, no extra text):
{
  "company_matches": [
    {
      "company_name": "<Company Name>",
      "match_reason": "<1-2 sentence rationale>",
      "search_query_used": "<query you used>"
    }
  ]
}
"""

scout_agent = Agent(
    model="gemini-2.0-flash",
    name="scout_agent",
    description=(
        "A specialist agent that searches for real-world companies matching a "
        "candidate's career trajectory using Google Search."
    ),
    instruction=_SCOUT_INSTRUCTION,
    tools=[google_search],
)

# ---------------------------------------------------------------------------
# Analyzer Agent (root_agent) — CV analysis + milestone generation
# ---------------------------------------------------------------------------

_ANALYZER_INSTRUCTION = """
You are an expert career growth analyst. You receive the raw extracted text from
a candidate's CV/resume.

Your tasks:
1. Identify `current_skills`: list of technical and domain skills the candidate
   already has.
2. Identify `skill_gaps`: list of skills missing or underdeveloped for their
   apparent target role (infer logical next role from the CV context).
3. Generate `growth_plan`: exactly 3 milestone steps, each with:
   - step: integer (1, 2, or 3)
   - focus: a short phrase naming the focus area (e.g., "Cloud Infrastructure")
   - skills_to_acquire: list of 2–4 specific skills to gain in this step
4. Write a `profile_summary`: 2–3 sentence paragraph summarising the candidate's
   background, trajectory, and readiness.
5. Delegate company discovery to the scout_agent tool by passing it a JSON string
   of { current_skills, skill_gaps, milestones: growth_plan }.
6. Merge the scout_agent output into your final response.

Return ONLY valid JSON in this exact format (no markdown fences):
{
  "profile_summary": "...",
  "growth_plan": [
    {"step": 1, "focus": "...", "skills_to_acquire": ["..."]}
  ],
  "company_matches": [
    {"company_name": "...", "match_reason": "...", "search_query_used": "..."}
  ]
}
"""

root_agent = Agent(
    model="gemini-2.0-flash",
    name="analyzer_agent",
    description=(
        "Primary career analysis agent. Parses CV text, identifies skill gaps, "
        "generates a 3-step growth plan, and delegates company discovery to the "
        "scout sub-agent."
    ),
    instruction=_ANALYZER_INSTRUCTION,
    tools=[AgentTool(agent=scout_agent)],
)
