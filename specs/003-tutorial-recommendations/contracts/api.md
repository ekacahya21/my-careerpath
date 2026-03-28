# API Contract: Analyze CV

**Endpoint**: `POST /api/analyze-cv`

## Request
*   **Content-Type**: `multipart/form-data`
*   **Body**: 
    *   `file`: The candidate's PDF CV document.

## Response
*   **Content-Type**: `application/json`

The response schema is augmented to include `recommended_resources` in the `growth_plan` array.

```json
{
  "status": "success",
  "data": {
    "profile_summary": "string",
    "growth_plan": [
      {
        "step": 1,
        "focus": "string",
        "skills_to_acquire": ["string"],
        "recommended_resources": [
          {
            "title": "string",
            "url": "string"
          }
        ]
      }
    ],
    "company_matches": [
      {
        "company_name": "string",
        "match_reason": "string",
        "search_query_used": "string"
      }
    ]
  }
}
```
