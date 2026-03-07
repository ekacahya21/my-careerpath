<!--
Sync Impact Report:
- Version change: 1.0.0 → 2.0.0
- List of modified principles:
  - 1. Tool-Based Database Operations → 1. ADK-Driven AI Orchestration
  - 2. Context-Driven Session State → 2. Context-Driven Session State (retained, adapted scope)
  - 3. Radical Simplicity → 3. PDF-as-Input, JSON-as-Output Contract
- Added sections:
  - Principle 4: Cinematic SaaS UI Standard
- Removed sections:
  - Previous restaurant concierge principles (database-MCP focus)
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md (Constitution Check updated)
  - ✅ .specify/templates/spec-template.md (no structural change required)
  - ✅ .specify/templates/tasks-template.md (no structural change required)
- Follow-up TODOs: none
-->

# my-careerpath Constitution

## Core Principles

### 1. ADK-Driven AI Orchestration

All AI processing MUST be orchestrated exclusively through Google ADK agents using `google-adk`
and the `gemini-2.0-flash` model. Direct LLM API calls outside of ADK agents are PROHIBITED.
The multi-agent pattern MUST follow the sequential Analyzer → Scout pipeline defined in the
project blueprint: the Analyzer Agent processes CV text and invokes the Scout Agent as a
sub-agent tool call via ADK `AgentTool`.

**Rationale**: ADK provides structured orchestration, native tool-call handling, ToolContext
state management, and observability that raw API calls cannot match. Consistency in the
agent layer ensures the system is auditable and extensible.

### 2. Context-Driven Session State

Inter-agent state MUST be passed explicitly via ADK `ToolContext` — no custom state management,
no external state stores (Redis, databases, etc.) for session data. The FastAPI endpoint is
the sole integration point and MUST merge agent outputs into the final API response.

**Rationale**: Using `ToolContext` keeps the application layer stateless and delegates
state tracking securely to the ADK runtime, avoiding infrastructure complexity for a
workshop-scale project.

### 3. PDF-as-Input, JSON-as-Output Contract

The API contract is fixed: the `/api/analyze-cv` endpoint MUST accept `multipart/form-data`
(PDF file only) and MUST return the canonical JSON schema defined in the project context:
`{ status, data: { profile_summary, growth_plan[], company_matches[] } }`. PDF text extraction
MUST use `PyMuPDF` (fitz) exclusively — no alternative PDF libraries. All AI outputs MUST
be parsed into this schema before returning to the frontend.

**Rationale**: A strict, stable contract between the backend and the Next.js frontend
decouples teams and prevents schema drift. PyMuPDF is committed to avoid dependency churn.

### 4. Cinematic SaaS UI Standard

All frontend components MUST adhere to the "Cinematic SaaS minimalism" design system:
- **Colors**: Background `#fafafa`, text primary `#18181b`, accents in Zinc/Slate — no
  harsh or vibrant colors.
- **Motion**: All animations via Framer Motion with durations 0.5s–0.8s and gentle easing.
- **Typography**: Inter or Geist only; ample whitespace; no browser-default fonts.
- **Depth**: Diffuse shadow, no harsh borders, modal overlays with backdrop blur.

**Rationale**: A premium, consistent UI feel is a core deliverable of this workshop project.
Deviating from the design system fragments the experience and undermines the "cinematic" goal.

## Governance

This Constitution governs all development decisions for **my-careerpath**. It supersedes any
prior conventions. Amendments MUST update this document, increment the version, and propagate
any changed principles to all `.specify` templates.

**Amendment procedure**: Edit `constitution.md` → bump `CONSTITUTION_VERSION` → run
`/speckit.constitution` to propagate to dependent templates → commit with message
`docs: amend constitution to vX.Y.Z`.

**Version**: 2.0.0 | **Ratified**: 2026-03-07 | **Last Amended**: 2026-03-07