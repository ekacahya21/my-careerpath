# Quickstart: Tutorial Recommendations

This feature updates the AI prompt and the frontend representation but does not introduce any new infrastructure, environment variables, or databases.

To run the application with this feature:

1. **Ensure your Google / Vertex AI environment is authenticated.**
   ```bash
   gcloud auth application-default login
   ```
2. **Start the backend server:**
   ```bash
   cd backend
   python main.py
   ```
3. **Start the frontend application:**
   ```bash
   cd frontend
   npm run dev
   ```
4. Upload a CV and verify that the UI renders clickable tutorial links beneath the skills to acquire.
