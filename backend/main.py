"""
FastAPI application for my-careerpath.

Single endpoint: POST /api/analyze-cv
- Accepts: multipart/form-data with a PDF file
- Returns: canonical JSON { status, data: { profile_summary, growth_plan[], company_matches[] } }

PDF extraction uses PyMuPDF (fitz) exclusively — Constitution Principle 3.
Inter-agent state is managed entirely by ADK — Constitution Principle 2.
"""

import json
import os
import re

import fitz  # PyMuPDF
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types as genai_types

from my_careerpath.agent import root_agent

load_dotenv()

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="my-careerpath API",
    description="AI-driven career growth platform backend.",
    version="0.1.0",
)

allowed_origins_raw = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:3000")
allowed_origins = [o.strip() for o in allowed_origins_raw.split(",")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def extract_pdf_text(pdf_bytes: bytes) -> str:
    """Extract raw text from PDF bytes using PyMuPDF (Constitution Principle 3)."""
    try:
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        pages_text = [page.get_text() for page in doc]
        doc.close()
        return "\n".join(pages_text).strip()
    except Exception as exc:
        raise ValueError(f"Failed to extract text from PDF: {exc}") from exc


def parse_agent_json(raw_text: str) -> dict:
    """
    Attempt to extract a JSON object from the agent's response text.
    LLMs sometimes wrap JSON in markdown fences; this strips them.
    """
    # Strip markdown fences if present
    cleaned = re.sub(r"^```(?:json)?\s*", "", raw_text.strip(), flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*```$", "", cleaned.strip())
    return json.loads(cleaned)


# ---------------------------------------------------------------------------
# Endpoint
# ---------------------------------------------------------------------------


@app.post("/api/analyze-cv")
async def analyze_cv(file: UploadFile = File(...)):
    """
    Analyze a CV/resume PDF and return a structured career growth plan.

    - **file**: PDF file (multipart/form-data)

    Returns the canonical JSON schema:
    ```json
    {
      "status": "success",
      "data": {
        "profile_summary": "...",
        "growth_plan": [...],
        "company_matches": [...]
      }
    }
    ```
    """
    # Validate file type
    if file.content_type not in ("application/pdf", "application/octet-stream"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported. Please upload a .pdf file.",
        )

    pdf_bytes = await file.read()
    if len(pdf_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")

    # Step 1: Extract CV text (Constitution Principle 3 — PyMuPDF only)
    try:
        cv_text = extract_pdf_text(pdf_bytes)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc))

    if not cv_text:
        raise HTTPException(
            status_code=422,
            detail="No text could be extracted from the PDF. Ensure the PDF is not scanned.",
        )

    # Step 2: Run the ADK Analyzer Agent (Constitution Principle 1)
    session_service = InMemorySessionService()
    session = await session_service.create_session(
        app_name="my_careerpath",
        user_id="api_user",
    )
    runner = Runner(
        agent=root_agent,
        app_name="my_careerpath",
        session_service=session_service,
    )

    prompt = f"Analyze the following CV and generate a career growth plan:\n\n{cv_text}"

    try:
        final_response_text = ""
        async for event in runner.run_async(
            user_id="api_user",
            session_id=session.id,
            new_message=genai_types.Content(
                role="user",
                parts=[genai_types.Part(text=prompt)],
            ),
        ):
            if event.is_final_response() and event.content and event.content.parts:
                final_response_text = event.content.parts[0].text
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Agent execution failed: {exc}",
        )

    # Step 3: Parse the agent JSON output (Constitution Principle 3)
    try:
        result_data = parse_agent_json(final_response_text)
    except (json.JSONDecodeError, ValueError) as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse agent response as JSON: {exc}. Raw: {final_response_text[:500]}",
        )

    return {"status": "success", "data": result_data}


# ---------------------------------------------------------------------------
# Dev entrypoint
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
