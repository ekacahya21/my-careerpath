# my-careerpath

AI-driven career growth platform. Upload your CV (PDF), get a personalized skill gap analysis, a 3-step career growth plan, and real-world company matches — all powered by Google ADK + Gemini.

## Project Structure

```
.
├── backend/               # FastAPI + Google ADK backend
│   ├── my_careerpath/
│   │   ├── __init__.py
│   │   └── agent.py       # Analyzer Agent + Scout Agent definitions
│   ├── main.py            # FastAPI app + /api/analyze-cv endpoint
│   ├── pyproject.toml
│   └── .env.example
│
└── frontend/              # Next.js 15 (App Router) frontend
    └── src/
        ├── app/
        │   ├── layout.tsx
        │   ├── page.tsx
        │   └── globals.css
        └── components/
            ├── CvUploader.tsx
            └── ResultsPanel.tsx
```

## Quick Start

### Backend

```bash
cd backend
cp .env.example .env
# Fill in GOOGLE_CLOUD_PROJECT in .env

pip install -e .          # dependencies are installed in your venv
python main.py            # runs on http://localhost:8000
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Adjust NEXT_PUBLIC_API_BASE_URL if needed

npm run dev               # runs on http://localhost:3000
```

## API

**`POST /api/analyze-cv`** — `multipart/form-data` with a `file` field (PDF)

```json
{
  "status": "success",
  "data": {
    "profile_summary": "...",
    "growth_plan": [
      { "step": 1, "focus": "...", "skills_to_acquire": ["..."] }
    ],
    "company_matches": [
      { "company_name": "...", "match_reason": "...", "search_query_used": "..." }
    ]
  }
}
```

## Environment Variables

| Variable | Location | Description |
|---|---|---|
| `GOOGLE_GENAI_USE_VERTEXAI` | `backend/.env` | Set to `1` to use Vertex AI |
| `GOOGLE_CLOUD_PROJECT` | `backend/.env` | Your Google Cloud Project ID |
| `GOOGLE_CLOUD_LOCATION` | `backend/.env` | GCP Region (e.g., `us-central1`) |
| `CORS_ALLOWED_ORIGINS` | `backend/.env` | Comma-separated allowed origins |
| `NEXT_PUBLIC_API_BASE_URL` | `frontend/.env.local` | Backend URL (default: `http://localhost:8000`) |
