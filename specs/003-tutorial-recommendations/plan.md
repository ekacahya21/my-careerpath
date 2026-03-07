# Implementation Plan: Tutorial Recommendations

**Branch**: `003-tutorial-recommendations` | **Date**: 2026-03-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-tutorial-recommendations/spec.md`

## Summary

This feature updates the Analyzer agent (`root_agent`) to suggest educational resources (e.g., YouTube links) for the skills it identifies as gaps. It updates the API schema to return these `recommended_resources` inside each `growth_plan` milestone, and updates the Next.js `ResultsPanel` to render them as clickable inline links.

## Technical Context

**Language/Version**: Python 3 (Backend) + TypeScript (Frontend)  
**Primary Dependencies**: Google Agent Development Kit (ADK), FastAPI, Next.js 15, Framer Motion  
**Project Type**: Web application (Backend + Frontend separation)  

## Constitution Check

*GATE: Passed*

- [x] **ADK Orchestration**: Yes, we will modify the system prompt of `root_agent` in `agent.py` to instruct Gemini 2.0 to output links natively.
- [x] **Session State**: Yes, no change to state mechanisms.
- [x] **API Contract**: Yes, we will *extend* the canonical JSON schema to include an optional `recommended_resources` array. PDF extraction remains `PyMuPDF`.
- [x] **UI Standard**: Yes, UI updates will use the existing `var(--border)`, `var(--text-secondary)`, and framer-motion standards.
- [x] **Spec-Driven**: Yes, feature specification was established in `003-tutorial-recommendations/spec.md`.

## Project Structure

### Documentation (this feature)

```text
specs/003-tutorial-recommendations/
├── plan.md              # This file
├── research.md          # Approach document
├── data-model.md        # API schema augmentations
├── quickstart.md        # N/A (No new infrastructure)
├── contracts/           # API contract changes
└── tasks.md             # Implementation steps (future command)
```

### Source Code

**Structure Decision**: Option 2: Web application (frontend + backend directories)
The changes will occur strictly in:
1. `backend/my_careerpath/agent.py`
2. `frontend/src/components/ResultsPanel.tsx`
3. `frontend/src/components/CvUploader.tsx` (interface update)

## Verification Plan

### Automated Tests
* Run `npx tsc --noEmit` in `frontend/` to ensure the TypeScript interface updates (`AnalysisResult`) are correctly typed and utilized without errors.

### Manual Verification
1. Start the backend (`python main.py`) and frontend (`npm run dev`).
2. Upload a sample PDF CV.
3. Once the AI analysis completes, verify that the `Career Growth Plan` milestones include clickable tutorial links (e.g., YouTube or official docs).
4. Click a link and verify it opens in a new tab (`target="_blank"`).
