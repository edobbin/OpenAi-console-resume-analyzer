from fastapi import APIRouter, HTTPException, UploadFile, File
#from app.services import parse_resume

router = APIRouter()

# Endpoint for analyzing job description and resume