from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health, job_description, resumes, job_analysis, gemini_test

app = FastAPI(
    title="MyATS API",
    description="Backend API for AI-powered resume analysis and job matching.",
    version="0.1.0",
)


# Allow your React frontend to call the backend.
# For local dev, Vite usually runs on http://localhost:5173.
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# CORS setup here
app.include_router(health.router, tags=["Health"])
app.include_router(resumes.router, tags=["Resumes"])
app.include_router(job_description.router, tags=["Job Descriptions"])
app.include_router(job_analysis.router, tags=["Analysis"])
app.include_router(gemini_test.router, tags=["Gemini Test"])

@app.get("/")
def root():
    return {
        "message": "MyATS API is running",
        "docs": "/docs",
        "health": "/health",
    }