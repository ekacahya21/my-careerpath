# Project Context: my-careerpath

**Last Updated**: 2026-03-07
**Updated By**: Feature 003-tutorial-recommendations

## Project Identity

- **Name**: my-careerpath
- **Type**: web-app
- **Purpose**: AI-driven career growth platform offering PDF CV analysis, gap identification, structured growth plans, and external resources.
- **Domain**: Careers/EdTech

## Technology Stack

### Languages & Versions
- Python: 3 (Backend)
- TypeScript: (Frontend)

### Frameworks & Libraries
- FastAPI (Backend)
- Next.js 15 (Frontend)
- Google Agent Development Kit (ADK) (Backend AI)
- PyMuPDF (Backend PDF)
- Framer Motion (Frontend Animation)

## Project Structure

```
backend/
├── main.py
├── my_careerpath/
│   └── agent.py

frontend/
├── src/
│   ├── app/
│   └── components/
```

## API Surface

| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/analyze-cv` | Analyzes uploaded PDF CV and returns AI-generated profile, growth plan with tutorials, and company matches |

## Local Dev Runbook

1. `gcloud auth application-default login`
2. `cd backend && python main.py`
3. `cd frontend && npm run dev`

## Data Model Overview

### Entities (Cross-Feature)
- **Resource** (defined in 003-tutorial-recommendations):
  - Purpose: External educational tutorial links
  - Key fields: title (string), url (string)
- **Growth Milestone**:
  - Purpose: Represents a career step 
  - Key fields: step, focus, skills_to_acquire, recommended_resources

## External Integrations

- **Google Vertex AI / Gemini**: Core AI analysis and generation
- **Google Search**: Company discovery and matchmaking

## Recent Features

- 003-tutorial-recommendations: Added recommended_resources (YouTube/tutorial links) to growth plan milestones.
- 002-company-matches-link: Made company matches clickable to open dynamic Google Jobs searches in new tabs.
- 001-center-drop-zone: Fixed centering alignment of the CV upload drop zone.

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
