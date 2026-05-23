from fastapi import FastAPI
from app.api import health

app = FastAPI(title="Resume Analyzer API", version="1.0")
app.include_router(health.router)
