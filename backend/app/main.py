from fastapi import FastAPI
from app.api import health, resumes, job_description

app = FastAPI(title="Resume Analyzer API", version="1.0")

app.include_router(health.router)
app.include_router(resumes.router)
app.include_router(job_description.router)
